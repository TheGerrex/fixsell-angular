import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Consumible } from 'src/app/printers/interfaces/consumible.interface';
import SwiperCore, { Navigation, Pagination, Scrollbar, A11y, Thumbs, SwiperOptions, Autoplay } from 'swiper';
import { ConsumableService } from '../../services/consumables.service';

// install Swiper modules
SwiperCore.use([Navigation, Pagination, Scrollbar, A11y, Thumbs, Autoplay]);

@Component({
  selector: 'consumables-promotion-list',
  templateUrl: './promotion-list.component.html',
  styleUrls: ['./promotion-list.component.scss'],
})
export class PromotionListComponent implements OnInit {
  thumbsSwiper: any;
  dealConsumables: Consumible[] = [];
  isLoading = true;
  noDealsMessage = 'No hay ofertas al momento';

  config: SwiperOptions = {
    slidesPerView: 1,
    spaceBetween: 8,
    // navigation: false,
    autoplay: false,
    scrollbar: { draggable: true },
    
    breakpoints: {
      1024: {
        slidesPerView: 4,
        spaceBetween: 24,
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
      375: {
        slidesPerView: 2,
        spaceBetween: 8,
        navigation: false,
        autoplay: true,
        scrollbar: { draggable: true },
      },
    },
    // thumbs: {swiper: this.thumbsSwiper}

    
  };

  constructor(private consumableService: ConsumableService) {}

  ngOnInit(): void {
    this.consumableService.getConsumables().subscribe((consumables: Consumible[]) => {
      this.dealConsumables = consumables.filter(consumable => consumable.deals.length > 0);
      this.isLoading = false;
    });
  }

}

