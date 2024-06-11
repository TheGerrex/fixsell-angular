import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Pipe({
  name: 'productColor'
})
export class ProductColorPipe implements PipeTransform {
  
constructor(private sanitizer: DomSanitizer) {}

  transform(value: boolean): SafeHtml {
    const colorTag = `
      <div class="TypeBlob" style="min-width: 60px;
      height: fit-content;
      align-self: stretch;
      padding-left: 4px;
      padding-right: 4px;
      padding-top: 2px;
      padding-bottom: 2px;
      background-image: linear-gradient( 89.7deg, rgba(166,0,0,1) 2.7%, rgba(160,66,0,1) 15.1%, rgba(174,182,0,1) 29.5%, rgba(16,190,12,1) 45.8%, rgba(20,190,190,1) 61.5%, rgba(2,12,190,1) 76.4%, rgba(150,0,188,1) 92.4% );
      border-radius: 8px;
      border: 0.50px #FFF solid;
      justify-content: center;
      align-items: center;
      gap: 10px;
      display: flex;">
        <div style="color: #FFF;
        font-size: 12px;
        font-weight: 600;">Color</div>
      </div>
    `;
    const monoTag = `
      <div class="TypeBlob" style="min-width: 60px;
      height: fit-content;
      align-self: stretch;
      padding-left: 4px;
      padding-right: 4px;
      padding-top: 2px;
      padding-bottom: 2px;
      background: radial-gradient(circle at 24.1% 68.8%, rgb(50, 50, 50) 0%, rgb(0, 0, 0) 99.4%);
      border-radius: 8px;
      border: 0.50px #e5e7eb solid;
      justify-content: center;
      align-items: center;
      gap: 10px;
      display: flex;">
        <div style="color: #FFF; font-size: 12px; font-weight: 600;">B/N</div>
      </div>
    `;

    let result = '';
    if (value) {
      result += colorTag;
    } else {
      result += monoTag;
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
