import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

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
import { SwiperModule } from 'swiper/angular';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { IntroPageComponent } from './pages/intro-page/intro-page.component';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { PromotionListComponent } from './components/promotion-list/promotion-list.component';
import { PackageRentCardComponent } from './components/package-rent-card/package-rent-card.component';
import { PackageRentContactFormComponent } from './components/package-rent-contact-form/package-rent-contact-form.component';
import { PackageRentPromotionListComponent } from './components/package-rent-promotion-list/package-rent-promotion-list.component';
import { RelatedPrintersListComponent } from './components/related-printers-list/related-printers-list.component';

@NgModule({
  declarations: [
    FilterComponent,
    ProductTypePipe,
    ProductColorIconPipe,
    BrandTypePipe,
    ProductCardComponent,
    LayoutPageComponent,
    PrinterPageComponent,
    ListPageComponent,
    IntroPageComponent,
    SearchBarComponent,
    PromotionListComponent,
    PackageRentCardComponent,
    PackageRentContactFormComponent,
    PackageRentPromotionListComponent,
    RelatedPrintersListComponent,
  ],
  imports: [
    CommonModule,
    PrinterRoutingModule,
    PrimengModule,
    SwiperModule,
    FormsModule,
    SharedModule,
    ReactiveFormsModule,
  ],
  exports: [ProductTypePipe, ProductColorIconPipe, BrandTypePipe, PromotionListComponent, PackageRentPromotionListComponent, PackageRentContactFormComponent],
})
export class PrinterModule {}
