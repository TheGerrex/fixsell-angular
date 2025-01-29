import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-software-document-scanning',
  templateUrl: './software-document-scanning.component.html',
  styleUrls: ['./software-document-scanning.component.scss'],
})
export class SoftwareDocumentScanningComponent implements OnInit {
  constructor(private router: Router) {}
  selectedProduct: string = '';
  showDialogForm = false;
  showContactDialogForm = false;

  ngOnInit() {
    // Initialization logic for localstorage
  }
  callPhoneNumber() {
    const location = localStorage.getItem('location') || 'mty';
    const phoneNumber = location === 'cdmx' ? '5559295976' : '8181143827';
    window.location.href = `tel:${phoneNumber}`;
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
