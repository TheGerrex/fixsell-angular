import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

// false | productType = B/N
// true | productType = Color

@Pipe({
  name: 'productType'
})
export class ProductTypePipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) {}

  transform(value: boolean): SafeHtml {
    const rentaTag = `
      <div class="TypeBlob" style="width: 76px;
      height: fit-content;
      align-self: stretch;
      padding-left: 8px;
      padding-right: 8px;
      padding-top: 6px;
      padding-bottom: 6px;
      background: #FFA7B8;
      border-radius: 8px;
      border: 0.50px #FFA7B8 solid;
      justify-content: center;
      align-items: center;
      gap: 10px;
      display: flex;">
        <div style="color: #EC4769;
        font-size: 1rem;
        font-family: Cera Pro;
        font-weight: 700;
        word-wrap: break-word;
        height: auto;">Renta</div>
      </div>
    `;
    const ventaTag = `
      <div class="TypeBlob" style="width: 76px;
      height: fit-content;
      align-self: stretch;
      padding-left: 8px;
      padding-right: 8px;
      padding-top: 6px;
      padding-bottom: 6px;
      background: #BEF4D2;
      border-radius: 8px;
      border: 0.50px #BEF4D2 solid;
      justify-content: center;
      align-items: center;
      gap: 10px;
      display: flex;">
        <div style="color: #22C55E; font-size: 16px; font-weight: 700;">Venta</div>
      </div>
    `;

    if (value) { 
      return this.sanitizer.bypassSecurityTrustHtml(rentaTag);
    } 
    else { 
      return this.sanitizer.bypassSecurityTrustHtml(ventaTag);
    };
  }

}
