import { Component } from '@angular/core';

@Component({
  selector: 'shared-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent {
  isInputFocused = false;  
  searchQuery = '';
  consumables = ['consumable1', 'consumable2', 'consumable3']; // Replace this with your actual list of consumables
  suggestions: string[] = [];

onInputChange() {
  this.suggestions = this.consumables.filter(consumable => consumable.includes(this.searchQuery));
}
}
