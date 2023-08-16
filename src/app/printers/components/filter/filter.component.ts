import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Printer } from '../../interfaces/printer.interface';
import { PrintersService } from '../../services/printers.service';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss'],
  animations: [
    trigger('filterSectionsAnimation', [
      state('open', style({
        display: 'block',
        height: '*'
      })),
      state('closed', style({
        display: 'none',
        height: '0'
      })),
      transition('open <=> closed', [
        animate('0.3s')
      ])
    ])
  ]
})
export class FilterComponent implements OnInit {
  @Output() filteredPrintersChange = new EventEmitter<Printer[]>(); // Output event
  // FILTERS
  printers: Printer[] = [];
  filteredPrinters: Printer[] = [];
  selectedPrintSizeFilters: String[] = [];
  printSizesFilter: String[] = ['13" x 47', 'Banner', 'Legal', 'Super-B', 'A4', 'Tabloide', 'Tabloide +'];
  selectedColors: String[] = [];
  colorFilter: String[] = ['Color', 'B&N'];
  selectedBrands: String[] = [];
  brands: String[] = ['Konica Minolta', 'Kyocera', 'Epson'];
  selectedRentableOptions: boolean[] = [false, true];
  rentableOptions: boolean[] = [false, true];
  selectedPrintVelocities: String[] = [];
  printVelocities: String[] = ["24 a 30", "30 a 40", "40 a 50", "50 a 60", "60 a 80", "80 a 100", "100 y más"];
  selectedCategories: String[] = []; 
  categories: String[] = ["Oficina", "Producción", "Etiquetas", "Plotters", "Inyección de Tinta", "Artes Gráficas"];


  
  filterSectionsState = 'open';
  checked = false;


  constructor(private printerService: PrintersService) {}

  ngOnInit(): void {
    this.printerService.getPrinters().subscribe((data: any) => {
      this.printers = data;
      this.filteredPrinters = data;
    })
  }

  applyFilters(): void {
    if (this.selectedPrintSizeFilters.length > 0) {
      this.filteredPrinters = this.printers.filter((printer) =>
        this.selectedPrintSizeFilters.includes(printer.maxPrintSizeSimple)
      );
    } else {
      this.filteredPrinters = this.printers;
    }

    if (this.selectedColors.length > 0) {
      this.filteredPrinters = this.filteredPrinters.filter((printer) =>
        this.selectedColors.includes(printer.color ? 'Color' : 'B&N')
      );
    }
    
    if (this.selectedBrands.length > 0) {
      this.filteredPrinters = this.filteredPrinters.filter((printer) =>
        this.selectedBrands.includes(printer.brand)
      );
    }

    if (this.selectedRentableOptions.length > 0) {
      this.filteredPrinters = this.filteredPrinters.filter((printer) =>
        this.selectedRentableOptions.includes(printer.rentable)
      );
    }

    if (this.selectedPrintVelocities.length > 0) {
      this.filteredPrinters = this.filteredPrinters.filter((printer) =>
        this.selectedPrintVelocities.some((range) => {
          if (range === "100 y más") {
            return parseInt(printer.printVelocity, 10) >= 100;
          }
  
          const [min, max] = range.split(" a ");
          const velocity = parseInt(printer.printVelocity, 10);
          return velocity >= parseInt(min, 10) && velocity <= parseInt(max, 10);
        })
      );
    }

    if (this.selectedCategories.length > 0) {
      this.filteredPrinters = this.filteredPrinters.filter((printer) =>
        this.selectedCategories.includes(printer.category)
      );
    }

    this.filteredPrintersChange.emit(this.filteredPrinters);
    console.log(this.filteredPrinters)
  }

  togglePrintSizeFilter(printSize: String): void {
    if (this.selectedPrintSizeFilters.includes(printSize)) {
      this.selectedPrintSizeFilters = this.selectedPrintSizeFilters.filter((b) => b !== printSize);
    } else {
      this.selectedPrintSizeFilters.push(printSize);
    }
    this.applyFilters();
  }

  toggleColorFilter(color: String): void {
    // Toggle color filters
    if (this.selectedColors.includes(color)) {
      this.selectedColors = this.selectedColors.filter((c) => c !== color);
    } else {
      this.selectedColors.push(color);
    }
    this.applyFilters(); // Apply filters after toggling
  }

  toggleBrandFilter(brand: String): void {
    if (this.selectedBrands.includes(brand)) {
      this.selectedBrands = this.selectedBrands.filter((b) => b !== brand);
    } else {
      this.selectedBrands.push(brand);
    }
    this.applyFilters();
  }

  toggleRentableOptionFilter(option: boolean): void {
    if (this.selectedRentableOptions.includes(option)) {
      this.selectedRentableOptions = this.selectedRentableOptions.filter((o) => o !== option);
    } else {
      this.selectedRentableOptions.push(option);
    }
    this.applyFilters();
  }

  togglePrintVelocityFilter(range: String): void {
    if (this.selectedPrintVelocities.includes(range)) {
      this.selectedPrintVelocities = this.selectedPrintVelocities.filter((v) => v !== range);
    } else {
      this.selectedPrintVelocities.push(range);
    }
    this.applyFilters();
  }

  toggleCategoryFilter(category: String): void {
    if (this.selectedCategories.includes(category)) {
      this.selectedCategories = this.selectedCategories.filter((c) => c !== category);
    } else {
      this.selectedCategories.push(category);
    }
    this.applyFilters();
  }
  
  resetFilters(): void {
    this.selectedPrintSizeFilters = [];
    this.selectedColors = [];
    this.selectedBrands = [];
    this.selectedRentableOptions = [];
    this.selectedPrintVelocities = [];
    this.selectedCategories = [];
  
    this.applyFilters(); // Apply filters after resetting
  }
  
  
  

  toggleFilterSections() {
    this.filterSectionsState = this.filterSectionsState === 'open' ? 'closed' : 'open';
  }
  
  toggleButtons() {
    this.checked = !this.checked;
    console.log('Toggling');
  }

}
