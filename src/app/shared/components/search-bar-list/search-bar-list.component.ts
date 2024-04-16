import { Component, ElementRef, EventEmitter, Output, QueryList, ViewChildren } from '@angular/core';
import { ConsumableService } from 'src/app/consumables/services/consumables.service';
import { Consumible } from 'src/app/printers/interfaces/consumible.interface';

@Component({
  selector: 'app-search-bar-list',
  templateUrl: './search-bar-list.component.html',
  styleUrls: ['./search-bar-list.component.scss']
})
export class SearchBarListComponent {
  isInputFocused = false;  
  searchQuery = '';
  selectedSuggestionIndex = -1;
  consumables: Consumible[] = []; // Replace this with your actual list of consumables
  suggestions: Consumible[] = [];

  @Output() searchQueryChange = new EventEmitter<string>();


  constructor
  (
    private consumableService: ConsumableService,
  ) {}

  ngOnInit() {
    this.getAllConsumables();
  }

  onInputChange() {
    this.searchQueryChange.emit(this.searchQuery);
  }

  getAllConsumables() {
    this.consumableService.getConsumables().subscribe(consumables => {
      this.consumables = consumables;
    });
  }
  
  clearSuggestions() {
    setTimeout(() => {
      this.suggestions = [];
    }, 200);
  }
}
