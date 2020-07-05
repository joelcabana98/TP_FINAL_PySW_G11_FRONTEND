import { Component, OnInit } from '@angular/core';
import { Afiliado } from '../../models/afiliado';
import { AfiliadoService } from '../../services/afiliado.service';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-afiliado',
  templateUrl: './afiliado.component.html',
  styleUrls: ['./afiliado.component.css']
})
export class AfiliadoComponent implements OnInit {

  listaAfiliado:Array<Afiliado>;
  afiliado:Afiliado;

  //Variables para el formulario
  apellido:string;
  nombre1:string;
  nombre2: string;
  dni: number;
  email:string;
  telefono:number;
  stringimage:string;

  constructor(private afiliadoService: AfiliadoService,
              public loginService: LoginService,
              private router: Router) { 
    //contro del ruta por url
    if (!this.loginService.userLoggedIn && (!this.loginService.userIsAdministrador || !this.loginService.userIsAdministrativo)){
      this.router.navigateByUrl('/home');
    }
    this.afiliado = new Afiliado();
    this.cargarListaAfiliados();
  }

  ngOnInit(): void {
  }

  onFileChanges(files){
    console.log("File has changed: ",files);
    this.afiliado.imagen = files[0].base64;
  }

  public cargarListaAfiliados(){
    this.listaAfiliado = new Array<Afiliado>();
    this.afiliadoService.getAfiliados().subscribe(
      (result) => {
        var aux: Afiliado = new Afiliado();
        result.forEach(e => {
          Object.assign(aux,e);
          this.listaAfiliado.push(aux);
          aux = new Afiliado();
        });
      },
      (error) => { console.log(error); }
    )
  }

  public agregarAfiliado(){
    this.afiliadoService.addAfiliado(this.afiliado).subscribe(
      (result) => {
        alert("Afiliado Agregado");
        this.cargarListaAfiliados();
      },
      (error) => { console.log("error "+error);}
    );
    this.afiliado = new Afiliado();
  }

  public eliminarAfiliado(afiliado:Afiliado){
    this.afiliadoService.deleteAfiliado(afiliado).subscribe(
      (result) => {
        alert("Afiliado Eliminado");
        this.cargarListaAfiliados();
      },
      (error) => { console.log("error "+ error);}
    );
  }

  public actualizarAfiliado(){
    this.afiliadoService.updateAfiliado(this.afiliado).subscribe(
      (result) => {
        alert("Afiliado Actualizado");
        this.cargarListaAfiliados();
      },
      (error) => { console.log("Error " + error)}
    );
  }

  public mostrarAfiliado(item:Afiliado){
    let auxAfiliado = new Afiliado();
    Object.assign(auxAfiliado, item);
    this.afiliado = auxAfiliado;
  }

  public limpiarAfiliado(){
    this.afiliado = new Afiliado();
  }

  public limpiarBusqueda(){
    this.dni = null;
    this.cargarListaAfiliados();
  }

  public buscarPorDni(){
    this.afiliadoService.getAfiliadoByDni(this.dni).subscribe(
      (result) => {
        this.listaAfiliado = new Array<Afiliado>();
        let aux = new Afiliado;
        Object.assign(aux, result.result);
        this.listaAfiliado.push(aux);
      },
      error => { (alert("error, Afilido no encontrado"+error));}
    );
  }
}
