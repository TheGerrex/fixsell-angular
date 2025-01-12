import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
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
  currentSlideIndex: number = 0;
  totalSlides: number = 0;

  mainSwiperOptions: SwiperOptions = {
    slidesPerView: 1,
    spaceBetween: 8,
    autoplay: false,
    pagination: this.paginationVisible ? { dynamicBullets: true } : false,
    centeredSlides: true,
    allowTouchMove: this.paginationVisible ? true : false,
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
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.loadPrinterData();
    this.checkScreenWidth();
    window.addEventListener('resize', () => this.checkScreenWidth());
  }

  private loadPrinterData(): void {
    this.activatedRoute.params
      .pipe(
        switchMap(({ id }) => this.printersService.getPrinterById(id))
      )
      .subscribe(printer => {
        if (!printer) {
          this.router.navigate(['printers/list']);
          return;
        }
        this.printer = printer;
        this.images = this.printer.img_url.map(url => ({
          itemImageSrc: url,
          thumbnailImageSrc: url
        }));
        this.loading = false;
        setTimeout(() => {
          this.updateNavigation();
          this.initializeThumbsSwiper();
        }, 0); // Update navigation after loading data
      });
  }

  ngAfterViewInit(): void {
    console.log("ngAfterViewInit called");
    console.log("thumbSwiperContainer:", this.thumbSwiperContainer);
    console.log("swiperContainer:", this.swiperContainer);

    window.scrollTo(0, 0);
    setTimeout(() => {
      this.initializeMainSwiper();
    }, 100); // Ensure the swiper instances are fully initialized
    this.initializeThumbsSwiper();
  }

  private initializeMainSwiper(): void {
    if (!this.swiperContainer) {
      console.error("swiperContainer is not defined");
      return;
    }

    this.mainSwiperInstance = this.swiperContainer.nativeElement.swiper;

    if (!this.mainSwiperInstance) {
      console.error("mainSwiperInstance is not defined");
      return;
    }

    console.log("mainSwiperInstance initialized");
    this.mainSwiperInstance.on('slideChangeTransitionEnd', () => {
      console.log("slideChange event triggered");
      this.updateNavigation();
    });
    this.mainSwiperInstance.on('init', () => {
      console.log("init event triggered");
      this.updateNavigation();
    });
    this.mainSwiperInstance.update();
    this.updateNavigation(); // Initial update
  }

  private initializeThumbsSwiper(): void {
    setTimeout(() => {
      console.log("initializeThumbsSwiper called");
      if (!this.thumbSwiperContainer) {
        console.error("thumbSwiperContainer is not defined");
        return;
      }

      console.log("thumbSwiperContainer and swiperContainer are defined");
      const thumbSwiperInstance = this.thumbSwiperContainer.nativeElement.swiper;
      const mainSwiperInstance = this.swiperContainer.nativeElement.swiper;

      if (!thumbSwiperInstance || !mainSwiperInstance) {
        console.error("thumbSwiperInstance or mainSwiperInstance is not defined");
        return;
      }

      console.log("thumbSwiperInstance and mainSwiperInstance are defined");
      this.thumbSwiperInstance = thumbSwiperInstance;
      mainSwiperInstance.thumbs.swiper = this.thumbSwiperInstance;
      this.updateMainSwiperThumbs();
      this.addHoverEffectToThumbs();
    }, 100);
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

    const thumbSlides = this.thumbSwiperContainer.nativeElement.querySelectorAll('.thumbsSwiper-slide');
    if (thumbSlides.length === 0) {
      console.error("No thumb slides found");
      return;
    }

    thumbSlides.forEach((slide, index) => {
      const thumbSlide = slide as HTMLElement;
      thumbSlide.addEventListener('mouseenter', () => {
        console.log(`Hovering over thumb slide ${index}`);
        this.swiperContainer.nativeElement.swiper.slideTo(index);
      });
    });
  }

  updateNavigation() {
    const swiperInstance = this.swiperContainer.nativeElement.swiper;
    this.isBeginning = swiperInstance.isBeginning;
    this.isEnd = swiperInstance.isEnd;
    this.showNavigation = this.images.length > (swiperInstance.params.slidesPerView as number);
    this.currentSlideIndex = swiperInstance.activeIndex + 1; // Swiper's activeIndex is 0-based
    this.totalSlides = swiperInstance.slides.length;
    console.log('isBeginning:', this.isBeginning, 'isEnd:', this.isEnd, "showNavigation:", this.showNavigation, "currentSlideIndex:", this.currentSlideIndex, "totalSlides:", this.totalSlides);
    this.cdr.detectChanges(); // Manually trigger change detection

  }

  checkScreenWidth(): void {
    this.paginationVisible = window.innerWidth < 768;
    console.log("paginationVisible (lower than 768px):", this.paginationVisible);
    this.updateMainSwiperOptions();
  }

  updateMainSwiperOptions(): void {
    if (this.mainSwiperInstance) {
      this.mainSwiperInstance.params.pagination = this.paginationVisible ? { dynamicBullets: true } : false;
      this.mainSwiperInstance.params.allowTouchMove = this.paginationVisible ? true : false;
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
