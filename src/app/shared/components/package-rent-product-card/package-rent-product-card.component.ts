import { Component, Input, OnInit } from '@angular/core';
import { Package } from 'src/app/printers/interfaces/package.interface';
import { Printer } from 'src/app/printers/interfaces/printer.interface';

@Component({
  selector: 'shared-package-rent-product-card',
  templateUrl: './package-rent-product-card.component.html',
  styleUrls: ['./package-rent-product-card.component.scss']
})
export class PackageRentProductCardComponent {

  @Input() rentPackage: Package = {
    id: 0,
    printer: {
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
    },
    packageDuration:  0,
    packageMonthlyPrice:  0,
    packageCurrency:  '',
    packageEndDate: new Date(),
    packageStartDate: new Date(),
    packageDiscountPercentage: 0,
    packageDescription: '',
    packagePrintsBw: 0,
    packagePrintsColor: 0,
    packageExtraClickPriceBw: 0,
    packageExtraClickPriceColor: 0,
    packageDepositPrice: 0,
    packageIncludes: [],
  };


  ngOnInit(): void {
    if(!this.rentPackage) throw new Error('RentPackage property is required');
  }
  
}
