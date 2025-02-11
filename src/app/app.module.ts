import { LOCALE_ID, CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';


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
import { PrinterModule } from './printers/printers.module';

import localeEs from '@angular/common/locales/es-MX';
import { registerLocaleData } from '@angular/common';
import { ConsumablesModule } from './consumables/consumables.module';
import { OfficePrintersComponent } from './pages/marketing-landing-pages/office-printers-landing/office-printers/office-printers.component';
import { PlotterLargeFormatPrintersComponent } from './pages/marketing-landing-pages/plotter-large-format-printers-landing/plotter-large-format-printers/plotter-large-format-printers.component';
import { SoftwareDocumentScanningComponent } from './pages/marketing-landing-pages/software-document-scanning-landing/software-document-scanning/software-document-scanning.component';
import { HighEndPrintersComponent } from './pages/marketing-landing-pages/high-end-printer-landing/high-end-printers/high-end-printers.component';
import { ContactoComponent } from './pages/contacto/contacto.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';
registerLocaleData(localeEs);

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
    HighEndPrintersComponent,
    OfficePrintersComponent,
    PlotterLargeFormatPrintersComponent,
    SoftwareDocumentScanningComponent,
    ContactoComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    SharedModule,
    PrimengModule,
    PrinterRoutingModule,
    HttpClientModule,
    PrinterModule,
    ConsumablesModule,
    ReactiveFormsModule,

  ],
  providers: [{ provide: LOCALE_ID, useValue: 'es-MX' }],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
