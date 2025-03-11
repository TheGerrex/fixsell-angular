import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, HostListener, Input, OnInit, ViewChild } from '@angular/core';
import { Subject, debounceTime } from 'rxjs';
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
  @Input() limit: number = 15;
  @Input() offset: number = 0;
  @ViewChild('swiperContainer') swiperContainer!: ElementRef<SwiperContainer>;
  private updateNavigationSubject = new Subject<void>();
  noDealsMessage = 'No hay productos relacionados al momento';
  relatedPrinters: Printer[] = [];
  isLoading = true;
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

  constructor(private printersService: PrintersService, private cdr: ChangeDetectorRef) {
    this.updateNavigationSubject.pipe(debounceTime(100)).subscribe(() => {
      this.performUpdateNavigation();
    });
  }

  ngOnInit(): void {
    if (this.printerProduct) {
      const brand = this.printerProduct.brand;
      const category = this.printerProduct.category;

      this.printersService.getPrinters(this.limit, this.offset, { brand, category }).subscribe(
        (printers: Printer[]) => {
          if (this.printerProduct) {
            this.relatedPrinters = printers.filter(printer => printer.id !== this.printerProduct?.id);
          }
          this.isLoading = false;
          this.cdr.detectChanges(); // Manually trigger change detection
          setTimeout(() => {
            this.updateNavigation(); // Update navigation after loading data
          }, 0);
        },
        (error) => {
          console.error('Error fetching related printers:', error);
          this.isLoading = false;
          this.cdr.detectChanges(); // Manually trigger change detection on error
        }
      );
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

  updateNavigation() {
    this.updateNavigationSubject.next();
  }


  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    this.updateNavigation();
    this.cdr.detectChanges(); // Manually trigger change detection on resize
  }

  goToNext() {
    this.swiperContainer.nativeElement.swiper.slideNext();
    this.updateNavigation();
  }

  goToPrev() {
    this.swiperContainer.nativeElement.swiper.slidePrev();
    this.updateNavigation();
  }

  private performUpdateNavigation() {
    const swiperInstance = this.swiperContainer.nativeElement.swiper;
    this.isBeginning = swiperInstance.isBeginning;
    this.isEnd = swiperInstance.isEnd;
    this.showNavigation = this.relatedPrinters.length > (swiperInstance.params.slidesPerView as number);
    this.cdr.detectChanges(); // Manually trigger change detection
  }
}
