import { Component, OnInit } from '@angular/core';
import { Noticia } from 'src/app/models/noticia';
import { NoticiaService } from 'src/app/services/noticia.service';
import { LoginService } from 'src/app/services/login.service';
import { ToastrService } from 'ngx-toastr';

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
  
  fecha:Date;
  desde:string;
  hasta:string;
  constructor(public loginService: LoginService,private noticiaService:NoticiaService,private _toastr:ToastrService, private fb: FacebookService) { 
    this.noticia = new Noticia();
    this.noticia.vigente = false;
    this.listaNoticias = new Array<Noticia>();
    this.listaAllNoticias = new Array<Noticia>();
    this.obtenerNoticiasSinFiltro();
    this.obtenerNoticiasPorFecha();
    this.iniciarFb();
  }


  guardarNoticia(){
    this.noticia.usuario = this.loginService.userLogged;
    this.noticia.fecha = new Date();
    this.noticiaService.addNoticia(this.noticia).subscribe(
    (result)=>{
      this._toastr.success("La noticia ha sido agregada","Exito");
        this.obtenerNoticiasSinFiltro();
        this.obtenerNoticiasPorFecha();
    }, 
  (error)=>{
        console.log("error"+ error);
        this._toastr.error("Ha ocurrido un error","Error");
  });
  this.noticia = new Noticia();
  this.noticia.vigente = false;
  }


  ngOnInit(): void {
  }

  obtenerNoticiasPorFecha(){
    this.listaNoticias = new Array<Noticia>();
    this.noticiaService.getNoticiasByDate().subscribe(
      (result)=>{
        var noti: Noticia = new Noticia();
        result.forEach(element => {
          Object.assign(noti,element);
          this.listaNoticias.push(noti);
          console.log(this.listaNoticias.length);
          console.log(noti);
          noti = new Noticia();
          });
      },
      (error)=>{
        console.log(error);
      }
    )
  }

  eliminarNoticia(noti:Noticia){  
    this.noticiaService.deleteNoticia(noti).subscribe(
      (result)=>{
        this._toastr.success("La noticia ha sido eliminada","Exito");
        this.obtenerNoticiasSinFiltro();
        this.obtenerNoticiasPorFecha();
      },
      (error)=>{
        console.log(error);
        this._toastr.error("Ha ocurrido un error","Error");
      }
    );
  }

  obtenerNoticiasSinFiltro(){
    this.listaAllNoticias = new Array<Noticia>();
    this.noticiaService.getAllNoticias().subscribe(
      (result)=>{
        var noti2: Noticia = new Noticia();
        result.forEach(element => {
          Object.assign(noti2,element);
          this.listaAllNoticias.push(noti2);
          noti2 = new Noticia();
          });
      },
      (error)=>{
        console.log(error);
      }
    )
  }


  obtenerNoticiaByFecha(){
    console.log("ENTROOOOOOOOOOO   "+this.desde + "     "+this.hasta); 
     this.listaAllNoticias = new Array<Noticia>();
     this.noticiaService.getNoticiasByTwoDate(this.desde,this.hasta).subscribe(
      (result)=>{
        console.log("NOTICIA SERVICEEE "+result);
        var noti2: Noticia = new Noticia();
        result.forEach(element => {
          Object.assign(noti2,element);
          this.listaAllNoticias.push(noti2);
          console.log(noti2.titulo);
          noti2 = new Noticia();
          });
      },
      (error)=>{
        console.log(error);
      }
    )
  }


  seleccionarNoticia(noti:Noticia){
    var tnoti = new Noticia();
    Object.assign(tnoti,noti);
    this.noticia = tnoti;
  }


  actualizarNoticia(){
    this.noticia.fecha = new Date();
    this.noticiaService.updateNoticia(this.noticia).subscribe(
      (result)=>{
        this._toastr.success("La noticia ha sido modificada","Exito");
          this.obtenerNoticiasSinFiltro();
          this.obtenerNoticiasPorFecha();
      },
      (error)=>{
        console.log(error);
        this._toastr.error("Ha ocurrido un error","Error");
      }
    );
    this.noticia = new Noticia();
    this.noticia.vigente = false;
  }

  limpiarNoticias(){
    this.noticia = new Noticia();
    this.noticia.vigente = false;
  }

  onFileChanges(files){
    console.log("File has changed:", files);
    this.noticia.imagen = files[0].base64;
  }


  postFb(){
    var apiMethod: ApiMethod = "post";
    this.fb.api('/111432347291522/feed', apiMethod,
    {
    "message": this.noticia.titulo+"\n\n\n"+ this.noticia.descripcion,
    "access_token":"EAADzAWsejKsBAHrQNgtkJooyg3vmjdVbnug3ZBeVEZB9wFsdWZCl2ZCBIWEIB2xm82YOK8C0A57rTx1ggJ5XL5p9FH7nQLCZCw1oK3X3ZBthQE24nSLAFOdZBxzG8RKPIck46mJIxC7UYdeti67ZCyHwuJQLPePSXrABxfgr3ZCRB6z6RGhsJMfJsIvE9kgFqQIbsrz9yyqOphAZDZD"
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

}
