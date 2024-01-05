import { AfterViewInit, Component, Input, Renderer2, ViewChild, ElementRef, OnInit } from '@angular/core';
import { PrintersService } from '../../services/printers.service';
import { Printer } from '../../interfaces/printer.interface';
import { ActivatedRoute } from '@angular/router';
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
  loading = true;
  filterBarOpen = false;
  appliedFiltersCount: number = 0;
  limit = 20;
  offset = 0;
  currentPage = 1;
  totalPages = 4;
  totalPrinters = 0;

  @ViewChild(FilterComponent)
  filterComponent!: FilterComponent;

  @ViewChild('productList') productList?: ElementRef;

  constructor(private printersService: PrintersService, private route: ActivatedRoute, private renderer: Renderer2) { }

  // ngAfterViewInit(): void {
  //   this.printersService.getPrinters(this.limit, this.offset).subscribe(
  //     (printers_response: Printer[]) => {
  //       this.filteredPrinters = printers_response;
  //       console.log(printers_response);
  //       this.loading = false;
  //       this.route.queryParams.subscribe((params) => {
  //         if (params['category']) {
  //           const selectedCategory = params['category'];
  //           if (this.filterComponent) {
  //             this.filterComponent.toggleCategoryFilter(selectedCategory);
  //           }
  //         }
      
  //         if (params['rentable']) {
  //           // console.log("rentable param:", params['rentable']);
  //           const isRentable = params['rentable'] === 'false';
  //           if (this.filterComponent) {
  //             this.filterComponent.toggleRentableOptionFilter(isRentable ? 0 : 1);
  //           }
  //         }
  //       });
  //     }
  //   );
  // }

  
  ngOnInit() {
    this.fetchPrinters();
  }

  fetchPrinters(page: number = this.currentPage) {
    this.loading = true;
    const offset = (page - 1) * this.limit;
    this.printersService.getPrinters(this.limit, offset).subscribe((printers: Printer[]) => {
      this.filteredPrinters = printers;
      // console.log(printers);
      this.loading = false;
    });
    this.getTotalPrinters().subscribe(total => {
      this.totalPages = Math.ceil(total / this.limit);
    });
    this.currentPage = page;
  }

  getPageNumbers() {
    console.log(Array(this.totalPages).fill(0).map((x, i) => i + 1));
    return Array(this.totalPages).fill(0).map((x, i) => i + 1);
  }

  getTotalPrinters(): Observable<number> {
    return this.printersService.getPrinters().pipe(
      map((printers: Printer[]) => printers.length)
  );
  }
  
  scrollToContainer() {
    console.log('scrollToContainer', this.productList);
    if (this.productList) {
      this.renderer.setProperty(this.productList.nativeElement, 'scrollTop', 0);
    }
  }

  onAppliedFiltersCountChange(count: number): void {
    console.log('onAppliedFiltersCountChange', count);
    this.appliedFiltersCount = count;
  }


  handleFilteredPrintersChange(filteredPrinters: any[]): void {
    // Receive the filtered data emitted from FilterComponent
    this.filteredPrinters = filteredPrinters;
  }

  onToggleFilterBar() {
    this.filterBarOpen = !this.filterBarOpen;
  }

  closeFilterBar() {
    this.filterBarOpen = false;
  }
}
