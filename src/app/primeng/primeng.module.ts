import { NgModule } from '@angular/core';

import { ButtonModule } from 'primeng/button';
import { MenubarModule } from 'primeng/menubar';
import { SpeedDialModule } from 'primeng/speeddial';
import { CarouselModule } from 'primeng/carousel';
import { CardModule } from 'primeng/card';
import { AccordionModule } from 'primeng/accordion';
import { TabViewModule } from 'primeng/tabview';
import { PanelModule } from 'primeng/panel';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { DividerModule } from 'primeng/divider';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { GalleriaModule } from 'primeng/galleria';
import { CheckboxModule } from 'primeng/checkbox';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { TooltipModule } from 'primeng/tooltip';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';



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
    ToggleButtonModule,
    GalleriaModule,
    CheckboxModule,
    ToastModule,
    TooltipModule,
    DialogModule,
    DropdownModule
  ],
  providers: [MessageService]
})
export class PrimengModule { }
