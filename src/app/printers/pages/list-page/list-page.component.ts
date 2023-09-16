import { AfterViewInit, Component, Input, Renderer2, ViewChild, ElementRef } from '@angular/core';
import { PrintersService } from '../../services/printers.service';
import { Printer } from '../../interfaces/printer.interface';
import { ActivatedRoute } from '@angular/router';
import { FilterComponent } from '../../components/filter/filter.component';

@Component({
  selector: 'app-list-page',
  templateUrl: './list-page.component.html',
  styleUrls: ['./list-page.component.scss']
})
export class ListPageComponent implements AfterViewInit {
  @Input() selectedCategory?: string;
  @Input() rentable?: boolean;
  filteredPrinters: Printer[] = [];
  printers: Printer[] = [];
  loading = true;
  filterBarOpen = false;

  @ViewChild(FilterComponent)
  filterComponent!: FilterComponent;

  @ViewChild('productList') productList?: ElementRef;

  constructor(private printersService: PrintersService, private route: ActivatedRoute, private renderer: Renderer2) { }

  ngAfterViewInit(): void {
    

    this.printersService.getPrinters().subscribe(
      (printers_response: Printer[]) => {
        this.filteredPrinters = printers_response;
        this.loading = false;
        this.route.queryParams.subscribe((params) => {
          if (params['category']) {
            const selectedCategory = params['category'];
            if (this.filterComponent) {
              this.filterComponent.toggleCategoryFilter(selectedCategory);
            }
          }
      
          if (params['rentable']) {
            // console.log("rentable param:", params['rentable']);
            const isRentable = params['rentable'] === 'false';
            if (this.filterComponent) {
              this.filterComponent.toggleRentableOptionFilter(isRentable);
            }
          }
        });
      }
    );
  }
  
  scrollToContainer() {
    console.log('scrollToContainer', this.productList);
    if (this.productList) {
      this.renderer.setProperty(this.productList.nativeElement, 'scrollTop', 0);
    }
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
