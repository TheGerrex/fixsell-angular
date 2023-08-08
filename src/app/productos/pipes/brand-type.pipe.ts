import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Pipe({
  name: 'brandType'
})
export class BrandTypePipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) {}
  transform(brandName: string): SafeHtml {
    let imagePath: string;
    
    // Map the brand names to their respective image paths
    switch (brandName.toLowerCase()) {
      case 'konica minolta':
        imagePath = '../../../assets/svg/home/proveedores/konica_minolta_logo.svg';
        break;
      case 'kyocera':
        imagePath = '../../../assets/svg/home/proveedores/kyocera.svg';
        break;
      case 'epson':
        imagePath = '../../../assets/svg/home/proveedores/epson.svg';
        break;
      default:
        // Return a default image path or handle unsupported brand names as needed
        imagePath = '../../../assets/svg/home/proveedores/epson.svg';
    }

    // Return the HTML img tag with the appropriate image path
    const imgTag = `<img src="${imagePath}" alt="${brandName} Logo" style="width: 180px; height: 25px;">`;

    // Mark the HTML as safe
    return this.sanitizer.bypassSecurityTrustHtml(imgTag);
  }
}
