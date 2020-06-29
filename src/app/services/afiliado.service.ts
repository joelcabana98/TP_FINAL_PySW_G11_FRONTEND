import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Afiliado } from '../models/afiliado';

@Injectable({
  providedIn: 'root'
})
export class AfiliadoService {

  urlBase:string = "http://localhost:3000/api/afiliado/";

  constructor(private _http:HttpClient) { }

  getAfiliados():Observable<any>{
    const httpOptions = {
      headers: new HttpHeaders({

      })
    };   
    return this._http.get(this.urlBase , httpOptions );
  }

  addAfiliado(afiliado:Afiliado):Observable<any>{
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':'application/json'
      })
    };
    var body = JSON.stringify(afiliado);
    return this._http.post(this.urlBase, body, httpOptions);
  }

  deleteAfiliado(afiliado:Afiliado):Observable<any>{
    const httpOptions = {
      headers: new HttpHeaders({

      })
    };   
    return this._http.delete(this.urlBase + afiliado._id , httpOptions );
  }

  updateAfiliado(afiliado:Afiliado):Observable<any>{
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':'application/json'
      })
    };
    var body = JSON.stringify(afiliado);
    return this._http.put(this.urlBase + afiliado._id, body, httpOptions);
  }

  getAfiliadoByDni(dni:number):Observable<any>{
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':'application/json'
      })
    };
    var body = {
      "dni":dni
    }
    return this._http.post(this.urlBase+"dni", body, httpOptions);
  }

  getAfiliadoByEmail(email:string){
    const httpOption = {
      headers: new HttpHeaders({
      'Content-Type': 'application/json'
        })
    }
    let body = JSON.stringify({ email:email });
    return this._http.post(this.urlBase+"email", body, httpOption);
  }
}
