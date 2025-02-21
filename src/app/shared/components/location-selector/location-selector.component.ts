import { Component, OnInit } from '@angular/core';
import { GeoLocationService } from '../services/geo-location.service';

@Component({
  selector: 'shared-location-selector',
  templateUrl: './location-selector.component.html',
  styleUrls: ['./location-selector.component.scss'],
})
export class LocationSelectorComponent implements OnInit {
  cities = [
    { name: 'CDMX', code: 'cdmx' },
    { name: 'MTY', code: 'mty' }
  ];

  selectedLocation: any = this.cities.find(city => city.code === (localStorage.getItem('location') || 'mty'));

  constructor(private geoLocationService: GeoLocationService) { }

  ngOnInit() {
    this.geoLocationService.location$.subscribe(zone => {
      const code = zone.toLowerCase() === 'monterrey' ? 'mty' : 'cdmx';
      this.selectedLocation = this.cities.find(city => city.code === code);
      localStorage.setItem('location', code);
    });
  }

  setLocation(event: any) {
    this.selectedLocation = event.value;
    localStorage.setItem('location', this.selectedLocation.code);
  }
}
