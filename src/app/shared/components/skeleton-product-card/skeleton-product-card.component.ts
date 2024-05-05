import { Component, Input } from '@angular/core';
import { Printer } from 'src/app/printers/interfaces/printer.interface';

@Component({
  selector: 'shared-skeleton-product-card',
  templateUrl: './skeleton-product-card.component.html',
  styleUrls: ['./skeleton-product-card.component.scss']
})
export class SkeletonProductCardComponent {
    @Input() printer: Printer = {
    id: '',
    brand: '',
    model: '',
    datasheet_url: '',
    img_url: [],
    description: '',
    price: 0,
    currency: '',
    category: '',
    color: false,
    rentable: false,
    sellable: false,
    tags: [],
    powerConsumption: '',
    dimensions: '',
    printVelocity: 0,
    maxPrintSizeSimple: '',
    maxPrintSize: '',
    printSize: '',
    maxPaperWeight: 0,
    duplexUnit: false,
    paperSizes: '',
    applicableOS: '',
    printerFunctions: '',
    barcode: [],
    deals: [],
    packages: [],
    consumibles: []
  };


  ngOnInit(): void {
    if(!this.printer) throw new Error('Printer property is required');
  }
}
