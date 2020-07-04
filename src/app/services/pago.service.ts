import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Pago } from './../models/pago';

@Injectable({
  providedIn: 'root'
})
export class PagoService {

  urlBase = "http://localhost:3000/api/pago/"
  constructor(private _http: HttpClient) { }

  public getPagos():Observable<any>{
    const httpOptions = {
      headers: new HttpHeaders({

      })
    }   
    return this._http.get(this.urlBase , httpOptions );
  }
}
