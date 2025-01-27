import { Component, Input, OnInit, HostListener, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Params, Router } from '@angular/router';
import { Subject, debounceTime, filter, takeUntil } from 'rxjs';
import { ConsumableService } from '../../services/consumables.service';
import { Consumible } from '../../../printers/interfaces/consumible.interface';

@Component({
  selector: 'consumibles-list-page',
  templateUrl: './list-page.component.html',
  styleUrls: ['./list-page.component.scss'],
})
export class ListPageComponent implements OnInit, OnDestroy {
  @Input() selectedCategory?: string;
  currentPageFilteredConsumables: Consumible[] = [];
  filteredConsumables: Consumible[] = [];
  consumables: Consumible[] = [];
  isMobile?: boolean;
  isLoading = true;
  filterBarOpen = false;
  appliedFiltersCount: number = 0;
  scrollPosition: number = 0;
  scrollAnchor: string = '';
  limit: number = 25;
  offset: number = 0;
  currentPage: number = 1;
  totalPages: number = 4;
  totalConsumables: number = 0;
  searchQuery: string = '';
  private destroy$ = new Subject<void>();
  private searchQuerySubject = new Subject<string>();


  constructor(
    private consumableService: ConsumableService,
    private route: ActivatedRoute,
    private router: Router,
    private changeDetector: ChangeDetectorRef,
  ) {
    this.router.events.pipe(
      filter((event): event is NavigationEnd => event instanceof NavigationEnd),
      takeUntil(this.destroy$)
    ).subscribe(() => {
      window.scrollTo(0, 480);
    });
    this.searchQuerySubject.pipe(
      debounceTime(10)
    ).subscribe(searchQuery => {
      this.searchQuery = searchQuery;
    });
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.checkIfMobile();
  }

  ngOnInit() {
    this.fetchConsumables();
    this.checkIfMobile();
    this.handleQueryParamsOnChanges();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  fetchConsumables() {
    this.consumableService.getConsumables().subscribe((consumables: Consumible[]) => {
      this.isLoading = true;
      this.consumables = consumables;
      this.filteredConsumables = [...consumables];
      this.totalConsumables = consumables.length;
      this.totalPages = Math.ceil(this.totalConsumables / this.limit);
      this.sliceConsumablesForCurrentPage();
      this.isLoading = false;

      // Subscribe to the query parameters after the consumables have been fetched
      this.route.queryParams.subscribe(params => {
        this.handleQueryParams(params);
      });
    });
  }

  sliceConsumablesForCurrentPage() {
    const start = (this.currentPage - 1) * this.limit;
    const end = start + this.limit;
    this.currentPageFilteredConsumables = this.filteredConsumables.slice(start, end);
  }

  handleQueryParams(params: Params) {
    if (params['search']) {
      this.searchQuerySubject.next(params['search']);
    }
    if (params['page']) {
      this.currentPage = +params['page'];
      this.sliceConsumablesForCurrentPage();
    }
    if (params['filterCount']) {
      this.appliedFiltersCount = +params['filterCount'];
    }
    this.applyFilters(params);
    this.changeDetector.detectChanges();
  }

  handleQueryParamsOnChanges() {
    this.route.queryParams.pipe(
      takeUntil(this.destroy$)
    ).subscribe((params: Params) => {
      if (params['page']) {
        this.currentPage = +params['page'];
      }
      this.handleQueryParams(params);
    });
  }

  async handleFilteredConsumableChange(queryFilters: Params): Promise<void> {
    const currentFilters = this.route.snapshot.queryParams;
    const filtersChanged = JSON.stringify(queryFilters) !== JSON.stringify(currentFilters);

    this.applyFilters(queryFilters);
    const queryParams: Params = { ...queryFilters };

    // Only reset the page number to 1 if the filters have changed
    if (filtersChanged) {
      queryParams['page'] = 1;
    }

    await this.router.navigate([], {
      relativeTo: this.route,
      queryParams: queryParams,
      queryParamsHandling: 'merge',
    }).then(() => {
      this.sliceConsumablesForCurrentPage();
    });
  }


  applyFilters(queryFilters: Params): void {

    this.filteredConsumables = [...this.consumables];

    // Apply filters...
    if (queryFilters['brand']) {
      const brands = queryFilters['brand'].split(',');
      this.filteredConsumables = this.filteredConsumables.filter((consumable) =>
        brands.includes(consumable.brand)
      );
    }

    // Apply color filter
    if (queryFilters['color']) {
      const color = queryFilters['color'].split(',');
      this.filteredConsumables = this.filteredConsumables.filter((consumible) =>
        color.includes(consumible.color)
      );
    }

    // Apply category filter
    if (queryFilters['categories']) {
      const categories = queryFilters['categories'].split(',');
      this.filteredConsumables = this.filteredConsumables.filter((consumable) =>
        categories.includes(consumable.category)
      );
    }

    //apply origen filter
    if (queryFilters['origen']) {
      const origen = queryFilters['origen'].split(',');
      this.filteredConsumables = this.filteredConsumables.filter((consumable) =>
        origen.includes(consumable.origen)
      );
    }

    // Apply yield filter
    if (queryFilters['yields']) {
      const yields = queryFilters['yields'].split(',');
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

    // Apply deal filter
    if (queryFilters['deal']) {
      const deal = JSON.parse(queryFilters['deal']);
      if (deal) {
        this.filteredConsumables = this.filteredConsumables.filter(printer =>
          (printer.deals && printer.deals.length > 0)
        );
      }
    }

    // Apply the search filter
    if (this.searchQuery) {
      this.filteredConsumables = this.filteredConsumables.filter(consumable =>
        consumable.name.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    }

    // Recalculate total pages
    this.totalConsumables = this.filteredConsumables.length;
    this.totalPages = Math.ceil(this.totalConsumables / this.limit);

    // Update the current page
    this.sliceConsumablesForCurrentPage();
  }

  getPageNumbers(): number[] {
    const totalPages = this.totalPages;
    const currentPage = this.currentPage;
    const maxPagesToShow = 5;
    const pages = [];

    if (totalPages <= maxPagesToShow) {
      for (let i = 2; i < totalPages; i++) {
        pages.push(i);
      }
    } else {
      let startPage = Math.max(2, currentPage - 1);
      let endPage = Math.min(totalPages - 1, currentPage + 1);

      if (currentPage <= 3) {
        startPage = 2;
        endPage = maxPagesToShow - 1;
      } else if (currentPage >= totalPages - 2) {
        startPage = totalPages - (maxPagesToShow - 2);
        endPage = totalPages - 1;
      }

      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }
    }

    return pages;
  }

  checkIfMobile() {
    this.isMobile = window.innerWidth <= 768;
  }

  navigateToPage(page: number = this.currentPage) {
    const currentFilters = this.route.snapshot.queryParams;
    const newParams = { ...currentFilters, page: page };

    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: newParams,
    });
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
