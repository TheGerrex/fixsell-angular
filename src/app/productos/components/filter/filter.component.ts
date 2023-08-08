import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component } from '@angular/core';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss'],
  animations: [
    trigger('filterSectionsAnimation', [
      state('open', style({
        display: 'block',
        height: '*'
      })),
      state('closed', style({
        display: 'none',
        height: '0'
      })),
      transition('open <=> closed', [
        animate('0.3s')
      ])
    ])
  ]
})
export class FilterComponent {
  filterSectionsState = 'open';
  checked = false;

  toggleFilterSections() {
    this.filterSectionsState = this.filterSectionsState === 'open' ? 'closed' : 'open';
  }
  
  toggleButtons() {
    this.checked = !this.checked;
    console.log('Toggling');
  }

}
