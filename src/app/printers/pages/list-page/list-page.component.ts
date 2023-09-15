import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { PrintersService } from '../../services/printers.service';
import { Printer } from '../../interfaces/printer.interface';
import { ActivatedRoute } from '@angular/router';
import { FilterComponent } from '../../components/filter/filter.component';

@Component({
  selector: 'app-list-page',
  templateUrl: './list-page.component.html',
  styleUrls: ['./list-page.component.scss']
})
export class ListPageComponent implements OnInit {
  @Input() selectedCategory?: string;
  @Input() rentable?: boolean;
  filteredPrinters: Printer[] = [];
  printers: Printer[] = [];
  loading = true;
  filterBarOpen = false;

  @ViewChild('filterComponent', { static: false }) filterComponent!: FilterComponent;

  constructor(private printersService: PrintersService, private route: ActivatedRoute) { }

  ngOnInit(): void {

    this.route.queryParams.subscribe(params => {
      // console.log('Route Parameters:', params);
      const selectedCategory = params['category'];
      const rentable = params['rentable']; 
      // this.filterComponent.applyFilters();
    });

    this.printersService.getPrinters().subscribe(
      (printers_response: Printer[]) => {
        this.filteredPrinters = printers_response;
        this.loading = false;
      }
    );
  }

  handleFilteredPrintersChange(filteredPrinters: any[]): void {
    // Receive the filtered data emitted from FilterComponent
    this.filteredPrinters = filteredPrinters;
  }

  onToggleFilterBar() {
    this.filterBarOpen = !this.filterBarOpen;
  }

  closeFilterBar() {
    this.filterBarOpen = false;
  }
}
