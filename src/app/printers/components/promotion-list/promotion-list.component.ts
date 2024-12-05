import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Printer } from 'src/app/printers/interfaces/printer.interface';
import { PrintersService } from 'src/app/printers/services/printers.service';
import Swiper from 'swiper';
import { Navigation, Pagination, Scrollbar, A11y, Thumbs, Autoplay } from 'swiper/modules';

// install Swiper modules
Swiper.use([Navigation, Pagination, Scrollbar, A11y, Thumbs, Autoplay]);

@Component({
  selector: 'printer-promotion-list',
  templateUrl: './promotion-list.component.html',
  styleUrls: ['./promotion-list.component.scss'],
})
export class PromotionListComponent implements OnInit, OnDestroy {
  @Input() categories: string[] = []; // Accept categories as input
  @Input() requireDeals: boolean = true;
  dealPrinters: Printer[] = [];
  isLoading = true;
  noDealsMessage = 'No hay ofertas al momento';
  public promotionSwiper?: Swiper;

  config: any = {
    slidesPerView: 1,
    spaceBetween: 8,
    autoplay: false,
    scrollbar: { draggable: true },
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
    navigation: {
      nextEl: '.swiper-next-button',
      prevEl: '.swiper-prev-button',
    },
    breakpoints: {
      1024: {
        slidesPerView: 4,
        spaceBetween: 16,
        navigation: true,
        autoplay: false,
        scrollbar: { draggable: true },
      },
      768: {
        slidesPerView: 3,
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

  constructor(private printersService: PrintersService) { }

  ngOnInit(): void {
    this.printersService.getPrinters().subscribe((printers: Printer[]) => {
      this.dealPrinters = this.filterPrinters(printers);
      this.isLoading = false;
    });
  }

  ngOnDestroy(): void {
    this.promotionSwiper?.destroy(true, true);
  }

  private filterPrinters(printers: Printer[]): Printer[] {
    return printers.filter(printer =>
      (!this.requireDeals || printer.deals.length > 0) &&
      (this.categories.length === 0 || this.categories.includes(printer.category))
    );
  }
}

