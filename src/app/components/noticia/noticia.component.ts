import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NoticiaService } from 'src/app/services/noticia.service';
import { Noticia } from 'src/app/models/noticia';

@Component({
  selector: 'app-noticia',
  templateUrl: './noticia.component.html',
  styleUrls: ['./noticia.component.css']
})
export class NoticiaComponent implements OnInit {

  noticia:Noticia;
  listaNoticias:Array<Noticia>;
  
  constructor(private ruta:ActivatedRoute,private noticiaService:NoticiaService) {
    this.listaNoticias = new Array<Noticia>();

    this.ruta.params.subscribe(params=>{
      console.log(params['id']);
     
      /*Obtiene una noticia por su id pasado por parametro*/ 
     this.noticiaService.getNoticiabyId(params['id']).subscribe(
       (result)=>{
              this.noticia = new Noticia();
              this.noticia = result;
       },
       (error)=>{
         console.log(error+"error");
       }
     )
     
     /*obtiene todas las noticias odenadas por fecha diferente al _id de la pasada por parametro*/
     this.noticiaService.getNoticiaNotIdEquals(params['id']).subscribe(
       (result)=>{
         this.listaNoticias = new Array<Noticia>();
         var noti2: Noticia = new Noticia();
         result.forEach(element => {
           Object.assign(noti2,element);
           this.listaNoticias.push(noti2);
           console.log("NOTICIAS : "+ noti2.titulo);
           noti2 = new Noticia();
           });
       },
       (error)=>{
         console.log(error);
       }
     )

    })
  }


   

  ngOnInit(): void {
  }

}
