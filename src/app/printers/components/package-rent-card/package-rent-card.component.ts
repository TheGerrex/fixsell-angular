import { Component, Input, OnInit } from '@angular/core';
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
export class PackageRentCardComponent implements OnInit {
  @Input() printer!: Printer;
  showDetails = false;
  showDialogForm = false;
  openedIndex: number | null = null;
  isSoonExpiring: boolean = false;


  ngOnInit(): void {
    this.checkIfSoonExpiring();
  }

  checkIfSoonExpiring(): void {
    const today = new Date();
    this.isSoonExpiring = this.printer.packages.some(pkg => {
      const endDate = new Date(pkg.packageEndDate);
      const timeDiff = endDate.getTime() - today.getTime();
      const daysDiff = timeDiff / (1000 * 3600 * 24);
      return daysDiff <= 7; // Check if the end date is within the next 7 days
    });
  }

  showDialog() {
    this.showDialogForm = true;
  }
}
