import { Component, Input } from '@angular/core';
import { NgForm } from '@angular/forms';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'product-email-form',
  templateUrl: './product-email-form.component.html',
  styleUrls: ['./product-email-form.component.scss'],
})
export class ProductEmailFormComponent {
  showEmailForm = false;
  companyName = '';
  phone = '';
  email = '';
  @Input() message: string = '';

  constructor() {}

  openEmailForm() {
    this.showEmailForm = true;
  }

  submitEmailForm(form: NgForm) {
    if (form.valid) {
      // Handle form submission here
      console.log('Nombre de la empresa:', this.companyName);
      console.log('Teléfono:', this.phone);
      console.log('Email:', this.email);
      console.log('Mensaje:', this.message);

      // Reset the form
      this.companyName = '';
      this.phone = '';
      this.email = '';
      this.message = '';
      this.showEmailForm = false;
    }
  }
}
