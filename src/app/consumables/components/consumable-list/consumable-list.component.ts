import {
  AfterViewInit,
  Component,
  ElementRef,
  HostListener,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Consumible } from 'src/app/printers/interfaces/consumible.interface';
import { ConsumableService } from '../../services/consumables.service';
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
  selector: 'consumables-list',
  templateUrl: './consumable-list.component.html',
  styleUrls: ['./consumable-list.component.scss'],
})
export class PromotionListComponent implements OnInit, AfterViewInit {
  @Input() categories: string[] = []; // Accept categories as input
  @Input() requireDeals: boolean = true;
  @ViewChild('swiperContainer') swiperContainer!: ElementRef<SwiperContainer>;
  dealConsumables: Consumible[] = [];
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

  constructor(private consumableService: ConsumableService) { }

  ngOnInit(): void {
    this.consumableService
      .getConsumables(25, 0)
      .subscribe((consumables: Consumible[]) => {
        this.dealConsumables = this.filterconsumables(consumables);
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
      this.dealConsumables.length >
      (swiperInstance.params.slidesPerView as number);
    // console.log('isBeginning:', this.isBeginning, 'isEnd:', this.isEnd, "showNavigation:", this.showNavigation);
  }

  private filterconsumables(consumables: Consumible[]): Consumible[] {
    const currentDate = new Date();
    return consumables
      .filter((consumable) => {
        const hasActiveDeals = consumable.deals.some(
          (deal) =>
            new Date(deal.dealStartDate) <= currentDate &&
            new Date(deal.dealEndDate) >= currentDate
        );
        return (
          (this.requireDeals ? hasActiveDeals : !hasActiveDeals) &&
          (this.categories.length === 0 ||
            this.categories.includes(consumable.category))
        );
      })
      .map((consumable) => ({
        ...consumable,
        deals: consumable.deals.filter(
          (deal) =>
            new Date(deal.dealStartDate) <= currentDate &&
            new Date(deal.dealEndDate) >= currentDate
        ),
      }));
  }
}
