import { Component, inject } from '@angular/core';
import { CommonService } from '../services/common.service';
import { NxDataGrid, NxSimpleDataGridColumn } from 'components';
import { DemoSection } from '../shared/demo-section/demo-section';

@Component({
  selector: 'app-ui-data-grid-demo',
  imports: [NxDataGrid, DemoSection],
  templateUrl: './ui-data-grid-demo.html',
  styleUrl: './ui-data-grid-demo.scss',
})
export class UiDataGridDemo {
  importCode = `import { NxDataGrid } from 'nexium-ui';`;

  public commonService = inject(CommonService);

  columns: NxSimpleDataGridColumn[] = [
    { field: 'name', header: 'Name', sortable: true },
    { field: 'category', header: 'Category', sortable: true },
    { field: 'price', header: 'Price', sortable: true },
    { field: 'stock', header: 'Stock', sortable: true },
  ];

  rows = [
    { name: 'Wireless Mouse', category: 'Accessories', price: 24.99, stock: 142 },
    { name: 'Mechanical Keyboard', category: 'Accessories', price: 79.99, stock: 58 },
    { name: '27" Monitor', category: 'Displays', price: 219.0, stock: 23 },
    { name: 'USB-C Hub', category: 'Accessories', price: 34.5, stock: 97 },
    { name: 'Laptop Stand', category: 'Furniture', price: 29.99, stock: 64 },
    { name: 'Webcam 1080p', category: 'Accessories', price: 49.99, stock: 36 },
    { name: 'Desk Lamp', category: 'Furniture', price: 19.99, stock: 112 },
    { name: 'Noise Cancelling Headphones', category: 'Audio', price: 149.0, stock: 18 },
    { name: 'Bluetooth Speaker', category: 'Audio', price: 59.99, stock: 44 },
    { name: 'Ergonomic Chair', category: 'Furniture', price: 329.0, stock: 9 },
    { name: 'Portable SSD 1TB', category: 'Storage', price: 89.99, stock: 71 },
    { name: 'Graphics Tablet', category: 'Accessories', price: 99.0, stock: 15 },
  ];

  basicCode = `<nx-data-grid [columns]="columns" [rows]="rows"></nx-data-grid>`;

  basicTs = `columns: NxSimpleDataGridColumn[] = [
  { field: 'name', header: 'Name', sortable: true },
  { field: 'category', header: 'Category', sortable: true },
  { field: 'price', header: 'Price', sortable: true },
  { field: 'stock', header: 'Stock', sortable: true },
];

rows = [ /* ... */ ];`;

  pageSizeCode = `<nx-data-grid [columns]="columns" [rows]="rows" [pageSize]="5"></nx-data-grid>`;

  pageSizeTs = `// pageSize controls how many rows render per page - search and sorting both
// apply before pagination, and the page resets to 1 whenever the search term changes.`;
}
