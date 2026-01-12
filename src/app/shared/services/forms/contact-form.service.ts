import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, forkJoin } from 'rxjs';

interface ContactFormData {
  name: string;
  phone: string;
  email: string;
  message: string;
}

interface ContactFormDto {
  name: string;
  phone: string;
  email: string;
  message: string;
  status: string;
  product_interested: string;
  type_of_product: string;
  regionLocation: string;
  zoneLocation: string;
}

interface LeadData {
  client: string;
  status: string;
  product_interested: string;
  type_of_product: string;
  email: string;
  phone: string;
  regionLocation: string;
  zoneLocation: string;
}

interface SalesCommunicationData {
  message: string;
  date: string;
  type: string;
  leadId: number;
  notes: string;
}

@Injectable({
  providedIn: 'root'
})
export class ContactFormService {
  private readonly baseUrl: string = environment.baseUrl;
  private leadId: number = 0;

  constructor(private http: HttpClient) { }

  submitForm(data: ContactFormData): Observable<any> {
    const geoLocationData = JSON.parse(localStorage.getItem('geoLocationData') || '{}');

    const leadData: LeadData = {
      client: data.name,
      status: 'prospect',
      product_interested: 'contact-form',
      type_of_product: 'contact',
      email: data.email,
      phone: data.phone,
      regionLocation: geoLocationData.region || 'No especificada',
      zoneLocation: geoLocationData.zone || 'No especificada',
    };

    console.log("Submitting Form with data:", leadData);

    return new Observable((observer) => {
      this.http.post(`${this.baseUrl}/leads`, leadData).subscribe({
        next: (response: any) => {
          this.leadId = response.id;

          const salesCommunicationData: SalesCommunicationData = {
            message: data.message,
            date: new Date().toISOString(),
            type: 'email',
            leadId: this.leadId,
            notes: 'generado automáticamente por el sistema',
          };

          const emailData: ContactFormDto = {
            name: data.name,
            phone: data.phone,
            email: data.email,
            message: data.message,
            status: 'prospect',
            product_interested: 'contact-form',
            type_of_product: 'contact',
            regionLocation: geoLocationData.region || 'No especificada',
            zoneLocation: geoLocationData.zone || 'No especificada',
          };

          const salesCommunicationRequest = this.http.post(`${this.baseUrl}/sale-communication`, salesCommunicationData);
          const emailRequest = this.http.post(`${this.baseUrl}/email/send-email`, emailData);

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
