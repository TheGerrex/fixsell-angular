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

  logPrinter() {
    console.log(this.consumible);
  }
}
