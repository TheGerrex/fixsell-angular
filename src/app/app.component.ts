import { Component } from '@angular/core';
import { MenuItem, PrimeNGConfig } from 'primeng/api';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
   items!: MenuItem[];

    constructor() { }

    ngOnInit() {
        this.items = [
            {
                icon: 'pi pi-pencil',
                command: () => {
                         }
            },
            {
                icon: 'pi pi-refresh',
                command: () => {
                    
                }
            },
            {
                icon: 'pi pi-trash',
                command: () => {
                                   }
            },
            {
                icon: 'pi pi-upload',
                routerLink: ['/fileupload']
            },
            {
                icon: 'pi pi-external-link',
                url: 'http://angular.io'

            }
        ];
    }

}
