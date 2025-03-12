import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConsumablesRoutingModule } from './consumables-routing.module';
import { PrimengModule } from '../primeng/primeng.module';

import { FormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { ConsumablesIntroComponent } from './pages/consumables-intro/consumables-intro.component';
import { LayoutPageComponent } from './pages/layout-page/layout-page.component';
import { ListPageComponent } from './pages/list-page/list-page.component';
import { FilterComponent } from './components/filter/filter.component';
import { ProductCardComponent } from './components/product-card/product-card.component';
import { ConsumablePageComponent } from './pages/consumable-page/consumable-page.component';
import { ConsumibleColorsPipe } from './pipes/consumible-colors.pipe';
import { PromotionListComponent } from './components/consumable-list/consumable-list.component';
import { RelatedConsumablesListComponent } from './components/related-consumables-list/related-consumables-list.component';
import { ConsumibleYieldPipe } from './pipes/consumible-yield.pipe';
import { ProductListItemComponent } from './components/product-list-item/product-list-item.component';

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
    RelatedConsumablesListComponent,
    ConsumibleYieldPipe,
    ProductListItemComponent,
  ],
  imports: [
    CommonModule,
    ConsumablesRoutingModule,
    PrimengModule,
    FormsModule,
    SharedModule,
  ],
  exports: [PromotionListComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ConsumablesModule { }
