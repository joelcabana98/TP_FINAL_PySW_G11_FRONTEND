import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuario';
import { UsuarioService } from 'src/app/services/usuario.service';
import { AfiliadoService } from 'src/app/services/afiliado.service';
import { LoginService } from 'src/app/services/login.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import jsPDF from 'jspdf';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent implements OnInit {


  listaUsuarios:Array<Usuario>;
  usuario : Usuario;
  validacion: boolean;

  msj:string;
  listaFiltrada:Array<Usuario>;
  emailbuscar:string;
  perfil : string;
  constructor(private usuarioService:UsuarioService,private afiliadoService: AfiliadoService,public loginService: LoginService,private _toastr : ToastrService,private router: Router) {
    this.listaUsuarios = new Array<Usuario>();
    this.usuario = new Usuario();
    this.usuario.activo = false;
    this.msj = "";
    this.listaFiltrada = new Array<Usuario>();
    this.obtenerUsuarios();

     this.verTodos();

    //contro del ruta por url
    if (!this.loginService.userLoggedIn && (!this.loginService.userIsAdministrador || !this.loginService.userIsAdministrativo)){
      this.router.navigateByUrl('/home');
    }

   }

   verTodos(){
     this.listaFiltrada = new Array<Usuario>();
    this.listaFiltrada = this.listaUsuarios;
    this.emailbuscar = '';
    this.perfil = '';
   }

   filtro(){
     this.listaFiltrada = new Array<Usuario>();
     this.listaFiltrada = this.listaUsuarios;
     this.listaFiltrada = this.listaFiltrada.filter(usuario => usuario.usuario === this.emailbuscar || usuario.perfil === this.perfil);
   }

   agregarUsuario(){
     console.log("PERFIL DEL USUARIO ES :"+this.usuario.perfil);
    // console.log("EXISTE? :" + this.existeAfiliadobyEmail());
    if(this.usuario.perfil == "socio"){
            this.afiliadoService.getAfiliadoByEmail(this.usuario.usuario).subscribe(
              (result)=>{
                console.log(result);
                if(result["status"] == 1){
                  this.agregar();
                }else{
                  this.msj = "El correo electronico no pertence a un afiliado";
                  this._toastr.error("El correo electronico no pertence a un afiliado","Error");
                }
              },
              (error)=> {
                      console.log("error:"+ error)
              }
            );
    }else {
      this.agregar();
      this.usuario = new Usuario();
      this.usuario.activo = false;
      this.msj ="";
    }
  
 }


 existeEmail(email):boolean{
   var user : Usuario = new Usuario();
   user = this.listaFiltrada.find(usuario=> usuario.usuario === email);

   if(user.usuario != '' || user.usuario != null ){
     return true;
   }else{
     return false;
   }
 }


 agregar(){
  this.usuarioService.addUsuario(this.usuario).subscribe(
    (result)=>{
       this._toastr.success("El usuario ha sido agregado","Exito");
       this.obtenerUsuarios();
       this.validacion = false;
       this.usuario.activo = false;
       this.verTodos();
    }, 
  (error)=>{
       console.log("error"+ error);
       this._toastr.error("Ha ocurrido un error","Error");
  })
 }


 obtenerUsuarios(){
   this.listaUsuarios = new Array<Usuario>();
   this.usuarioService.getUsuarios().subscribe(
     (result)=>{
       var usu: Usuario = new Usuario();
       result.forEach(element => {
         Object.assign(usu,element);
         this.listaUsuarios.push(usu);
         usu = new Usuario();
         });
     },
     (error)=>{
       console.log(error);
     }
   )
 }

 eliminarUsuario(usuario:Usuario){  
   this.usuarioService.deleteUsuario(usuario).subscribe(
     (result)=>{
      this._toastr.success("El usuario ha sido eliminado","Exito");
       this.obtenerUsuarios();
       this.verTodos();
      this.usuario.activo = false;
     },
     (error)=>{
       console.log(error);
       this._toastr.error("Ha ocurrido un error","Error");
     }
   );
 }


 actualizarUsuario(){
  if(this.usuario.perfil == "socio"){

    this.afiliadoService.getAfiliadoByEmail(this.usuario.usuario).subscribe(
      (result)=>{
        console.log(result);
        if(result["status"] ==1){
          this.actualizar();   
        }else{
          this.msj = "El correo electronico no pertence a un afiliado";
          this._toastr.error("El correo electronico no pertence a un afiliado","Error");
        }
      },
      (error)=> {
              console.log("error:"+ error)
        }
    );
  }else {
    this.actualizar();
    this.usuario = new Usuario();
    this.usuario.activo = false;
    this.msj ="";    
    }
 }

 actualizar(){
  this.usuarioService.updateUsuario(this.usuario).subscribe(
    (result)=>{
      this._toastr.success("El usuario ha sido modificado","Exito");
        this.obtenerUsuarios();
        this.verTodos();
    },
    (error)=>{
      console.log(error);
      this._toastr.error("Ha ocurrido un error","Error");
    }
  );
 }

 seleccionarUsuario(usu:Usuario){
   var tusu = new Usuario();
   Object.assign(tusu,usu);
   this.usuario = tusu;
 }

 limpiarCampos(){
   this.validacion = false;
   this.usuario = new Usuario();
   this.usuario.activo = false;
   this.msj = "";
 }

 generarPDF(){
  var fecha = new Date();
  var fechaString = fecha.getDate()+"/" + (fecha.getMonth()+1) +"/"+fecha.getFullYear() +"   "+fecha.getHours()+"-"+fecha.getMinutes()+"-"+fecha.getSeconds();

  var datos=[];
  var i = 0;
  this.listaFiltrada.forEach(e =>{
    i++;
    var temp = [];
    temp.push(i);
    temp.push(e.usuario);
    temp.push(e.activo);
    temp.push(e.perfil);
    datos.push(temp);
  });
  
  var doc = new jsPDF();
  doc.text("Lista de Usuarios",10,10);
  doc.setTextColor(100);
  
  doc.autoTable({
    head: [['#','Usuario', 'Activo', 'Perfil']],
    body: datos
  });
  doc.save("Reporte_de_Usuarios"+fechaString);
}

  ngOnInit(): void {
  }

}
