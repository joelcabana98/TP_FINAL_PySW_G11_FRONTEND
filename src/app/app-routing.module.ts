import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ServicioComponent } from './components/servicio/servicio.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { UsuarioComponent } from './components/usuario/usuario.component';
import { AfiliadoComponent } from './components/afiliado/afiliado.component';

const routes: Routes = [
  {path: 'servicio',component: ServicioComponent},
  {path: 'login',component: LoginComponent},
  {path: 'home',component: HomeComponent},
  {path: 'usuario',component: UsuarioComponent},
  {path: 'afiliado',component: AfiliadoComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
