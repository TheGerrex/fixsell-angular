import { Component, Input } from '@angular/core';
import { Printer } from '../../interfaces/printer.interface';
import { animate, state, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'printer-package-rent-card',
  templateUrl: './package-rent-card.component.html',
  styleUrls: ['./package-rent-card.component.scss'],
  animations: [
    trigger('detailsAnimation', [
      state('hidden', style({
        height: '0',
        opacity: '0',
        overflow: 'hidden',
        padding: '0',
      })),
      state('visible', style({
        height: '*',
        opacity: '1'
      })),
      transition('hidden <=> visible', animate('400ms ease-in-out'))
    ])
  ]
})
export class PackageRentCardComponent {
  @Input() printer!: Printer;
  showDetails = false;
  showDialogForm = false;

  showDialog() {
    this.showDialogForm = true;
  }
}
