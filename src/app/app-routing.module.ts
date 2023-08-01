import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home/home.component';
import { NosotrosComponent } from './nosotros/nosotros/nosotros.component';
import { VentaComponent } from './producto/pages/venta/venta.component';
import { RentaComponent } from './producto/pages/renta/renta.component';

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
    path: '**',
    redirectTo: '/'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
