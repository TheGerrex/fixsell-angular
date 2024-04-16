import { Component, ElementRef, OnInit, QueryList, ViewChildren } from '@angular/core';
import { ConsumableService } from 'src/app/consumables/services/consumables.service';
import { Consumible } from 'src/app/printers/interfaces/consumible.interface';

@Component({
  selector: 'shared-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent implements OnInit {
  isInputFocused = false;  
  searchQuery = '';
  selectedSuggestionIndex = -1;
  consumables: Consumible[] = []; // Replace this with your actual list of consumables
  suggestions: Consumible[] = [];

  @ViewChildren('suggestionItem') suggestionItems!: QueryList<ElementRef>;

  constructor
  (
    private consumableService: ConsumableService,
  ) {}

  ngOnInit() {
    this.getAllConsumables();
  }

  getAllConsumables() {
    this.consumableService.getConsumables().subscribe(consumables => {
      this.consumables = consumables;
    });
  }

  onInputChange() {
    const searchQueryUpper = this.searchQuery.toUpperCase();
    this.suggestions = this.consumables.filter(consumable => consumable.name.toUpperCase().includes(searchQueryUpper));
  }
  
  clearSuggestions() {
    setTimeout(() => {
      this.suggestions = [];
    }, 200);
  }

  onKeyDown(event: KeyboardEvent) {
    if (event.key === 'ArrowDown') {
      event.preventDefault();
      if (this.selectedSuggestionIndex < this.suggestions.length - 1) {
        this.selectedSuggestionIndex++;
      }
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      if (this.selectedSuggestionIndex > 0) {
        this.selectedSuggestionIndex--;
      }
    }
    if (this.selectedSuggestionIndex >= 0) {
      this.searchQuery = this.suggestions[this.selectedSuggestionIndex].name;
    }
    if (this.selectedSuggestionIndex >= 0) {
      this.suggestionItems.toArray()[this.selectedSuggestionIndex].nativeElement.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' });
    }
  }
}
