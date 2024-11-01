import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-high-end-printers',
  templateUrl: './high-end-printers.component.html',
  styleUrls: ['./high-end-printers.component.scss']
})
export class HighEndPrintersComponent {

  constructor(private router: Router) { }

  navigateToProductListType(type: string) {
    if (type === 'sellable') {
      this.router.navigate(['/printers/list'], {
        queryParams: { sellable: true, filterCount: 1 },
        queryParamsHandling: 'merge',
      });
    } else if (type === 'rentable') {
      this.router.navigate(['/printers/list'], {
        queryParams: { rentable: true, filterCount: 1 },
        queryParamsHandling: 'merge',
      });
    }

  }
}
