import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HttpClientModule} from '@angular/common/http';


import { AppRoutingModule } from './app-routing.module';
import { ProductosRoutingModule } from './productos/productos-routing.module';

import { PrimengModule } from './primeng/primeng.module';
import { SharedModule } from './shared/shared.module';

import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { NosotrosComponent } from './pages/nosotros/nosotros.component';
import { VentaComponent } from './pages/venta/venta.component';
import { RentaComponent } from './pages/renta/renta.component';
import { ConsumiblesComponent } from './pages/consumibles/consumibles.component';
import { PromocionesComponent } from './pages/promociones/promociones.component';
import { ServiciosComponent } from './pages/servicios/servicios.component';
import { AvisoDePrivacidadComponent } from './pages/aviso-de-privacidad/aviso-de-privacidad.component';
// import { ProductosComponent } from './productos/pages/productos/productos.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NosotrosComponent,
    VentaComponent,
    RentaComponent,
    ConsumiblesComponent,
    PromocionesComponent,
    ServiciosComponent,
    AvisoDePrivacidadComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    SharedModule,
    PrimengModule,
    ProductosRoutingModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
