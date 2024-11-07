import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastService } from '../toast.service';
import { environment } from 'src/environments/environment';
import { Observable, forkJoin } from 'rxjs';

interface formDataRentPackage {
  companyName: string;
  phone: string;
  email: string;
  message: string;
}

@Injectable({
  providedIn: 'root'
})
export class ProductContactFormService {

  constructor(private http: HttpClient) { }
  private readonly baseUrl: string = environment.baseUrl;
  leadId: number = 0; // Assign an initial value to leadId

  submitForm(data: formDataRentPackage, product: string, productType: string) {

    const formData = {
      client: data.companyName,
      status: 'prospect',
      product_interested: product,
      type_of_product: productType,
      email: data.email,
      phone: data.phone,
    };

    // Make the POST request
    return new Observable((observer) => {
      this.http.post(`${this.baseUrl}/leads`, formData).subscribe({
        next: (response: any) => {

          // Store the id
          this.leadId = response.id;

          // Prepare the sales communication data
          const salesCommunicationData = {
            message: data.message,
            date: new Date().toISOString(),
            type: 'email',
            leadId: this.leadId,
            notes: 'generado automáticamente por el sistema',
          };

          // Make the POST request for sales communication
          const salesCommunicationRequest = this.http.post(`${this.baseUrl}/sale-communication`, salesCommunicationData);

          // Prepare the email data
          const emailData = {
            name: data.companyName,
            number: data.phone,
            email: data.email,
            message: data.message,
          };

          // Send the email
          const emailRequest = this.http.post(`${this.baseUrl}/email/send-email`, emailData);

          // Wait for both requests to complete
          forkJoin([salesCommunicationRequest, emailRequest]).subscribe({
            next: () => {
              observer.next();
              observer.complete();
            },
            error: (error) => {
              observer.error(error);
            }
          });
        },
        error: (error) => {
          observer.error(error);
        },
      });
    });
  }
}

