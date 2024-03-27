import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HttpClientModule} from '@angular/common/http';


import { AppRoutingModule } from './app-routing.module';
import { PrinterRoutingModule } from './printers/printer-routing.module';

import { PrimengModule } from './primeng/primeng.module';
import { SharedModule } from './shared/shared.module';

import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { NosotrosComponent } from './pages/nosotros/nosotros.component';
import { VentaComponent } from './pages/venta/venta.component';
import { RentaComponent } from './pages/renta/renta.component';
import { PromocionesComponent } from './pages/promociones/promociones.component';
import { ServiciosComponent } from './pages/servicios/servicios.component';
import { AvisoDePrivacidadComponent } from './pages/aviso-de-privacidad/aviso-de-privacidad.component';
import { SuccessComponent } from './pages/success/success.component';
import { SwiperModule } from 'swiper/angular';
import { PrinterModule } from './printers/printers.module';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NosotrosComponent,
    VentaComponent,
    RentaComponent,
    PromocionesComponent,
    ServiciosComponent,
    AvisoDePrivacidadComponent,
    SuccessComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    SharedModule,
    PrimengModule,
    PrinterRoutingModule,
    HttpClientModule,
    SwiperModule,
    PrinterModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
