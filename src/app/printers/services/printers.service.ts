import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Printer } from '../interfaces/printer.interface';
import { Observable, catchError, of } from 'rxjs';
import { Package } from '../interfaces/package.interface';
import { EventData } from '../interfaces/deal.interface';
import { Category } from '../interfaces/category.interface';
@Injectable({
  providedIn: 'root',
})
export class PrintersService {
  private readonly baseUrl: string = environment.baseUrl;

  constructor(private http: HttpClient) { }

  getPrinters(limit?: number, offset?: number, filters?: any): Observable<Printer[]> {
    let params = new HttpParams();

    if (limit != undefined) {
      params = params.set('limit', limit.toString());
    }
    if (offset != undefined) {
      params = params.set('offset', offset.toString());
    }
    if (filters) {
      for (let key in filters) {
        if (filters.hasOwnProperty(key)) {
          params = params.set(key, filters[key]);
        }
      }
    }

    // Decode the URL parameters to ensure spaces are preserved
    const decodedParams = decodeURIComponent(params.toString());

    // Construct the full URL with query parameters
    const fullUrl = `${this.baseUrl}/printers?${decodedParams}`;

    // Log the full URL to the console
    // console.log('Request URL:', fullUrl);

    return this.http.get<Printer[]>(fullUrl)
      .pipe(
        catchError(error => {
          console.error('Error fetching printers:', error);
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

  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(`${this.baseUrl}/categories/printers`).pipe(
      catchError((error) => {
        console.error('Error fetching categories:', error);
        return of([]);
      })
    );
  }
}  
