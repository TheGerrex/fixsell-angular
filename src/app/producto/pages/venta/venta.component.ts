import { Component } from '@angular/core';

@Component({
  selector: 'app-venta',
  templateUrl: './venta.component.html',
  styleUrls: ['./venta.component.scss']
})
export class VentaComponent {
  categories = [
    {
      name: 'Oficina',
      img: '../../../assets/img/png/home/categories/bizhub-C3351-office.jpg'
    },
    {
      name: 'Producción',
      img:'../../../assets/img/png/home/categories/konica-c2060-production.jpg'
    },
    {
      name: 'Inyección de Tinta',
      img:'../../../assets/img/png/home/categories/epson-wf-m5799-ink.jpg'
    },
    {
      name: 'Etiquetas',
      img:'../../../assets/img/png/home/categories/c6000a-epson-labels.jpg'
    },
    {
      name: 'Plotters',
      img:'../../../assets/img/png/home/categories/epson-plotter.jpg'
    },
    {
      name: 'Artes Gráficas',
      img:'../../../assets/img/png/home/categories/bizhub-pro-1060.jpg'
    }];

    responsiveOptions: any;
    
    constructor() {
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
    }
}
