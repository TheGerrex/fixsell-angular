import { Component, Input } from '@angular/core';
import { Printer } from '../../interfaces/printer.interface';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent {
  @Input() printer: Printer|any = {};
}
