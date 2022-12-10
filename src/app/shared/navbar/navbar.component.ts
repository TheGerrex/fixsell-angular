import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  items!: MenuItem[];

    constructor() { }

    ngOnInit() {
      this.items = [
        {
          label: 'Renta',
          items: [
              {label: 'Oficina'},
              {label: 'Producción'},
              {label: 'Artes Gráficas'},
              {label: 'Inyección de Tinta'},
          ]
        },
        {
          label: 'Venta',
          items: [
              {label: 'Oficina'},
              {label: 'Producción'},
              {label: 'Etiquetas'},
              {label: 'Plotters'},
              {label: 'Inyección de Tinta'},
              {label: 'Artes Gráficas'},
          ]
        },
        {
          label: 'Servicios',
          items: [
              {label: 'Servicio Técnico'},
              {label: 'Digitalización'},
              {label: 'Gestión Documental'},
          ]
        },
        {
          label: 'Consumibles',
          items: [
              {label: 'Toner'},
              {label: 'Refacciones'},
          ]
        },
        {label: 'Promociones'},
        {label: 'Nosotros'}
      ];
  }
}
