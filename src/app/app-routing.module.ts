import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ServicioComponent } from './components/servicio/servicio.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { UsuarioComponent } from './components/usuario/usuario.component';
import { AfiliadoComponent } from './components/afiliado/afiliado.component';
import { NoticiaComponent } from './components/noticia/noticia.component';
import { ContactoComponent } from './components/contacto/contacto.component';

const routes: Routes = [
  {path: 'servicio',component: ServicioComponent},
  {path: 'login',component: LoginComponent},
  {path: 'home',component: HomeComponent},
  {path: 'usuario',component: UsuarioComponent},
  {path: 'afiliado',component: AfiliadoComponent},
  {path: 'noticia/:id',component: NoticiaComponent},
  {path: 'contacto',component: ContactoComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
