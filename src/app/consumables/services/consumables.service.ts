import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable, catchError, of } from 'rxjs';
import { Consumible } from './../../printers/interfaces/consumible.interface';

@Injectable({
  providedIn: 'root',
})
export class ConsumableService {
  private readonly baseUrl: string = environment.baseUrl;

  constructor(private http: HttpClient) { }

  getConsumables(limit?: number, offset?: number, filters?: any): Observable<Consumible[]> {
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
    const fullUrl = `${this.baseUrl}/consumibles?${decodedParams}`;

    // Log the full URL to the console
    // console.log('Request URL:', fullUrl);

    return this.http.get<Consumible[]>(fullUrl)
      .pipe(
        catchError(error => {
          console.error('Error fetching consumables:', error);
          return of([]);
        })
      );
  }

  getConsumableById(id: string): Observable<Consumible | undefined> {
    return this.http
      .get<Consumible>(`${this.baseUrl}/consumibles/${id}`)
      .pipe(catchError((error) => of(undefined)));
  }

  getDealConsumables(): Observable<Consumible[]> {
    return this.http.get<Consumible[]>(`${this.baseUrl}/consumables/deal`).pipe(
      catchError((error) => {
        console.error('Error fetching deal consumables:', error);
        return [];
      })
    );
  }
}
