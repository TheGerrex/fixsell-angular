import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { NosotrosComponent } from './pages/nosotros/nosotros.component';
import { VentaComponent } from './pages/venta/venta.component';
import { RentaComponent } from './pages/renta/renta.component';
import { AvisoDePrivacidadComponent } from './pages/aviso-de-privacidad/aviso-de-privacidad.component';
import { Error404PageComponent } from './shared/pages/error404-page/error404-page.component';
import { SuccessComponent } from './pages/success/success.component';

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
    path: 'aviso-de-privacidad',
    component: AvisoDePrivacidadComponent,
  },
  {
    path: 'success',
    component: SuccessComponent,
  },
  {
    path: '404',
    component: Error404PageComponent,
  },
  {
    path: 'printers',
    loadChildren: () => import('./printers/printers.module').then( m => m.PrinterModule),
  },
  {
    path: '**',
    redirectTo: '404',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'top' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
