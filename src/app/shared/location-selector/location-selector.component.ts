import { Component } from '@angular/core';

@Component({
  selector: 'app-location-selector',
  templateUrl: './location-selector.component.html',
  styleUrls: ['./location-selector.component.scss'],
})
export class LocationSelectorComponent {
  selectedLocation: string = localStorage.getItem('location') || 'mty';

  setLocation(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    this.selectedLocation = selectElement.value;
    localStorage.setItem('location', this.selectedLocation);
  }
}
