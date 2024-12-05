import { Component, Input, OnInit } from '@angular/core';
import { Printer } from 'src/app/printers/interfaces/printer.interface';
import { PrintersService } from 'src/app/printers/services/printers.service';
import Swiper from 'swiper';
import { Navigation, Pagination, Scrollbar, A11y, Thumbs, Autoplay } from 'swiper/modules';

// install Swiper modules
Swiper.use([Navigation, Pagination, Scrollbar, A11y, Thumbs, Autoplay]);

@Component({
  selector: 'related-printers-list',
  templateUrl: './related-printers-list.component.html',
  styleUrls: ['./related-printers-list.component.scss'],
})
export class RelatedPrintersListComponent implements OnInit {
  @Input() printerProduct: Printer | undefined = undefined;
  relatedPrinters: Printer[] = [];
  isLoading = true;
  noDealsMessage = 'No hay productos relacionados al momento';

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
    if (this.printerProduct) {
      const brand = this.printerProduct.brand;
      const category = this.printerProduct.category;

      this.printersService.getPrinters(10, 0, { brand, category }).subscribe((printers: Printer[]) => {
        if (this.printerProduct) {
          this.relatedPrinters = printers.filter(printer => printer.id !== this.printerProduct?.id);
        }
        this.isLoading = false;
      });
    }
  }
}
