import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrimengModule } from '../primeng/primeng.module';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';

import { ProductBrandPipe } from './pipes/product-brand.pipe';
import { ProductColorPipe } from './pipes/product-color.pipe';
import { ProductTypePipe } from './pipes/product-type.pipe';

import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { SocialHeaderComponent } from './social-header/social-header.component';
import { Error404PageComponent } from './pages/error404-page/error404-page.component';
import { ProductCardComponent } from './components/product-card/product-card.component';
import { ProductEmailFormComponent } from './components/product-email-form/product-email-form.component';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { SearchBarListComponent } from './components/search-bar-list/search-bar-list.component';
import { SkeletonProductCardComponent } from './components/skeleton-product-card/skeleton-product-card.component';
import { LoadingSpinnerComponent } from './components/loading-spinner/loading-spinner.component';
import { PackageRentProductCardComponent } from './components/package-rent-product-card/package-rent-product-card.component';

@NgModule({
  declarations: [
    NavbarComponent,
    FooterComponent,
    SocialHeaderComponent,
    Error404PageComponent,
    ProductCardComponent,
    ProductBrandPipe,
    ProductColorPipe,
    ProductTypePipe,
    ProductEmailFormComponent,
    SearchBarComponent,
    SearchBarListComponent,
    SkeletonProductCardComponent,
    LoadingSpinnerComponent,
    PackageRentProductCardComponent,
  ],
  imports: [CommonModule, PrimengModule, ReactiveFormsModule, FormsModule],
  exports: [
    NavbarComponent,
    FooterComponent,
    SocialHeaderComponent,
    ProductCardComponent,
    ProductBrandPipe,
    ProductColorPipe,
    ProductTypePipe,
    ProductEmailFormComponent,
    SearchBarComponent,
    SearchBarListComponent,
    SkeletonProductCardComponent,
    LoadingSpinnerComponent,
    PackageRentProductCardComponent,
  ],
})
export class SharedModule {}
