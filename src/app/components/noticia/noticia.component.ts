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
  
  constructor(private ruta:ActivatedRoute,private noticiaService:NoticiaService) {
    this.ruta.params.subscribe(params=>{
      console.log(params['id']);
     
     this.noticiaService.getNoticiabyId(params['id']).subscribe(
       (result)=>{
              this.noticia = new Noticia();
              this.noticia = result;
              console.log("resultado "+ this.noticia);
              console.log("resultado "+ this.noticia.titulo);
       },
       (error)=>{
         console.log(error+"error");
       }
     )


    })
  }


   

  ngOnInit(): void {
  }

}
