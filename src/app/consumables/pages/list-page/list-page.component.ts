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

import { ActivatedRoute, NavigationEnd, Params, Router, RouterEvent, Scroll } from '@angular/router';
import { FilterComponent } from '../../components/filter/filter.component';
import { Observable, Subject, debounceTime, distinctUntilChanged, filter, map, takeUntil } from 'rxjs';
// consumables
import { ConsumableService } from '../../services/consumables.service';
import { Consumible } from '../../../printers/interfaces/consumible.interface';
import { SearchBarListComponent } from 'src/app/shared/components/search-bar-list/search-bar-list.component';

@Component({
  selector: 'app-list-page',
  templateUrl: './list-page.component.html',
  styleUrls: ['./list-page.component.scss'],
})
export class ListPageComponent implements OnInit, OnDestroy, AfterViewInit {
  @Input() selectedCategory?: string;
  currentPageFilteredConsumables: Consumible[] = [];
  filteredConsumables: Consumible[] = [];
  consumables: Consumible[] = [];
  isMobile?: boolean;
  isLoading = false;
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
  private searchQuerySubject = new Subject<string>();

  @ViewChild(FilterComponent)
  filterComponent!: FilterComponent;

  @ViewChild(SearchBarListComponent) 
  searchBarListComponent!: SearchBarListComponent;

  @ViewChild('productList') productList?: ElementRef;
  

  constructor(
    private consumableService: ConsumableService,
    private route: ActivatedRoute,
    private router: Router,
    private changeDetector: ChangeDetectorRef,
  ) 
  {
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
    this.adjustLimit();
    this.checkIfMobile();
  }

  ngOnInit() {
    this.fetchConsumables();
    this.checkIfMobile();
    this.adjustLimit();
  }

  ngAfterViewInit() {
    // Subscribe to query parameters and handle them
    this.route.queryParams.pipe(
      takeUntil(this.destroy$)
    ).subscribe((params: Params) => {
      console.log('Params ngAfterViewInit:', params);
      this.handleQueryParams(params);
    });
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
      this.route.queryParams.pipe(
        takeUntil(this.destroy$)
      ).subscribe((params: Params) => {
        console.log('Params fetchConsumables:', params);
        this.handleQueryParams(params);
      });
      this.isLoading = false;
    });
  }

  handleQueryParams(params: Params) {
    this.appliedFiltersCount = +params['filterCount'] || 0;
    console.log('Params inside Handle Query:', params);
    if (params['search']) {
      this.searchQuerySubject.next(params['search']);
    }
    this.applyFilters(params);
    this.changeDetector.detectChanges();
    if (params['page']) {
      console.log("HAHAHAHA")
      this.currentPage = +params['page'];
      this.sliceConsumablesForCurrentPage();
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
    // const updatedParams = { ...this.route.snapshot.queryParams, page: page };
    this.router.navigate(['/consumables/list'], {
      queryParams: { page: page },
      queryParamsHandling: 'merge'
    });
  }

  sliceConsumablesForCurrentPage() {
    const start = (this.currentPage - 1) * this.limit;
    const end = start + this.limit;
    this.currentPageFilteredConsumables = this.filteredConsumables.slice(start, end);
  }

  async handleFilteredConsumableChange(queryFilters: Params): Promise<void> {
    this.applyFilters(queryFilters);
    const queryParams: Params = { ...queryFilters };
    if (!queryParams['page']) {
      queryParams['page'] = this.currentPage;
    }
  
    await this.router.navigate(['consumables/list'], {
      queryParams: queryParams,
      queryParamsHandling: 'merge',
    });
    console.log('queryFilters inside Handle Filtered Consumables:', queryFilters);
    this.sliceConsumablesForCurrentPage();
  }

  applyFilters(queryFilters: Params): void {

    // Update the search query
    if (queryFilters['search']) {
      this.searchQuery = queryFilters['search'];
    }

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

    // Apply the search filter
    if (this.searchQuery) {
      this.filteredConsumables = this.filteredConsumables.filter(consumable => 
        consumable.name.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    }

    console.log('Params:', queryFilters);
    console.log('Filtered Consumables:', this.filteredConsumables);

    // Recalculate total pages
    this.totalConsumables = this.filteredConsumables.length;
    this.totalPages = Math.ceil(this.totalConsumables / this.limit);

    // Update the current page
    this.sliceConsumablesForCurrentPage();
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
