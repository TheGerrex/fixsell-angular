import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'printers-intro-page',
  templateUrl: './intro-page.component.html',
  styleUrls: ['./intro-page.component.scss']
})
export class IntroPageComponent {
isInputFocused = false;  
  searchQuery = '';
  aspectos = [
    {
      title: 'Precios competitivos',
      description:
        'Creemos en ofrecer una excelente relación calidad-precio. Nuestras impresoras tienen precios competitivos, y con frecuencia ofrecemos promociones y descuentos para ayudarle a ahorrar aún más. Puede confiar en que está haciendo un gran negocio sin comprometer la calidad.',
    },
    {
      title: 'Experiencia de compra cómoda',
      description:
        'Nuestra tienda en línea ofrece una interfaz fácil de usar, por lo que es fácil para usted para navegar y comparar las impresoras desde la comodidad de su hogar u oficina. Proporcionamos descripciones detalladas de los productos, especificaciones y opiniones de clientes para ayudarle a tomar una decisión informada. Una vez que haya hecho su elección, le ofrecemos opciones de pago seguras y sin complicaciones.',
    },
    {
      title: 'Entrega puntual',
      description:
        'Entendemos que una entrega rápida es esencial. Nos esforzamos por procesar y enviar los pedidos lo más rápido posible, garantizando que su impresora llegue a tiempo. Trabajamos con transportistas de confianza para asegurarnos de que su impresora llegue a su casa de forma segura.',
    },
    {
      title: 'Asesoramiento y orientación de expertos',
      description:
        'Nuestro experto y amable equipo de ventas está dedicado a ayudarle a encontrar la impresora ideal para sus necesidades específicas. Entendemos que la elección de la impresora adecuada puede ser abrumadora, por lo que proporcionamos orientación personalizada para garantizar que tome una decisión informada.',
    },
    {
      title: 'Garantía y asistencia postventa',
      description:
        'Su satisfacción es nuestra máxima prioridad. Proporcionamos cobertura de garantía para todas nuestras impresoras, dándole tranquilidad en caso de cualquier defecto de fabricación. Además, nuestro dedicado equipo de atención al cliente está disponible para ayudarle con cualquier consulta o problema técnico que pueda surgir después de su compra.',
    },
    {
      title: 'Productos de alta calidad',
      description:
        'Sólo ofrecemos impresoras de marcas de renombre conocidas por su fiabilidad y rendimiento. Cada impresora se somete a rigurosos controles de calidad para garantizar que cumple los estándares más exigentes. Con nuestros productos, puede esperar una calidad de impresión, durabilidad y longevidad excepcionales.',
    },
    {
      title: 'Amplia selección de impresoras',
      description:
        'Ofrecemos una amplia gama de impresoras de marcas líderes, lo que le garantiza el acceso a los últimos modelos y tecnologías. Tanto si necesita una impresora compacta para uso doméstico como una impresora de alto rendimiento para un entorno profesional, tenemos la solución perfecta para satisfacer sus necesidades.',
    },
  ];

  categories = [
    {
      name: 'Oficina',
      category: 'Oficina',
    },
    {
      name: 'Producción',
      category: 'Produccion',
    },
    {
      name: 'Etiquetas',
      category: 'Etiquetas',
    },
    {
      name: 'Artes Gráficas',
      category: 'Artes Graficas',
    },
    {
      name: 'Inyección de Tinta',
      category: 'Inyeccion de Tinta',
    },
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
        numVisible: 2,
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
    this.responsiveOptionsAspectos = [
      {
        breakpoint: '3000px',
        numVisible: 4,
        numScroll: 1,
      },
      {
        breakpoint: '1400px',
        numVisible: 3,
        numScroll: 1,
      },
      {
        breakpoint: '1200px',
        numVisible: 2,
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
  }

  navigateToProductList(category: string) {
    this.router.navigate(['/printers/list'], {
      queryParams: { categories: category,  filterCount: 1 },
      queryParamsHandling: 'merge',
    });
  }

  navigateToProductListType(type: string) {

    if(type === 'sellable') {
      this.router.navigate(['/printers/list'], {
        queryParams: { sellable: true,  filterCount: 1 },
        queryParamsHandling: 'merge',
      });
    } else if(type === 'rentable') {
      this.router.navigate(['/printers/list'], {
        queryParams: { rentable: true,  filterCount: 1 },
        queryParamsHandling: 'merge',
      });
    }
    
  }
}
