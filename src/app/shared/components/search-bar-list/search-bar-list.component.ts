import { Component, ElementRef, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-search-bar-list',
  templateUrl: './search-bar-list.component.html',
  styleUrls: ['./search-bar-list.component.scss']
})
export class SearchBarListComponent {
  isInputFocused = false;  
  @Input() searchQuery: string = '';
  @Output() searchQueryChange = new EventEmitter<string>();


  constructor
  (
  ) {}

  ngOnInit() {
  }

  onInputChange() {
    this.searchQueryChange.emit(this.searchQuery);
  }
}
