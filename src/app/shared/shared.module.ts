import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { PrimengModule } from '../primeng/primeng.module';
import { SocialHeaderComponent } from './social-header/social-header.component';
import { Error404PageComponent } from './pages/error404-page/error404-page.component';
import { ProductCardComponent } from './components/product-card/product-card.component';
import { ProductBrandPipe } from './pipes/product-brand.pipe';
import { ProductColorPipe } from './pipes/product-color.pipe';
import { ProductTypePipe } from './pipes/product-type.pipe';
import { ProductEmailFormComponent } from './components/product-email-form/product-email-form.component';
import { FormsModule } from '@angular/forms';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { SearchBarListComponent } from './components/search-bar-list/search-bar-list.component';
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
  ],
})
export class SharedModule {}
