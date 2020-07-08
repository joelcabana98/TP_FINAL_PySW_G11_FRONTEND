import { Component, OnInit } from '@angular/core';
import { Servicio } from 'src/app/models/servicio';
import { ServicioService } from 'src/app/services/servicio.service';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-servicio-new',
  templateUrl: './servicio-new.component.html',
  styleUrls: ['./servicio-new.component.css']
})
export class ServicioNewComponent implements OnInit {

  servicio: Servicio;

  constructor(private servicioService: ServicioService,
              private router: Router,
              public loginService: LoginService,
              private _toastr: ToastrService){
    
    // Controlo que ingrese al componente un Usuario tipo Administrador o Administrativo.
    // En caso contrario redirecciona a la pagina Home
    if (!this.loginService.userLoggedIn && (!this.loginService.userIsAdministrador || !this.loginService.userIsAdministrativo)){
      this.router.navigateByUrl('/home');
    }
    this.servicio = new Servicio();
  }

  ngOnInit(): void {
  }

  /**
   * Guardar un Nuevo Servicio a la base de datos.
   */
  public guardarServicio() {
    this.servicioService.addServicio(this.servicio).subscribe(
      (result) => {
        this._toastr.success('Servicio guardado exitosamente.', 'Exito!!');
        this.router.navigateByUrl('/servicio');
      },
      (error) => {
        this._toastr.error('Error en guardar Servicio.', 'Error!!');
        console.log('Error de petición: ' + error);
      }
    );
    $('#modalNew').modal('hide');
  }

  /**
   * Convierto la imagen a guardar en la base de datos a String.
   */
  public convertirImagen(files) {
    this.servicio.imagen = files[0].base64;
  }

}
