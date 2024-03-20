import {
  Component,
  EventEmitter,
  OnInit,
  Output,
  Input,
  ElementRef,
  ViewChild,
  SimpleChanges,
} from '@angular/core';
import { Printer } from 'src/app/printers/interfaces/printer.interface';
import { PrintersService } from 'src/app/printers/services/printers.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Consumible } from '../../../printers/interfaces/consumible.interface';
import { ConsumableService } from '../../services/consumables.service';

@Component({
  selector: 'app-consumible-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss'],
})
export class FilterComponent implements OnInit {
  @Output() filteredPrintersChange = new EventEmitter<any>(); // Output event
  @Output() appliedFiltersCountChange = new EventEmitter<number>();
  @Input() selectedCategory?: string;
  @Input() initialAppliedFiltersCount: number = 0;

  // FILTERS
  consumable: Consumible[] = [];
  filteredConsumables: Consumible[] = [];
  selectedOrigens: string[] = [];
  colorFilter: string[] = ['K', 'Y', 'M', 'C'];
  origens: string[] = ['OEM', 'Generico', 'Recarga'];
  colorParams: any;
  selectedBrands: string[] = [];
  selectedPrintVelocities: string[] = [];
  selectedCategories: string[] = [];
  selectedPrintVelocityStates: { [key: string]: boolean } = {};
  selectedColors: string[] = [];
  selectedYields: string[] = [];
  brands: string[] = ['Konica Minolta', 'Kyocera', 'Epson'];
  categories: string[] = [
    'Oficina',
    'Produccion',
    'Etiquetas',
    'Inyeccion de Tinta',
    'Artes Graficas',
  ];
  yields: string[] = [
    '1000-5000',
    '5000-10000',
    '10000-20000',
    '20000-50000',
    '50000-100000',
  ];

  isSectionVisibleProduct: boolean = true;
  isSectionVisibleBrand: boolean = true;
  isSectionVisibleSize: boolean = true;
  isSectionVisibleType: boolean = true;
  isSectionVisibleCategory: boolean = true;
  isSectionVisibleOrigen: boolean = true;
  isSectionVisibleYield: boolean = true;
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
    private consumableService: ConsumableService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      const sellable = params['sellable'];
      this.sellable = sellable === 'true' || sellable === '';

      const rentable = params['rentable'];
      this.rentable = rentable === 'true' || rentable === '';

      this.selectedBrands =
        typeof params['brand'] === 'string' ? params['brand'].split(',') : [];
      this.selectedCategories =
        typeof params['categories'] === 'string'
          ? params['categories'].split(',')
          : [];
      this.selectedOrigens =
        typeof params['origen'] === 'string' ? params['origen'].split(',') : [];
      this.selectedYields =
        typeof params['yield'] === 'string' ? params['yield'].split(',') : [];
      this.selectedColors =
        typeof params['color'] === 'string' ? params['color'].split(',') : [];
    });

    this.consumableService.getConsumables().subscribe(
      (consumables) => {
        this.brands = Array.from(
          new Set(consumables.map((consumable) => consumable.brand))
        );
        this.categories = Array.from(
          new Set(consumables.map((consumable) => consumable.category))
        );
        console.log('categories received..', this.categories);
      },
      (error) => {
        console.error('Error fetching consumables:', error);
      }
    );

    this.checkIfMobile();
    window.addEventListener('resize', this.onResize);
  }

  ngOnChanges(changes: SimpleChanges) {
    if ('initialAppliedFiltersCount' in changes) {
      this.appliedFiltersCount =
        changes['initialAppliedFiltersCount'].currentValue;
    }
    console.log('Filter count', this.initialAppliedFiltersCount);
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

  toggleFilterSectionCategory() {
    this.isSectionVisibleCategory = !this.isSectionVisibleCategory;
  }
  toggleFilterSectionOrigen() {
    this.isSectionVisibleOrigen = !this.isSectionVisibleOrigen;
  }
  toggleFilterSectionYield() {
    this.isSectionVisibleYield = !this.isSectionVisibleYield;
  }

  onResize = () => {
    this.filterSectionsState = window.innerWidth > 768 ? 'open' : 'closed';
  };

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
      this.appliedFiltersCount = this.sellable
        ? this.appliedFiltersCount + 1
        : this.appliedFiltersCount > 0
        ? this.appliedFiltersCount - 1
        : 0;
    }

    this.route.queryParams.subscribe((params) => {
      const updatedParams = {
        ...params,
        sellable: this.sellable ? 'true' : 'false',
        rentable: this.rentable ? 'true' : 'false',
        filterCount: this.appliedFiltersCount,
        page: '1',
      };
      this.router.navigate([], {
        queryParams: updatedParams,
        queryParamsHandling: 'merge',
      });
    });
  }

  toggleRentableOptionFilter(): void {
    const wasRentable = this.rentable;
    this.rentable = !this.rentable;
    this.sellable = !this.rentable;

    if (wasRentable !== this.rentable) {
      this.appliedFiltersCount = this.rentable
        ? this.appliedFiltersCount + 1
        : this.appliedFiltersCount > 0
        ? this.appliedFiltersCount - 1
        : 0;
    }

    this.route.queryParams.subscribe((params) => {
      const updatedParams = {
        ...params,
        rentable: this.rentable ? 'true' : 'false',
        sellable: this.sellable ? 'true' : 'false',
        filterCount: this.appliedFiltersCount,
        page: '1',
      };
      this.router.navigate([], {
        queryParams: updatedParams,
        queryParamsHandling: 'merge',
      });
    });
  }

  toggleBrandFilter(filterBrand: string): void {
    const wasIncluded = this.selectedBrands.includes(filterBrand);
    if (wasIncluded) {
      this.selectedBrands = this.selectedBrands.filter(
        (b) => b !== filterBrand
      );
      this.appliedFiltersCount--;
    } else {
      this.selectedBrands.push(filterBrand);
      this.appliedFiltersCount++;
    }
    this.emitFilters();
  }

  toggleColorFilter(color: string): void {
    const isIncluded = this.selectedColors.includes(color);

    if (isIncluded) {
      this.selectedColors = this.selectedColors.filter((c) => c !== color);
      this.appliedFiltersCount--;
    } else {
      this.selectedColors.push(color);
      this.appliedFiltersCount++;
    }

    this.emitFilters();
  }

  toggleCategoryFilter(category: string): void {
    const wasIncluded = this.selectedCategories.includes(category);
    if (wasIncluded) {
      this.selectedCategories.splice(
        this.selectedCategories.indexOf(category),
        1
      );
      this.appliedFiltersCount--;
    } else {
      this.selectedCategories.push(category);
      this.appliedFiltersCount++;
    }
    this.emitFilters();
  }

  toggleOrigenFilter(filterOrigen: string): void {
    const wasIncluded = this.selectedOrigens.includes(filterOrigen);
    if (wasIncluded) {
      this.selectedOrigens = this.selectedOrigens.filter(
        (o) => o !== filterOrigen
      );
      this.appliedFiltersCount--;
    } else {
      this.selectedOrigens.push(filterOrigen);
      this.appliedFiltersCount++;
    }
    this.emitFilters();
  }

  toggleYieldFilter(yieldValue: string): void {
    console.log('filtering by yield in filter');
    const wasIncluded = this.selectedYields.includes(yieldValue);
    if (wasIncluded) {
      this.selectedYields.splice(this.selectedYields.indexOf(yieldValue), 1);
      this.appliedFiltersCount--;
    } else {
      this.selectedYields.push(yieldValue);
      this.appliedFiltersCount++;
    }
    this.emitFilters();
  }

  resetFilters(): void {
    this.selectedColors = [];
    this.selectedBrands = [];
    this.selectedPrintVelocities = [];
    this.selectedCategories = [];
    this.selectedOrigens = [];
    this.selectedYields = [];
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
      color: this.selectedColors.join(','),
      categories: this.selectedCategories.join(','),
      origen: this.selectedOrigens.join(','),
      printVelocities: this.selectedPrintVelocities.join(','),
      yields: this.selectedYields.join(','),
      sellable: this.sellable,
      rentable: this.rentable,
      filterCount: this.appliedFiltersCount,
      // Add other filters here...
    };

    this.filteredPrintersChange.emit(filters);
    this.appliedFiltersCountChange.emit(this.appliedFiltersCount);

    this.router.navigate([], {
      queryParams: filters,
      queryParamsHandling: 'merge',
    });
  }

  toggleCheckbox(data: string, group: string) {
    switch (group) {
      case 'consumibleBrands':
        this.toggleBrandFilter(data);
        break;

      case 'colorType':
        this.toggleColorFilter(data);
        break;
      case 'categories':
        this.toggleCategoryFilter(data);
        break;

      case 'origen':
        this.toggleOrigenFilter(data);
        break;

      case 'yields':
        this.toggleYieldFilter(data);
        break;
    }
  }
}
