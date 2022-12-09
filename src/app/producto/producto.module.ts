import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VentaComponent } from './pages/venta/venta.component';
import { RentaComponent } from './pages/renta/renta.component';
import { ConsumiblesComponent } from './pages/consumibles/consumibles.component';
import { PromocionesComponent } from './pages/promociones/promociones.component';
import { ServiciosComponent } from './pages/servicios/servicios.component';



@NgModule({
  declarations: [
    VentaComponent,
    RentaComponent,
    ConsumiblesComponent,
    PromocionesComponent,
    ServiciosComponent
  ],
  imports: [
    CommonModule
  ]
})
export class ProductoModule { }
