import { Component, Input, OnInit } from '@angular/core';
import { Consumible } from 'src/app/printers/interfaces/consumible.interface';
import { ConsumableService } from '../../services/consumables.service';
import Swiper from 'swiper';
import { Navigation, Pagination, Scrollbar, A11y, Thumbs, Autoplay } from 'swiper/modules';

// install Swiper modules
Swiper.use([Navigation, Pagination, Scrollbar, A11y, Thumbs, Autoplay]);

@Component({
  selector: 'related-consumables-list',
  templateUrl: './related-consumables-list.component.html',
  styleUrls: ['./related-consumables-list.component.scss']
})
export class RelatedConsumablesListComponent implements OnInit {
  @Input() consumableProduct: Consumible | undefined = undefined;
  relatedConsumables: Consumible[] = [];
  isLoading = true;
  noDealsMessage = 'No hay consumibles relacionados al momento';

  config: any = {
    slidesPerView: 1,
    spaceBetween: 8,
    // navigation: false,
    autoplay: false,
    scrollbar: { draggable: true },

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
      375: {
        slidesPerView: 2,
        spaceBetween: 8,
        navigation: false,
        autoplay: true,
        scrollbar: { draggable: true },
      },
    }
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
      });
    }
  }
}
