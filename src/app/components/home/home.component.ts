import { Component, OnInit } from '@angular/core';
import { Noticia } from 'src/app/models/noticia';
import { NoticiaService } from 'src/app/services/noticia.service';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  noticia:Noticia;
  listaNoticias:Array<Noticia>;
  listaAllNoticias:Array<Noticia>;
  
  constructor(public loginService: LoginService,private noticiaService:NoticiaService) { 
    this.noticia = new Noticia();
    this.noticia.vigente = false;
    this.listaNoticias = new Array<Noticia>();
    this.listaAllNoticias = new Array<Noticia>();

    this.obtenerNoticiasSinFiltro();
    this.obtenerNoticiasPorFecha();
  }


  guardarNoticia(){
    this.noticia.usuario = this.loginService.userLogged;
    this.noticia.fecha = new Date();
    this.noticiaService.addNoticia(this.noticia).subscribe(
    (result)=>{
        alert("Noticia Guardada");
        this.obtenerNoticiasSinFiltro();
        this.obtenerNoticiasPorFecha();
    }, 
  (error)=>{
        console.log("error"+ error);
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
        alert("usuario Eliminada");
        this.obtenerNoticiasSinFiltro();
        this.obtenerNoticiasPorFecha();
      },
      (error)=>{
        console.log(error);
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

  seleccionarNoticia(noti:Noticia){
    var tnoti = new Noticia();
    Object.assign(tnoti,noti);
    this.noticia = tnoti;
  }


  actualizarNoticia(){
    this.noticia.fecha = new Date();
    this.noticiaService.updateNoticia(this.noticia).subscribe(
      (result)=>{
          alert("Usuario Modificada");
          this.obtenerNoticiasSinFiltro();
          this.obtenerNoticiasPorFecha();
      },
      (error)=>{
        console.log(error);
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

}
