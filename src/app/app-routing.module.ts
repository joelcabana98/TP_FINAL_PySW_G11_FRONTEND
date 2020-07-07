import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ServicioComponent } from './components/servicio/servicio.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { UsuarioComponent } from './components/usuario/usuario.component';
import { AfiliadoComponent } from './components/afiliado/afiliado.component';
import { NoticiaComponent } from './components/noticia/noticia.component';
import { ContactoComponent } from './components/contacto/contacto.component';
import { ServicioNewComponent } from './components/servicio/servicio-new/servicio-new.component';
import { PagoComponent } from './components/pago/pago.component';
import { ServicioUpdateComponent } from './components/servicio/servicio-update/servicio-update.component';
import { ServicioDetailComponent } from './components/servicio/servicio-detail/servicio-detail.component';

const routes: Routes = [
  { path: 'servicio',component: ServicioComponent },
  { path: 'servicioNew', component: ServicioNewComponent }, 
  { path: 'servicioUp/:id', component: ServicioUpdateComponent},
  { path: 'servicioDetail/:id', component: ServicioDetailComponent},
  { path: 'login',component: LoginComponent},
  { path: 'home',component: HomeComponent},
  { path: 'usuario',component: UsuarioComponent},
  { path: 'afiliado',component: AfiliadoComponent},
  { path: 'noticia/:id',component: NoticiaComponent},
  { path: 'contacto',component: ContactoComponent},
  { path: 'pago',component: PagoComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
