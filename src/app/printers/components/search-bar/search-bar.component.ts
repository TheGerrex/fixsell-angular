import { Component, ElementRef, OnInit, QueryList, ViewChildren } from '@angular/core';
import { Router } from '@angular/router';
import { ConsumableService } from 'src/app/consumables/services/consumables.service';
import { Consumible } from 'src/app/printers/interfaces/consumible.interface';
import { Printer } from '../../interfaces/printer.interface';
import { PrintersService } from '../../services/printers.service';

@Component({
  selector: 'printer-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent {
isInputFocused = false;  
  userIsTyping = false;
  searchQuery = '';
  selectedSuggestionIndex = -1;
  printers: Printer[] = []; // Replace this with your actual list of consumables
  suggestions: Printer[] = [];

  @ViewChildren('suggestionItem') suggestionItems!: QueryList<ElementRef>;

  constructor
  (
    private router: Router,
    private printerService: PrintersService,
  ) {}

  ngOnInit() {
    this.getAllPrinters();
  }

  getAllPrinters() {
    this.printerService.getPrinters().subscribe(printers => {
      this.printers = printers;
    });
  }

  onInputChange() {
    this.userIsTyping = true;
    const searchQueryUpper = this.searchQuery.toUpperCase();
    this.suggestions = this.printers.filter(printer => printer.model.toUpperCase().includes(searchQueryUpper));
    if (this.suggestions.length === 0) {
      this.selectedSuggestionIndex = -1;
    }
    if (this.suggestions.length <= 1) {
      this.selectedSuggestionIndex = -1;
    }
  }
  
  clearSuggestions() {
    setTimeout(() => {
      this.suggestions = [];
    }, 200);
  }

  onSubmit(event?: Event) {
    // Prevent the form from being submitted normally
    if (event) {
      event.preventDefault();
    }
  
    // Navigate to the list page with the search parameter
    this.router.navigate(['/printers', 'list'], { queryParams: { search: this.searchQuery, page: 1 } });
  }

  onKeyDown(event: KeyboardEvent) {
    if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
      this.userIsTyping = false;
      event.preventDefault();
      if (event.key === 'ArrowDown' && this.selectedSuggestionIndex < this.suggestions.length - 1) {
        this.selectedSuggestionIndex++;
      } else if (event.key === 'ArrowUp' && this.selectedSuggestionIndex > 0) {
        this.selectedSuggestionIndex--;
      }
    } else {
      this.userIsTyping = true;
    }
    if (this.suggestions.length > 0 && this.selectedSuggestionIndex >= 0 && event.key !== 'Backspace' && !this.userIsTyping) {
      this.searchQuery = this.suggestions[this.selectedSuggestionIndex].model;
    }
    if (this.selectedSuggestionIndex >= 0) {
      this.suggestionItems.toArray()[this.selectedSuggestionIndex].nativeElement.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' });
    }
  }
}
