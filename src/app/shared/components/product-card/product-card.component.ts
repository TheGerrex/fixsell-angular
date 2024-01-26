import { Component, Input, OnInit } from '@angular/core';
import { Printer } from 'src/app/printers/interfaces/printer.interface';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent implements OnInit{
  @Input() printer: Printer|any = {};


  ngOnInit(): void {
    if(!this.printer) throw new Error('Printer property is required');
  }
}
