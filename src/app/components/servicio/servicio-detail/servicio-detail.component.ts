import { Component, OnInit } from '@angular/core';
import { Servicio } from 'src/app/models/servicio';
import { ServicioService } from 'src/app/services/servicio.service';
import { Router, ActivatedRoute } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import { ToastrService } from 'ngx-toastr';
import { Afiliado } from 'src/app/models/afiliado';
import * as jsPDF from 'jspdf';
import 'jspdf-autotable';

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


  /**
   * Generar un Reporte de todos los Servicios mostrados.
   * Descarga un PDF con los Servicios.
   */
  public generarPDF() {

    let sizeEtiqueta = 11;

    var doc = new jsPDF('p', 'mm', 'a4');

    // Agrego un titulo al Reporte.
    doc.setFontType('bold');
    doc.setTextColor(0);
    doc.text('Detalle del Servicio', 20, 25);
    doc.line(20,26,73,26);

    // Agrego el nombre del Servicio.
    doc.setFontSize(sizeEtiqueta);
    doc.setTextColor(100);
    doc.setFontType('normal');
    doc.text('Nombre:', 20, 45);

    doc.setFontSize(14);
    doc.setTextColor(0);
    doc.setFontType('bold');
    doc.text('"'+ this.servicio.nombre + '"', 46, 45);

    // Agrego la propiedad activo del Servicio.
    doc.setFontSize(sizeEtiqueta);
    doc.setTextColor(100);
    doc.setFontType('normal');
    doc.text('Activo:', 20, 65);

    let activo: string;
    if (this.servicio.activo) {
      activo = 'Si'
    } else {
      activo = 'No'
    }

    doc.setFontSize(12);
    doc.setTextColor(0);
    doc.text(activo, 46, 65);

    // Agrego la descripción de Servicio.
    doc.setFontSize(sizeEtiqueta);
    doc.setTextColor(100);
    doc.text('Descripción:', 20, 85);

    doc.setFontSize(12);
    doc.setTextColor(0);
    doc.text(this.servicio.descripcion, 46, 85);

    // Agrego la imagen del Servicio.
    doc.addImage(this.servicio.imagen, 132, 21, 55, 55);

    // Agrego título para lista de inscriptos.
    doc.setFontSize(sizeEtiqueta);
    doc.text('Inscriptos al Servicio', 20, 100);
    doc.line(20,101,56,101);

    // Genero la tabla de Servicios para el Reporte.
    doc.autoTable({
      margin: { top: 106 },
      styles: {
        halign: 'left'
      },
      headStyles: {
        halign: 'center'
      },
      bodyStyles: {
        minCellHeight: 25,
      },
      columnStyles: {
        4: { halign: 'center' },
        6: { halign: 'center' },
      },
      html: '#tablaInscriptos',
      columns: [
        { header: '#' },
        { header: 'Apellido', dataKey: 'apellido' },
        { header: 'Nombres', dataKey: 'nombres' },
        { header: 'Imagen' },
        { header: 'DNI', dataKey: 'dni' },
        { header: 'Email', dataKey: 'email' },
        { header: 'Teléfono', dataKey: 'telefono' },
      ],

      // Genera las imagenes de los Servicios.
      didDrawCell: function (data) {
        if (data.column.index === 3 && data.cell.section === 'body') {
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

    doc.save("detalle_servicio");
  }

}
