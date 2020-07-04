import { Component, OnInit } from '@angular/core';
import { PagoService } from './../../services/pago.service';
import { Pago } from './../../models/pago';


@Component({
  selector: 'app-pago',
  templateUrl: './pago.component.html',
  styleUrls: ['./pago.component.css']
})
export class PagoComponent implements OnInit {

  listaPagos: Array<Pago>;

  constructor(private pagoService:PagoService) { 
    this.cargarListaPagos();
  }

  ngOnInit(): void {
  }

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
}
