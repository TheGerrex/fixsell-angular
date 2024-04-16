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

@Component({
  selector: 'app-list-page',
  templateUrl: './list-page.component.html',
  styleUrls: ['./list-page.component.scss'],
})
export class ListPageComponent implements OnInit, OnDestroy {
  @Input() selectedCategory?: string;
  @Output() searchQueryChange = new EventEmitter<string>();
  filteredConsumable: Consumible[] = [];
  originalConsumables: Consumible[] = [];
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

  @ViewChild('productList') productList?: ElementRef;

  constructor(
    private consumableService: ConsumableService,
    private route: ActivatedRoute,
    private router: Router,
    private renderer: Renderer2,
    private changeDetector: ChangeDetectorRef,
    private viewportScroller: ViewportScroller
  ) {}

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.adjustLimit();
    this.checkIfMobile();
  }

  ngOnInit() {
    // this.handleRouterEvents();
    this.checkIfMobile();
    this.adjustLimit();
    this.fetchConsumables();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  // handleRouterEvents() {
  //   this.router.events
  //     .pipe(filter((e): e is Scroll => e instanceof Scroll))
  //     .subscribe((e) => {
  //       if (e.position) {
  //         this.scrollPosition = e.position[1];
  //         this.viewportScroller.scrollToPosition([0, 0]);
  //       } else if (e.anchor) {
  //         this.scrollAnchor = e.anchor;
  //         this.viewportScroller.scrollToPosition([0, 0]);
  //       }
  //     });
  // }

  fetchConsumables() {
  this.consumableService
    .getConsumables()
    .subscribe((consumables: Consumible[]) => {
      this.originalConsumables = consumables;
      this.filteredConsumable = [...consumables];
      console.log('Consumables:', this.consumables);
      this.totalConsumables = consumables.length;
      this.totalPages = Math.ceil(this.totalConsumables / this.limit);
      this.handleQueryParams();
    });
  }

  handleQueryParams() {
    this.route.queryParams.pipe(takeUntil(this.destroy$)).subscribe((params: Params) => {
      this.appliedFiltersCount = +params['filterCount'] || 0;
      this.currentPage = +params['page'] || 1; // Use 1 as the default page number
      this.applyFilters(params);
      this.fetchConsumablesForCurrentPage();
      this.loading = false;
      this.changeDetector.detectChanges();
      // this.handleScrollPosition();
    });
  }

  handleScrollPosition() {
    if (this.scrollPosition) {
      this.viewportScroller.scrollToPosition([0, this.scrollPosition]);
      this.scrollPosition = 0;
    } else if (this.scrollAnchor) {
      this.viewportScroller.scrollToAnchor(this.scrollAnchor);
      this.scrollAnchor = '';
    }
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
    this.filteredConsumable = this.filteredConsumable.slice(start, end);
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
    this.filteredConsumable = [...this.originalConsumables];

    // Apply filters...
    if (queryFilters.brand) {
      const brands = queryFilters.brand.split(',');
      this.filteredConsumable = this.filteredConsumable.filter((consumable) =>
        brands.includes(consumable.brand)
      );
    }

    // Apply color filter
    if (queryFilters.color) {
      const color = queryFilters.color.split(',');
      this.filteredConsumable = this.filteredConsumable.filter((consumible) =>
        color.includes(consumible.color)
      );
    }

    // Apply category filter
    if (queryFilters.categories) {
      const categories = queryFilters.categories.split(',');
      this.filteredConsumable = this.filteredConsumable.filter((consumable) =>
        categories.includes(consumable.category)
      );
    }

    //apply origen filter
    if (queryFilters.origen) {
      const origen = queryFilters.origen.split(',');
      this.filteredConsumable = this.filteredConsumable.filter((consumable) =>
        origen.includes(consumable.origen)
      );
    }

    // Apply yield filter
    if (queryFilters.yields) {
      const yields = queryFilters.yields.split(',');
      this.filteredConsumable = this.filteredConsumable.filter((consumable) => {
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

    // Recalculate total pages
    this.totalConsumables = this.filteredConsumable.length;
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
    this.searchQueryChange.emit(this.searchQuery);
    // Apply the filters and the search filter
    this.applyFiltersAndSearch();
  }

  applyFiltersAndSearch(): void {
    // Apply the filters
    let filteredConsumables = this.originalConsumables;
  
    // Apply the filters from the query parameters
    if (this.appliedFiltersCount > 0) {
      filteredConsumables = filteredConsumables.filter(consumable => this.applyFilters(consumable));
    }
  
    // Apply the search filter
    if (this.searchQuery) {
      filteredConsumables = filteredConsumables.filter(consumable => consumable.name.toLowerCase().includes(this.searchQuery));
    }
  
    // Update the displayed consumables
    this.filteredConsumable = filteredConsumables;
  }
}
