import {
  AfterViewInit,
  Component,
  Input,
  Renderer2,
  ViewChild,
  ElementRef,
  OnInit,
  HostListener,
  ChangeDetectorRef,
  OnDestroy,
  Output,
  EventEmitter,
} from '@angular/core';
import { ViewportScroller } from '@angular/common';
import { PrintersService } from 'src/app/printers/services/printers.service';
import { Printer } from 'src/app/printers/interfaces/printer.interface';

import { ActivatedRoute, Params, Router, RouterEvent, Scroll } from '@angular/router';
import { FilterComponent } from '../../components/filter/filter.component';
import { Observable, Subject, filter, map, takeUntil } from 'rxjs';
// consumables
import { ConsumableService } from '../../services/consumables.service';
import { Consumible } from '../../../printers/interfaces/consumible.interface';
import { SearchBarComponent } from 'src/app/shared/components/search-bar/search-bar.component';

@Component({
  selector: 'app-list-page',
  templateUrl: './list-page.component.html',
  styleUrls: ['./list-page.component.scss'],
})
export class ListPageComponent implements OnInit, OnDestroy, AfterViewInit {
  @Input() selectedCategory?: string;
  filteredConsumables: Consumible[] = [];
  consumables: Consumible[] = [];
  isMobile?: boolean;
  loading = true;
  filterBarOpen = false;
  appliedFiltersCount: number = 0;
  scrollPosition: number = 0;
  scrollAnchor: string = '';
  limit = 21;
  offset = 0;
  currentPage = 1;
  totalPages = 4;
  totalConsumables = 0;
  searchQuery: string = '';
  private destroy$ = new Subject<void>();

  @ViewChild(FilterComponent)
  filterComponent!: FilterComponent;

  @ViewChild(SearchBarComponent) 
  searchBarComponent!: SearchBarComponent;

  @ViewChild('productList') productList?: ElementRef;
  

  constructor(
    private consumableService: ConsumableService,
    private route: ActivatedRoute,
    private router: Router,
    private changeDetector: ChangeDetectorRef,
  ) {}

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.adjustLimit();
    this.checkIfMobile();
  }

  ngOnInit() {
    this.checkIfMobile();
    this.adjustLimit();
    // this.handleQueryParams();
    this.fetchConsumables();
  }

  ngAfterViewInit() {
    this.handleQueryParams();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  fetchConsumables() {
  this.consumableService
    .getConsumables()
    .subscribe((consumables: Consumible[]) => {
      this.consumables = consumables;
      this.filteredConsumables = [...consumables];
      console.log('Consumables:', this.consumables);
      console.log('Filtered Consumables:', this.filteredConsumables);
      this.totalConsumables = consumables.length;
      this.totalPages = Math.ceil(this.totalConsumables / this.limit);
    });
  }

  handleQueryParams() {
    this.route.queryParams.pipe(takeUntil(this.destroy$)).subscribe((params: Params) => {
      this.appliedFiltersCount = +params['filterCount'] || 0;
      this.currentPage = +params['page'] || 1; // Use 1 as the default page number
      if (params['search']) {
        this.searchQuery = params['search'];
        if (this.searchBarComponent) {
          this.searchBarComponent.onInputChange();
        }
      }
      this.applyFilters(params);
      this.changeDetector.detectChanges();
      this.fetchConsumablesForCurrentPage();
      this.loading = false;
    });
  }

  getPageNumbers(): number[] {
    if (this.totalPages <= 5) {
      return Array.from({ length: this.totalPages }, (_, i) => i + 1);
    } else if (this.currentPage <= 4) {
      return [2, 3, 4];
    } else if (this.currentPage > this.totalPages - 3) {
      return [this.totalPages - 3, this.totalPages - 2, this.totalPages - 1];
    } else {
      return [this.currentPage, this.currentPage + 1, this.currentPage + 2];
    }
  }

  getTotalConsumables(): Observable<number> {
    return this.consumableService
      .getConsumables()
      .pipe(map((consumables: Consumible[]) => consumables.length));
  }

  adjustLimit() {
    if (window.innerWidth <= 768) {
      this.limit = 21;
    } else {
      this.limit = 12; // Or whatever your default limit is
    }
  }

  checkIfMobile() {
    this.isMobile = window.innerWidth <= 768;
  }

  navigateToPage(page: number = this.currentPage) {
    const updatedParams = { ...this.route.snapshot.queryParams, page: page };
    this.router.navigate(['/consumables/list'], {
      queryParams: updatedParams,
    });
    // window.scrollTo(0, 480);
  }

  fetchConsumablesForCurrentPage() {
    const start = (this.currentPage - 1) * this.limit;
    const end = start + this.limit;
    this.filteredConsumables = this.filteredConsumables.slice(start, end);
  }

  async handleFilteredConsumableChange(queryFilters: any): Promise<void> {
    this.applyFilters(queryFilters);
    this.currentPage = 1;

    await this.router.navigate(['consumables/list'], {
      queryParams: { page: this.currentPage, ...queryFilters },
    });

    this.fetchConsumablesForCurrentPage();
  }

  applyFilters(queryFilters: any): void {
    this.filteredConsumables = [...this.consumables];
    

    // Apply filters...
    if (queryFilters.brand) {
      const brands = queryFilters.brand.split(',');
      this.filteredConsumables = this.filteredConsumables.filter((consumable) =>
        brands.includes(consumable.brand)
      );
    }

    // Apply color filter
    if (queryFilters.color) {
      const color = queryFilters.color.split(',');
      this.filteredConsumables = this.filteredConsumables.filter((consumible) =>
        color.includes(consumible.color)
      );
    }

    // Apply category filter
    if (queryFilters.categories) {
      const categories = queryFilters.categories.split(',');
      this.filteredConsumables = this.filteredConsumables.filter((consumable) =>
        categories.includes(consumable.category)
      );
    }

    //apply origen filter
    if (queryFilters.origen) {
      const origen = queryFilters.origen.split(',');
      this.filteredConsumables = this.filteredConsumables.filter((consumable) =>
        origen.includes(consumable.origen)
      );
    }

    // Apply yield filter
    if (queryFilters.yields) {
      const yields = queryFilters.yields.split(',');
      this.filteredConsumables = this.filteredConsumables.filter((consumable) => {
        let isInRange = false;
        for (let i = 0; i < yields.length; i++) {
          const [min, max] = yields[i].split('-').map(Number);
          const consumableYield = Number(consumable.yield);
          if (consumableYield >= min && consumableYield <= max) {
            isInRange = true;
            break;
          }
        }
        return isInRange;
      });
    }

    // Apply the search filter
    if (queryFilters.search) {
      this.searchQuery = queryFilters.search;
      this.filteredConsumables = this.filteredConsumables.filter(consumable => 
        consumable.name.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    }
    // console.log('Filtered Consumables:', this.filteredConsumables);

    // Recalculate total pages
    this.totalConsumables = this.filteredConsumables.length;
    this.totalPages = Math.ceil(this.totalConsumables / this.limit);
  }

  onAppliedFiltersCountChange(count: number): void {
    this.appliedFiltersCount = count;
  }

  onToggleFilterBar() {
    this.filterBarOpen = !this.filterBarOpen;
  }

  closeFilterBar() {
    this.filterBarOpen = false;
  }

  onSearchQueryChange(searchQuery: string) {
    this.searchQuery = searchQuery.toLowerCase();
  }
}
