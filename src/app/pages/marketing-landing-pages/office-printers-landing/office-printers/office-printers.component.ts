import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-office-printers',
  templateUrl: './office-printers.component.html',
  styleUrls: ['./office-printers.component.scss'],
})
export class OfficePrintersComponent implements OnInit {
  constructor(private router: Router) { }

  ngOnInit() {
    // Initialization logic for localstorage
  }

  callPhoneNumber() {
    const location = localStorage.getItem('location') || 'mty';
    const phoneNumber = location === 'cdmx' ? '5559295976' : '8181143827';
    window.location.href = `tel:${phoneNumber}`;
  }

  navigateToProductListTypeCategory(types: string[]) {
    const categories = types.join(',');

    this.router.navigate(['/printers/list'], {
      queryParams: { categories, filterCount: 1 },
      queryParamsHandling: 'merge',
      replaceUrl: false,
    });
  }


  navigateToProductListType(type: string) {
    let queryParams = {};

    if (type === 'sellable') {
      queryParams = { sellable: true, filterCount: 1 };
    } else if (type === 'rentable') {
      queryParams = { rentable: true, filterCount: 1 };
    }

    this.router.navigate(['/printers/list'], {
      queryParams,
      queryParamsHandling: 'merge',
      replaceUrl: false,
    });
  }


}
