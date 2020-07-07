import { Component, OnInit } from '@angular/core';
import { Afiliado } from '../../models/afiliado';
import { AfiliadoService } from '../../services/afiliado.service';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';

import jsPDF from 'jspdf';
import * as $ from 'jquery';
import 'jspdf-autotable';
import { templateJitUrl } from '@angular/compiler';
import { ToastrService } from 'ngx-toastr';

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
              private router: Router,
              private _toastr : ToastrService) { 
    //contro del ruta por url
    if (!this.loginService.userLoggedIn && (!this.loginService.userIsAdministrador || !this.loginService.userIsAdministrativo)){
      this.router.navigateByUrl('/home');
    }
    this.afiliado = new Afiliado();
    this.cargarListaAfiliados();
  }

  ngOnInit(): void {
  }

  //Convierte la imagen en string
  onFileChanges(files){
    //console.log("File has changed: ",files);
    this.afiliado.imagen = files[0].base64;
  }

  //Carga la lista de los afiliados
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

  //Agrega un nuevo afiliado
  public agregarAfiliado(){
    this.afiliadoService.addAfiliado(this.afiliado).subscribe(
      (result) => {
        this._toastr.success("El Socio se ha sido agregado","Exito");
        this.cargarListaAfiliados();
      },
      (error) => { this._toastr.error("Hubo un error en la solicitud, Intentelo nuevamente.","Error");}
    );
    this.afiliado = new Afiliado();
  }

  //Elimina un afiliado
  public eliminarAfiliado(afiliado:Afiliado){
    this.afiliadoService.deleteAfiliado(afiliado).subscribe(
      (result) => {
        this._toastr.success("El Socio se ha eliminado","Exito");
        this.cargarListaAfiliados();
      },
      (error) => { this._toastr.error("Hubo un error en la solicitud, Intentelo nuevamente.","Error"); }
    );
  }

  //Se actualiza un afiliado
  public actualizarAfiliado(){
    this.afiliadoService.updateAfiliado(this.afiliado).subscribe(
      (result) => {
        this._toastr.success("El Socio ha sido actualizado","Exito");
        this.cargarListaAfiliados();
      },
      (error) => { this._toastr.error("Hubo un error en la solicitud, Intentelo nuevamente.","Error");}
    );
  }

  //Carga en el modal los datos del afiliado
  public mostrarAfiliado(item:Afiliado){
    let auxAfiliado = new Afiliado();
    Object.assign(auxAfiliado, item);
    this.afiliado = auxAfiliado;
  }

  //Limpia el modal
  public limpiarAfiliado(){
    this.afiliado = new Afiliado();
  }

  //Limpia el input de busqueda y recarga la tabla con los afiliados
  public limpiarBusqueda(){
    this.dni = null;
    this.cargarListaAfiliados();
  }

  //Busca un afiliado por su dni y se carga en la tabla
  public buscarPorDni(){
    this.afiliadoService.getAfiliadoByDni(this.dni).subscribe(
      (result) => {
        this.listaAfiliado = new Array<Afiliado>();
        if(result.status == 1){
          let aux = new Afiliado;
          Object.assign(aux, result.result);
          this.listaAfiliado.push(aux);
          
        }
        else if(result.status == 0){
          this._toastr.warning("No se ha encontrado resultados","Ups");
        }
      },
      error => { this._toastr.error("Se produjo un error en la busqueda","Error");}
    );
  }

  generarPDF(){
    var fecha = new Date();
    var fechaString = fecha.getDate()+"/" + (fecha.getMonth()+1) +"/"+fecha.getFullYear();
    var datos=[];
    var i = 0;
    this.listaAfiliado.forEach(e =>{
      i++;
      var temp = [];
      temp.push(i);
      temp.push(e.apellido);
      temp.push(e.nombres);
      temp.push(e.dni);
      temp.push(e.email);
      temp.push(e.telefono);
      datos.push(temp);
    });
    
    var doc = new jsPDF();
    doc.text("Reporte de AFILIADOS - Fecha: "+fechaString,10,10);
    doc.setTextColor(100);
    
    doc.autoTable({
      head: [['#','Apellido', 'Nombres', 'DNI', 'Email', 'Telefono']],
      body: datos
    });
    
    doc.save("Tabla_De_Afiliados-"+fechaString);
  }

}
