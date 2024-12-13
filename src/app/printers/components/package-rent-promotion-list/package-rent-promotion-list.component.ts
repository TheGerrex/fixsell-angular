import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { PrintersService } from 'src/app/printers/services/printers.service';
import { Package } from '../../interfaces/package.interface';
import Swiper from 'swiper';
import { SwiperContainer } from 'swiper/element';
import { Navigation, Pagination, Scrollbar, A11y, Thumbs, Autoplay } from 'swiper/modules';
import { SwiperOptions } from 'swiper/types';

// install Swiper modules
Swiper.use([Navigation, Pagination, Scrollbar, A11y, Thumbs, Autoplay]);

@Component({
  selector: 'package-rent-promotion-list',
  templateUrl: './package-rent-promotion-list.component.html',
  styleUrls: ['./package-rent-promotion-list.component.scss']
})
export class PackageRentPromotionListComponent implements OnInit, AfterViewInit {
  @ViewChild('swiperRentPrintersContainer') swiperContainer!: ElementRef<SwiperContainer>;
  dealRentPackagePrinters: Package[] = [];
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
      '@0.45': {
        slidesPerView: 2,
        spaceBetween: 12,
      },
      '@0.75': {
        slidesPerView: 3,
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
    },
    on: {
      init: () => this.updateNavigation(),
      slideChange: () => this.updateNavigation(),
    },
  };

  constructor(private printersService: PrintersService) { }

  ngOnInit(): void {
    this.printersService.getRentPackages().subscribe((packages: Package[]) => {
      this.dealRentPackagePrinters = packages
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
    this.showNavigation = this.dealRentPackagePrinters.length > (swiperInstance.params.slidesPerView as number);
    // console.log('isBeginning:', this.isBeginning, 'isEnd:', this.isEnd, "showNavigation:", this.showNavigation);
  }
}

