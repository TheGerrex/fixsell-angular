import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { Printer } from 'src/app/printers/interfaces/printer.interface';
import { PrintersService } from 'src/app/printers/services/printers.service';
import SwiperCore, { Navigation, Pagination, Scrollbar, A11y, Thumbs, SwiperOptions, Autoplay } from 'swiper';

// install Swiper modules
SwiperCore.use([Navigation, Pagination, Scrollbar, A11y, Thumbs, Autoplay]);

@Component({
  selector: 'app-promociones',
  templateUrl: './promociones.component.html',
  styleUrls: ['./promociones.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class PromocionesComponent implements OnInit {
  thumbsSwiper: any;
  dealPrinters: Printer[] = [];

  config: SwiperOptions = {
    slidesPerView: 1,
    spaceBetween: 8,
    // navigation: true,
    autoplay: false,
    pagination: { clickable: true },
    scrollbar: { draggable: true },
    breakpoints: {
      1024: {
        slidesPerView: 4,
        spaceBetween: 24,
        // navigation: true,
        autoplay: false,
        scrollbar: { draggable: true },
      },
      768: {
        slidesPerView: 3,
        spaceBetween: 16,
        // navigation: true,
        autoplay: false,
        pagination: { clickable: true },
        scrollbar: { draggable: true },
      },
      360: {
        slidesPerView: 2,
        spaceBetween: 8,
        // navigation: false,
        autoplay: true,
        pagination: { clickable: true },
        scrollbar: { draggable: true },
      },
    },
    // thumbs: {swiper: this.thumbsSwiper}

    
  };

  constructor(private router: Router, private printersService: PrintersService) {}

  ngOnInit(): void {
    this.printersService.getDealPrinters().subscribe((printers) => {
      this.dealPrinters = printers;
      console.log(this.dealPrinters);
    });
  }

  navigateToProductPage(category: string) {
    this.router.navigate(['/printers/list'], { queryParams: { category } });
  }

}
