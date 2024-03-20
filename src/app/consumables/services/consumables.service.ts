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

  constructor(private http: HttpClient) {}

  getConsumables(
    limit?: number,
    offset?: number,
    filters?: any
  ): Observable<Consumible[]> {
    let url = `${this.baseUrl}/consumibles`;
    let params = new HttpParams();
    if (limit != undefined && offset != undefined) {
      url += `?limit=${limit}&offset=${offset}`;
    }
    if (filters) {
      for (let filter in filters) {
        params = params.append(filter, filters[filter]);
      }
    }
    return this.http.get<Consumible[]>(url, { params }).pipe(
      catchError((error) => {
        console.error('Error al traer los productos:', error);
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
