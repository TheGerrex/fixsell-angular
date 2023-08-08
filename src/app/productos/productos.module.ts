import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { ProductosRoutingModule } from './productos-routing.module';
import { ProductosComponent } from './pages/productos/productos.component';
import { ProductlayoutComponent } from './layouts/productlayout/productlayout.component';
import { FilterComponent } from './components/filter/filter.component';
import { ProductCardComponent } from './components/product-card/product-card.component';
import { ProductTypePipe } from './pipes/product-type.pipe';
import { ProductColorIconPipe } from './pipes/product-color-icon.pipe';
import { BrandTypePipe } from './pipes/brand-type.pipe';
import { PrimengModule } from '../primeng/primeng.module';




@NgModule({
  declarations: [ProductosComponent, ProductlayoutComponent, FilterComponent, ProductCardComponent, ProductTypePipe, ProductColorIconPipe, BrandTypePipe],
  imports: [
    CommonModule,
    ProductosRoutingModule,
    PrimengModule,
  ]
})
export class ProductosModule { }
