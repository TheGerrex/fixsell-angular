import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-software-document-scanning',
  templateUrl: './software-document-scanning.component.html',
  styleUrls: ['./software-document-scanning.component.scss']
})
export class SoftwareDocumentScanningComponent {
  constructor(private router: Router) { }
  selectedProduct: string = '';
  showDialogForm = false;
  showContactDialogForm = false;

  callPhoneNumber() {
    window.location.href = 'tel:8181143827';
  }

  showDialog(product: string) {
    this.selectedProduct = product;
    this.showDialogForm = true;
  }

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
