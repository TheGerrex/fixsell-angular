import { AfterViewInit, Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { PrintersService } from '../../services/printers.service';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { Printer } from '../../interfaces/printer.interface';
import Swiper from 'swiper';
import { SwiperContainer } from 'swiper/element';
import { Navigation, Pagination, Scrollbar, A11y, Thumbs, Autoplay } from 'swiper/modules';
import { SwiperOptions } from 'swiper/types';

// install Swiper modules
Swiper.use([Navigation, Pagination, Scrollbar, A11y, Thumbs, Autoplay]);


@Component({
  selector: 'app-printer-page',
  templateUrl: './printer-page.component.html',
  styleUrls: ['./printer-page.component.scss'],
})
export class PrinterPageComponent implements OnInit, AfterViewInit {
  @ViewChild('mainSwiperContainer') swiperContainer!: ElementRef<SwiperContainer>;
  @ViewChild('thumbSwiperContainer') thumbSwiperContainer!: ElementRef<SwiperContainer>;
  loading = true;
  showMore = false;
  showDialogForm = false;
  isBeginning = true;
  isEnd = false;
  showNavigation = true;
  public printer?: Printer;
  public images: any[] = [];
  mainSwiperInstance?: Swiper;
  thumbSwiperInstance?: Swiper;
  paginationVisible: boolean = window.innerWidth < 768;

  mainSwiperOptions: SwiperOptions = {
    slidesPerView: 1,
    spaceBetween: 8,
    autoplay: false,
    pagination: this.paginationVisible ? { dynamicBullets: true } : false,
    centeredSlides: true,
    thumbs: {
      swiper: null,
    },
    on: {
      init: () => this.updateNavigation(),
      slideChange: () => this.updateNavigation(),
    },
  };

  thumbSwiperOptions: SwiperOptions = {
    slidesPerView: 'auto',
    spaceBetween: 8,
    direction: 'horizontal',
    autoplay: false,
    freeMode: true,
    watchSlidesProgress: true,
    slideActiveClass: 'swiper-slide-thumb-active',
    breakpoints: {
      0: {
        slidesPerView: 'auto',
        spaceBetween: 8,
        direction: 'horizontal',
      },
      1024: {
        slidesPerView: 'auto',
        spaceBetween: 8,
        direction: 'vertical',
      },
    },
    on: {
      init: () => this.updateNavigation(),
      slideChange: () => this.updateNavigation(),
    },
  };

  constructor(
    private printersService: PrintersService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params
      .pipe(
        switchMap(({ id }) => this.printersService.getPrinterById(id)),
      ).subscribe(printer => {
        if (!printer) return this.router.navigate(['printers/list']);
        this.printer = printer;
        this.images = this.printer.img_url.map(url => ({
          itemImageSrc: url,
          thumbnailImageSrc: url
        }));
        this.loading = false;
        setTimeout(() => {
          this.updateNavigation(); // Update navigation after loading data
        });
        return;
      })
    this.checkScreenWidth();
    window.addEventListener('resize', this.checkScreenWidth.bind(this));
  }

  ngAfterViewInit(): void {
    console.log("ngAfterViewInit called");
    console.log("thumbSwiperContainer:", this.thumbSwiperContainer);
    console.log("swiperContainer:", this.swiperContainer);

    window.scrollTo(0, 0);
    setTimeout(() => {
      if (this.swiperContainer) {
        this.mainSwiperInstance = this.swiperContainer.nativeElement.swiper;
        this.thumbSwiperInstance = this.thumbSwiperContainer.nativeElement.swiper;
        this.mainSwiperInstance.on('slideChange', this.updateNavigation.bind(this));
        this.mainSwiperInstance.on('init', this.updateNavigation.bind(this));
        this.mainSwiperInstance.update();
        this.updateNavigation(); // Initial update
      }
    });
    this.initializeThumbsSwiper();
  }

  initializeThumbsSwiper(): void {
    setTimeout(() => {
      console.log("initializeThumbsSwiper called");
      if (this.thumbSwiperContainer && this.swiperContainer) {
        console.log("thumbSwiperContainer and swiperContainer are defined");
        const thumbSwiperInstance = this.thumbSwiperContainer.nativeElement.swiper;
        const mainSwiperInstance = this.swiperContainer.nativeElement.swiper;

        if (thumbSwiperInstance && mainSwiperInstance) {
          console.log("thumbSwiperInstance and mainSwiperInstance are defined");
          this.thumbSwiperInstance = thumbSwiperInstance;
          mainSwiperInstance.thumbs.swiper = this.thumbSwiperInstance;
          this.updateMainSwiperThumbs();
          this.addHoverEffectToThumbs();
        } else {
          console.error("thumbSwiperInstance or mainSwiperInstance is not defined");
        }
      } else {
        console.error("thumbSwiperContainer or swiperContainer is not defined");
      }
    }, 1000);
  }

  updateMainSwiperThumbs(): void {
    if (this.swiperContainer && this.thumbSwiperInstance) {
      const mainSwiper = this.swiperContainer.nativeElement.swiper;
      mainSwiper.thumbs.swiper = this.thumbSwiperInstance;
      mainSwiper.thumbs.init();
      mainSwiper.thumbs.update(true);
    }
  }

  addHoverEffectToThumbs(): void {
    console.log("Hover Effect Function");
    if (!this.thumbSwiperContainer) {
      console.error("Thumb swiper container is not defined");
      return;
    }

    const thumbSlides = this.thumbSwiperContainer.nativeElement.querySelectorAll('.swiper-slide');
    if (thumbSlides.length === 0) {
      console.error("No thumb slides found");
      return;
    }

    thumbSlides.forEach((slide, index) => {
      const thumbSlide = slide as HTMLElement;
      thumbSlide.addEventListener('mouseenter', () => {
        console.log(`Hovering over thumb slide ${index}`);
        this.mainSwiperInstance?.slideTo(index);
      });
    });
  }

  updateNavigation() {
    const swiperInstance = this.swiperContainer.nativeElement.swiper;
    this.isBeginning = swiperInstance.isBeginning;
    this.isEnd = swiperInstance.isEnd;
    this.showNavigation = this.images.length > (swiperInstance.params.slidesPerView as number);
    // console.log('isBeginning:', this.isBeginning, 'isEnd:', this.isEnd, "showNavigation:", this.showNavigation);
  }

  checkScreenWidth(): void {
    this.paginationVisible = window.innerWidth < 768;
    this.updateSwiperOptions();
  }

  updateSwiperOptions(): void {
    if (this.mainSwiperInstance) {
      this.mainSwiperInstance.params.pagination = this.paginationVisible ? { dynamicBullets: true } : false;
      this.mainSwiperInstance.pagination.update();
    }
  }


  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    this.checkScreenWidth();
    this.updateNavigation();
  }


  goToNext() {
    this.swiperContainer.nativeElement.swiper.slideNext();
    this.updateNavigation();
  }

  goToPrev() {
    this.swiperContainer.nativeElement.swiper.slidePrev();
    this.updateNavigation();
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
      const message = `Me interesa cotizar el producto ${this.printer.model}, que contiene una promoción de ${this.printer.deals[0].dealDiscountPercentage}% al momento. Me puedes dar mas información al respecto?`;
      const url = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${encodeURIComponent(message)}`;

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
