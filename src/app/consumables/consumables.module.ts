import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConsumablesRoutingModule } from './consumables-routing.module';
import { PrimengModule } from '../primeng/primeng.module';

import { SwiperModule } from 'swiper/angular';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { ConsumablesIntroComponent } from './pages/consumables-intro/consumables-intro.component';
import { LayoutPageComponent } from './pages/layout-page/layout-page.component';

@NgModule({
  declarations: [LayoutPageComponent, ConsumablesIntroComponent],
  imports: [
    CommonModule,
    ConsumablesRoutingModule,
    PrimengModule,
    SwiperModule,
    FormsModule,
    SharedModule,
  ],
})
export class ConsumablesModule {}
