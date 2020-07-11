import { Component, OnInit } from '@angular/core';
import { Noticia } from 'src/app/models/noticia';
import { NoticiaService } from 'src/app/services/noticia.service';
import { LoginService } from 'src/app/services/login.service';
import { ToastrService } from 'ngx-toastr';
import jsPDF from 'jspdf';
import { FacebookService, InitParams, LoginResponse } from 'ngx-fb';
import { ApiMethod } from 'ngx-fb/dist/esm/providers/facebook';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  noticia:Noticia;
  listaNoticias:Array<Noticia>;
  listaAllNoticias:Array<Noticia>;
  listaFiltrada:Array<Noticia>;
  fecha:Date;
  desde:Date;
  hasta:Date;
  constructor(public loginService: LoginService,private noticiaService:NoticiaService,private _toastr:ToastrService, private fb: FacebookService) { 
    this.noticia = new Noticia();
    this.listaFiltrada = new Array<Noticia>();
    this.noticia.vigente = false;

    this.listaNoticias = new Array<Noticia>();
    this.listaAllNoticias = new Array<Noticia>();
    this.obtenerNoticiasSinFiltro();
    this.obtenerNoticiasPorFecha();
    this.iniciarFb();

    this.verTodos();
  }


  public guardarNoticia() {
    this.noticia.usuario = this.loginService.userLogged;
    this.noticia.fecha = new Date();
    this.noticiaService.addNoticia(this.noticia).subscribe(
      (result) => {
        this._toastr.success("La noticia ha sido agregada", "Exito");
        this.obtenerNoticiasSinFiltro();
        this.obtenerNoticiasPorFecha();
        this.verTodos();
      },
      (error) => {
        console.log("error" + error);
        this._toastr.error("Ha ocurrido un error", "Error");
      });
    this.noticia = new Noticia();
    this.noticia.vigente = false;
  }

  verTodos(){
    this.listaFiltrada = new Array<Noticia>();
    this.listaFiltrada = this.listaAllNoticias;
  }

  ngOnInit(): void {
  }

  obtenerNoticiasPorFecha() {
    this.listaNoticias = new Array<Noticia>();
    this.noticiaService.getNoticiasByDate().subscribe(
      (result) => {
        var noti: Noticia = new Noticia();
        result.forEach(element => {
          Object.assign(noti, element);
          this.listaNoticias.push(noti);
          console.log(this.listaNoticias.length);
          console.log(noti);
          noti = new Noticia();
        });
      },
      (error) => {
        console.log(error);
      }
    )
  }

  eliminarNoticia(noti: Noticia) {
    this.noticiaService.deleteNoticia(noti).subscribe(
      (result) => {
        this._toastr.success("La noticia ha sido eliminada", "Exito");
        this.obtenerNoticiasSinFiltro();
        this.obtenerNoticiasPorFecha();
        this.verTodos();
      },
      (error) => {
        console.log(error);
        this._toastr.error("Ha ocurrido un error", "Error");
      }
    );
  }

  obtenerNoticiasSinFiltro() {
    this.listaAllNoticias = new Array<Noticia>();
    this.noticiaService.getAllNoticias().subscribe(
      (result) => {
        var noti2: Noticia = new Noticia();
        result.forEach(element => {
          Object.assign(noti2, element);
          this.listaAllNoticias.push(noti2);
          noti2 = new Noticia();
        });
      },
      (error) => {
        console.log(error);
      }
    )
  }

  obtenerNoticiaByFecha(){
    this.listaFiltrada = new Array<Noticia>();
    this.listaFiltrada = this.listaAllNoticias;
    this.listaFiltrada = this.listaFiltrada.filter(noticia => (noticia.fecha > this.desde) && (noticia.fecha <= this.hasta));
  }


  seleccionarNoticia(noti: Noticia) {
    var tnoti = new Noticia();
    Object.assign(tnoti, noti);
    this.noticia = tnoti;
  }


  actualizarNoticia() {
    this.noticia.fecha = new Date();
    this.noticiaService.updateNoticia(this.noticia).subscribe(
      (result) => {
        this._toastr.success("La noticia ha sido modificada", "Exito");
        this.obtenerNoticiasSinFiltro();
        this.obtenerNoticiasPorFecha();
        this.verTodos();
      },
      (error) => {
        console.log(error);
        this._toastr.error("Ha ocurrido un error", "Error");
      }
    );
    this.noticia = new Noticia();
    this.noticia.vigente = false;
  }

  limpiarNoticias() {
    this.noticia = new Noticia();
    this.noticia.vigente = false;
  }

  onFileChanges(files) {
    console.log("File has changed:", files);
    this.noticia.imagen = files[0].base64;
  }


  postFb(){
    var apiMethod: ApiMethod = "post";
    this.fb.api('/111432347291522/feed', apiMethod,
    {
    "message": this.noticia.titulo+"\n\n\n"+ this.noticia.descripcion,
    "access_token":"EAADzAWsejKsBAD634aT5GgMueiphZBV4egmSVWwCRxXueJ5f0glSzUDNhcxtkRCPWZBbDnZCI1y242TAj79c499PVWTdIo2kWZCFshPcEMloBw8q0p4AZAPIGWzJHmbpBv0kJ1uQMFsLYsgPCCEC1wxC7Y0TwdFQxuF0pRD3X6XvHf4KWnf3de1nIUeOZC9vIZD"
    });
    this._toastr.success("La noticia ha sido publicada en Facebook","Exito");
    }
   
  iniciarFb(){
    let initParams: InitParams = {
    appId: '267187417681067',
    autoLogAppEvents : true,
    xfbml : true,
    version : 'v7.0'
    };
    this.fb.init(initParams);
  }


  generarPDF(){
    var fecha = new Date();
    var fechaString = fecha.getDate()+"/" + (fecha.getMonth()+1) +"/"+fecha.getFullYear() +"   "+fecha.getHours()+"-"+fecha.getMinutes()+"-"+fecha.getSeconds();
  
    var datos=[];
    var i = 0;
    this.listaFiltrada.forEach(n =>{
      i++;
      var temp = [];
      temp.push(i);
      temp.push(n.titulo);
      temp.push(n.fecha);
      if(n.vigente == true){
        temp.push("Si");
      }else{
        temp.push("No");
      }
      temp.push(n.usuario.usuario);
      datos.push(temp);
    });
    
    var doc = new jsPDF();
    doc.text("Lista de Noticias",10,10);
    doc.setTextColor(100);
    
    doc.autoTable({
      head: [['#','Titulo', 'Fecha', 'Vigente','Usuario']],
      body: datos
    });
    doc.save("Reporte_de_Noticias"+fechaString);
  }


}
