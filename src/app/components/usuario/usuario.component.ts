import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuario';
import { UsuarioService } from 'src/app/services/usuario.service';
import { AfiliadoService } from 'src/app/services/afiliado.service';
import { LoginService } from 'src/app/services/login.service';
import { ToastrService } from 'ngx-toastr';
import { Afiliado } from 'src/app/models/afiliado';
import { Router } from '@angular/router';

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
                if(result["status"] ==1){
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
 agregar(){
  this.usuarioService.addUsuario(this.usuario).subscribe(
    (result)=>{
       this._toastr.success("El usuario ha sido agregado","Exito");
       this.obtenerUsuarios();
       this.validacion = false;
       this.usuario.activo = false;
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


  ngOnInit(): void {
  }

}
