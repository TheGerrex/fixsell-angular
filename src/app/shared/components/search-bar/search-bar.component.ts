import { Component, OnInit } from '@angular/core';
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
  consumables: Consumible[] = []; // Replace this with your actual list of consumables
  suggestions: Consumible[] = [];

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
}
