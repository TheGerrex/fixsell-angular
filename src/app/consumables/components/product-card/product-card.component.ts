import { Component, Input, OnInit } from '@angular/core';
import { Consumible } from 'src/app/printers/interfaces/consumible.interface';

@Component({
  selector: 'consumable-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss'],
})
export class ProductCardComponent implements OnInit {
  @Input() consumible: Consumible | any = {};

  ngOnInit(): void {
    if (!this.consumible) throw new Error('Consumable property is required');
  }

  isDealExpired(dealEndDate: string): boolean {
    const currentDate = new Date();
    const endDate = new Date(dealEndDate);
    return endDate < currentDate;
  }

  hasValidDeals(deals: any[]): boolean {
    return deals.some(deal => !this.isDealExpired(deal.dealEndDate));
  }
}
