import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommonService } from '../services/common.service';
import { DemoSection } from '../shared/demo-section/demo-section';

@Component({
  selector: 'app-data-display-data-grid-demo',
  standalone: true,
  imports: [CommonModule, DemoSection],
  templateUrl: './data-display-data-grid-demo.html',
  styleUrl: './data-display-data-grid-demo.scss',
})
export class DataDisplayDataGridDemo {
  commonService = inject(CommonService);

  basicUsageCode = `<nx-data-grid [value]="products" [scrollable]="true">
  <nx-column field="id" header="ID" [width]="60"></nx-column>
  <nx-column field="name" header="Product Name"></nx-column>
  <nx-column field="price" header="Price"></nx-column>
  <nx-column field="category" header="Category"></nx-column>
  <nx-column field="stock" header="Stock"></nx-column>
</nx-data-grid>`;

  features = [
    { name: 'Sorting', description: 'Sort columns by clicking headers' },
    { name: 'Filtering', description: 'Filter data with built-in search' },
    { name: 'Pagination', description: 'Navigate large datasets efficiently' },
    { name: 'Lazy Loading', description: 'Load data on demand' },
    { name: 'Selection', description: 'Single or multiple row selection' },
    { name: 'Editing', description: 'Inline cell and row editing' },
    { name: 'Resizable Columns', description: 'Adjust column widths' },
    { name: 'Responsive', description: 'Mobile-friendly data display' },
  ];

  keyHighlights = [
    { title: 'Performance', description: 'Virtual scrolling for large datasets' },
    { title: 'Flexible', description: 'Custom cell templates and renderers' },
    { title: 'Accessible', description: 'Full keyboard navigation and ARIA support' },
    { title: 'Exportable', description: 'Export to CSV, Excel, PDF' },
  ];

  useCases = [
    { title: 'Product Catalogs', description: 'Display and manage product listings' },
    { title: 'User Management', description: 'Admin panels for user data' },
    { title: 'Analytics', description: 'Display metrics and KPIs' },
    { title: 'Inventory', description: 'Track stock and orders' },
    { title: 'Transactions', description: 'View transaction history' },
    { title: 'Reports', description: 'Display business reports' },
  ];
}
