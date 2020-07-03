import { Component, OnInit } from '@angular/core';
import { Servicio } from 'src/app/models/servicio';
import { ServicioService } from 'src/app/services/servicio.service';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-servicio-new',
  templateUrl: './servicio-new.component.html',
  styleUrls: ['./servicio-new.component.css']
})
export class ServicioNewComponent implements OnInit {

  servicio: Servicio;

  constructor(private servicioService: ServicioService,
              private router: Router,
              public loginService: LoginService){
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
        this.router.navigateByUrl('/servicio');
      },
      (error) => {
        console.log('Error de petición.');
      }
    );
    $('#modalNew').modal('hide');
  }

}
