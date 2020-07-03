import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { ServicioService } from 'src/app/services/servicio.service';
import { Servicio } from 'src/app/models/servicio';

@Component({
  selector: 'app-servicio',
  templateUrl: './servicio.component.html',
  styleUrls: ['./servicio.component.css']
})
export class ServicioComponent implements OnInit {

  servicio: Servicio;
  listaServicios: Array<Servicio>;

  constructor(public loginService: LoginService,
              private servicioService: ServicioService) {
    this.servicio = new Servicio();
    this.listaServicios = new Array<Servicio>();
  }

  ngOnInit(): void {
  }

  limpiarServicio() {
    this.servicio = new Servicio();
  }

  /**
   * Listar todos los Servicios sin aplicar ningún
   * filtro.
   */
  public obtenerServicios(){
    this.listaServicios = new Array<Servicio>();
    this.servicioService.getServicios().subscribe(
      (result) => {
        result.forEach(element => {
          let vServicio = new Servicio();
          Object.assign(vServicio, element);
          this.listaServicios.push(vServicio);
        });
      },
      (error) => {
        console.log('Error de petición.');
      }
    )
  };

  /**
   * Guardar un Nuevo Servicio a la base de datos
   */
  public guardarServicio() {
    let aux = new Servicio();
    Object.assign(aux, this.servicio);
    this.servicioService.addServicio(this.servicio).subscribe(
      (result) => {
        // Swal.fire({
        //   icon: 'success',
        //   title: 'Pasaje Vendido',
        //   html:
        //     'DNI: ' + aux.dniPasajero +
        //     '<br/>Precio: ' + aux.precioPasaje,
        //   showCloseButton: true,
        // });
        this.obtenerServicios();
      },
      (error) => {
        console.log('Error de petición.');
      }
    ),
    this.limpiarServicio();
  }


}
