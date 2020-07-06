import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { ServicioService } from 'src/app/services/servicio.service';
import { Servicio } from 'src/app/models/servicio';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-servicio',
  templateUrl: './servicio.component.html',
  styleUrls: ['./servicio.component.css']
})
export class ServicioComponent implements OnInit {

  servicio: Servicio;
  listaServicios: Array<Servicio>;

  constructor(public loginService: LoginService,
              private servicioService: ServicioService,
              private _toastr: ToastrService) {
    this.servicio = new Servicio();
    this.obtenerServicios();
  }

  ngOnInit(): void {
  }

  /**
   * Selecciono un objeto de tipo Servicio.
   * @param servicio objeto seleccionado de la Lista de Servicios.
   */
  public seleccionarServicio(servicio: Servicio){
    this.servicio = servicio;
    console.log(this.servicio);
  }

  public limpiarServicio() {
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
        this._toastr.error('Error en obtener Servicios.', 'Error!!');
        console.log('Error de petición: ' + error);
      }
    )
  }

  /**
   * Eliminar un Servicio seleccionado de la Lista
   * de Servicios.
   */
  public eliminarServicio() {
    console.log("2 - " + this.servicio);
    this.servicioService.deleteServicio(this.servicio).subscribe(
      (result) => {
        this._toastr.success('Servicio eliminado exitosamente.', 'Eliminado!!');
        $('#modalDelete').modal('hide');
        this.obtenerServicios();
      },
      (error) => {
        this._toastr.error('Error en eliminar el Servicio.', 'Error!!');
        console.log('Error de petición: ' + error);
      }
    );
    this.limpiarServicio();
  }

}
