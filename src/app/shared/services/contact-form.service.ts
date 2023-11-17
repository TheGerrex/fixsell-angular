import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { ToastService } from './toast.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ContactFormService {

  constructor(private http: HttpClient, private toastService: ToastService) { }

  private readonly baseUrl: string = environment.baseUrl;

  submitForm(data: any) {
    const formData = data;
    console.log(formData);
    this.toastService.showSuccess('El formulario se ha mandado correctamente','Pronto nos pondremos en contacto contigo');
    // Make an HTTP POST request to your NestJS server
    this.http.post(`${this.baseUrl}/email/send-email`, formData)
    .subscribe(
      () => {
        this.toastService.showSuccess('El formulario se ha mandado correctamente','Pronto nos pondremos en contacto contigo');
      },
      (error) => {
        console.error('Error submitting form:', error);
        this.toastService.showError('Error de envio de formulario.', 'Intentelo otra vez porfavor');
      }
    );
  }
}
