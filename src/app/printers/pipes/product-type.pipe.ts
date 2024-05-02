import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { Printer } from 'src/app/printers/interfaces/printer.interface';

@Pipe({
  name: 'productType',
})
export class ProductTypePipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) {}

  transform(value: Printer): SafeHtml {
    const rentaTag = `
      <div class="TypeBlob" style="width: 60px;
      height: fit-content;
      align-self: stretch;
      padding-left: 4px;
      padding-right: 4px;
      padding-top: 2px;
      padding-bottom: 2px;
      background: #FFA7B8;
      border-radius: 8px;
      border: 0.50px #FFA7B8 solid;
      justify-content: center;
      align-items: center;
      gap: 10px;
      display: flex;">
        <div style="color: #AE003A;
        font-size: 12px;
        font-weight: 600;">Renta</div>
      </div>
    `;
    const ventaTag = `
      <div class="TypeBlob" style="width: 60px;
      height: fit-content;
      align-self: stretch;
      padding-left: 4px;
      padding-right: 4px;
      padding-top: 2px;
      padding-bottom: 2px;
      background: #BEF4D2;
      border-radius: 8px;
      border: 0.50px #BEF4D2 solid;
      justify-content: center;
      align-items: center;
      gap: 10px;
      display: flex;">
        <div style="color: #0F572A; font-size: 12px; font-weight: 600;">Venta</div>
      </div>
    `;

    let result = '';
    if (value.rentable) {
      result += rentaTag;
    }
    if (value.sellable) {
      result += ventaTag;
    }

    // Wrap the result in a parent div with display: flex
    result = `<div style="display: flex; gap: 6px;">${result}</div>`;
  
    return this.sanitizer.bypassSecurityTrustHtml(result);
  }
}
