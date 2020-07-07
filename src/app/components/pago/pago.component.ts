import { Component, OnInit } from '@angular/core';
import { PagoService } from './../../services/pago.service';
import { Pago } from './../../models/pago';
import { AfiliadoService } from './../../services/afiliado.service';
import { Afiliado } from './../../models/afiliado';
import { MesPipe } from './../../pipes/mes.pipe';

import jsPDF from 'jspdf';
import * as $ from 'jquery';
import 'jspdf-autotable';
import { templateJitUrl } from '@angular/compiler';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-pago',
  templateUrl: './pago.component.html',
  styleUrls: ['./pago.component.css']
})
export class PagoComponent implements OnInit {

  listaPagos: Array<Pago>;

  //Variables para el formulario
  pago: Pago;
  dniAfiliado: number;

  //Filtro de la tabla
  fechaInicio:Date;
  fechaFin:Date;

  constructor(private pagoService:PagoService,private _toastr : ToastrService, private afiliadoService:AfiliadoService,private router: Router,public loginService: LoginService) { 
    this.pago = new Pago();
    this.cargarListaPagos();

    //contro del ruta por url
    if (!this.loginService.userLoggedIn && (!this.loginService.userIsAdministrador || !this.loginService.userIsAdministrativo)){
      this.router.navigateByUrl('/home');
    }
  }

  ngOnInit(): void {
  }

  //Carga la lista de pagos disponibles en la base de datos
  cargarListaPagos(){
    this.pagoService.getPagos().subscribe(
      (result) => {
        this.listaPagos = new Array<Pago>();
        let pagoAux;
        result.forEach(p => {
          pagoAux = new Pago();
          Object.assign(pagoAux,p);
          this.listaPagos.push(pagoAux);
        })
      },
      (error) => { console.log("error");}
    );
  }

  comprobarAfiliado(){
    this.afiliadoService.getAfiliadoByDni(this.dniAfiliado).subscribe(
      (result) => {
        if(result.status == 1){
          //Afiliado existe
          console.log("Afiliado existe");
          var afiliado = new Afiliado();
          Object.assign(afiliado, result["result"]);
          this.pago.afiliado = afiliado;
        }
        else{
          //No existe afiliado
          this.pago.afiliado = null;
          console.log("Afiliado no existe");
        }
      }
    );
  }

  // Agrega un nuevo pago a la base de datos y actuliza la lista de pagos
  agregarPago(){
    if(this.pago.afiliado != null){
      this.pago.fecha = new Date(); //Carga la fecha de hoy
      this.pagoService.addPago(this.pago).subscribe(
        (result) => {
          this.cargarListaPagos();
          this.limpiarPago();
          this._toastr.success("El Pago se ha registrado","Exito");
        },
        (error) => { console.log("Error al agregar pago");}
      );
    }
    else{
      //No se puede agregar el pago
    }
    
  }

  limpiarPago(){
    this.pago = new Pago();
    this.dniAfiliado = null;
  }

  //filtra la tabla para mostrar los pagos por rango de fecha
  filtrarPorFechaFront(){
    if(this.fechaInicio < this.fechaFin){
      let listaAux = new Array<Pago>();
      this.listaPagos.forEach(p => {
        if(p.fecha >= this.fechaInicio && p.fecha <= this.fechaFin){
          listaAux.push(p);
        }
      });
      this.listaPagos = new Array<Pago>();
      this.listaPagos = listaAux;
      this.limpiarFechas();
    }
    else{
      this._toastr.error("La fecha de inicio debe ser anterior a la de fin.","Error!");
    }
  }

  limpiarFechas(){
    this.fechaInicio = new Date();
    this.fechaFin = new Date();
  }

  eliminarPago(){

  }
  
  generarPDF(){
    var fecha = new Date();
    var fechaString = fecha.getDate()+"/" + (fecha.getMonth()+1) +"/"+fecha.getFullYear();

    var datos=[];
    var i = 0;
    this.listaPagos.forEach(e =>{
      i++;
      var temp = [];
      temp.push(i);
      temp.push(e.fecha);
      temp.push(e.monto);
      temp.push(e.anio);
      temp.push(e.mes);
      temp.push(e.afiliado.dni);
      datos.push(temp);
    });
    
    var doc = new jsPDF();
    doc.text("Reporte de PAGOS",10,10);
    doc.setTextColor(100);
    
    doc.autoTable({
      head: [['#','Fecha', 'Monto', 'Año', 'Mes', 'Afiliado']],
      body: datos
    });
    doc.save("Reporte_de_pagos-"+fechaString);
  }
}
