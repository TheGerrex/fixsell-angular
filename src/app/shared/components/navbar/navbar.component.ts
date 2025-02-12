import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
  items!: MenuItem[];
  isMenuOpen = false;
  openDropdowns: Set<string> = new Set();

  constructor() { }

  ngOnInit() {
    this.items = [
      {
        label: 'Productos',
        icon: 'pi pi-shopping-bag',
        items: [
          {
            label: 'Multifuncionales',
            icon: 'pi pi-print',
            // routerLink: ['/printers/intro'],
            items: [
              {
                label: 'Alta Gama',
                // icon: 'pi pi-print',
                routerLink: ['/impresoras-alta-gama'],
              },
              {
                label: 'Oficina',
                // icon: 'pi pi-print',
                routerLink: ['/impresoras-para-oficinas'],
              },
              {
                label: 'Gran Formato',
                icon: 'pi pi-search',
                routerLink: ['/plotters-impresoras-gran-formato'],
              },
              {
                label: 'Buscar',
                // icon: 'pi pi-print',
                routerLink: ['/printers/intro'],
              },
            ]
          },
          {
            label: 'Consumibles',
            icon: 'pi pi-box',
            routerLink: ['/consumables/intro'],
            // items: [
            //     {label: 'Toner', icon:'pi pi-palette'},
            //     {label: 'Refacciones', icon: 'pi pi-cog'},
            // ]
          },
          {
            label: 'Software',
            icon: 'pi pi-cog',
            routerLink: ['/software-digitalizacion-documentos'],
          },
        ],
      },
      {
        label: 'Promociones',
        icon: 'pi pi-bolt',
        routerLink: ['/promociones'],
      },
      {
        label: 'Nosotros',
        icon: 'pi pi-users',
        routerLink: ['/nosotros'],
      },
      {
        label: 'Contacto',
        icon: 'pi pi-envelope',
        routerLink: ['/contacto'],
      },
    ];
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  toggleDropdown(item: any, index: string) {
    if (item.items) {
      if (this.openDropdowns.has(index)) {
        this.openDropdowns.delete(index);
      } else {
        this.openDropdowns.add(index);
      }
    } else {
      this.isMenuOpen = false;
    }
  }

  isDropdownOpen(index: string): boolean {
    return this.openDropdowns.has(index);
  }
}
