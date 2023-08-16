import { Component, OnInit } from '@angular/core';
import { PrintersService } from '../../services/printers.service';
import { Printer } from '../../interfaces/printer.interface';

@Component({
  selector: 'app-list-page',
  templateUrl: './list-page.component.html',
  styleUrls: ['./list-page.component.scss']
})
export class ListPageComponent implements OnInit {
  filteredPrinters: Printer[] = [];
  printers: Printer[] = [];
  loading = true;

  constructor(private printersService: PrintersService) { }

  ngOnInit(): void {
    this.printersService.getPrinters().subscribe(
      (printers_response: Printer[]) => {
        console.log(printers_response);
        this.filteredPrinters = printers_response;
        this.loading = false;
      }
    )
  }

  handleFilteredPrintersChange(filteredPrinters: any[]): void {
    // Receive the filtered data emitted from FilterComponent
    this.filteredPrinters = filteredPrinters;
  }
}
