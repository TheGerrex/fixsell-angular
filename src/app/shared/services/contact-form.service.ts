import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContactFormService {

  constructor(private http: HttpClient) { }

  submitForm(formData: any) {
    return this.http.post('/.netlify/functions/sendEmail', formData)
      .pipe(
        catchError(error => {
          console.error('Error sending email:', error);
          return throwError('An error occurred while sending the email.');
        })
      );
  }
}
