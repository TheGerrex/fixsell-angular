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
          label: 'Productos',
          icon: 'pi pi-shopping-bag',
          items: [
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
          ]
        },
        {
          label: 'Servicios',
          icon: 'pi pi-table',
          items: [
              {label: 'Servicio Técnico', icon: 'pi pi-wrench'},
              {label: 'Digitalización', icon: 'pi pi-cloud'},
              {label: 'Gestión Documental', icon: 'pi pi-book'},
          ]
        },
        {
          label: 'Consumibles',
          icon: 'pi pi-box',
          items: [
              {label: 'Toner', icon:'pi pi-palette'},
              {label: 'Refacciones', icon: 'pi pi-cog'},
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
