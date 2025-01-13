import { AfterViewInit, Component, ElementRef, HostListener, Input, OnInit, ViewChild } from '@angular/core';
import { Printer } from 'src/app/printers/interfaces/printer.interface';
import { PrintersService } from 'src/app/printers/services/printers.service';
import Swiper from 'swiper';
import { SwiperContainer } from 'swiper/element';
import { Navigation, Pagination, Scrollbar, A11y, Thumbs, Autoplay } from 'swiper/modules';
import { SwiperOptions } from 'swiper/types';

// install Swiper modules
Swiper.use([Navigation, Pagination, Scrollbar, A11y, Thumbs, Autoplay]);

@Component({
  selector: 'related-printers-list',
  templateUrl: './related-printers-list.component.html',
  styleUrls: ['./related-printers-list.component.scss'],
})
export class RelatedPrintersListComponent implements OnInit, AfterViewInit {
  @Input() categories: string[] = []; // Accept categories as input
  @Input() printerProduct: Printer | undefined = undefined;
  @ViewChild('swiperContainer') swiperContainer!: ElementRef<SwiperContainer>;
  relatedPrinters: Printer[] = [];
  isLoading = true;
  noDealsMessage = 'No hay productos relacionados al momento';
  isBeginning = true;
  isEnd = false;
  showNavigation = true;

  swiperOptions: SwiperOptions = {
    slidesPerView: 1.25,
    spaceBetween: 8,
    autoplay: false,
    scrollbar: {
      el: '.swiper-scrollbar',
      draggable: true,
      hide: false, // Ensure the scrollbar is not hidden by default
    },
    breakpoints: {
      '@0.00': {
        slidesPerView: 2.25,
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
        slidesPerView: 4.25,
        spaceBetween: 14,
      },
      '@1.50': {
        slidesPerView: 5.25,
        spaceBetween: 16,
      },
    },
    on: {
      init: () => this.updateNavigation(),
      slideChange: () => this.updateNavigation(),
    },
  };

  constructor(private printersService: PrintersService) { }

  ngOnInit(): void {
    if (this.printerProduct) {
      const brand = this.printerProduct.brand;
      const category = this.printerProduct.category;

      this.printersService.getPrinters(10, 0, { brand, category }).subscribe((printers: Printer[]) => {
        if (this.printerProduct) {
          this.relatedPrinters = printers.filter(printer => printer.id !== this.printerProduct?.id);
        }
        this.isLoading = false;
        setTimeout(() => {
          this.updateNavigation(); // Update navigation after loading data
        });
      });
    }
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
    this.showNavigation = this.relatedPrinters.length > (swiperInstance.params.slidesPerView as number);
    // console.log('isBeginning:', this.isBeginning, 'isEnd:', this.isEnd, "showNavigation:", this.showNavigation);
  }
}
