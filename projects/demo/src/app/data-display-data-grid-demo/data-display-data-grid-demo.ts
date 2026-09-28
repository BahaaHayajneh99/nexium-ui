import { Component, inject } from '@angular/core';
import { CommonService } from '../services/common.service';
import { NxAdvancedDataGrid, NxDataGridCellEditEvent, NxDataGridColumn } from '../../../../../dist/components';
import { DemoSection } from '../shared/demo-section/demo-section';

interface Product extends Record<string, unknown> {
  id: number;
  name: string;
  category: string;
  price: number;
  stock: number;
}

const CATEGORIES = ['Electronics', 'Furniture', 'Apparel', 'Kitchen', 'Office'];

@Component({
  selector: 'app-data-display-data-grid-demo',
  standalone: true,
  imports: [NxAdvancedDataGrid, DemoSection],
  templateUrl: './data-display-data-grid-demo.html',
  styleUrl: './data-display-data-grid-demo.scss',
})
export class DataDisplayDataGridDemo {
  commonService = inject(CommonService);

  importCode = `import { NxAdvancedDataGrid, NxDataGridColumn } from 'nexium-ui';`;

  products: Product[] = Array.from({ length: 24 }, (_, i) => ({
    id: i + 1,
    name: `Product ${i + 1}`,
    category: CATEGORIES[i % CATEGORIES.length],
    price: Math.round((15 + ((i * 37) % 180)) * 100) / 100,
    stock: (i * 13) % 200,
  }));

  gridColumns: NxDataGridColumn[] = [
    { id: 'id', field: 'id', header: 'ID', width: 70, sortable: true },
    { id: 'name', field: 'name', header: 'Product', sortable: true, filterable: true },
    { id: 'category', field: 'category', header: 'Category', sortable: true, filterable: true },
    { id: 'price', field: 'price', header: 'Price', sortable: true },
    { id: 'stock', field: 'stock', header: 'Stock', sortable: true },
  ];

  gridCode = `<nx-advanced-data-grid
    [columns]="gridColumns"
    [rows]="products"
    [selectionMode]="'multiple'"
    [(selection)]="selectedProducts">
</nx-advanced-data-grid>`;

  gridTs = `gridColumns: NxDataGridColumn[] = [
  { id: 'id', field: 'id', header: 'ID', width: 70, sortable: true },
  { id: 'name', field: 'name', header: 'Product', sortable: true, filterable: true },
  { id: 'category', field: 'category', header: 'Category', sortable: true, filterable: true },
  { id: 'price', field: 'price', header: 'Price', sortable: true },
  { id: 'stock', field: 'stock', header: 'Stock', sortable: true },
];

products: Product[] = [ /* 24 rows */ ];
selectedProducts: Product[] = [];`;

  selectedProducts: Product[] = [];

  editColumns: NxDataGridColumn[] = [
    { id: 'name', field: 'name', header: 'Product' },
    { id: 'price', field: 'price', header: 'Price', editable: true },
    { id: 'stock', field: 'stock', header: 'Stock', editable: true },
  ];

  editRows: Product[] = this.products.slice(0, 6).map((p) => ({ ...p }));

  editCode = `<nx-advanced-data-grid [columns]="editColumns" [rows]="editRows" (cellEditComplete)="onCellEdit($event)">
</nx-advanced-data-grid>`;

  editTs = `editColumns: NxDataGridColumn[] = [
  { id: 'name', field: 'name', header: 'Product' },
  { id: 'price', field: 'price', header: 'Price', editable: true },
  { id: 'stock', field: 'stock', header: 'Stock', editable: true },
];

onCellEdit(event: NxDataGridCellEditEvent): void {
  // event.row, event.field, event.value, event.oldValue
}`;

  lastEdit: NxDataGridCellEditEvent | null = null;

  onCellEdit(event: NxDataGridCellEditEvent): void {
    this.lastEdit = event;
  }

  exportCode = `<nx-advanced-data-grid [columns]="gridColumns" [rows]="products" [showExport]="true" exportFilename="products">
</nx-advanced-data-grid>`;

  exportTs = `// Click "Export CSV" in the toolbar to download the current (filtered/sorted) rows as CSV.`;

  features = [
    { name: 'Sorting', description: 'Sort columns by clicking headers' },
    { name: 'Filtering', description: 'Per-column filters plus a global search box' },
    { name: 'Virtual Scroll', description: 'Render only visible rows for very large datasets' },
    { name: 'Selection', description: 'Single or multiple row selection' },
    { name: 'Editing', description: 'Inline cell editing' },
    { name: 'Resizable Columns', description: 'Drag column edges to adjust width' },
    { name: 'Pinned Columns', description: 'Keep key columns visible while scrolling' },
    { name: 'Export', description: 'One-click export to CSV' },
  ];

  keyHighlights = [
    { title: 'Performance', description: 'Virtual scrolling for large datasets' },
    { title: 'Flexible', description: 'Combine sorting, filtering, selection and editing freely' },
    { title: 'Accessible', description: 'Semantic table markup with sortable column headers' },
    { title: 'Exportable', description: 'One-click export to CSV' },
  ];

  useCases = [
    { title: 'Product Catalogs', description: 'Display and manage product listings' },
    { title: 'User Management', description: 'Admin panels for user data' },
    { title: 'Analytics', description: 'Display metrics and KPIs' },
    { title: 'Inventory', description: 'Track stock and orders' },
    { title: 'Transactions', description: 'View transaction history' },
    { title: 'Reports', description: 'Display business reports' },
  ];

  columnProps = [
    { property: 'field', type: 'string', description: 'Field name read from each data row' },
    { property: 'header', type: 'string', description: 'Column header text' },
    { property: 'width', type: 'number', description: 'Column width in pixels' },
    { property: 'sortable', type: 'boolean', description: 'Enable clicking the header to sort' },
    { property: 'filterable', type: 'boolean', description: 'Show a per-column filter input' },
    { property: 'editable', type: 'boolean', description: 'Allow inline cell editing' },
    { property: 'pinned', type: "'left' | 'right'", description: 'Keep the column visible while scrolling' },
  ];

  bestPractices = [
    { title: 'Virtual scrolling', description: 'Enable virtualScroll for datasets over 1,000 rows' },
    { title: 'Clear headers', description: 'Provide descriptive column headers' },
    { title: 'Batch operations', description: 'Pair row selection with bulk actions' },
    { title: 'Export for analysis', description: 'Let users export the current view to CSV' },
  ];
}
