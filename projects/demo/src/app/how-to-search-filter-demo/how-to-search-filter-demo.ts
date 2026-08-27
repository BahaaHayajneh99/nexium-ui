import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NxInput, NxSelect, NxSelectOption, NxCard, NxCardContent, NxBadge } from 'components';
import { DemoSection } from '../shared/demo-section/demo-section';

interface ResultItem {
  name: string;
  category: string;
  price: string;
}

@Component({
  selector: 'app-how-to-search-filter-demo',
  imports: [NxInput, NxSelect, NxCard, NxCardContent, NxBadge, FormsModule, DemoSection],
  templateUrl: './how-to-search-filter-demo.html',
})
export class HowToSearchFilterDemo {
  query = '';
  category = '';

  categoryOptions: NxSelectOption[] = [
    { label: 'All Categories', value: '' },
    { label: 'Audio', value: 'Audio' },
    { label: 'Accessories', value: 'Accessories' },
    { label: 'Wearables', value: 'Wearables' },
  ];

  results: ResultItem[] = [
    { name: 'Wireless Headphones', category: 'Audio', price: '$79.00' },
    { name: 'USB-C Hub', category: 'Accessories', price: '$34.00' },
    { name: 'Mechanical Keyboard', category: 'Accessories', price: '$129.00' },
    { name: 'Bluetooth Speaker', category: 'Audio', price: '$59.00' },
    { name: 'Fitness Tracker', category: 'Wearables', price: '$99.00' },
  ];

  get filteredResults(): ResultItem[] {
    const q = this.query.trim().toLowerCase();
    return this.results.filter(
      (item) =>
        (!q || item.name.toLowerCase().includes(q)) && (!this.category || item.category === this.category),
    );
  }

  code = `<nx-input placeholder="Search products..." [(ngModel)]="query"></nx-input>
<nx-select [options]="categoryOptions" [(value)]="category"></nx-select>

@for (item of filteredResults; track item.name) {
    <nx-card variant="outlined">
        <nx-card-content>
            <div class="template-profile-name">{{ item.name }}</div>
            <nx-badge variant="secondary" size="small">{{ item.category }}</nx-badge>
            <strong>{{ item.price }}</strong>
        </nx-card-content>
    </nx-card>
} @empty {
    <p>No results match your search.</p>
}`;

  tsCode = `query = '';
category = '';

categoryOptions: NxSelectOption[] = [
  { label: 'All Categories', value: '' },
  { label: 'Audio', value: 'Audio' },
  { label: 'Accessories', value: 'Accessories' },
  { label: 'Wearables', value: 'Wearables' },
];

results: ResultItem[] = [ /* ... */ ];

get filteredResults(): ResultItem[] {
  const q = this.query.trim().toLowerCase();
  return this.results.filter(
    (item) =>
      (!q || item.name.toLowerCase().includes(q)) && (!this.category || item.category === this.category),
  );
}`;
}
