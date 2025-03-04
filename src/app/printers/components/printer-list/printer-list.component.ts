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
  @Input() categories: string[] = []; // Accept categories as input
  @Input() requireDeals: boolean = true;
  @Input() sellable: boolean = false; // New input for sellable filter
  @Input() rentable: boolean = false; // New input for rentable filter
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
    scrollbar: { draggable: true },
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
    this.printersService.getPrinters(25, 0).subscribe((printers: Printer[]) => {
      this.printers = this.filterPrinters(printers);
      this.isLoading = false;
      setTimeout(() => {
        this.updateNavigation(); // Update navigation after loading data
      });
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

    return printers
      .filter((printer) => {
        const hasActiveDeals = printer.deals.some(
          (deal) =>
            new Date(deal.dealStartDate) <= currentDate &&
            new Date(deal.dealEndDate) >= currentDate
        );
        const hasRentPackage = printer.packages && hasValidPackages(printer.packages);

        return (
          (this.requireDeals ? (hasActiveDeals || hasRentPackage) : (!hasActiveDeals && !hasRentPackage)) &&
          (this.categories.length === 0 || this.categories.includes(printer.category)) &&
          (!this.sellable || printer.sellable === this.sellable) &&
          (!this.rentable || printer.rentable === this.rentable)
        );
      })
      .map((printer) => ({
        ...printer,
        deals: printer.deals.filter(
          (deal) =>
            new Date(deal.dealStartDate) <= currentDate &&
            new Date(deal.dealEndDate) >= currentDate
        ),
      }));
  }
}
