import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { PrimengModule } from '../primeng/primeng.module';
import { SocialHeaderComponent } from './social-header/social-header.component';
import { Error404PageComponent } from './pages/error404-page/error404-page.component';
import { ProductCardComponent } from './product-card/product-card.component';
import { ProductBrandPipe } from './pipes/product-brand.pipe';
import { ProductColorPipe } from './pipes/product-color.pipe';
import { ProductTypePipe } from './pipes/product-type.pipe';

@NgModule({
    declarations: [
        NavbarComponent,
        FooterComponent,
        SocialHeaderComponent,
        Error404PageComponent,
        ProductCardComponent,
        ProductBrandPipe,
        ProductColorPipe,
        ProductTypePipe
    ],
    imports: [
        CommonModule,
        PrimengModule,
        ReactiveFormsModule
    ],
    exports: [
        NavbarComponent,
        FooterComponent,
        SocialHeaderComponent,
        ProductCardComponent
    ]
  })
  export class SharedModule { }