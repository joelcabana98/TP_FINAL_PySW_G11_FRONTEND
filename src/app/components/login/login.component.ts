import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuario';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  userform: Usuario;
  returnUrl: string;
  msglogin: string;

  showPassword = false;
  typePass = 'password';

  constructor(private route: ActivatedRoute, private router: Router,
    private loginService: LoginService) {
    this.userform = new Usuario();

  }

  ngOnInit(): void {
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/home';
  }

  typePassword() {
    this.showPassword = !this.showPassword;
    if (this.showPassword) {
      this.typePass = 'texto';
    } else {
      this.typePass = 'password';
    }
  }

  login() {
    this.loginService.login(this.userform.usuario, this.userform.password).subscribe(
      (result) => {
        var user = result;
        console.log(user);
        if (user.status == 1) {
          //vbles para mostrar-ocultar cosas en el header
          this.loginService.userLoggedIn = true;
          this.loginService.userLogged = user;
          sessionStorage.setItem("token", user.token);
          console.log("Service : " + user.perfil);
          this.tipoUsuario(user.perfil);
          //redirigimos a home o a pagina que llamo
          this.router.navigateByUrl(this.returnUrl);
        } else {
          //usuario no encontrado muestro mensaje en la vista
          this.msglogin = "La direccion de correo electronico o la contraseña que has introducido no son correctas";
        }
      },
      error => {
        console.log("error en conexion");
        console.log(error);
      });
  }


  tipoUsuario(tipoUsuario) {
    if (tipoUsuario == "socio") {
      this.loginService.userIsSocio = true;
    }

    if (tipoUsuario == "administrativo") {
      this.loginService.userIsAdministrativo = true;
    }

    if (tipoUsuario == "administrador") {
      this.loginService.userIsAdministrador = true;
    }


  }

}
