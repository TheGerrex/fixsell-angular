import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConsumablesRoutingModule } from './consumables-routing.module';
import { PrimengModule } from '../primeng/primeng.module';

import { SwiperModule } from 'swiper/angular';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { ConsumablesIntroComponent } from './pages/consumables-intro/consumables-intro.component';
import { LayoutPageComponent } from './pages/layout-page/layout-page.component';
import { ListPageComponent } from './pages/list-page/list-page.component';
import { FilterComponent } from './components/filter/filter.component';
import { ProductCardComponent } from './components/product-card/product-card.component';
import { ConsumablePageComponent } from './pages/consumable-page/consumable-page.component';
import { ConsumibleColorsPipe } from './pipes/consumible-colors.pipe';
import { PromotionListComponent } from './components/promotion-list/promotion-list.component';

@NgModule({
  declarations: [
    LayoutPageComponent,
    ConsumablesIntroComponent,
    ListPageComponent,
    FilterComponent,
    ProductCardComponent,
    ConsumablePageComponent,
    ConsumibleColorsPipe,
    PromotionListComponent,
  ],
  imports: [
    CommonModule,
    ConsumablesRoutingModule,
    PrimengModule,
    SwiperModule,
    FormsModule,
    SharedModule,
  ],
  exports: [PromotionListComponent],
})
export class ConsumablesModule {}
