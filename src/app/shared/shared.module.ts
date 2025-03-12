import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrimengModule } from '../primeng/primeng.module';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';

import { ProductBrandPipe } from './pipes/product-brand.pipe';
import { ProductColorPipe } from './pipes/product-color.pipe';
import { ProductTypePipe } from './pipes/product-type.pipe';

import { SocialHeaderComponent } from './social-header/social-header.component';
import { Error404PageComponent } from './pages/error404-page/error404-page.component';

import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { ProductCardComponent } from './components/product-card/product-card.component';
import { ProductEmailFormComponent } from './components/product-email-form/product-email-form.component';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { SearchBarListComponent } from './components/search-bar-list/search-bar-list.component';
import { SkeletonProductCardComponent } from './components/skeleton-product-card/skeleton-product-card.component';
import { SkeletonProductPageComponent } from './components/skeleton-product-page/skeleton-product-page.component';
import { LoadingSpinnerComponent } from './components/loading-spinner/loading-spinner.component';
import { PackageRentProductCardComponent } from './components/package-rent-product-card/package-rent-product-card.component';
import { SoftwareEmailFormComponent } from './components/software-email-form/software-email-form.component';
import { ContactEmailFormComponent } from './components/contact-email-form/contact-email-form.component';
import { WhatsappButtonComponent } from './components/whatsapp-button/whatsapp-button.component';
import { LocationSelectorComponent } from './components/location-selector/location-selector.component';
import { LocationSelectorSocialHeaderComponent } from './components/location-selector-social-header/location-selector-social-header.component';

import { SwiperDirective } from './directives/app-swiper.directive';

import { register } from 'swiper/element/bundle';
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';
import { ProductListItemComponent } from './components/product-list-item/product-list-item.component';

register();

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
    SoftwareEmailFormComponent,
    ContactEmailFormComponent,
    WhatsappButtonComponent,
    SwiperDirective,
    LocationSelectorComponent,
    LocationSelectorSocialHeaderComponent,
    SkeletonProductPageComponent,
    ProductListItemComponent,
  ],
  imports: [
    CommonModule,
    PrimengModule,
    ReactiveFormsModule,
    FormsModule,
    NgxMaskDirective,
    NgxMaskPipe
  ],
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
    SoftwareEmailFormComponent,
    ContactEmailFormComponent,
    WhatsappButtonComponent,
    SkeletonProductPageComponent,
    SwiperDirective,
    ProductListItemComponent
  ],
  providers: [provideNgxMask()],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SharedModule { }
