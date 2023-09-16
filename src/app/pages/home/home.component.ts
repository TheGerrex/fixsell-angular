import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  
  categories = [
  {
    name: 'Oficina',
    img: '../../../assets/img/home/categories/bizhub-C3351-office.jpg'
  },
  {
    name: 'Produccion',
    img:'../../../assets/img/home/categories/konica-c2060-production.jpg'
  },
  {
    name: 'Inyección de Tinta',
    img:'../../../assets/img/home/categories/epson-wf-m5799-ink.jpg'
  },
  {
    name: 'Consumibles',
    img:'../../../assets/img/home/categories/TN_319-removebg-preview.png'
  },
  {
    name: 'Etiquetas',
    img:'../../../assets/img/home/categories/c6000a-epson-labels.jpg'
  },
  {
    name: 'Plotters',
    img:'../../../assets/img/home/categories/epson-plotter.jpg'
  },
  {
    name: 'Artes Gráficas',
    img:'../../../assets/img/home/categories/bizhub-pro-1060.jpg'
  }];

  clients = [
    {
      name: 'LG',
      svg: '../../../assets/img/home/logo-clientes/Blanco/lg-electronics-white.svg'
    },
    {
      name: 'Risoul',
      svg:'../../../assets/img/home/logo-clientes/Blanco/risoul-white.svg'
    },
    {
      name: 'Ryasa',
      svg:'../../../assets/img/home/logo-clientes/Blanco/ryasa-white.svg'
    },
    {
      name: 'Semex',
      svg:'../../../assets/img/home/logo-clientes/Blanco/semex-white.svg'
    },
    {
      name: 'TecMilenio',
      svg:'../../../assets/img/home/logo-clientes/Blanco/universidad-tecmilenio-white.svg'
    },
    {
      name: 'Grupo Vitro',
      svg:'../../../assets/img/home/logo-clientes/Blanco/vitro-white.svg'
    },
    {
      name: 'Thomas & Betts',
      svg:'../../../assets/img/home/logo-clientes/Blanco/thomas-betts-white.svg'
  }];



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
        numScroll: 1
      },
      {
          breakpoint: '1200px',
          numVisible: 3,
          numScroll: 1
      },
      {
          breakpoint: '992px',
          numVisible: 2,
          numScroll: 1
      },
      {
          breakpoint: '768px',
          numVisible: 1,
          numScroll: 1
      },
      {
          breakpoint: '576px',
          numVisible: 1,
          numScroll: 1
      },
      {
          breakpoint: '0px',
          numVisible: 1,
          numScroll: 1
      }
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
          circular: false
      },
      {
          breakpoint: '992px',
          numVisible: 4,
          numScroll: 1
      },
      {
          breakpoint: '768px',
          numVisible: 4,
          numScroll: 1
      },
      {
          breakpoint: '576px',
          numVisible: 3,
          numScroll: 1
      },
      {
          breakpoint: '375px',
          numVisible: 2,
          numScroll: 1
      },
      {
          breakpoint: '265px',
          numVisible: 1,
          numScroll: 1
      }
    ];
    
    
    
  }

  navigateToProductList(category: string) {
    this.router.navigate(['/printers/list'], { queryParams: { category } });
  }
}
