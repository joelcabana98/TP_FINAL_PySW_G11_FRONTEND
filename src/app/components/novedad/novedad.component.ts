import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { Novedad } from 'src/app/models/novedad';
import { NovedadService } from 'src/app/services/novedad.service';
import { ToastrService } from 'ngx-toastr';
import { element } from 'protractor';
import { Router } from '@angular/router';

@Component({
  selector: 'app-novedad',
  templateUrl: './novedad.component.html',
  styleUrls: ['./novedad.component.css']
})
export class NovedadComponent implements OnInit {

  novedad: Novedad;
  listaNovedades: Array<Novedad>;
  listaFiltro: Array<Novedad>;

  fechaDesde: Date;
  fechaHasta: Date;

  constructor(public loginService: LoginService,
              private novedadService: NovedadService,
              private _toastr: ToastrService,
              private router: Router) {
    // Controlo que ingrese al componente un Usuario logueado.
    // En caso contrario redirecciona a la pagina Home
    if (!this.loginService.userLoggedIn) {
      this.router.navigateByUrl('/home');
    }
    this.novedad = new Novedad();
    if (this.loginService.userIsAdministrativo || this.loginService.userIsAdministrador) {
      this.obtenerNovedades();
    }
  }

  ngOnInit(): void {
  }

  /**
   * Seleccionar una Novedad
   * @param novedad Novedad a seleccionar
   */
  public selectNovedad(novedad: Novedad) {
    this.novedad = novedad;
  }

  /**
   * Reinicio el objeto Novedad.
   */
  public limpiarNovedad() {
    this.novedad = new Novedad();
  }

  /**
   * enviarNovedad
   * Guarda la novedad para que un administrativo la vea.
   */
  public enviarNovedad() {
    this.novedad.usuario = this.loginService.userLogged;
    this.novedad.estado = 'pendiente';
    this.novedad.fecha = new Date();
    this.novedadService.addNovedad(this.novedad).subscribe(
      (result) => {
        this._toastr.success('Novedad enviada correctamente.', 'Exito!!');
      },
      (error) => {
        this._toastr.error('Error en enviar la Novedad.', 'Error!!');
        console.log('Error de petición: ' + error);
      }
    );
    this.limpiarNovedad();
    $("#modalNew").modal('hide');
  }

  /**
   * Obtener una lista de todas las novedades.
   */
  public obtenerNovedades() {
    this.listaNovedades = new Array<Novedad>();
    this.novedadService.getNovedades().subscribe(
      (result) => {
        result.forEach(element => {
          let vNovedad: Novedad = new Novedad();
          Object.assign(vNovedad, element);
          this.listaNovedades.push(vNovedad);
        });
        this.listaFiltro = new Array<Novedad>();
        this.listaFiltro = this.listaNovedades;
      },
      (error) => {
        this._toastr.error('Error en obtener las Novedades.', 'Error!!');
        console.log('Error de petición: ' + error);
      }
    );
  }

  /**
   * Obtengo las novedad por Fecha
   */
  public filtrarPorFecha() {
    if (this.fechaDesde <= this.fechaHasta) {
      this.listaFiltro = new Array<Novedad>();
      this.listaFiltro = this.listaNovedades;
      this.listaFiltro = this.listaFiltro.filter(
        novedad => (((novedad.fecha < this.fechaHasta) && (novedad.fecha > this.fechaDesde)) ||
          (novedad.fecha == this.fechaDesde) || (novedad.fecha == this.fechaHasta))
      );
    } else {
      this._toastr.error("La fecha de inicio debe ser anterior a la de fin.", "Error!!");
    }
  }

  /**
   * Eliminar una Novedad seleccionada de la Lista
   * de Novedades.
   */
  public eliminarNovedad() {
    this.novedadService.deleteNovedad(this.novedad).subscribe(
      (result) => {
        this._toastr.success('Novedad eliminada exitosamente.', 'Eliminado!!');
        this.obtenerNovedades();
      },
      (error) => {
        this._toastr.error('Error en eliminar la Novedad.', 'Error!!');
        console.log('Error de petición: ' + error);
      }
    );
    this.limpiarNovedad();
    $('#modalDelete').modal('hide');
  }

  /**
   * Mostrar para procesar una Novedad.
   * @param servicio Servicio que deseo ver detalles.
   */
  public procesarNovedad(novedad: Novedad) {
    this.router.navigateByUrl('novedadDetail/' + novedad._id);
  }

}
