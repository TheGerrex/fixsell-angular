import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { Printer } from 'src/app/printers/interfaces/printer.interface';

@Pipe({
  name: 'productType',
})
export class ProductTypePipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) { }

  transform(value: Printer): SafeHtml {

    const createTag = (backgroundColor: string, borderColor: string, textColor: string, label: string) => `
  <div class="tag" style="min-width: 60px;
  display: flex;
  height: 100%;
  padding: 0.25rem 0.5rem;
  background: ${backgroundColor};
  border-radius: 16px;
  border: 0.50px ${borderColor} solid;
  justify-content: center;
  align-items: center;
  gap: 10px;">
    <div style="color: ${textColor}; font-size: 12px; font-weight: 600; line-height: 1;">${label}</div>
  </div>
`;

    const isPackageExpired = (packageEndDate: string): boolean => {
      const currentDate = new Date();
      const endDate = new Date(packageEndDate);
      return endDate < currentDate;
    };

    const hasValidPackages = (packages: any[]): boolean => {
      return packages.some(pkg => !isPackageExpired(pkg.packageEndDate));
    };

    let result = '';
    if (value.rentable) {
      if (hasValidPackages(value.packages)) {
        result += createTag('#FFA7B8', '#FFA7B8', '#AE003A', 'Renta');
      } else {
        result += createTag('#FFA7B8', '#FFA7B8', '#AE003A', 'Renta');
      }
    }
    if (value.sellable) {
      result += createTag('#BEF4D2', '#BEF4D2', '#0F572A', 'Venta');
    }

    // Wrap the result in a parent div with display: flex
    result = `<div style="display: flex; gap: .5rem;">${result}</div>`;

    return this.sanitizer.bypassSecurityTrustHtml(result);
  }
}