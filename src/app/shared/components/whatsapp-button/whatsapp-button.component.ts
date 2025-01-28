import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'whatsapp-button',
  templateUrl: './whatsapp-button.component.html',
  styleUrls: ['./whatsapp-button.component.scss'],
})
export class WhatsappButtonComponent implements OnInit {
  showMessage = true;
  phoneNumber: string = '+528115555784'; // Default to MTY

  ngOnInit() {
    const location = localStorage.getItem('location') || 'mty';
    this.phoneNumber = location === 'cdmx' ? '+528115555784' : '+528115555784'; // CDMX or MTY number

    setTimeout(() => {
      this.showMessage = true;
      setTimeout(() => {
        this.showMessage = false;
      }, 2000);
    }, 2000);
  }

  openWhatsApp() {
    const message = `¿Me puedes ayudar?`;
    const url = `https://api.whatsapp.com/send?phone=${
      this.phoneNumber
    }&text=${encodeURIComponent(message)}`;

    window.open(url, '_blank');
  }
}
