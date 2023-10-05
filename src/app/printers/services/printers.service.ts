import { HttpClient } from '@angular/common/http';
import { Injectable, inject} from '@angular/core';
import { environment } from 'src/environments/environments';
import { Printer } from '../interfaces/printer.interface';
import { Observable, catchError, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PrintersService {

  private readonly baseUrl: string = environment.baseUrl;

  constructor(private http: HttpClient) { }

  getPrinters(): Observable<Printer[]> {
    return this.http.get<Printer[]>(`${this.baseUrl}/printers`)
      .pipe(
        catchError(error => {
          console.error('Error al traer los productos:', error);
          return [];
        })
      );
  }

  getPrinterById(id: string): Observable<Printer | undefined> {
    return this.http.get<Printer>(`${this.baseUrl}/printers/${id}`)
    .pipe(
      catchError(error => of(undefined) )
    );
  }

  getDealPrinters(): Observable<Printer[]> {
    return this.http.get<Printer[]>(`${this.baseUrl}/printers/deal`)
      .pipe(
        catchError(error => {
          console.error('Error fetching deal printers:', error);
          return [];
        })
      );
  }
  
}

