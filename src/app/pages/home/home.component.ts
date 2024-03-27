import { Component, HostBinding, HostListener, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import SwiperCore, {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  Thumbs,
  SwiperOptions,
  Autoplay,
} from 'swiper';

// install Swiper modules
SwiperCore.use([Navigation, Pagination, Scrollbar, A11y, Thumbs, Autoplay]);

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class HomeComponent implements OnInit {

  thumbsSwiper: any;
  imageSrc = '../../../assets/img/home/soluciones-servicios/tecnico-impresoras.png';
  activeItem = 1;
  isSmallScreen = false;

  categories = [
    {
      name: 'Oficina',
      img: '../../../assets/img/home/categories/bizhub-C3351-office.jpg',
    },
    {
      name: 'Produccion',
      img: '../../../assets/img/home/categories/konica-c2060-production.jpg',
    },
    {
      name: 'Inyeccion de Tinta',
      img: '../../../assets/img/home/categories/epson-wf-m5799-ink.jpg',
    },
    {
      name: 'Consumibles',
      img: '../../../assets/img/home/categories/TN_319-removebg-preview.png',
    },
    {
      name: 'Etiquetas',
      img: '../../../assets/img/home/categories/c6000a-epson-labels.jpg',
    },
    {
      name: 'Plotter',
      img: '../../../assets/img/home/categories/epson-plotter.jpg',
    },
    {
      name: 'Artes Graficas',
      img: '../../../assets/img/home/categories/bizhub-pro-1060.jpg',
    },
  ];

  clients = [
    {
      name: 'LG',
      svg: '../../../assets/img/home/logo-clientes/Blanco/lg-electronics-white.svg',
    },
    {
      name: 'Risoul',
      svg: '../../../assets/img/home/logo-clientes/Blanco/risoul-white.svg',
    },
    {
      name: 'Ryasa',
      svg: '../../../assets/img/home/logo-clientes/Blanco/ryasa-white.svg',
    },
    {
      name: 'Semex',
      svg: '../../../assets/img/home/logo-clientes/Blanco/semex-white.svg',
    },
    {
      name: 'TecMilenio',
      svg: '../../../assets/img/home/logo-clientes/Blanco/universidad-tecmilenio-white.svg',
    },
    {
      name: 'Grupo Vitro',
      svg: '../../../assets/img/home/logo-clientes/Blanco/vitro-white.svg',
    },
    {
      name: 'Thomas & Betts',
      svg: '../../../assets/img/home/logo-clientes/Blanco/thomas-betts-white.svg',
    },
  ];

  config: SwiperOptions = {
    slidesPerView: 1,
    spaceBetween: 8,
    // navigation: true,
    autoplay: false,
    pagination: { clickable: true },
    scrollbar: { draggable: true },
    breakpoints: {
      1024: {
        slidesPerView: 4,
        spaceBetween: 24,
        // navigation: true,
        autoplay: false,
        scrollbar: { draggable: true },
      },
      768: {
        slidesPerView: 3,
        spaceBetween: 16,
        // navigation: true,
        autoplay: false,
        pagination: { clickable: true },
        scrollbar: { draggable: true },
      },
      360: {
        slidesPerView: 2,
        spaceBetween: 8,
        // navigation: false,
        autoplay: true,
        pagination: { clickable: true },
        scrollbar: { draggable: true },
      },
    },
    // thumbs: {swiper: this.thumbsSwiper}
  };

  responsiveOptions: any;
  responsiveClientOptions: any;

  constructor(private router: Router) {
    this.responsiveOptions = [
      {
        breakpoint: '3000px',
        numVisible: 4,
        numScroll: 1,
      },
      {
        breakpoint: '1400px',
        numVisible: 4,
        numScroll: 1,
      },
      {
        breakpoint: '1200px',
        numVisible: 3,
        numScroll: 1,
      },
      {
        breakpoint: '992px',
        numVisible: 2,
        numScroll: 1,
      },
      {
        breakpoint: '768px',
        numVisible: 1,
        numScroll: 1,
      },
      {
        breakpoint: '576px',
        numVisible: 1,
        numScroll: 1,
      },
      {
        breakpoint: '0px',
        numVisible: 1,
        numScroll: 1,
      },
    ];

    this.responsiveClientOptions = [
      {
        breakpoint: '3000px',
        numVisible: 7,
        numScroll: 0,
      },
      {
        breakpoint: '1400px',
        numVisible: 7,
        numScroll: 0,
      },
      {
        breakpoint: '1200px',
        numVisible: 5,
        numScroll: 1,
        circular: false,
      },
      {
        breakpoint: '992px',
        numVisible: 4,
        numScroll: 1,
      },
      {
        breakpoint: '768px',
        numVisible: 4,
        numScroll: 1,
      },
      {
        breakpoint: '576px',
        numVisible: 3,
        numScroll: 1,
      },
      {
        breakpoint: '375px',
        numVisible: 2,
        numScroll: 1,
      },
      {
        breakpoint: '265px',
        numVisible: 1,
        numScroll: 1,
      },
    ];
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.isSmallScreen = event.target.innerWidth <= 768;
  }

  ngOnInit() {
    this.isSmallScreen = window.innerWidth <= 768;
  }

  navigateToProductList(category: string) {
    this.router.navigate(['/printers/list'], {
      queryParams: { categories: category },
    });
  }

  changeImage(newImageSrc: string) {
      this.imageSrc = newImageSrc;
  }
  
  setActiveItem(item: number) {
    this.activeItem = item;
  }

  scrollTo(id: string): void {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: 'smooth' });
  }
}
