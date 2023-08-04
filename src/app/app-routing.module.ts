import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { NosotrosComponent } from './pages/nosotros/nosotros.component';
import { VentaComponent } from './pages/venta/venta.component';
import { RentaComponent } from './pages/renta/renta.component';
import { ProductosComponent } from './pages/productos/productos.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    pathMatch: 'full'
  },
  {
    path: 'nosotros',
    component: NosotrosComponent,
  },
  {
    path: 'venta',
    component: VentaComponent,
  },
  {
    path: 'renta',
    component: RentaComponent,
  },
  {
    path: 'productos',
    component: ProductosComponent,
  },
  {
    path: '**',
    redirectTo: '/'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
