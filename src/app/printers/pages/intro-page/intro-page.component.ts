import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Printer } from '../../interfaces/printer.interface';
import { PrintersService } from '../../services/printers.service';
import { Category } from '../../interfaces/category.interface';

@Component({
  selector: 'printers-intro-page',
  templateUrl: './intro-page.component.html',
  styleUrls: ['./intro-page.component.scss']
})
export class IntroPageComponent {
  isInputFocused = false;
  searchQuery = '';

  categories: Category[] = [];

  responsiveOptions: any;
  responsiveOptionsAspectos: any;

  constructor(private router: Router, private printerService: PrintersService) {
    this.loadCategories();
  }

  loadCategories() {
    this.printerService.getCategories().subscribe((categories) => {
      this.categories = categories;
    });
  }

  navigateToProductList(category?: string, brand?: string, type?: string) {
    const queryParams: any = {};

    if (category) {
      queryParams.categories = category;
      queryParams.filterCount = (queryParams.filterCount || 0) + 1;
    }

    if (brand) {
      queryParams.brand = brand;
      queryParams.filterCount = (queryParams.filterCount || 0) + 1;
    }

    if (type === 'sellable') {
      queryParams.sellable = true;
      queryParams.filterCount = (queryParams.filterCount || 0) + 1;
    } else if (type === 'rentable') {
      queryParams.rentable = true;
      queryParams.filterCount = (queryParams.filterCount || 0) + 1;
    }

    this.router.navigate(['/printers/list'], {
      queryParams: queryParams,
      queryParamsHandling: 'merge',
    });
  }
}
