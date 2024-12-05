import { Component, OnInit } from '@angular/core';
import { Consumible } from 'src/app/printers/interfaces/consumible.interface';
import { ConsumableService } from '../../services/consumables.service';
import Swiper from 'swiper';
import { Navigation, Pagination, Scrollbar, A11y, Thumbs, Autoplay } from 'swiper/modules';

// install Swiper modules
Swiper.use([Navigation, Pagination, Scrollbar, A11y, Thumbs, Autoplay]);

@Component({
  selector: 'consumables-promotion-list',
  templateUrl: './promotion-list.component.html',
  styleUrls: ['./promotion-list.component.scss'],
})
export class PromotionListComponent implements OnInit {
  dealConsumables: Consumible[] = [];
  isLoading = true;
  noDealsMessage = 'No hay ofertas al momento';

  config: any = {
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

  };

  constructor(private consumableService: ConsumableService) { }

  ngOnInit(): void {
    this.consumableService.getConsumables().subscribe((consumables: Consumible[]) => {
      this.dealConsumables = consumables.filter(consumable => consumable.deals.length > 0);
      this.isLoading = false;
    });
  }

}

