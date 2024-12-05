import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Package } from 'src/app/printers/interfaces/package.interface';
import { PrintersService } from 'src/app/printers/services/printers.service';
import Swiper from 'swiper';
import { Navigation, Pagination, Scrollbar, A11y, Thumbs, Autoplay } from 'swiper/modules';

// install Swiper modules
Swiper.use([Navigation, Pagination, Scrollbar, A11y, Thumbs, Autoplay]);

@Component({
  selector: 'app-promociones',
  templateUrl: './promociones.component.html',
  styleUrls: ['./promociones.component.scss']
})
export class PromocionesComponent implements OnInit {
  thumbsSwiper: any;
  rentPackages: Package[] = [];

  config: any = {
    slidesPerView: 1,
    spaceBetween: 8,
    navigation: false,
    autoplay: false,
    pagination: { clickable: true },
    scrollbar: { draggable: true },

    breakpoints: {
      1024: {
        slidesPerView: 4,
        spaceBetween: 24,
        navigation: true,
        autoplay: false,
        pagination: { clickable: true },
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
        navigation: false,
        autoplay: true,
        pagination: { clickable: true },
        scrollbar: { draggable: true },
      },
    },
    // thumbs: {swiper: this.thumbsSwiper}


  };

  constructor(private router: Router, private printersService: PrintersService) { }

  ngOnInit(): void {
    this.printersService.getRentPackages().subscribe((rentPackages: Package[]) => {
      this.rentPackages = rentPackages;
      console.log(this.rentPackages);
    });
  }

}
