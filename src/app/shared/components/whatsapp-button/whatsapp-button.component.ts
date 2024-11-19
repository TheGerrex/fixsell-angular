import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'whatsapp-button',
  templateUrl: './whatsapp-button.component.html',
  styleUrls: ['./whatsapp-button.component.scss']
})
export class WhatsappButtonComponent implements OnInit {
  showMessage = true;

  ngOnInit() {
    setTimeout(() => {
      this.showMessage = true;
      setTimeout(() => {
        this.showMessage = false;
      }, 2000);
    }, 2000);
  }

  openWhatsApp() {
    const phoneNumber = '+528115555784';
    const message = `Me puedes puedes ayudar?`;
    const url = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${encodeURIComponent(message)}`;

    window.open(url, '_blank');
  }
}
