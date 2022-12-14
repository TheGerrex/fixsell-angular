import { NgModule } from '@angular/core';

import {ButtonModule} from 'primeng/button';
import {MenubarModule} from 'primeng/menubar';
import {SpeedDialModule} from 'primeng/speeddial';
import {CarouselModule} from 'primeng/carousel';
import {CardModule} from 'primeng/card';
import {AccordionModule} from 'primeng/accordion';
import {TabViewModule} from 'primeng/tabview';
import {PanelModule} from 'primeng/panel';
import {InputTextModule} from 'primeng/inputtext';
import {InputNumberModule} from 'primeng/inputnumber';
import {DividerModule} from 'primeng/divider';
import {InputTextareaModule} from 'primeng/inputtextarea';


@NgModule({
  exports: [
    ButtonModule,
    MenubarModule,
    SpeedDialModule,
    CarouselModule,
    CardModule,
    AccordionModule,
    TabViewModule,
    PanelModule,
    InputTextModule,
    InputNumberModule,
    DividerModule,
    InputTextareaModule,
  ]
})
export class PrimengModule { }
