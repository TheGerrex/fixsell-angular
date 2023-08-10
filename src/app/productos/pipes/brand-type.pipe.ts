import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Pipe({
  name: 'brandType'
})
export class BrandTypePipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) {}
  transform(brandName: string): SafeHtml {
    let imagePath: string;
    let imgWidth: string = "100px"
    let imgHeight: string = "25px"
    
    // Map the brand names to their respective image paths
    switch (brandName.toLowerCase()) {
      case 'konica minolta':
        imagePath = '../../../assets/svg/home/proveedores/konica_minolta_logo.svg';
        imgWidth = '165px';
        imgHeight = 'auto';
        break;
      case 'kyocera':
        imagePath = '../../../assets/svg/home/proveedores/kyocera.svg';
        imgWidth = '125px';
        imgHeight = 'auto';
        break;
      case 'epson':
        imagePath = '../../../assets/svg/home/proveedores/epson.svg';
        imgWidth = '100px';
        imgHeight = 'auto';
        break;
      default:
        // Return a default image path or handle unsupported brand names as needed
        imagePath = '../../../assets/svg/home/proveedores/epson.svg';
    }

    // Return the HTML img tag with the appropriate image path
    const imgTag = `<img src="${imagePath}" alt="${brandName} Logo" style="width: ${imgWidth}; height:${imgHeight};">`;

    // Mark the HTML as safe
    return this.sanitizer.bypassSecurityTrustHtml(imgTag);
  }
}
