import { Component, Input, OnInit, HostListener, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Params, Router } from '@angular/router';
import { Subject, debounceTime, filter, takeUntil } from 'rxjs';
import { PrintersService } from '../../services/printers.service';
import { Printer } from '../../interfaces/printer.interface';

@Component({
  selector: 'printers-list-page',
  templateUrl: './list-page.component.html',
  styleUrls: ['./list-page.component.scss']
})
export class ListPageComponent implements OnInit {
  @Input() selectedCategory?: string;
  @Input() rentable?: boolean;
  currentPageFilteredPrinters: Printer[] = [];
  filteredPrinters: Printer[] = [];
  printers: Printer[] = [];
  isMobile?: boolean;
  isLoading = true;
  filterBarOpen = false;
  appliedFiltersCount: number = 0;
  scrollPosition: number = 0;
  scrollAnchor: string = "";
  limit = 25;
  offset = 0;
  currentPage = 1;
  totalPages = 4;
  totalPrinters = 0;
  searchQuery: string = '';
  private destroy$ = new Subject<void>();
  private searchQuerySubject = new Subject<string>();

  constructor(
    private printersService: PrintersService,
    private route: ActivatedRoute,
    private router: Router,
    private changeDetector: ChangeDetectorRef
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
    this.fetchPrinters();
    this.checkIfMobile();
    this.handleQueryParamsOnChanges();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  fetchPrinters() {
    this.printersService.getPrinters().subscribe((printers: Printer[]) => {
      this.isLoading = true;
      this.printers = printers;
      this.filteredPrinters = [...printers];
      this.totalPrinters = printers.length;
      this.totalPages = Math.ceil(this.totalPrinters / this.limit);
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
    this.currentPageFilteredPrinters = this.filteredPrinters.slice(start, end);
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

  async handleFilteredPrintersChange(queryFilters: Params): Promise<void> {
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
    this.filteredPrinters = [...this.printers];

    // Apply filters...
    if (queryFilters['brand']) {
      const brands = queryFilters['brand'].split(',');
      this.filteredPrinters = this.filteredPrinters.filter(printer => brands.includes(printer.brand));
    }

    // Apply rentable filter
    if (queryFilters['rentable']) {
      const rentable = JSON.parse(queryFilters['rentable']);
      this.filteredPrinters = this.filteredPrinters.filter(printer => printer.rentable === rentable);

    }

    // Apply sellable filter
    if (queryFilters['sellable']) {
      const sellable = JSON.parse(queryFilters['sellable']);
      this.filteredPrinters = this.filteredPrinters.filter(printer => printer.sellable === sellable);
    }

    // Apply color filter
    if (queryFilters['color']) {
      const color = JSON.parse(queryFilters['color']);
      this.filteredPrinters = this.filteredPrinters.filter(printer => printer.color === color);
    }

    // Apply category filter
    if (queryFilters['categories']) {
      const categories = queryFilters['categories'].split(',');
      this.filteredPrinters = this.filteredPrinters.filter(printer => categories.includes(printer.category));
    }

    // Apply print size filter
    if (queryFilters['printSizes']) {
      const printSizes = queryFilters['printSizes'].split(',');
      this.filteredPrinters = this.filteredPrinters.filter(printer => printSizes.includes(printer.printSize));
    }

    // Apply print velocity filter
    if (queryFilters['printVelocities']) {
      const printVelocities = queryFilters['printVelocities'].split(',');
      this.filteredPrinters = this.filteredPrinters.filter(printer => {
        let isInRange = false;
        for (let i = 0; i < printVelocities.length; i++) {
          const [min, max] = printVelocities[i].split('-').map(Number);
          const printerVelocity = Number(printer.printVelocity);
          if (printerVelocity >= min && printerVelocity <= max) {
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
        this.filteredPrinters = this.filteredPrinters.filter(printer =>
          (printer.deals && printer.deals.length > 0) ||
          (printer.packages && printer.packages.length > 0)
        );
      }
    }

    // Apply the search filter
    if (this.searchQuery) {
      this.filteredPrinters = this.filteredPrinters.filter(printer =>
        printer.model.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    }

    // Add other filters here...

    // Recalculate total pages
    this.totalPrinters = this.filteredPrinters.length;
    this.totalPages = Math.ceil(this.totalPrinters / this.limit);

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
