import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule} from '@angular/forms';
import { AlifeFileToBase64Module } from 'alife-file-to-base64';
import { AppRoutingModule } from './app-routing.module';
import { NgxDataTableModule} from "angular-9-datatable";
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { FacebookModule } from 'ngx-fb';
import * as $ from 'jquery';
import * as bootstrap from 'bootstrap';

import {HTTP_INTERCEPTORS} from '@angular/common/http';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { ServicioComponent } from './components/servicio/servicio.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { NovedadComponent } from './components/novedad/novedad.component';
import { PagoComponent } from './components/pago/pago.component';
import { UsuarioComponent } from './components/usuario/usuario.component';
import { AfiliadoComponent } from './components/afiliado/afiliado.component';
import { NoticiaComponent } from './components/noticia/noticia.component';
import { ContactoComponent } from './components/contacto/contacto.component';
import { ServicioNewComponent } from './components/servicio/servicio-new/servicio-new.component';
import { MesPipe } from './pipes/mes.pipe';
import { GoogleMapsModule } from '@angular/google-maps';
import { TokenInterceptorService } from './services/token-interceptor.service';
import { ServicioUpdateComponent } from './components/servicio/servicio-update/servicio-update.component';
import { ServicioDetailComponent } from './components/servicio/servicio-detail/servicio-detail.component';
import { NovedadDetailComponent } from './components/novedad/novedad-detail/novedad-detail.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    ServicioComponent,
    LoginComponent,
    HomeComponent,
    NovedadComponent,
    PagoComponent,
    UsuarioComponent,
    AfiliadoComponent,
    NoticiaComponent,
    ContactoComponent,
    ServicioNewComponent,
    MesPipe,
    ServicioUpdateComponent,
    ServicioDetailComponent,
    NovedadDetailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    FacebookModule.forRoot(),
    AlifeFileToBase64Module,
    NgxDataTableModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      progressBar :true,
      progressAnimation : 'increasing',
      timeOut:2000,
      closeButton:true,
    }),
    GoogleMapsModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true
     }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
