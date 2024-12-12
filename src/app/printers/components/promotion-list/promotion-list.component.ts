import { AfterViewInit, Component, ElementRef, HostListener, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Printer } from 'src/app/printers/interfaces/printer.interface';
import { PrintersService } from 'src/app/printers/services/printers.service';
import Swiper from 'swiper';
import { SwiperContainer } from 'swiper/element';
import { Navigation, Pagination, Scrollbar, A11y, Thumbs, Autoplay } from 'swiper/modules';
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
    slidesPerView: 1,
    spaceBetween: 8,
    autoplay: false,
    scrollbar: { draggable: true },

    breakpoints: {
      '@0.00': {
        slidesPerView: 1,
        spaceBetween: 8,
      },
      '@0.75': {
        slidesPerView: 2,
        spaceBetween: 12,
      },
      '@1.00': {
        slidesPerView: 3,
        spaceBetween: 16,
      },
      '@1.50': {
        slidesPerView: 4,
        spaceBetween: 24,
      },
      // 1440: {
      //   slidesPerView: 4,
      //   spaceBetween: 16,
      // },
      // 1024: {
      //   slidesPerView: 3,
      //   spaceBetween: 16,
      // },
      // 768: {
      //   slidesPerView: 3,
      //   spaceBetween: 16,
      // },
      // 500: {
      //   slidesPerView: 2,
      //   spaceBetween: 16,
      //   navigation: false,
      // },
      // 375: {
      //   slidesPerView: 1,
      //   spaceBetween: 8,
      //   navigation: false,
      // },
    },
    on: {
      init: () => this.updateNavigation(),
      slideChange: () => this.updateNavigation(),
    },
  };

  constructor(private printersService: PrintersService) { }


  ngAfterViewInit(): void {
    setTimeout(() => {
      if (this.swiperContainer) {
        const swiperInstance = this.swiperContainer.nativeElement.swiper;
        swiperInstance.on('slideChange', this.updateNavigation.bind(this));
        swiperInstance.on('init', this.updateNavigation.bind(this));
        this.updateNavigation(); // Initial update
      }
    });
  }

  ngOnInit(): void {
    this.printersService.getPrinters().subscribe((printers: Printer[]) => {
      this.dealPrinters = this.filterPrinters(printers);
      this.isLoading = false;
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
    console.log('isBeginning:', this.isBeginning, 'isEnd:', this.isEnd);
  }


  private filterPrinters(printers: Printer[]): Printer[] {
    return printers.filter(printer =>
      (!this.requireDeals || printer.deals.length > 0) &&
      (this.categories.length === 0 || this.categories.includes(printer.category))
    );
  }
}

