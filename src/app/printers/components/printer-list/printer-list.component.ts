import {
  AfterViewInit,
  Component,
  ElementRef,
  HostListener,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Printer } from 'src/app/printers/interfaces/printer.interface';
import { PrintersService } from 'src/app/printers/services/printers.service';
import Swiper from 'swiper';
import { SwiperContainer } from 'swiper/element';
import {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  Thumbs,
  Autoplay,
} from 'swiper/modules';
import { SwiperOptions } from 'swiper/types';

// install Swiper modules
Swiper.use([Navigation, Pagination, Scrollbar, A11y, Thumbs, Autoplay]);

@Component({
  selector: 'printer-list',
  templateUrl: './printer-list.component.html',
  styleUrls: ['./printer-list.component.scss'],
})
export class PrinterListComponent implements OnInit, AfterViewInit {
  @Input() categories: string[] = [];
  @Input() deals!: boolean;
  @Input() limit: number = 15;
  @Input() offset: number = 0;
  @Input() packages!: boolean;
  @Input() sellable!: boolean;
  @Input() rentable!: boolean;
  @Input() brands: string[] = [];
  @Input() color!: boolean;
  @Input() price!: number;
  @Input() tags: string[] = [];
  @Input() printVelocity: string[] = [];
  @Input() maxPrintSize!: string;
  @Input() printSize: string[] = [];
  @Input() duplexUnit!: boolean;
  @Input() applicableOS!: string;
  @Input() printerFunctions!: string;
  @Input() barcode: string[] = [];
  @ViewChild('swiperContainer') swiperContainer!: ElementRef<SwiperContainer>;
  printers: Printer[] = [];
  isLoading = true;
  noDealsMessage = 'No hay productos o promociones disponibles en este momento';
  isBeginning = true;
  isEnd = false;
  showNavigation = true;

  swiperOptions: SwiperOptions = {
    slidesPerView: 1.25,
    spaceBetween: 8,
    autoplay: false,
    // scrollbar: { draggable: true },
    breakpoints: {
      '@0.00': {
        slidesPerView: 1.25,
        spaceBetween: 8,
      },
      '@0.45': {
        slidesPerView: 2.25,
        spaceBetween: 12,
      },
      '@0.75': {
        slidesPerView: 3.25,
        spaceBetween: 12,
      },
      '@1.00': {
        slidesPerView: 3.25,
        spaceBetween: 16,
      },
      '@1.50': {
        slidesPerView: 4.25,
        spaceBetween: 24,
      },
    },
    on: {
      init: () => this.updateNavigation(),
      slideChange: () => this.updateNavigation(),
    },
  };

  constructor(private printersService: PrintersService) { }

  ngOnInit(): void {
    this.loadPrinters();
  }

  loadPrinters(): void {
    const filters: any = {};

    if (this.deals !== undefined) {
      filters.deals = this.deals;
    }
    if (this.packages !== undefined) {
      filters.packages = this.packages;
    }
    if (this.categories.length > 0) {
      filters.category = this.categories.join(',');
    }
    if (this.sellable !== undefined) {
      filters.sellable = this.sellable;
    }
    if (this.rentable !== undefined) {
      filters.rentable = this.rentable;
    }
    if (this.brands.length > 0) {
      filters.brand = this.brands.join(',');
    }
    if (this.color !== undefined) {
      filters.color = this.color;
    }
    if (this.price !== undefined) {
      filters.price = this.price;
    }
    if (this.tags.length > 0) {
      filters.tags = this.tags.join(',');
    }
    if (this.printVelocity.length > 0) {
      filters.printVelocity = this.printVelocity.join(',');
    }
    if (this.maxPrintSize !== undefined) {
      filters.maxPrintSize = this.maxPrintSize;
    }
    if (this.printSize.length > 0) {
      filters.printSize = this.printSize.join(',');
    }
    if (this.duplexUnit !== undefined) {
      filters.duplexUnit = this.duplexUnit;
    }
    if (this.applicableOS !== undefined) {
      filters.applicableOS = this.applicableOS;
    }
    if (this.printerFunctions !== undefined) {
      filters.printerFunctions = this.printerFunctions;
    }
    if (this.barcode.length > 0) {
      filters.barcode = this.barcode.join(',');
    }

    this.isLoading = true;
    this.printersService.getPrinters(this.limit, this.offset, filters).subscribe((printers: Printer[]) => {
      const currentDate = new Date();

      let filteredPrinters = printers;

      if (filters.deals === true) {
        // Filter out expired deals on the frontend
        filteredPrinters = filteredPrinters
          .map(printer => ({
            ...printer,
            deals: printer.deals.filter(deal => new Date(deal.dealEndDate) >= currentDate)
          }))
          .filter(printer => printer.deals.length > 0); // Only include printers with active deals
      }

      if (filters.packages === true) {
        // Filter out expired packages on the frontend
        filteredPrinters = filteredPrinters
          .map(printer => ({
            ...printer,
            packages: printer.packages.filter(pkg => new Date(pkg.packageEndDate) >= currentDate)
          }))
          .filter(printer => printer.packages.length > 0); // Only include printers with active packages
      }

      this.printers = filteredPrinters;
      this.isLoading = false;
      setTimeout(() => this.updateNavigation());
    });
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      if (this.swiperContainer) {
        const swiperInstance = this.swiperContainer.nativeElement.swiper;
        swiperInstance.on('slideChange', this.updateNavigation.bind(this));
        swiperInstance.on('init', this.updateNavigation.bind(this));
        swiperInstance.update();
        this.updateNavigation(); // Initial update
      }
    });
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    this.updateNavigation();
  }

  goToNext() {
    this.swiperContainer.nativeElement.swiper.slideNext();
    this.updateNavigation();
  }

  goToPrev() {
    this.swiperContainer.nativeElement.swiper.slidePrev();
    this.updateNavigation();
  }

  updateNavigation() {
    const swiperInstance = this.swiperContainer.nativeElement.swiper;
    this.isBeginning = swiperInstance.isBeginning;
    this.isEnd = swiperInstance.isEnd;
    this.showNavigation =
      this.printers.length >
      (swiperInstance.params.slidesPerView as number);
    // console.log('isBeginning:', this.isBeginning, 'isEnd:', this.isEnd, "showNavigation:", this.showNavigation);
  }

  private filterPrinters(printers: Printer[]): Printer[] {
    const currentDate = new Date();

    const isPackageExpired = (packageEndDate: string): boolean => {
      const endDate = new Date(packageEndDate);
      return endDate < currentDate;
    };

    const hasValidPackages = (packages: any[]): boolean => {
      return packages.some(pkg => !isPackageExpired(pkg.packageEndDate));
    };

    return printers.filter((printer) => {
      const hasActiveDeals = printer.deals.some(
        (deal) =>
          new Date(deal.dealStartDate) <= currentDate &&
          new Date(deal.dealEndDate) >= currentDate
      );
      const hasRentPackage = printer.packages && hasValidPackages(printer.packages);

      const passesDealsFilter = !this.deals || hasActiveDeals || hasRentPackage;
      const passesCategoryFilter = this.categories.length === 0 || this.categories.includes(printer.category);
      const passesSellableFilter = this.sellable === undefined || printer.sellable === this.sellable;
      const passesRentableFilter = this.rentable === undefined || printer.rentable === this.rentable;
      const passesBrandFilter = this.brands.length === 0 || this.brands.includes(printer.brand);

      return passesDealsFilter && passesCategoryFilter && passesSellableFilter && passesRentableFilter && passesBrandFilter;
    }).map((printer) => ({
      ...printer,
      deals: printer.deals.filter(
        (deal) =>
          new Date(deal.dealStartDate) <= currentDate &&
          new Date(deal.dealEndDate) >= currentDate
      ),
    }));
  }
}
