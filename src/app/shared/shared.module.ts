import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { PrimengModule } from '../primeng/primeng.module';
import { SocialHeaderComponent } from './social-header/social-header.component';

@NgModule({
    declarations: [
        NavbarComponent,
        FooterComponent,
        SocialHeaderComponent
    ],
    imports: [
        CommonModule,
        PrimengModule
    ],
    exports: [
        NavbarComponent,
        FooterComponent,
        SocialHeaderComponent]
  })
  export class SharedModule { }