import {
  AfterViewInit,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { ConsumableService } from '../../services/consumables.service';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { Consumible } from '../../../printers/interfaces/consumible.interface';
import Swiper from 'swiper';
import { Navigation, Pagination, Scrollbar, A11y, Thumbs, Autoplay } from 'swiper/modules';

// install Swiper modules
Swiper.use([Navigation, Pagination, Scrollbar, A11y, Thumbs, Autoplay]);

@Component({
  selector: 'app-consumable-page',
  templateUrl: './consumable-page.component.html',
  styleUrls: ['./consumable-page.component.scss'],
  // encapsulation: ViewEncapsulation.None,
})
export class ConsumablePageComponent implements OnInit, AfterViewInit, OnDestroy {
  loading = true;
  showMore = false;
  showDialogForm = false;
  public consumable?: Consumible;
  public images: any[] = [];
  public mainSwiperInstance?: Swiper;
  public thumbsSwiperInstance?: Swiper;

  constructor(
    private consumableService: ConsumableService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

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

  ngOnDestroy(): void {
    this.mainSwiperInstance?.destroy(true, true);
    this.thumbsSwiperInstance?.destroy(true, true);
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
  toggleShowMore(): void {
    this.showMore = !this.showMore;
  }

  showDialog() {
    this.showDialogForm = true;
  }
}
