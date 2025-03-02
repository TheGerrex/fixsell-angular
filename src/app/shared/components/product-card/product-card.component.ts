import { Component, Input, OnInit } from '@angular/core';
import { Printer } from 'src/app/printers/interfaces/printer.interface';

@Component({
  selector: 'shared-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent implements OnInit {
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
    if (!this.printer) throw new Error('Printer property is required');
  }

  isPackageExpired(packageEndDate: string): boolean {
    const currentDate = new Date();
    const endDate = new Date(packageEndDate);
    return endDate < currentDate;
  }

  hasValidPackages(packages: any[]): boolean {
    return packages.some(pkg => !this.isPackageExpired(pkg.packageEndDate));
  }
}
