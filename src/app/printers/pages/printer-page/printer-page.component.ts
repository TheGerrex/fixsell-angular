import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { PrintersService } from '../../services/printers.service';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { Printer } from '../../interfaces/printer.interface';
// import Swiper core and required modules
import SwiperCore, { Navigation, Pagination, Scrollbar, A11y, Thumbs } from 'swiper';

// install Swiper modules
SwiperCore.use([Navigation, Pagination, Scrollbar, A11y, Thumbs]);

@Component({
  selector: 'app-printer-page',
  templateUrl: './printer-page.component.html',
  styleUrls: ['./printer-page.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class PrinterPageComponent implements OnInit{

  public printer?: Printer;
  public images: any[] = [];
  thumbsSwiper: any;

  constructor(
    private printersService: PrintersService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    ) {}

  ngOnInit(): void {
    this.activatedRoute.params
    .pipe(
      switchMap(({id}) => this.printersService.getPrinterById(id)), 
    ).subscribe( printer => {
      if (!printer) return this.router.navigate(['printers/list']);
      this.printer = printer;
      this.images = this.printer.img_url.map(url => ({
        itemImageSrc: url,
        thumbnailImageSrc: url
      }));
      return;
    })
  }

  openWhatsApp() {
    if (this.printer) {
      const phoneNumber = '+528115555784';
      const message = `Me interesa cotizar el producto ${this.printer.model}, me puedes dar mas información al respecto?`;
      const url = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${encodeURIComponent(message)}`;
      
      window.open(url, '_blank');
    }
  }
  openWhatsAppDeal() {
    if (this.printer) {
      const phoneNumber = '+528115555784';
      const message = `Me interesa cotizar el producto ${this.printer.model}, que contiene una promoción de ${this.printer.deal.dealDiscountPercentage}% me puedes dar mas información al respecto?`;
      const url = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${encodeURIComponent(message)}`;
      
      window.open(url, '_blank');
    }
  }
}
