import { Component } from '@angular/core';

@Component({
  selector: 'shared-location-selector',
  templateUrl: './location-selector.component.html',
  styleUrls: ['./location-selector.component.scss'],
})
export class LocationSelectorComponent {
  cities: any[] = [
    { name: 'CDMX', code: 'cdmx' },
    { name: 'MTY', code: 'mty' }
  ];
  selectedLocation: any = this.cities.find(city => city.code === (localStorage.getItem('location') || 'mty'));

  setLocation(event: any) {
    this.selectedLocation = event.value;
    localStorage.setItem('location', this.selectedLocation.code);
  }
}
