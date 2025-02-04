import { Component } from '@angular/core';

@Component({
  selector: 'shared-location-selector-social-header',
  templateUrl: './location-selector-social-header.component.html',
  styleUrls: ['./location-selector-social-header.component.scss']
})
export class LocationSelectorSocialHeaderComponent {
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
