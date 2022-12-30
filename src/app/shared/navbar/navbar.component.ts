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
          icon: 'pi pi-print',
          items: [
              {label: 'Oficina'},
              {label: 'Producción'},
              {label: 'Artes Gráficas'},
              {label: 'Inyección de Tinta'},
          ]
        },
        {
          label: 'Venta',
          icon: 'pi pi-dollar',
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
          icon: 'pi pi-table',
          items: [
              {label: 'Servicio Técnico'},
              {label: 'Digitalización'},
              {label: 'Gestión Documental'},
          ]
        },
        {
          label: 'Consumibles',
          icon: 'pi pi-shopping-bag',
          items: [
              {label: 'Toner'},
              {label: 'Refacciones'},
          ]
        },
        {
          label: 'Promociones',
          icon: 'pi pi-bolt',
        },
        {
          label: 'Nosotros',
          icon: 'pi pi-users',
        }
      ];
  }
}
