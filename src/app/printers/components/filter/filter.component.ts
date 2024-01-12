import { Component, EventEmitter, OnInit, Output, Input, ElementRef, ViewChild, SimpleChanges } from '@angular/core';
import { Printer } from '../../interfaces/printer.interface';
import { PrintersService } from '../../services/printers.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit {
  @Output() filteredPrintersChange = new EventEmitter<any>(); // Output event
  @Output() appliedFiltersCountChange = new EventEmitter<number>();
  @Input() selectedCategory?: string;
  @Input() initialAppliedFiltersCount: number = 0;

  // FILTERS
  printers: Printer[] = [];
  filteredPrinters: Printer[] = [];
  printSizesFilter: string[] = ['Carta', 'Doble Carta', 'Tabloide', 'Tabloide Plus', 'Rollo 4', 'Rollo 4.25','Rollo 8','Rollo 8.34', 'Rollo 13'  ];
  colorFilter: string[] = ['Color', 'B&N'];
  colorParams: any;
  selectedBrands: string[] = [];
  selectedPrintVelocities: string[] = [];
  selectedCategories: string[] = []; 
  selectedPrintSizes: string[] = [];
  selectedPrintVelocityStates: { [key: string]: boolean } = {};
  selectedColors: string[] = [];
  brands: string[] = ['Konica Minolta', 'Kyocera', 'Epson'];
  categories: string[] = ["Oficina", "Produccion", "Etiquetas", "Inyeccion de Tinta", "Artes Graficas"];
  printVelocities: string[] = ["24-30", "30-40", "40-50", "50-60", "60-80", "80-100", "100-200"];
  isSectionVisibleProduct: boolean = true;
  isSectionVisibleBrand: boolean = true;
  isSectionVisibleSize: boolean = true;
  isSectionVisibleType: boolean = true;
  isSectionVisibleVelocity: boolean = true;
  isSectionVisibleCategory: boolean = true;
  rentable?: boolean = false;
  sellable?: boolean = false;
  rentableCount: number = 0;
  isVentaHighlighted: boolean = false;
  isRentaHighlighted: boolean = false;
  appliedFiltersCount: number = 0;
  pageLoaded = false;
  filterSectionsState: string = window.innerWidth > 768 ? 'open' : 'closed';
  checked = false;
  isMobile?: boolean;

  constructor(
    private printerService: PrintersService, 
    private route: ActivatedRoute,
    private router: Router) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.sellable = params['sellable'] ? JSON.parse(params['sellable']) : undefined;
      this.rentable = params['rentable'] ? JSON.parse(params['rentable']) : undefined;
      this.selectedBrands = params['brand'] ? params['brand'].split(',') : [];
      this.selectedCategories = params['categories'] ? params['categories'].split(',') : [];
      this.selectedPrintSizes = params['printSizes'] ? params['printSizes'].split(',') : [];
      this.selectedPrintVelocities = params['printVelocities'] ? params['printVelocities'].split(',') : [];
      this.colorParams = params['color'] !== undefined ? params['color'] === 'true' : undefined;
      this.selectedColors = [];
      if (this.colorParams !== undefined) {
        this.selectedColors.push(this.colorParams ? 'Color' : 'B&N');
      }
    });
    this.checkIfMobile();
    window.addEventListener('resize', this.onResize);
  }

  ngOnChanges(changes: SimpleChanges) {
    if ('initialAppliedFiltersCount' in changes) {
      this.appliedFiltersCount = changes['initialAppliedFiltersCount'].currentValue;
    }
    console.log("Filter count", this.initialAppliedFiltersCount)
  }
  
  toggleFilterSectionProduct() {
    this.isSectionVisibleProduct = !this.isSectionVisibleProduct;
  }
  toggleFilterSectionBrand() {
    this.isSectionVisibleBrand = !this.isSectionVisibleBrand;
  }
  toggleFilterSectionSize() {
    this.isSectionVisibleSize = !this.isSectionVisibleSize;
  }
  toggleFilterSectionType() {
    this.isSectionVisibleType = !this.isSectionVisibleType;
  }
  toggleFilterSectionVelocity() {
    this.isSectionVisibleVelocity = !this.isSectionVisibleVelocity;
  }
  toggleFilterSectionCategory() {
    this.isSectionVisibleCategory = !this.isSectionVisibleCategory;
  }

  onResize = () => {
    this.filterSectionsState = window.innerWidth > 768 ? 'open' : 'closed';
  }

  ngOnDestroy() {
    window.removeEventListener('resize', this.onResize);
  }

  scrollToTop() {
    window.scrollTo({ top: 480, behavior: 'smooth' });
  }

  checkIfMobile() {
    this.isMobile = window.innerWidth <= 768;
  }

  toggleSellableOptionFilter(): void {
    const wasSellable = this.sellable;
    this.sellable = !this.sellable;
    this.rentable = !this.sellable;
  
    if (wasSellable !== this.sellable) {
      this.appliedFiltersCount = this.sellable ? this.appliedFiltersCount + 1 : (this.appliedFiltersCount > 0 ? this.appliedFiltersCount - 1 : 0);
    }
  
    this.route.queryParams.subscribe(params => {
      const updatedParams = { ...params, sellable: this.sellable ? 'true' : 'false', rentable: this.rentable ? 'true' : 'false', filterCount: this.appliedFiltersCount, page: '1' };
      this.router.navigate([], { queryParams: updatedParams, queryParamsHandling: 'merge' });
    });
  }
  
  toggleRentableOptionFilter(): void {
    const wasRentable = this.rentable;
    this.rentable = !this.rentable;
    this.sellable = !this.rentable;
  
    if (wasRentable !== this.rentable) {
      this.appliedFiltersCount = this.rentable ? this.appliedFiltersCount + 1 : (this.appliedFiltersCount > 0 ? this.appliedFiltersCount - 1 : 0);
    }
  
    this.route.queryParams.subscribe(params => {
      const updatedParams = { ...params, rentable: this.rentable ? 'true' : 'false', sellable: this.sellable ? 'true' : 'false', filterCount: this.appliedFiltersCount, page: '1' };
      this.router.navigate([], { queryParams: updatedParams, queryParamsHandling: 'merge' });
    });
  }

  toggleBrandFilter(filterBrand: string): void {
    const wasIncluded = this.selectedBrands.includes(filterBrand);
    if (wasIncluded) {
        this.selectedBrands = this.selectedBrands.filter((b) => b !== filterBrand);
        this.appliedFiltersCount--;
    } else {
        this.selectedBrands.push(filterBrand);
        this.appliedFiltersCount++;
    }
    this.emitFilters();
  }
  
  toggleColorFilter(color: string): void {
      const wasIncluded = this.selectedColors.includes(color);
      if (wasIncluded) {
          this.selectedColors.splice(this.selectedColors.indexOf(color), 1);
          this.appliedFiltersCount--;
      } else {
          this.selectedColors.push(color);
          this.appliedFiltersCount++;
      }
      // Rest of your code...
      this.emitFilters();
  }
  
  toggleCategoryFilter(category: string): void {
      const wasIncluded = this.selectedCategories.includes(category);
      if (wasIncluded) {
          this.selectedCategories.splice(this.selectedCategories.indexOf(category), 1);
          this.appliedFiltersCount--;
      } else {
          this.selectedCategories.push(category);
          this.appliedFiltersCount++;
      }
      this.emitFilters();
  }
  
  togglePrintSizeFilter(printSize: string): void {
      const wasIncluded = this.selectedPrintSizes.includes(printSize);
      if (wasIncluded) {
          this.selectedPrintSizes.splice(this.selectedPrintSizes.indexOf(printSize), 1);
          this.appliedFiltersCount--;
      } else {
          this.selectedPrintSizes.push(printSize);
          this.appliedFiltersCount++;
      }
      this.emitFilters();
  }
  
  togglePrintVelocityFilter(velocity: string): void {
      const wasIncluded = this.selectedPrintVelocities.includes(velocity);
      if (wasIncluded) {
          this.selectedPrintVelocities.splice(this.selectedPrintVelocities.indexOf(velocity), 1);
          this.appliedFiltersCount--;
      } else {
          this.selectedPrintVelocities.push(velocity);
          this.appliedFiltersCount++;
      }
      this.emitFilters();
  }


  resetFilters(): void {
    this.selectedPrintSizes = [];
    this.selectedColors = [];
    this.selectedBrands = [];
    this.selectedPrintVelocities = [];
    this.selectedCategories = [];
    this.rentable = undefined;
    this.sellable = undefined;
    this.appliedFiltersCount = 0;

    // Emit the changes
    this.emitFilters();
    this.appliedFiltersCountChange.emit(0);

    // Update the URL to reflect the reset filters
    this.router.navigate([], { queryParams: {} });
  }

  emitFilters(): void {
    const filters = {
        brand: this.selectedBrands.join(','),
        color: this.selectedColors.includes('Color') ? 'true' : this.selectedColors.includes('B&N') ? 'false' : undefined,
        categories: this.selectedCategories.join(','),
        printSizes: this.selectedPrintSizes.join(','),
        printVelocities: this.selectedPrintVelocities.join(','),
        sellable: this.sellable,
        rentable: this.rentable,
        filterCount: this.appliedFiltersCount,
        // Add other filters here...
    };

    this.filteredPrintersChange.emit(filters);
    this.appliedFiltersCountChange.emit(this.appliedFiltersCount);

    this.router.navigate([], { queryParams: filters, queryParamsHandling: 'merge' });
  }
  
  toggleCheckbox(data: string, group: string) {
    switch (group) {
      case 'printBrands':
        this.toggleBrandFilter(data);
        break;
      case 'printSizes':
        this.togglePrintSizeFilter(data);
        break;
      case 'printType':
        this.toggleColorFilter(data);
        break;
      case 'printVelocities':
        this.togglePrintVelocityFilter(data);
        break;
    }
  }
  

//   // updateAppliedFiltersCount(count: number): void {
//   //   this.appliedFiltersCount = count;
//   //   this.appliedFiltersCountChange.emit(this.appliedFiltersCount);
//   // }
  
//   toggleButtons() {
//     this.checked = !this.checked;
//     console.log('Toggling');
//   }

}
