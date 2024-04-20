import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutPageComponent } from './pages/layout-page/layout-page.component';
import { PrinterPageComponent } from './pages/printer-page/printer-page.component';
import { ListPageComponent } from './pages/list-page/list-page.component';
import { PrinterIntroComponent } from './pages/printer-intro/printer-intro.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutPageComponent,
    children: [
      { path: 'intro', component: PrinterIntroComponent },
      { path: 'list', component: ListPageComponent },
      { path: 'list/:page', component: ListPageComponent },
      { path: ':id', component: PrinterPageComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PrinterRoutingModule { }