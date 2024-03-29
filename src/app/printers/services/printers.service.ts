import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject} from '@angular/core';
import { environment } from 'src/environments/environment';
import { Printer } from '../interfaces/printer.interface';
import { Observable, catchError, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PrintersService {

  private readonly baseUrl: string = environment.baseUrl;

  constructor(private http: HttpClient) { }

  getPrinters(limit?: number, offset?: number, filters?: any): Observable<Printer[]> {
    let url = `${this.baseUrl}/printers`;
    let params = new HttpParams();
    if (limit != undefined && offset != undefined) {
        url += `?limit=${limit}&offset=${offset}`;
    }
    if (filters) {
      for (let filter in filters) {
          params = params.append(filter, filters[filter]);
      }
    }
    return this.http.get<Printer[]>(url, {params})
        .pipe(
            catchError(error => {
                console.error('Error al traer los productos:', error);
                return of([]);
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

