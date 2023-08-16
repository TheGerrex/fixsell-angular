import { Component, OnInit } from '@angular/core';
import { PrintersService } from '../../services/printers.service';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { Printer } from '../../interfaces/printer.interface';

@Component({
  selector: 'app-printer-page',
  templateUrl: './printer-page.component.html',
  styleUrls: ['./printer-page.component.scss']
})
export class PrinterPageComponent implements OnInit{

  public printer?: Printer;
  public images: any[] = [];
  responsiveOptions: any[] = [];
  showIndicatorsOnItem: boolean = false;

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
      console.log(printer);
      this.images = this.printer.img_url.map(url => ({
        itemImageSrc: url,
        thumbnailImageSrc: url // You can use the same URL for thumbnails or provide a different URL
      }));
      return;
    })
    
    this.responsiveOptions = [
      {
          breakpoint: '1024px',
          numVisible: 5
      },
      {
          breakpoint: '768px',
          numVisible: 3
      },
      {
          breakpoint: '560px',
          numVisible: 1
      }
    ];
  }

  openWhatsApp() {
    if (this.printer) {
      const phoneNumber = '8115555783';
      const message = `Me interesa el producto ${this.printer.model}, me puedes dar mas información al respecto?`;
      const url = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${encodeURIComponent(message)}`;
      
      window.open(url, '_blank');
    }
  }
}
