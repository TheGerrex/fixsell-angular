import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutPageComponent } from './pages/layout-page/layout-page.component';
import { ConsumablesIntroComponent } from './pages/consumables-intro/consumables-intro.component';
import { ListPageComponent } from './pages/list-page/list-page.component';
import { ConsumablePageComponent } from './pages/consumable-page/consumable-page.component';
// import { PrinterPageComponent } from './pages/printer-page/printer-page.component';
// import { ListPageComponent } from './pages/list-page/list-page.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutPageComponent,
    children: [
      { path: 'intro', component: ConsumablesIntroComponent },
      { path: 'list', component: ListPageComponent },
      { path: ':id', component: ConsumablePageComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ConsumablesRoutingModule {}
