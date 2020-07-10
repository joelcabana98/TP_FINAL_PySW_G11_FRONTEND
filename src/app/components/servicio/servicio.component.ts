import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { ServicioService } from 'src/app/services/servicio.service';
import { Servicio } from 'src/app/models/servicio';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { AfiliadoService } from 'src/app/services/afiliado.service';
import * as jsPDF from 'jspdf';
import 'jspdf-autotable';
import { FacebookService, InitParams, LoginResponse } from 'ngx-fb';
import { ApiMethod } from 'ngx-fb/dist/esm/providers/facebook';

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
              private _toastr: ToastrService,
              private router: Router,
              private afiliadoService: AfiliadoService,
              private fb: FacebookService) {
    this.iniciarFb();
    this.servicio = new Servicio();
    this.obtenerServicios();
  }

  ngOnInit(): void {
  }


  /**
   * Selecciono un objeto de tipo Servicio.
   * @param servicio objeto seleccionado de la Lista de Servicios.
   */
  public seleccionarServicio(servicio: Servicio) {
    this.servicio = servicio;
  }


  /**
   * Reinicio el objeto Servicio.
   */
  public limpiarServicio() {
    this.servicio = new Servicio();
  }


  /**
   * Realizar la inscripción de un usuario de tipo Socio
   * a un Servicio.
   */
  public inscribirAServicio() {
    let encontrado = false;
    if (this.loginService.userLogged.perfil == 'socio') {
      this.afiliadoService.getAfiliadoByEmail(this.loginService.userLogged.usuario).subscribe(
        (result) => {
          let user: any = result;
          if (user.status == 1) {
            // Averiguo si el usuario ya esta inscripto en el servicio.
            this.servicio.afiliadosInsc.forEach(element => {
              if (element._id == user.id) {
                encontrado = true;
              };
            });
            // Si no esta inscripto se realiza la inscripción.
            // Caso contrario se avisa que ya se encuentra inscripto.
            if (!encontrado) {
              this.servicio.afiliadosInsc.push(user.id);
              this.guardarInscripcion();
            } else {
              this._toastr.warning('Usted ya se encuentra inscripto a esté servicio.', 'Información!!');
            }
          } else {
            console.log('Error en obtener el afiliadp.');
          }
        },
        (error) => {
          this._toastr.error('Error en la Inscripción.', 'Error!!');
          console.log('Error de petición: ' + error);
        }
      );
    } else {
      this._toastr.error('NO se puede inscribir, no es un usuario de tipo Socio.', 'Error!!');
      console.log('NO se puede inscribir, no es un usuario de tipo Socio.');
    }
    $('#modalInsc').modal('hide');
  }


  /**
   * Guardar la inscripción del usuario al Servicio.
   */
  public guardarInscripcion() {
    this.servicioService.updateServicio(this.servicio).subscribe(
      (result) => {
        this._toastr.success('Inscripción realizada.', 'Exito!!');
      },
      (error) => {
        this._toastr.error('Error en modificar el Servicio.', 'Error!!');
        console.log('Error de petición: ' + error);
      }
    );
    this.limpiarServicio();
    this.obtenerServicios();
  }


  /**
   * Listar todos los Servicios sin aplicar ningún
   * filtro.
   */
  public obtenerServicios() {
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
    if (this.servicio.afiliadosInsc.length == 0) {
      this.servicioService.deleteServicio(this.servicio).subscribe(
        (result) => {
          this._toastr.success('Servicio eliminado exitosamente.', 'Eliminado!!');
          this.obtenerServicios();
        },
        (error) => {
          this._toastr.error('Error en eliminar el Servicio.', 'Error!!');
          console.log('Error de petición: ' + error);
        }
      );
      this.limpiarServicio();
    } else {
      this._toastr.error('NO se puede eliminar el Servicio, hay afiliados Inscriptos.', 'Error!!');
    };
    $('#modalDelete').modal('hide');
  }


  /**
   * Modificar un Servicio, mando por url el _id del
   * Servicio a modficar.
   * @param servicio Servicio que deseo modificar.
   */
  public updateServicio(servicio: Servicio) {
    this.router.navigateByUrl('servicioUp/' + servicio._id);
  }


  /**
   * Mostrar detalle del Servicio, inclusive los afiliados inscriptos.
   * @param servicio Servicio que deseo ver detalles.
   */
  public detailServicio(servicio: Servicio) {
    this.router.navigateByUrl('servicioDetail/' + servicio._id);
  }


  /**
   * Generar un Reporte de todos los Servicios mostrados.
   * Descarga un PDF con los Servicios.
   */
  public generarPDF() {

    var doc = new jsPDF('p', 'mm', 'a4');

    // Agrego un titulo al Reporte
    doc.setFontType('bold');
    doc.setTextColor(100);
    doc.text("Reporte de SERVICIOS", 15, 20);

    // Genero la tabla de Servicios para el Reporte.
    doc.autoTable({
      html: '#tableServicios',
      styles: {
        halign: 'center'
      },
      bodyStyles: {
        minCellHeight: 25,
      },
      columnStyles: {
        1: { halign: 'left' },
        3: { halign: 'left' },
      },
      margin: { top: 25 },
      columns: [
        { header: '#' },
        { header: 'Nombre', dataKey: 'nombre' },
        { header: 'Imagen' },
        { header: 'Descripción', dataKey: 'descripcion' },
        { header: 'Activo', dataKey: 'activo' }
      ],

      // Genera las imagenes de los Servicios.
      didDrawCell: function (data) {
        if (data.column.index === 2 && data.cell.section === 'body') {
          var td = data.cell.raw;
          var img = td.getElementsByTagName('img')[0];
          var dim = data.cell.height - data.cell.padding('vertical');
          doc.addImage(img.src, data.cell.x + 2, data.cell.y + 2, dim, dim);
        }
      }
    });

    // Agrego un pie de página al Reporte.
    doc.setFontSize(14);
    doc.setTextColor(0);
    doc.setFontType('normal');
    doc.text("Programación y Servicios Web 2020", 65, 280);

    doc.setFontSize(11);
    doc.text("Desarrollado por Grupo 11", 82, 287);
    
    doc.save("reporte_servicios");
  }


  /**
   * Métodos para poner un anuncio en la página de Facebook.
   */
  public postFb(){
    var apiMethod: ApiMethod = "post";
    this.fb.api('/103929938064533/feed', apiMethod, {
      "message": this.servicio.nombre + "\n\n" + this.servicio.descripcion,
      "access_token":"EAAD8tWYpkcgBAIrLUs5JWyPycZARnd5v4VyoehiH8WvrIwOAwJIBKUSBvwxKu4sbxZBW6u9euHV8dTC9j5m0TxjUrQvGQKT9dEpTGxZBCKKxga0OfftZBrl18CkdNRhjVMErESNBsi8VmpV9mL8lhvzQsFaQ5iwHNK9vD4J37fTN4wGRAhFOqEpo3qsMEQtbV9ZBjS3sLRQZDZD"
    });
    $('#modalFacebook').modal('hide');
    this._toastr.success('Servicio publicado en Facebook.', 'Exito!!');
    this.limpiarServicio();
  }
  
  public iniciarFb(){ 
    let initParams: InitParams = { 
      appId: '277856033280456',
      autoLogAppEvents : true,
      xfbml : true,
      version : 'v7.0' 
    };
    this.fb.init(initParams);
  }
}
