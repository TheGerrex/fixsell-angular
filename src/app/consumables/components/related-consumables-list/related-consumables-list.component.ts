import { AfterViewInit, Component, ElementRef, HostListener, Input, OnInit, ViewChild } from '@angular/core';
import { Consumible } from 'src/app/printers/interfaces/consumible.interface';
import { ConsumableService } from '../../services/consumables.service';
import Swiper from 'swiper';
import { SwiperContainer } from 'swiper/element';
import { Navigation, Pagination, Scrollbar, A11y, Thumbs, Autoplay } from 'swiper/modules';
import { SwiperOptions } from 'swiper/types';

// install Swiper modules
Swiper.use([Navigation, Pagination, Scrollbar, A11y, Thumbs, Autoplay]);

@Component({
  selector: 'related-consumables-list',
  templateUrl: './related-consumables-list.component.html',
  styleUrls: ['./related-consumables-list.component.scss']
})
export class RelatedConsumablesListComponent implements OnInit, AfterViewInit {
  @Input() categories: string[] = []; // Accept categories as input
  @Input() consumableProduct: Consumible | undefined = undefined;
  @ViewChild('swiperContainer') swiperContainer!: ElementRef<SwiperContainer>;
  noDealsMessage = 'No hay consumibles relacionados al momento';
  relatedConsumables: Consumible[] = [];
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

  constructor(private consumableService: ConsumableService) { }

  ngOnInit(): void {
    if (this.consumableProduct) {
      const brand = this.consumableProduct.brand;
      const category = this.consumableProduct.category;
      const color = this.consumableProduct.color;

      this.consumableService.getConsumables(10, 0, { brand, category, color }).subscribe((consumables: Consumible[]) => {
        if (this.consumableProduct) {
          this.relatedConsumables = consumables.filter(consumables => consumables.id !== this.consumableProduct?.id);
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
    this.showNavigation = this.relatedConsumables.length > (swiperInstance.params.slidesPerView as number);
  }
}
