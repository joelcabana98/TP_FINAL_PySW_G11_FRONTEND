import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule} from '@Angular/forms';
import { AlifeFileToBase64Module } from 'alife-file-to-base64';
import { AppRoutingModule } from './app-routing.module';
import { NgxDataTableModule} from "angular-9-datatable";
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

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
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    AlifeFileToBase64Module,
    NgxDataTableModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      progressBar :true,
      progressAnimation : 'increasing',
      timeOut:2000,
      closeButton:true,
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
