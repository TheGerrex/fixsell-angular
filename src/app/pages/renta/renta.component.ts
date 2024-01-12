import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-renta',
  templateUrl: './renta.component.html',
  styleUrls: ['./renta.component.scss']
})
export class RentaComponent {
  aspectos = [
    {
      title: 'Amplia selección de impresoras',
      description: 'Ofrecemos una diversa gama de impresoras para satisfacer sus necesidades específicas, ya sea para la impresión de documentos básicos, tareas de gran volumen o requisitos de impresión especializados. Nuestro inventario incluye impresoras de inyección de tinta, impresoras láser, impresoras multifunción y mucho más.'
    },
    {
      title: "Enfoque respetuoso con el medio ambiente",
      description: "Al optar por el alquiler de impresoras, contribuye a un planeta más ecológico. El alquiler reduce los residuos electrónicos al ampliar el ciclo de vida de los equipos de impresión y promueve una solución de impresión sostenible."
    },
    {
      title: "Solución rentable",
      description: "Alquilar una impresora elimina la necesidad de incurrir en importantes costes iniciales asociados a la compra de un nuevo dispositivo. Nuestras tarifas de alquiler son asequibles y transparentes, lo que le permite asignar sus recursos de manera más eficiente mientras disfruta de la última tecnología de impresión."
    },
    {
      title: "Impresión de alta calidad",
      description: "Nuestras impresoras se mantienen y revisan cuidadosamente para garantizar un rendimiento de primera categoría. Puede esperar impresiones nítidas y vibrantes con una excelente resolución, lo que le permitirá mostrar sus documentos, materiales de marketing o proyectos creativos de la mejor manera posible."
    },
    {
      title: "Asistencia bajo demanda",
      description: "Nuestro equipo de soporte especializado está siempre listo para ayudarle con cualquier consulta o problema relacionado con la impresora que pueda encontrar durante su período de alquiler. Nos esforzamos por ofrecer un soporte rápido y fiable para garantizar una experiencia de impresión sin problemas."
    },
    {
      title: "Planes de alquiler flexibles",
      description: "Entendemos que cada proyecto o situación es única. Por eso ofrecemos planes de alquiler flexibles adaptados a sus requisitos específicos de duración, volumen y presupuesto. Tanto si necesita una impresora para unos pocos días, semanas o meses, le tenemos cubierto."
    },
    {
      title: "Comodidad y accesibilidad",
      description: "Con Fixsell del Norte, puede evitar las molestias del mantenimiento, las reparaciones y las actualizaciones de las impresoras. Nosotros nos encargamos de todos los aspectos logísticos, incluida la entrega, la configuración y la recogida, para que pueda centrarse en sus tareas principales sin interrupciones."
    }
  ];

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
      name: 'Inyeccion de Tinta',
      img:'../../../assets/img/home/categories/epson-wf-m5799-ink.jpg'
    },
    {
      name: 'Artes Graficas',
      img:'../../../assets/img/home/categories/bizhub-pro-1060.jpg'
    }
  ];

  responsiveOptions: any;
  responsiveOptionsAspectos: any;
  
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
    this.responsiveOptionsAspectos = [
      {
        breakpoint: '3000px',
        numVisible: 4,
        numScroll: 1,
      },
      {
        breakpoint: '1400px',
        numVisible: 3,
        numScroll: 1
      },
      {
          breakpoint: '1200px',
          numVisible: 2,
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
  navigateToProductList(category: string, rentable: boolean) {
    this.router.navigate(['/printers/list'], { queryParams: {  categories: category, rentable: rentable, filterCount: 2 } });
  }
}
