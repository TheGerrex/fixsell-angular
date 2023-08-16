import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { PrinterRoutingModule } from './printer-routing.module';
import { FilterComponent } from './components/filter/filter.component';
import { ProductCardComponent } from './components/product-card/product-card.component';
import { ProductTypePipe } from './pipes/product-type.pipe';
import { ProductColorIconPipe } from './pipes/product-color-icon.pipe';
import { BrandTypePipe } from './pipes/brand-type.pipe';
import { PrimengModule } from '../primeng/primeng.module';
import { LayoutPageComponent } from './pages/layout-page/layout-page.component';
import { PrinterPageComponent } from './pages/printer-page/printer-page.component';
import { ListPageComponent } from './pages/list-page/list-page.component';




@NgModule({
  declarations: [
    FilterComponent,
    ProductCardComponent,
    ProductTypePipe,
    ProductColorIconPipe,
    BrandTypePipe,
    LayoutPageComponent,
    PrinterPageComponent,
    ListPageComponent
  ],
  imports: [
    CommonModule,
    PrinterRoutingModule,
    PrimengModule,
  ]
})
export class PrinterModule { }
