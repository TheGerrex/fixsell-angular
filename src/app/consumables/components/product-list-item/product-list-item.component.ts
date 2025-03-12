import { Component, Input } from '@angular/core';
import { Consumible } from 'src/app/printers/interfaces/consumible.interface';

@Component({
  selector: 'consumable-product-list-item',
  templateUrl: './product-list-item.component.html',
  styleUrls: ['./product-list-item.component.scss']
})
export class ProductListItemComponent {
  @Input() consumible!: Consumible;

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
