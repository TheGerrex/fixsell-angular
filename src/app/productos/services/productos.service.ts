import { HttpClient } from '@angular/common/http';
import { Injectable, inject} from '@angular/core';
import { environment } from 'src/environments/environments';
import { Printer } from '../interfaces/printer.interface';
import { Observable, catchError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  private readonly baseUrl: string = environment.baseUrl;

  constructor(private http: HttpClient) { }

  getPrinters(): Observable<Printer[]> {
    const url = `${this.baseUrl}/printers`;
    return this.http.get<Printer[]>(url)
      .pipe(
        catchError(error => {
          console.error('Error al traer los productos:', error);
          return [];
        })
      );
  }
}

