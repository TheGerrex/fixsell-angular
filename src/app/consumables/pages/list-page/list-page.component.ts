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
} from '@angular/core';
import { ViewportScroller } from '@angular/common';
import { PrintersService } from 'src/app/printers/services/printers.service';
import { Printer } from 'src/app/printers/interfaces/printer.interface';

import { ActivatedRoute, Router, RouterEvent, Scroll } from '@angular/router';
import { FilterComponent } from '../../components/filter/filter.component';
import { Observable, filter, map } from 'rxjs';
// consumables
import { ConsumableService } from '../../services/consumables.service';
import { Consumible } from '../../../printers/interfaces/consumible.interface';

@Component({
  selector: 'app-list-page',
  templateUrl: './list-page.component.html',
  styleUrls: ['./list-page.component.scss'],
})
export class ListPageComponent implements OnInit {
  @Input() selectedCategory?: string;
  @Input() rentable?: boolean;
  filteredConsumable: Consumible[] = [];
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
  totalPrinters = 0;

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
    this.router.events
      .pipe(filter((e): e is Scroll => e instanceof Scroll))
      .subscribe((e) => {
        if (e.position) {
          // The user has just used the back/forward button. The router
          // will restore the scroll position, but we want to delay this
          // until after the data has finished loading.
          // So, save the scroll position and tell the router to scroll to the top.
          this.scrollPosition = e.position[1];
          this.viewportScroller.scrollToPosition([0, 0]);
        } else if (e.anchor) {
          // The user just navigated to an anchor link. The router will
          // scroll to the anchor element, but we want to delay this until
          // after the data has finished loading.
          // So, save the anchor and tell the router to scroll to the top.
          this.scrollAnchor = e.anchor;
          this.viewportScroller.scrollToPosition([0, 0]);
        }
      });
    this.checkIfMobile();
    this.adjustLimit();
    this.consumableService
      .getConsumables()
      .subscribe((consumables: Consumible[]) => {
        this.consumables = consumables;
        this.totalPrinters = consumables.length;
        this.totalPages = Math.ceil(this.totalPrinters / this.limit);
        this.route.queryParams.subscribe((params) => {
          this.appliedFiltersCount = +params['filterCount'] || 0;
          console.log('Listpage Filter Count', this.appliedFiltersCount);
          this.currentPage = +params['page'] || 1; // Use 1 as the default page number
          this.applyFilters(params);
          this.fetchPrintersForCurrentPage();
          this.loading = false;
          this.changeDetector.detectChanges();
          if (this.scrollPosition) {
            this.viewportScroller.scrollToPosition([0, this.scrollPosition]);
            this.scrollPosition = 0;
          } else if (this.scrollAnchor) {
            this.viewportScroller.scrollToAnchor(this.scrollAnchor);
            this.scrollAnchor = '';
          }
        });
      });
  }

  getPageNumbers() {
    return Array(this.totalPages)
      .fill(0)
      .map((x, i) => i + 1);
  }

  getTotalConsumables(): Observable<number> {
    return this.consumableService
      .getConsumables()
      .pipe(map((consumables: Consumible[]) => consumables.length));
  }

  adjustLimit() {
    if (window.innerWidth <= 7568) {
      this.limit = 22;
    } else {
      this.limit = 12; // Or whatever your default limit is
    }
  }

  checkIfMobile() {
    this.isMobile = window.innerWidth <= 768;
  }

  fetchPrinters(page: number = this.currentPage) {
    console.log('Click action', this.filteredConsumable);
    this.route.queryParams.subscribe((params) => {
      const updatedParams = { ...params, page: page };
      this.router.navigate(['/consumables/list'], {
        queryParams: updatedParams,
      });
    });
    window.scrollTo(0, 480);
  }

  fetchPrintersForCurrentPage() {
    console.log('Fetching printers Before', this.filteredConsumable);
    const start = (this.currentPage - 1) * this.limit;
    const end = start + this.limit;
    this.filteredConsumable = this.filteredConsumable.slice(start, end);
    console.log('Fetching printers After', this.filteredConsumable);
  }

  async handleFilteredPrintersChange(queryFilters: any): Promise<void> {
    console.log('Query', queryFilters);
    this.applyFilters(queryFilters);
    this.currentPage = 1;
    this.fetchPrinters(this.currentPage);
    this.fetchPrintersForCurrentPage();
    await this.router.navigate(['consumables/list'], {
      queryParams: { page: this.currentPage, ...queryFilters },
    });
  }

  applyFilters(queryFilters: any): void {
    this.filteredConsumable = this.consumables;

    // Apply filters...
    if (queryFilters.brand) {
      const brands = queryFilters.brand.split(',');
      console.log(brands);
      this.filteredConsumable = this.filteredConsumable.filter((consumable) =>
        brands.includes(consumable.brand)
      );
      console.log('this.filteredPrinters', this.filteredConsumable);
    }

    // Apply color filter
    if (queryFilters.color) {
      const color = queryFilters.color.split(',');
      console.log('color', color);
      this.filteredConsumable = this.filteredConsumable.filter((consumible) =>
        color.includes(consumible.color)
      );
      console.log('color - printers', this.filteredConsumable);
    }

    // Apply category filter
    if (queryFilters.categories) {
      const categories = queryFilters.categories.split(',');
      console.log(categories);
      this.filteredConsumable = this.filteredConsumable.filter((consumable) =>
        categories.includes(consumable.category)
      );
    }

    //apply origen filter
    if (queryFilters.origen) {
      const origen = queryFilters.origen.split(',');
      console.log(origen);
      this.filteredConsumable = this.filteredConsumable.filter((consumable) =>
        origen.includes(consumable.origen)
      );
    }

    // Apply yield filter
    if (queryFilters.yields) {
      console.log('filtering by yield');
      const yields = queryFilters.yields.split(',');
      console.log('filteredConsumable: yields', this.filteredConsumable);
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
    this.totalPrinters = this.filteredConsumable.length;
    this.totalPages = Math.ceil(this.totalPrinters / this.limit);
  }

  scrollToContainer() {
    console.log('scrollToContainer', this.productList);
    if (this.productList) {
      this.renderer.setProperty(this.productList.nativeElement, 'scrollTop', 0);
    }
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
}
