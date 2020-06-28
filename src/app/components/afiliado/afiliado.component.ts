import { Component, OnInit } from '@angular/core';
import { Afiliado } from '../../models/afiliado';
import { AfiliadoService } from '../../services/afiliado.service';

import { DomSanitizer } from '@angular/platform-browser';

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
              private _sanititizer: DomSanitizer) { 
    
    this.afiliado = new Afiliado();
    this.cargarListaAfiliados();
  }

  ngOnInit(): void {
  }

  onFileChanges(files){
    console.log("File has changed: ",files);
    this.stringimage = files[0].base64;
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
    this.afiliado.imagen = this.stringimage;
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
