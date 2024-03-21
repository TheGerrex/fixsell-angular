import {
  AfterViewInit,
  Component,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import { PrintersService } from 'src/app/printers/services/printers.service';
import { ConsumableService } from '../../services/consumables.service';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { Printer } from 'src/app/printers/interfaces/printer.interface';
import { Consumible } from '../../../printers/interfaces/consumible.interface';
// import Swiper core and required modules
import SwiperCore, {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  Thumbs,
} from 'swiper';

// install Swiper modules
SwiperCore.use([Navigation, Pagination, Scrollbar, A11y, Thumbs]);

@Component({
  selector: 'app-consumable-page',
  templateUrl: './consumable-page.component.html',
  styleUrls: ['./consumable-page.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ConsumablePageComponent implements OnInit, AfterViewInit {
  public consumable?: Consumible;

  public images: any[] = [];
  thumbsSwiper: any;
  loading = true;

  constructor(
    private consumableService: ConsumableService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params
      .pipe(switchMap(({ id }) => this.consumableService.getConsumableById(id)))
      .subscribe((consumable) => {
        if (!consumable) return this.router.navigate(['consumables/list']);
        this.consumable = consumable;
        this.images = this.consumable.img_url.map((url) => ({
          itemImageSrc: url,
          thumbnailImageSrc: url,
        }));
        this.loading = false;
        return;
      });
  }

  ngAfterViewInit(): void {
    window.scrollTo(0, 0);
  }

  openWhatsApp() {
    if (this.consumable) {
      const phoneNumber = '+528115555784';
      const message = `Me interesa cotizar el producto ${this.consumable.name}, me puedes dar mas información al respecto?`;
      const url = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${encodeURIComponent(
        message
      )}`;

      window.open(url, '_blank');
    }
  }
  openWhatsAppDeal() {
    if (this.consumable) {
      const phoneNumber = '+528115555784';
      const message = `Me interesa cotizar el producto ${this.consumable.name}, que contiene una promoción de ${this.consumable.deals[0].dealDiscountPercentage}% al momento. Me puedes dar mas información al respecto?`;
      const url = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${encodeURIComponent(
        message
      )}`;

      window.open(url, '_blank');
    }
  }
}
