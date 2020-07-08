import { Component, OnInit } from '@angular/core';
import { Servicio } from 'src/app/models/servicio';
import { ServicioService } from 'src/app/services/servicio.service';
import { Router, ActivatedRoute } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-servicio-update',
  templateUrl: './servicio-update.component.html',
  styleUrls: ['./servicio-update.component.css']
})
export class ServicioUpdateComponent implements OnInit {

  servicio: Servicio;

  constructor(private servicioService: ServicioService,
              private router: Router,
              public loginService: LoginService,
              private _toastr: ToastrService,
              private activatedRoute: ActivatedRoute) {
    // Controlo que ingrese al componente un Usuario tipo Administrador o Administrativo.
    // En caso contrario redirecciona a la pagina Home
    if (!this.loginService.userLoggedIn && (!this.loginService.userIsAdministrador || !this.loginService.userIsAdministrativo)){
      this.router.navigateByUrl('/home');
    }
    this.servicio = new Servicio();
  }

  ngOnInit(): void {
    // Obtengo la ID de la url
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    // Obtengo el Servicio a modificar
    this.servicioService.getServiciobyId(id).subscribe(
      (result) => {
        this.servicio = result;
      },
      (error) => {
        this._toastr.error('Error en obtener el Servicio.', 'Error!!');
        console.log('Error de petición: ' + error);
      }
    );
  }

  /**
   * Guardo la modificacion del Servicio.
   */
  public modificarServicio(){
    this.servicioService.updateServicio(this.servicio).subscribe(
      (result) => {
        this._toastr.success('Servicio modificado correctamente.', 'Exito!!');
        this.router.navigateByUrl('/servicio');
      },
      (error) => {
        this._toastr.error('Error en modificar el Servicio.', 'Error!!');
        console.log('Error de petición: ' + error);
      }
    );
    $('#modalUp').modal('hide');
  }

  /**
   * Convierto la imagen a guardar en la base de datos a String.
   */
  public convertirImagen(files) {
    this.servicio.imagen = files[0].base64;
  }

}
