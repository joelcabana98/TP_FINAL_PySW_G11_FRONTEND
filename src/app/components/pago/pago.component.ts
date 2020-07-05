import { Component, OnInit } from '@angular/core';
import { PagoService } from './../../services/pago.service';
import { Pago } from './../../models/pago';
import { AfiliadoService } from './../../services/afiliado.service';
import { Afiliado } from './../../models/afiliado';


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

  constructor(private pagoService:PagoService, private afiliadoService:AfiliadoService) { 
    this.pago = new Pago();
    this.cargarListaPagos();
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
    console.log("agregando pago1...")
    if(this.pago.afiliado != null){
      console.log("agregando pago2...")
      this.pagoService.addPago(this.pago).subscribe(
        (result) => {
          alert("Pago Cargado");
          this.cargarListaPagos();
          this.limpiarPago();
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
}
