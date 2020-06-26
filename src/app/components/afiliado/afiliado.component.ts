import { Component, OnInit } from '@angular/core';
import { Afiliado } from '../../models/afiliado';
import { AfiliadoService } from '../../services/afiliado.service';

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

  constructor(private afiliadoService: AfiliadoService) { 
    this.listaAfiliado = new Array<Afiliado>();
    this.afiliado = new Afiliado();
    this.cargarListaAfiliados();
  }

  ngOnInit(): void {
  }

  public cargarListaAfiliados(){
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

  public actualizarAfiliado(afiliado:Afiliado){
    this.afiliadoService.updateAfiliado(afiliado).subscribe(
      (result) => {
        alert("Afiliado Actualizado");
        this.cargarListaAfiliados();
      },
      (error) => { console.log("Error " + error)}
    );
  }

}
