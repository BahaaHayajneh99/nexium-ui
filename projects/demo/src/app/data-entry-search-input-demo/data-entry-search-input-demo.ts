import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NxSearch, NxSearchResultInput } from 'components';
import { CommonService } from '../services/common.service';
import { DemoSection } from '../shared/demo-section/demo-section';

@Component({
  selector: 'app-data-entry-search-input-demo',
  standalone: true,
  imports: [CommonModule, FormsModule, DemoSection, NxSearch],
  templateUrl: './data-entry-search-input-demo.html',
  styleUrl: './data-entry-search-input-demo.scss',
})
export class DataEntrySearchInputDemo {
  commonService = inject(CommonService);

  importCode = `import { NxSearch } from 'nexium-ui';`;

  searchTerm = '';
  filteredResults: { id: number; name: string }[] = [];
  suggestions: { id: number; name: string }[] = [
    { id: 1, name: 'Angular' },
    { id: 2, name: 'React' },
    { id: 3, name: 'Vue.js' },
    { id: 4, name: 'Svelte' },
    { id: 5, name: 'Next.js' },
    { id: 6, name: 'NexiumUI' },
  ];

  basicCode = `<nx-search
  placeholder="Search products..."
  [(value)]="searchTerm"
  [results]="filteredResults"
  [showResultsPanel]="true"
  bindLabel="name"
  (valueChange)="onSearch()"
  (resultSelected)="onSelect($event)">
</nx-search>`;

  features = [
    { name: 'Real-time Search', description: 'Search as user types' },
    { name: 'Auto-suggestions', description: 'Show matching suggestions' },
    { name: 'Clear Button', description: 'Easy clear input' },
    { name: 'Search Icon', description: 'Visual search indicator' },
    { name: 'Loading State', description: 'Show search in progress' },
    { name: 'Empty State', description: 'Handle no results' },
  ];

  useCases = [
    { title: 'Product Search', description: 'E-commerce search bar' },
    { title: 'User Search', description: 'Find people or accounts' },
    { title: 'Documentation', description: 'Knowledge base search' },
    { title: 'Filter Lists', description: 'Filter data tables' },
    { title: 'Navigation', description: 'Quick command search' },
    { title: 'Global Search', description: 'Across application' },
  ];

  onSearch() {
    if (this.searchTerm.length === 0) {
      this.filteredResults = [];
      return;
    }

    this.filteredResults = this.suggestions.filter(
      item =>
        item.name.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  selectResult(result: NxSearchResultInput) {
    this.filteredResults = [];
  }

  clearSearch() {
    this.searchTerm = '';
    this.filteredResults = [];
  }

  requiredSearchTerm = '';

  requiredCode = `<label>Search Keyword *</label>
<nx-search
  placeholder="Search for a keyword..."
  [isRequired]="true"
  [(ngModel)]="requiredSearchTerm">
</nx-search>`;

  patternSearchTerm = '';

  patternCode = `<nx-search
  placeholder="Search by ID (digits only)..."
  pattern="numeric"
  [(ngModel)]="patternSearchTerm">
</nx-search>`;
}
