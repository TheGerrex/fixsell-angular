import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { PrimengModule } from '../primeng/primeng.module';
import { SocialHeaderComponent } from './social-header/social-header.component';
import { Error404PageComponent } from './pages/error404-page/error404-page.component';

@NgModule({
    declarations: [
        NavbarComponent,
        FooterComponent,
        SocialHeaderComponent,
        Error404PageComponent
    ],
    imports: [
        CommonModule,
        PrimengModule,
        ReactiveFormsModule
    ],
    exports: [
        NavbarComponent,
        FooterComponent,
        SocialHeaderComponent]
  })
  export class SharedModule { }