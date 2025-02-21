import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class GeoLocationService {
  private locationKey = 'geoLocationData';
  private timestampKey = 'geoLocationTimestamp';
  private cacheDuration = 24 * 60 * 60 * 1000; // 24 horas

  private locationSubject = new BehaviorSubject<string>('Desconocido');
  location$ = this.locationSubject.asObservable();

  constructor(private http: HttpClient) {
    this.loadLocation();
  }

  private loadLocation(): void {
    const cachedData = localStorage.getItem(this.locationKey);
    const cachedTime = localStorage.getItem(this.timestampKey);
    const now = Date.now();

    if (cachedData && cachedTime && (now - Number(cachedTime) < this.cacheDuration)) {
      this.locationSubject.next(JSON.parse(cachedData).zone);
    } else {
      this.fetchLocationFromAPI();
    }
  }

  private fetchLocationFromAPI(): void {
    this.http.get<any>('https://ipapi.co/json/').subscribe(
      data => {
        const region = data.region;
        const zone = this.assignZone(region);

        const geoData = { region, zone };
        localStorage.setItem(this.locationKey, JSON.stringify(geoData));
        localStorage.setItem(this.timestampKey, Date.now().toString());

        this.locationSubject.next(zone);
      },
      error => console.error('Error obteniendo la ubicación:', error)
    );
  }

  private assignZone(state: string): string {
    const norte = ['Nuevo León', 'Coahuila', 'Tamaulipas', 'Sonora', 'Chihuahua', 'Durango', 'Baja California', 'Baja California Sur'];
    return norte.includes(state) ? 'Monterrey' : 'CDMX';
  }
}
