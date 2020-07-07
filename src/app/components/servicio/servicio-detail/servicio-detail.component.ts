import { Component, OnInit } from '@angular/core';
import { Servicio } from 'src/app/models/servicio';
import { ServicioService } from 'src/app/services/servicio.service';
import { Router, ActivatedRoute } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import { ToastrService } from 'ngx-toastr';
import { Afiliado } from 'src/app/models/afiliado';

@Component({
  selector: 'app-servicio-detail',
  templateUrl: './servicio-detail.component.html',
  styleUrls: ['./servicio-detail.component.css']
})
export class ServicioDetailComponent implements OnInit {

  servicio: Servicio;
  afiliado: Afiliado;
  indexAfi: number;

  constructor(private servicioService: ServicioService,
              private router: Router,
              public loginService: LoginService,
              private _toastr: ToastrService,
              private activatedRoute: ActivatedRoute) {
    // Controlo que ingrese al componente un Usuario tipo Administrador o Administrativo.
    // En caso contrario redirecciona a la pagina Home
    if (!this.loginService.userLoggedIn && (!this.loginService.userIsAdministrador || !this.loginService.userIsAdministrativo)) {
      this.router.navigateByUrl('/home');
    }
    this.servicio = new Servicio();
  }

  ngOnInit(): void {
    // Obtengo la ID de la url.
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    // Obtengo el Servicio a mostrar.
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
   * Selecciono el Afiliado que deseo Eliminar y su indice.
   * @param afiliado Afiliado a eliminar del servicio.
   * @param index Indice del afiliado a eliminar.
   */
  public selectAfiliado(afiliado: Afiliado, index: number) {
    this.afiliado = new Afiliado();
    this.afiliado = afiliado;
    this.indexAfi = index;
  }

  /**
   * Elimino el Afiliado seleccionado y guardo la modificación
   * al Servicio.
   */
  public eliminarAfiliado() {
    this.servicio.afiliadosInsc.splice(this.indexAfi, 1);
    this.servicioService.updateServicio(this.servicio).subscribe(
      (result) => {
        this._toastr.success('Afiliado eliminado del Servicio.', 'Exito!!')
      },
      (error) => {
        this._toastr.error('Error en eliminar el Afiliado.', 'Error!!');
        console.log('Error de petición: ' + error);
      }
    );
    $('#modalDeleteAfi').modal('hide');
  }

}
