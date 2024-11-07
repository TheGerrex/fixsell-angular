import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { NosotrosComponent } from './pages/nosotros/nosotros.component';
import { VentaComponent } from './pages/venta/venta.component';
import { RentaComponent } from './pages/renta/renta.component';
import { AvisoDePrivacidadComponent } from './pages/aviso-de-privacidad/aviso-de-privacidad.component';
import { Error404PageComponent } from './shared/pages/error404-page/error404-page.component';
import { SuccessComponent } from './pages/success/success.component';
import { PromocionesComponent } from './pages/promociones/promociones.component';
import { HighEndPrintersComponent } from './pages/marketing-landing-pages/high-end-printer-landing/high-end-printers/high-end-printers.component';
import { OfficePrintersComponent } from './pages/marketing-landing-pages/office-printers-landing/office-printers/office-printers.component';
import { PlotterLargeFormatPrintersComponent } from './pages/marketing-landing-pages/plotter-large-format-printers-landing/plotter-large-format-printers/plotter-large-format-printers.component';
import { SoftwareDocumentScanningComponent } from './pages/marketing-landing-pages/software-document-scanning-landing/software-document-scanning/software-document-scanning.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    pathMatch: 'full',
  },
  {
    path: 'nosotros',
    component: NosotrosComponent,
  },
  {
    path: 'promociones',
    component: PromocionesComponent,
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
    path: 'impresoras-alta-gama',
    component: HighEndPrintersComponent,
  },
  {
    path: 'impresoras-para-oficina',
    component: OfficePrintersComponent,
  },
  {
    path: 'plotter-impresoras-gran-formato',
    component: PlotterLargeFormatPrintersComponent,
  },
  {
    path: 'software-digitalizacion-documentos',
    component: SoftwareDocumentScanningComponent,
  },
  {
    path: 'printers',
    loadChildren: () =>
      import('./printers/printers.module').then((m) => m.PrinterModule),
  },
  {
    path: 'consumables',
    loadChildren: () =>
      import('./consumables/consumables.module').then(
        (m) => m.ConsumablesModule
      ),
  },
  {
    path: '**',
    redirectTo: '404',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { onSameUrlNavigation: 'reload', scrollPositionRestoration: 'disabled' })],
  exports: [RouterModule],
})
export class AppRoutingModule { }
