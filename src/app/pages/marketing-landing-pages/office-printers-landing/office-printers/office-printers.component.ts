import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-office-printers',
  templateUrl: './office-printers.component.html',
  styleUrls: ['./office-printers.component.scss']
})
export class OfficePrintersComponent {
  constructor(private router: Router) { }
  showContactDialogForm = false;

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
