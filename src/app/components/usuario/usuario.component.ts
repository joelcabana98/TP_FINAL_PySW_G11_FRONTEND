import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuario';
import { UsuarioService } from 'src/app/services/usuario.service';
import { AfiliadoService } from 'src/app/services/afiliado.service';
import { LoginService } from 'src/app/services/login.service';
import { ToastrService } from 'ngx-toastr';
import { Afiliado } from 'src/app/models/afiliado';

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

  constructor(private usuarioService:UsuarioService,private afiliadoService: AfiliadoService,public loginService: LoginService,private _toastr : ToastrService) {
    this.listaUsuarios = new Array<Usuario>();
    this.usuario = new Usuario();
     this.usuario.activo = false;
    this.msj = "";

    this.obtenerUsuarios();
   }

   agregarUsuario(){
     console.log("PERFIL DEL USUARIO ES :"+this.usuario.perfil);
    // console.log("EXISTE? :" + this.existeAfiliadobyEmail());
    if(this.usuario.perfil == "socio"){
           if(this.existeAfiliadobyEmail() == true){
              console.log("USUARIO PRONTO A AGREGARSE");
              this.agregar();
              console.log("existe afiliado != false");
           }else {
           this.msj = "El correo electronico no pertence a un afiliado";
           this._toastr.error("El correo electronico no pertence a un afiliado","Error");
           }
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


  existeAfiliadobyEmail(): boolean{
    var existe:boolean = false;
    this.afiliadoService.getAfiliadoByEmail(this.usuario.usuario).subscribe(
      (result)=>{
        console.log(result);
        if(result["status"] ==1){
          console.log("si existe el afiliado con email :"+ this.usuario.usuario);
          existe = true;
        }else{
          existe = false;
          console.log("El afiliado con ese email no existe");
         }
      },
      (error)=> {
              console.log("error:"+ error)
      }
    )
    console.log("VALOR DE VARIABLE EXISTE ES : "+ existe);
    return existe;
  }

 existeAfiliado(){
   console.log("Esiste afiliado");
   this.afiliadoService.getAfiliadoByEmail(this.usuario.usuario).subscribe(
     (result)=>{
            console.log(result);
     },
     (error)=> {
             console.log("error:"+ error)
     }
   )
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
    if(this.existeAfiliadobyEmail() != false){
           this.actualizar();
           console.log("existe afiliado != false");
    }else {
      this.msj = "El correo electronico no pertence a un afiliado";
      this._toastr.error("El correo electronico no pertence a un afiliado","Error");
    }
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
