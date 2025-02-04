import {
  AfterViewInit,
  Component,
  ElementRef,
  HostListener,
  Input,
  OnDestroy,
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
  selector: 'printer-promotion-list',
  templateUrl: './promotion-list.component.html',
  styleUrls: ['./promotion-list.component.scss'],
})
export class PromotionListComponent implements OnInit, AfterViewInit {
  @Input() categories: string[] = []; // Accept categories as input
  @Input() requireDeals: boolean = true;
  @ViewChild('swiperContainer') swiperContainer!: ElementRef<SwiperContainer>;
  dealPrinters: Printer[] = [];
  isLoading = true;
  noDealsMessage = 'No hay ofertas al momento';
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

  constructor(private printersService: PrintersService) {}

  ngOnInit(): void {
    this.printersService.getPrinters().subscribe((printers: Printer[]) => {
      this.dealPrinters = this.filterPrinters(printers);
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
      this.dealPrinters.length >
      (swiperInstance.params.slidesPerView as number);
    // console.log('isBeginning:', this.isBeginning, 'isEnd:', this.isEnd, "showNavigation:", this.showNavigation);
  }

  private filterPrinters(printers: Printer[]): Printer[] {
    const currentDate = new Date();
    return printers
      .filter(
        (printer) =>
          (!this.requireDeals ||
            printer.deals.some(
              (deal) =>
                new Date(deal.dealStartDate) <= currentDate &&
                new Date(deal.dealEndDate) >= currentDate
            )) &&
          (this.categories.length === 0 ||
            this.categories.includes(printer.category))
      )
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
