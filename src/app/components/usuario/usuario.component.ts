import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuario';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent implements OnInit {


  listaUsuarios:Array<Usuario>;
  usuario : Usuario;

  constructor(private usuarioService:UsuarioService) {
    this.listaUsuarios = new Array<Usuario>();
    this.usuario = new Usuario();
     this.usuario.activo = false;
     
    this.obtenerUsuarios();
   }


   agregarUsuario(){
    this.usuarioService.addUsuario(this.usuario).subscribe(
     (result)=>{
        alert("Usuario Guardado");
        this.obtenerUsuarios();
     }, 
   (error)=>{
        console.log("error"+ error);
   })
   this.usuario = new Usuario();
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
       alert("usuario Eliminada");
       this.obtenerUsuarios();
     },
     (error)=>{
       console.log(error);
     }
   );
 }


 actualizarUsuario(){
   this.usuarioService.updateUsuario(this.usuario).subscribe(
     (result)=>{
         alert("Usuario Modificada");
         this.obtenerUsuarios();
     },
     (error)=>{
       console.log(error);
     }
   );
   this.usuario = new Usuario();
 }


  ngOnInit(): void {
  }

}
