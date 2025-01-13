import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Printer } from '../interfaces/printer.interface';
import { Observable, catchError, of } from 'rxjs';
import { Package } from '../interfaces/package.interface';
import { EventData } from '../interfaces/deal.interface';
@Injectable({
  providedIn: 'root',
})
export class PrintersService {
  private readonly baseUrl: string = environment.baseUrl;

  constructor(private http: HttpClient) { }

  getPrinters(
    limit?: number,
    offset?: number,
    filters?: any
  ): Observable<Printer[]> {
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
    return this.http.get<Printer[]>(url, { params })
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
        catchError(error => of(undefined))
      );
  }

  getDealPrinters(): Observable<Printer[]> {
    return this.http.get<Printer[]>(`${this.baseUrl}/printers/deal`).pipe(
      catchError((error) => {
        console.error('Error fetching deal printers:', error);
        return [];
      })
    );
  }

  getRentPackages(): Observable<Package[]> {
    return this.http.get<Package[]>(`${this.baseUrl}/packages`).pipe(
      catchError((error) => {
        console.error('Error fetching rent packages:', error);
        return [];
      })
    );
  }

  getEvents(): Observable<EventData[]> {
    return this.http.get<EventData[]>(`${this.baseUrl}/events`).pipe(
      catchError((error) => {
        console.error('Error fetching events:', error);
        return of([]);
      })
    );
  }
}
