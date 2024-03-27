import { Component, Input } from '@angular/core';
import { NgForm } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
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
  leadId: number = 0; // Assign an initial value to leadId

  @Input() message: string = '';
  @Input() product: string = '';
  @Input() productType: string = '';
  private readonly baseUrl: string = environment.baseUrl;
  constructor(private http: HttpClient) {}

  openEmailForm() {
    this.showEmailForm = true;
  }

  submitEmailForm(form: NgForm) {
    if (form.valid) {
      // Prepare the data
      const data = {
        client: this.companyName,
        status: 'prospect',
        product_interested: this.product,
        type_of_product: this.productType,
        email: this.email,
        phone: this.phone,
      };

      // Make the POST request
      this.http.post(`${this.baseUrl}/leads`, data).subscribe({
        next: (response: any) => {
          console.log('Lead created successfully:', response);

          // Store the id
          this.leadId = response.id;

          // Prepare the sales communication data
          const salesCommunicationData = {
            message: this.message,
            date: new Date().toISOString(),
            type: 'email',
            leadId: this.leadId,
            notes: 'generado automáticamente por el sistema',
          };

          // Make the POST request for sales communication
          this.http
            .post(`${this.baseUrl}/sale-communication`, salesCommunicationData)
            .subscribe({
              next: (salesResponse: any) => {
                console.log(
                  'Sales communication created successfully:',
                  salesResponse
                );
              },
              error: (salesError) => {
                console.error(
                  'Error creating sales communication:',
                  salesError
                );
              },
            });

          //email client
          // Prepare the email data
          const subject = encodeURIComponent(
            `${this.companyName},: ${this.productType}, ${this.product}`
          );
          const body = encodeURIComponent(
            `Hola, hablo por parte de: ${this.companyName}\n` +
              `Message: ${this.message}` +
              `me puedes dar más información al respecto?\n\n` +
              `Email: ${this.email}\n` +
              `Phone: ${this.phone}\n` +
              `Product: ${this.product}\n` +
              ``
          );

          // Construct the mailto link
          const mailtoLink = `mailto:?subject=${subject}&body=${body}`;

          // Open the email client in a new tab or window
          window.open(mailtoLink, '_blank');

          // Reset the form
          this.companyName = '';
          this.phone = '';
          this.email = '';
          this.message = '';
          this.showEmailForm = false;
        },
        error: (error) => {
          console.error('Error creating lead:', error);
        },
      });
    }
  }
}
