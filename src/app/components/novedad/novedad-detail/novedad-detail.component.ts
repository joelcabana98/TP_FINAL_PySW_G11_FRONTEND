import { Component, OnInit } from '@angular/core';
import { Novedad } from 'src/app/models/novedad';
import { LoginService } from 'src/app/services/login.service';
import { NovedadService } from 'src/app/services/novedad.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-novedad-detail',
  templateUrl: './novedad-detail.component.html',
  styleUrls: ['./novedad-detail.component.css']
})
export class NovedadDetailComponent implements OnInit {

  novedad: Novedad;

  constructor(public loginService: LoginService,
              private novedadService: NovedadService,
              private activatedRoute: ActivatedRoute,
              private router: Router,
              private _toastr: ToastrService) {
    // Controlo que ingrese al componente un Usuario tipo Administrador o Administrativo.
    // En caso contrario redirecciona a la pagina Home
    if (!this.loginService.userLoggedIn && (!this.loginService.userIsAdministrador || !this.loginService.userIsAdministrativo)) {
      this.router.navigateByUrl('/home');
    }
    this.novedad = new Novedad();
  }

  ngOnInit(): void {
    // Obtengo la ID de la url.
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    // Obtengo el Servicio a mostrar.
    this.novedadService.getNovedadbyId(id).subscribe(
      (result) => {
        this.novedad = result;
      },
      (error) => {
        this._toastr.error('Error en obtener la Novedad.', 'Error!!');
        console.log('Error de petición: ' + error);
      }
    );
  }

  public procesarNovedad(){
    this.novedad.estado = 'procesado';
    this.novedadService.updateNovedad(this.novedad).subscribe(
      (result) => {
        this._toastr.info('Novedad procesada.', 'Confirmado!!');
      },
      (error) => {
        this._toastr.error('Error en procesar Novedad.', 'Error!!');
        console.log('Error de petición: ' + error);
      }
    );
    this.router.navigateByUrl('/novedad');
  }

}
