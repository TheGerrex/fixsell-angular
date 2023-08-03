import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';

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
import { ProductosComponent } from './pages/productos/productos.component';

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
    ProductosComponent

  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    SharedModule,
    PrimengModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
