import { Component, EventEmitter, OnInit, Output, Input, ElementRef, ViewChild, SimpleChanges } from '@angular/core';
import { Printer } from '../../interfaces/printer.interface';
import { PrintersService } from '../../services/printers.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ViewportScroller } from '@angular/common';

@Component({
  selector: 'printer-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit {
  @Output() filteredPrintersChange = new EventEmitter<any>(); // Output event
  @Output() appliedFiltersCountChange = new EventEmitter<number>();
  @Input() selectedCategory?: string;
  @Input() initialAppliedFiltersCount: number = 0;
  @Input() searchQuery?: string;

  // FILTERS
  printers: Printer[] = [];
  filteredPrinters: Printer[] = [];
  printSizesFilter: string[] = ['Carta', 'Doble Carta', 'Tabloide', 'Tabloide Plus', 'Rollo 4', 'Rollo 4.25','Rollo 8','Rollo 8.34', 'Rollo 13'];
  colorFilter: string[] = ['Color', 'B&N'];
  colorParam: any;
  colorFilterApplied = false;
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
  rentable: boolean = false;
  sellable: boolean = false;
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
    private router: Router,
    private viewportScroller: ViewportScroller,
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.sellable = params['sellable'] ? JSON.parse(params['sellable']) : undefined;
      this.rentable = params['rentable'] ? JSON.parse(params['rentable']) : undefined;
      this.selectedBrands = params['brand'] ? params['brand'].split(',') : [];
      this.selectedCategories = params['categories'] ? params['categories'].split(',') : [];
      this.selectedPrintSizes = params['printSizes'] ? params['printSizes'].split(',') : [];
      this.selectedPrintVelocities = params['printVelocities'] ? params['printVelocities'].split(',') : [];
      if ('color' in params) {
        this.colorParam = params['color'] === "true" ? true : false;
      } else {
        this.colorParam = null;
      }
      this.emitFilters(false);
    });
    this.printerService.getPrinters().subscribe((printers) => {
      this.brands = Array.from(new Set(printers.map(printer => printer.brand)));
      this.categories = Array.from(new Set(printers.map(printer => printer.category)));
      this.printSizesFilter = Array.from(new Set(printers.map(printer => printer.printSize)));
      console.log(this.categories);
    });
    this.checkIfMobile();
    window.addEventListener('resize', this.onResize);
    this.viewportScroller.setHistoryScrollRestoration('manual');
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
    this.sellable = !this.sellable
    this.appliedFiltersCount = this.sellable ? this.appliedFiltersCount + 1 : (this.appliedFiltersCount > 0 ? this.appliedFiltersCount - 1 : 0);
  
    this.emitFilters(true);
  }
  
  toggleRentableOptionFilter(): void {
    this.rentable = !this.rentable
    this.appliedFiltersCount = this.rentable ? this.appliedFiltersCount + 1 : (this.appliedFiltersCount > 0 ? this.appliedFiltersCount - 1 : 0);
  
  
    this.emitFilters(true);
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
    this.emitFilters(true);
  }
  
toggleColorFilter(): void {
  if (this.colorParam !== true) {
    this.colorParam = true;
    if (!this.colorFilterApplied) {
      this.appliedFiltersCount++;
      this.colorFilterApplied = true;
    }
  } else {
    this.colorParam = null;
    if (this.colorFilterApplied) {
      this.appliedFiltersCount--;
      this.colorFilterApplied = false;
    }
  }
  this.emitFilters(true);
}

toggleBWFilter(): void {
  if (this.colorParam !== false) {
    this.colorParam = false;
    if (!this.colorFilterApplied) {
      this.appliedFiltersCount++;
      this.colorFilterApplied = true;
    }
  } else {
    this.colorParam = null;
    if (this.colorFilterApplied) {
      this.appliedFiltersCount--;
      this.colorFilterApplied = false;
    }
  }
  this.emitFilters(true);
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
      this.emitFilters(true);
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
      this.emitFilters(true);
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
      this.emitFilters(true);
  }


  resetFilters(): void {
    this.selectedPrintSizes = [];
    this.colorParam = null;
    this.selectedBrands = [];
    this.selectedPrintVelocities = [];
    this.selectedCategories = [];
    this.rentable = false;
    this.sellable = false;
    this.appliedFiltersCount = 0;

    // Emit the changes
    this.emitFilters(true);
    this.appliedFiltersCountChange.emit(0);

    // Update the URL to reflect the reset filters
    this.router.navigate([], { queryParams: {} });
  }

  emitFilters(filterChanged: boolean): void {
    const filters = {
        brand: this.selectedBrands.length > 0 ? this.selectedBrands.join(',') : null,
        color: this.colorParam !== null ? this.colorParam.toString() : null,
        categories: this.selectedCategories.length > 0 ? this.selectedCategories.join(',') : null,
        printSizes: this.selectedPrintSizes.length > 0 ? this.selectedPrintSizes.join(',') : null,
        printVelocities: this.selectedPrintVelocities.length > 0 ? this.selectedPrintVelocities.join(',') : null,
        sellable: this.sellable ? this.sellable : null,
        rentable: this.rentable ? this.rentable : null,
        filterCount: this.appliedFiltersCount > 0 ? this.appliedFiltersCount : null,
        page: filterChanged ? 1 : this.route.snapshot.queryParams['page'] || 1,
        search: this.searchQuery?.trim() !== '' ? this.searchQuery : null,
        // Add other filters here...
    };

    this.filteredPrintersChange.emit(filters);
    this.appliedFiltersCountChange.emit(this.appliedFiltersCount);

    this.router.navigate([], { queryParams: filters, queryParamsHandling: 'merge' });
  }

}
