import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Noticia } from '../models/noticia';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NoticiaService {

  urlBase:string ="http://localhost:3000/api/noticia/";

  constructor(private _http:HttpClient) {
    
  }

  addNoticia(noticia:Noticia):Observable<any>{
    const httpOptions  = {
      headers: new HttpHeaders({
        'Content-Type':'application/json'
      })
    }; 
    var body = JSON.stringify(noticia);
    return this._http.post(this.urlBase,body,httpOptions);
  }

  getNoticiasByDate():Observable<any>{
    const httpOptions = {
      headers: new HttpHeaders({

      })
    }   
    return this._http.get(this.urlBase , httpOptions );
  }

  getNoticiabyId(id):Observable<any>{
    const httpOptions = {
      headers: new HttpHeaders({

      })
    }   
    return this._http.get(this.urlBase+id,httpOptions );
  }


  getNoticiaNotIdEquals(id):Observable<any>{
    const httpOptions = {
      headers: new HttpHeaders({

      })
    }   
    return this._http.get(this.urlBase+"notequals/"+id,httpOptions );
  }

  getAllNoticias():Observable<any>{
    const httpOptions = {
      headers: new HttpHeaders({

      })
    }   
    return this._http.get(this.urlBase+'noFiltre/', httpOptions );
  }

/////
  getNoticiasByTwoDate(de:string,ha:string):Observable<any>{
   //console.log("entro serviceeeeee  " + desde +"   "+ hasta);
    const httpOptions = {
      headers: new HttpHeaders({

      }),
    }  
    
    let body = JSON.stringify({ desde: de, hasta: ha }); 
    console.log("JSON" + body);
    return this._http.post(this.urlBase+'byDate/',body, httpOptions );
  }



  deleteNoticia(noticia:Noticia):Observable<any>{
    const httpOptions = {
      headers: new HttpHeaders({

      })
    }   
    return this._http.delete(this.urlBase + noticia._id, httpOptions );
  }


  updateNoticia(noticia:Noticia):Observable<any>{
    const httpOptions  = {
      headers: new HttpHeaders({
        'Content-Type':'application/json'
      })
    }; 
    var body = JSON.stringify(noticia);
    return this._http.put(this.urlBase + noticia._id,body,httpOptions);;
  }

  

}
