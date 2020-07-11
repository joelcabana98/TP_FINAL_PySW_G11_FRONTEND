import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Novedad } from '../models/novedad';

@Injectable({
  providedIn: 'root'
})
export class NovedadService {

  url = "http://localhost:3000/api/novedad/";

  constructor(private _http: HttpClient) {
  }

  getNovedades(): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
      }),
    };
    return this._http.get(this.url, httpOptions);
  }

  getNovedadbyId(id): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
      }),
    }
    return this._http.get(this.url + id, httpOptions);
  }

  getNovedadesByDate(fechaDesde: string, fechaHasta: string): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
    }
    let body = JSON.stringify({
      fechaDesde: fechaDesde,
      fechaHasta: fechaHasta
    });
    return this._http.post(this.url + 'byDate/', body, httpOptions);
  }

  addNovedad(novedad: Novedad): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    let body = JSON.stringify(novedad);
    return this._http.post(this.url, body, httpOptions);
  }

  updateNovedad(upNovedad: Novedad): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
    };
    let body = JSON.stringify(upNovedad);
    return this._http.put(this.url + upNovedad._id, body, httpOptions);
  }

  deleteNovedad(novedad: Novedad): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
      }),
    };
    return this._http.delete(this.url + novedad._id, httpOptions);
  }

}
