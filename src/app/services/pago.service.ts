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

  public addPago(pago: Pago):Observable<any>{
    console.log("pago..." + pago);
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':'application/json'
      })
    }
    var body = JSON.stringify(pago);
    return this._http.post(this.urlBase, body, httpOptions);
  }

  public deletePago(pago: Pago):Observable<any>{
    const httpOptions = {
      headers: new HttpHeaders({

      })
    };   
    return this._http.delete(this.urlBase + pago._id , httpOptions );
  }

  public updatePago(pago: Pago): Observable<any>{
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':'application/json'
      })
    };
    var body = JSON.stringify(pago);
    return this._http.put(this.urlBase + pago._id, body, httpOptions);
  }
}
