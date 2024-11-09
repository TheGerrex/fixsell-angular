import { Component } from '@angular/core';

@Component({
  selector: 'whatsapp-button',
  templateUrl: './whatsapp-button.component.html',
  styleUrls: ['./whatsapp-button.component.scss']
})
export class WhatsappButtonComponent {
  openWhatsApp() {
    const phoneNumber = '+528115555784';
    const message = `Me puedes puedes ayudar?`;
    const url = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${encodeURIComponent(message)}`;

    window.open(url, '_blank');
  }
}
