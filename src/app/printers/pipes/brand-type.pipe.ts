import { Pipe, PipeTransform, HostListener } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Pipe({
  name: 'printerBrandType',
})
export class BrandTypePipe implements PipeTransform {
  private isMobile: boolean = false;

  constructor(private sanitizer: DomSanitizer) {
    this.setIsMobile(window.innerWidth);
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event): void {
    this.setIsMobile((event.target as Window).innerWidth);
  }

  private setIsMobile(windowWidth: number): void {
    // Define the breakpoint at which you want to switch to mobile
    const breakpoint = 768;
    this.isMobile = windowWidth <= breakpoint;
  }

  transform(brandName: string): SafeHtml {
    let imagePath: string;
    let imgWidth: string = '100px';
    let imgHeight: string = '25px';

    // Map the brand names to their respective image paths
    switch (brandName.toLowerCase()) {
      case 'konica minolta':
        imagePath =
          '../../../assets/svg/home/proveedores/konica_minolta_logo.svg';
        imgWidth = this.isMobile ? '120px' : 'auto';
        imgHeight = this.isMobile ? 'auto' : imgHeight;

        break;
      case 'kyocera':
        imagePath = '../../../assets/svg/home/proveedores/kyocera.svg';
        imgWidth = this.isMobile ? '100px' : 'auto';
        imgHeight = this.isMobile ? 'auto' : imgHeight;
        break;
      case 'epson':
        imagePath = '../../../assets/svg/home/proveedores/epson.svg';
        imgWidth = this.isMobile ? '80px' : 'auto';
        imgHeight = this.isMobile ? 'auto' : imgHeight;
        break;
      case 'prixato':
        imagePath = '../../../assets/svg/home/proveedores/eurotrade.png';
        imgWidth = 'auto';
        imgHeight = '24px';
        break;
      case 'audley':
        imagePath = '../../../assets/svg/home/proveedores/audley.png';
        imgWidth = this.isMobile ? '100px' : 'auto';
        imgHeight = this.isMobile ? 'auto' : imgHeight;
        break;
      default:
        // Return a default image path or handle unsupported brand names as needed
        imagePath = '../../../assets/svg/home/proveedores/epson.svg';
        imgWidth = this.isMobile ? '100%' : '100px';
        imgHeight = 'auto';
    }

    // Return the HTML img tag with the appropriate image path
    const imgTag = `<img src="${imagePath}" alt="${brandName} Logo" style="width: ${imgWidth}; height:${imgHeight};">`;

    // Mark the HTML as safe
    return this.sanitizer.bypassSecurityTrustHtml(imgTag);
  }
}
