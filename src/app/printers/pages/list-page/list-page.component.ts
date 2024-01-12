import { AfterViewInit, Component, Input, Renderer2, ViewChild, ElementRef, OnInit, HostListener } from '@angular/core';
import { PrintersService } from '../../services/printers.service';
import { Printer } from '../../interfaces/printer.interface';
import { ActivatedRoute, Router } from '@angular/router';
import { FilterComponent } from '../../components/filter/filter.component';
import { Observable, map } from 'rxjs';

@Component({
  selector: 'app-list-page',
  templateUrl: './list-page.component.html',
  styleUrls: ['./list-page.component.scss']
})
export class ListPageComponent implements OnInit {
  @Input() selectedCategory?: string;
  @Input() rentable?: boolean;
  filteredPrinters: Printer[] = [];
  printers: Printer[] = [];
  isMobile?: boolean;
  loading = true;
  filterBarOpen = false;
  appliedFiltersCount: number = 0;
  limit = 21;
  offset = 0;
  currentPage = 1;
  totalPages = 4;
  totalPrinters = 0;

  @ViewChild(FilterComponent)
  filterComponent!: FilterComponent;

  @ViewChild('productList') productList?: ElementRef;

  constructor(
    private printersService: PrintersService,
    private route: ActivatedRoute,
    private router: Router, 
    private renderer: Renderer2) { }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
      this.adjustLimit();
      this.checkIfMobile();
  }
  
  ngOnInit() {
    this.checkIfMobile();
    this.adjustLimit();
    this.printersService.getPrinters().subscribe((printers: Printer[]) => {
      this.printers = printers;
      this.totalPrinters = printers.length;
      this.totalPages = Math.ceil(this.totalPrinters / this.limit);
      this.route.queryParams.subscribe(params => {
        this.appliedFiltersCount = +params['filterCount'] || 0;
        console.log("Listpage Filter Count", this.appliedFiltersCount)
        this.currentPage = +params['page'] || 1; // Use 1 as the default page number
        this.applyFilters(params);
        this.fetchPrintersForCurrentPage();
      });
      this.loading = false;
    });
  }

  getPageNumbers() {
    return Array(this.totalPages).fill(0).map((x, i) => i + 1);
  }

  getTotalPrinters(): Observable<number> {
    return this.printersService.getPrinters().pipe(
      map((printers: Printer[]) => printers.length)
  );
  }

  adjustLimit() {
    if (window.innerWidth <= 768) {
        this.limit = 22;
    } else {
        this.limit = 12; // Or whatever your default limit is
    }
  }

  checkIfMobile() {
    this.isMobile = window.innerWidth <= 768;
  }

  fetchPrinters(page: number = this.currentPage) {
    console.log("Click action", this.filteredPrinters)
    this.route.queryParams.subscribe(params => {
      const updatedParams = { ...params, page: page };
      this.router.navigate(['/printers/list'], { queryParams: updatedParams });
    });
    window.scrollTo(0, 480);
  }

  fetchPrintersForCurrentPage() {
    console.log('Fetching printers Before', this.filteredPrinters);
    const start = (this.currentPage - 1) * this.limit;
    const end = start + this.limit;
    this.filteredPrinters = this.filteredPrinters.slice(start, end);
    console.log('Fetching printers After', this.filteredPrinters);
  }

  async handleFilteredPrintersChange(queryFilters: any): Promise<void> {
    console.log("Query", queryFilters);
    this.applyFilters(queryFilters);
    this.currentPage = 1;
    this.fetchPrinters(this.currentPage);
    this.fetchPrintersForCurrentPage();
    await this.router.navigate(['/printers/list'], { queryParams: { page: this.currentPage, ...queryFilters } });
  }

  applyFilters(queryFilters: any): void {
    this.filteredPrinters = this.printers;

    // Apply filters...
    if (queryFilters.brand) {
        const brands = queryFilters.brand.split(',');
        console.log(brands);
        this.filteredPrinters = this.filteredPrinters.filter(printer => brands.includes(printer.brand));
        console.log("this.filteredPrinters", this.filteredPrinters);
    }

    // Apply rentable filter
    if (queryFilters.rentable) {
      const rentable = JSON.parse(queryFilters.rentable);
      this.filteredPrinters = this.filteredPrinters.filter(printer => printer.rentable === rentable);
      
    }
    
    // Apply sellable filter
    if (queryFilters.sellable) {
      const sellable = JSON.parse(queryFilters.sellable);
      this.filteredPrinters = this.filteredPrinters.filter(printer => printer.sellable === sellable);
    }

    // Apply color filter
    if (queryFilters.color !== undefined) {
      const color = JSON.parse(queryFilters.color);
      console.log("color", color);
      this.filteredPrinters = this.filteredPrinters.filter(printer => printer.color === color);
      console.log("color - printers", this.filteredPrinters);
    }

    // Apply category filter
    if (queryFilters.categories) {
      const categories = queryFilters.categories.split(',');
      console.log(categories);
      this.filteredPrinters = this.filteredPrinters.filter(printer => categories.includes(printer.category));
    }

    // Apply print size filter
    if (queryFilters.printSizes) {
      const printSizes = queryFilters.printSizes.split(',');
      console.log("filteredPrinters: printSizes", this.filteredPrinters);
      this.filteredPrinters = this.filteredPrinters.filter(printer => printSizes.includes(printer.printSize));
    }

    // Apply print velocity filter
    if (queryFilters.printVelocities) {
      const printVelocities = queryFilters.printVelocities.split(',');
      console.log("filteredPrinters: printVelocities", this.filteredPrinters);
      this.filteredPrinters = this.filteredPrinters.filter(printer => {
        console.log("Hello", printVelocities)
        let isInRange = false;
        for (let i = 0; i < printVelocities.length; i++) {
            const [min, max] = printVelocities[i].split('-').map(Number);
            console.log("min", min);
            console.log("max", max);
            const printerVelocity = Number(printer.printVelocity);
            if (printerVelocity >= min && printerVelocity <= max) {
                isInRange = true;
                break;
            }
        }
        return isInRange;
      });
    }

    // Add other filters here...

    // Recalculate total pages
    this.totalPrinters = this.filteredPrinters.length;
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
