import {
  Component,
  EventEmitter,
  OnInit,
  Output,
  Input,
  ElementRef,
  ViewChild,
  SimpleChanges,
  OnDestroy,
  OnChanges,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Consumible } from '../../../printers/interfaces/consumible.interface';
import { ConsumableService } from '../../services/consumables.service';
import { ViewportScroller } from '@angular/common';

@Component({
  selector: 'app-consumible-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss'],
})
export class FilterComponent implements OnInit, OnDestroy, OnChanges {
  @Output() filteredConsumableChange = new EventEmitter<any>(); // Output event
  @Output() appliedFiltersCountChange = new EventEmitter<number>();
  @Input() selectedCategory?: string;
  @Input() initialAppliedFiltersCount: number = 0;
  @Input() searchQuery?: string;

  // FILTERS
  consumable: Consumible[] = [];
  filteredConsumables: Consumible[] = [];
  selectedOrigens: string[] = [];
  colorFilter: string[] = ['K', 'Y', 'M', 'C'];
  colorDisplayNames: { [key: string]: string } = {
    K: 'Negro',
    Y: 'Amarillo',
    M: 'Magenta',
    C: 'Cyan',
    MK: 'Negro Matte',
    BK: 'Negro Gloss',
  };
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
  appliedFiltersCount: number = 0;
  pageLoaded = false;
  filterSectionsState: string = window.innerWidth > 768 ? 'open' : 'closed';
  checked = false;
  isMobile?: boolean;

  constructor(
    private consumableService: ConsumableService,
    private route: ActivatedRoute,
    private router: Router,
    private viewportScroller: ViewportScroller,
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.selectedBrands =
        typeof params['brand'] === 'string' ? params['brand'].split(',') : [];
      this.selectedCategories =
        typeof params['categories'] === 'string'
          ? params['categories'].split(',')
          : [];
      this.selectedOrigens =
        typeof params['origen'] === 'string' ? params['origen'].split(',') : [];
      this.selectedYields =
        typeof params['yields'] === 'string' ? params['yields'].split(',') : [];
      this.selectedColors =
        typeof params['color'] === 'string' ? params['color'].split(',') : [];
      this.searchQuery = params['search'] || '';

      // Emit the filteredPrintersChange event with the current filters
      this.emitFilters(false);
    });

    this.consumableService.getConsumables().subscribe(
      (consumables) => {
        this.brands = Array.from(
          new Set(consumables.map((consumable) => consumable.brand))
        );
        this.categories = Array.from(
          new Set(consumables.map((consumable) => consumable.category))
        );
        this.origens = Array.from(
          new Set(consumables.map((consumable) => consumable.origen))
        );
        this.colorFilter = Array.from(
          new Set(consumables.map((consumable) => consumable.color))
        );
        
      },
      (error) => {
        console.error('Error fetching consumables:', error);
      }
    );

    this.checkIfMobile();
    window.addEventListener('resize', this.onResize);
    this.viewportScroller.setHistoryScrollRestoration('manual');
  }

  ngOnDestroy(): void {
    window.removeEventListener('resize', this.onResize);
    this.viewportScroller.setHistoryScrollRestoration('auto');
  }

  ngOnChanges(changes: SimpleChanges) {
    if ('searchQuery' in changes) {
      this.emitFilters(true);
    }
    if ('initialAppliedFiltersCount' in changes) {
      this.appliedFiltersCount =
        changes['initialAppliedFiltersCount'].currentValue;
    }
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

  scrollToTop() {
    this.viewportScroller.scrollToPosition([0, 480]);
  }

  checkIfMobile() {
    this.isMobile = window.innerWidth <= 768;
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
    this.emitFilters(true);
    
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

    this.emitFilters(true);
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
    this.emitFilters(true);
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
    this.emitFilters(true);
  }

  toggleYieldFilter(yieldValue: string): void {
    const wasIncluded = this.selectedYields.includes(yieldValue);
    if (wasIncluded) {
      this.selectedYields.splice(this.selectedYields.indexOf(yieldValue), 1);
      this.appliedFiltersCount--;
    } else {
      this.selectedYields.push(yieldValue);
      this.appliedFiltersCount++;
    }
    
    this.emitFilters(true);
  }

  resetFilters(): void {
    this.selectedColors = [];
    this.selectedBrands = [];
    this.selectedPrintVelocities = [];
    this.selectedCategories = [];
    this.selectedOrigens = [];
    this.selectedYields = [];
    this.appliedFiltersCount = 0;

    // Emit the changes
    this.emitFilters(true);
    this.appliedFiltersCountChange.emit(0);

    // Update the URL to reflect the reset filters
    // this.router.navigate([], { queryParams: {} });
  }

  emitFilters(filterChanged: boolean): void {
    const filters = {
      brand: this.selectedBrands.length > 0 ? this.selectedBrands.join(',') : null,
      color: this.selectedColors.length > 0 ? this.selectedColors.join(',') : null,
      categories: this.selectedCategories.length > 0 ? this.selectedCategories.join(',') : null,
      origen: this.selectedOrigens.length > 0 ? this.selectedOrigens.join(',') : null,
      yields: this.selectedYields.length > 0 ? this.selectedYields.join(',') : null,
      filterCount: this.appliedFiltersCount > 0 ? this.appliedFiltersCount : null,
      page: filterChanged ? 1 : this.route.snapshot.queryParams['page'] || 1,
      search: this.searchQuery?.trim() !== '' ? this.searchQuery : null,
    };
    console.log('filters:', filters);
    this.filteredConsumableChange.emit(filters);
    this.appliedFiltersCountChange.emit(this.appliedFiltersCount);
  
    this.router.navigate([], {
      queryParams: filters,
      queryParamsHandling: 'merge',
    })
  }
}
