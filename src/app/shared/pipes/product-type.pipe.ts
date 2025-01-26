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
  <div class="tag" 
style="min-width: 60px;
  display: flex;
  height: fit-content;
  align-self: stretch;
  padding-left: .5rem;
  padding-right: .5rem;
  padding-top: .125rem;
  padding-bottom: .125rem;
  background: ${backgroundColor};
  border-radius: 16px;
  border: 0.50px ${borderColor} solid;
  justify-content: center;
  align-items: center;
  gap: 10px;
  display: flex;">
    <div style="color: ${textColor}; font-size: 12px; font-weight: 600;">${label}</div>
  </div>
`;

    let result = '';
    if (value.rentable) {
      if (value.packages.length > 0) {
        result += createTag('#FFA7B8', '#FFA7B8', '#AE003A', 'Paquete de Renta');
      } else {
        result += createTag('#FFA7B8', '#FFA7B8', '#AE003A', 'Renta');
      }
    }
    if (value.sellable) {
      result += createTag('#BEF4D2', '#BEF4D2', '#0F572A', 'Venta');
    }


    // Wrap the result in a parent div with display: flex
    result = `<div style="display: flex; gap: 6px;">${result}</div>`;

    return this.sanitizer.bypassSecurityTrustHtml(result);

    // if (value) {
    //   return this.sanitizer.bypassSecurityTrustHtml(rentaTag);
    // } else {
    //   return this.sanitizer.bypassSecurityTrustHtml(ventaTag);
    // }
  }
}
