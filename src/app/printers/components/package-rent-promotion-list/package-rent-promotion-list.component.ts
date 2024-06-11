import { Component, OnDestroy, OnInit } from '@angular/core';
import { Printer } from 'src/app/printers/interfaces/printer.interface';
import { PrintersService } from 'src/app/printers/services/printers.service';
import SwiperCore, { Navigation, Pagination, Scrollbar, A11y, Thumbs, SwiperOptions, Autoplay, Swiper } from 'swiper';
import { Package } from '../../interfaces/package.interface';

// install Swiper modules
SwiperCore.use([Navigation, Pagination, Scrollbar, A11y, Thumbs, Autoplay]);

@Component({
  selector: 'app-package-rent-promotion-list',
  templateUrl: './package-rent-promotion-list.component.html',
  styleUrls: ['./package-rent-promotion-list.component.scss']
})
export class PackageRentPromotionListComponent implements OnInit, OnDestroy {
  dealRentPackagePrinters: Package[] = [];
  isLoading = true;
  noDealsMessage = 'No hay ofertas al momento';
  public promotionSwiper?: Swiper;

  config: SwiperOptions = {
    slidesPerView: 1,
    spaceBetween: 8,
    // navigation: false,
    autoplay: false,
    scrollbar: { draggable: true },
    
    breakpoints: {
      1024: {
        slidesPerView: 3,
        spaceBetween: 24,
        navigation: true,
        autoplay: false,
        scrollbar: { draggable: true },
      },
      768: {
        slidesPerView: 2,
        spaceBetween: 16, 
        navigation: true,
        autoplay: false,
        scrollbar: { draggable: true },
      },
      500: {
        slidesPerView: 2,
        spaceBetween: 16, 
        navigation: true,
        autoplay: false,
        scrollbar: { draggable: true },
      },
      375: {
        slidesPerView: 1,
        spaceBetween: 8,
        navigation: false,
        autoplay: true,
        scrollbar: { draggable: true },
      },
    },

    
  };

  constructor(private printersService: PrintersService) {}

  ngOnInit(): void {
    this.printersService.getRentPackages().subscribe((packages: Package[]) => {
      this.dealRentPackagePrinters = packages
      this.isLoading = false;
    });
  }

  ngOnDestroy(): void {
    this.promotionSwiper?.destroy(true, true);
  }
}

