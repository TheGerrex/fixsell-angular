import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';


import { HomeComponent } from './home/home/home.component';
import { NosotrosComponent } from './nosotros/nosotros/nosotros.component';
import { SharedModule } from './shared/shared.module';
import { PrimengModule } from './primeng/primeng.module';
import { ProductoModule } from './producto/producto.module';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NosotrosComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    SharedModule,
    PrimengModule,
    ProductoModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
