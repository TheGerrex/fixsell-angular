import { Component, OnInit, inject } from '@angular/core';
import { ProductosService } from '../../services/productos.service';
import { Printer } from '../../interfaces/printer.interface';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.scss']
})
export class ProductosComponent implements OnInit{
  printers: Printer[] = [];
  loading = true;

  constructor(private productosService: ProductosService) { }

  ngOnInit(): void {
    this.productosService.getPrinters().subscribe(
      (printers_response: Printer[]) => {
        console.log(printers_response);
        this.printers = printers_response;
        this.loading = false;
      }
    )
  }
}

