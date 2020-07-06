import { Injectable } from '@angular/core';
import { Usuario } from '../models/usuario';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class LoginService {

  userIsSocio: boolean = false;
  userIsAdministrativo: boolean = false;
  userIsAdministrador: boolean = false;

  userLoggedIn: boolean = false;
  userLogged: Usuario;

  urlBase: string = "http://localhost:3000/api/usuario/";

  constructor(private _http: HttpClient) {
  }

  public login(usuario: string, password: string): Observable<any> {
    const httpOption = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    let body = JSON.stringify({ usuario: usuario, password: password });
    return this._http.post(this.urlBase + 'login', body, httpOption);
  }

  public logout() {
    // reseteo las propiedades del service que indican
    // que un usuario esta logueado y cual es el usuario logueado
    this.userLogged = new Usuario();
    this.userLoggedIn = false;
    this.userIsAdministrador = false;
    this.userIsSocio = false;
    this.userIsAdministrativo = false;

    sessionStorage.removeItem("token");
  }

  getToken():string{
    return sessionStorage.getItem("token");
    }
   
}
