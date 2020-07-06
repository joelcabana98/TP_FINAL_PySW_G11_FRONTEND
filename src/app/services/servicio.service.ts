import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Servicio } from '../models/servicio';

@Injectable({
  providedIn: 'root'
})
export class ServicioService {

  url = "http://localhost:3000/api/servicio/";

  constructor(private _http: HttpClient) {
  }

  getServicios(): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
      }),
    };
    return this._http.get(this.url, httpOptions);
  }

  getServiciobyId(id): Observable<any>{ 
    const httpOptions = {
      headers: new HttpHeaders({
      }),
    }   
    return this._http.get(this.url + id, httpOptions);
  }

  addServicio(servicio: Servicio): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    let body = JSON.stringify(servicio);
    return this._http.post(this.url, body, httpOptions);
  }

  updateServicio(upServicio: Servicio): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
    };
    let body = JSON.stringify(upServicio);
    return this._http.put(this.url + upServicio._id, body, httpOptions);
  }

  deleteServicio(servicio: Servicio): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
      }),
    };
    return this._http.delete(this.url + servicio._id, httpOptions);
  }
}
