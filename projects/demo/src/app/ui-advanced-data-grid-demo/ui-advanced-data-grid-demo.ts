import { Component, inject } from '@angular/core';
import { CommonService } from '../services/common.service';
import {
  NxAdvancedDataGrid,
  NxDataGridCellEditEvent,
  NxDataGridColumn,
  NxDataGridColumnGroup,
} from 'components';
import { DemoSection } from '../shared/demo-section/demo-section';

@Component({
  selector: 'app-ui-advanced-data-grid-demo',
  imports: [NxAdvancedDataGrid, DemoSection],
  templateUrl: './ui-advanced-data-grid-demo.html',
  styleUrl: './ui-advanced-data-grid-demo.scss',
})
export class UiAdvancedDataGridDemo {
  importCode = `import { NxAdvancedDataGrid } from 'nexium-ui';`;

  public commonService = inject(CommonService);

  columns: NxDataGridColumn[] = [
    { id: 'name', header: 'Name', field: 'name', pinned: 'left', sortable: true, width: 160 },
    { id: 'role', header: 'Role', field: 'role', sortable: true, width: 140 },
    { id: 'department', header: 'Department', field: 'department', sortable: true, width: 160 },
    { id: 'email', header: 'Email', field: 'email', width: 220 },
    { id: 'status', header: 'Status', field: 'status', pinned: 'right', sortable: true, width: 100 },
  ];

  rows = [
    { name: 'Amelia Stone', role: 'Engineer', department: 'Platform', email: 'amelia@nexium-ui.dev', status: 'Active' },
    { name: 'Noah Park', role: 'Designer', department: 'Product', email: 'noah@nexium-ui.dev', status: 'Active' },
    { name: 'Layla Kim', role: 'Manager', department: 'Platform', email: 'layla@nexium-ui.dev', status: 'Away' },
    { name: 'Ethan Cole', role: 'Engineer', department: 'Infra', email: 'ethan@nexium-ui.dev', status: 'Active' },
    { name: 'Sofia Reyes', role: 'QA', department: 'Platform', email: 'sofia@nexium-ui.dev', status: 'Inactive' },
  ];

  basicCode = `<nx-advanced-data-grid [columns]="columns" [rows]="rows"></nx-advanced-data-grid>`;

  basicTs = `columns: NxDataGridColumn[] = [
  { id: 'name', header: 'Name', field: 'name', pinned: 'left', sortable: true, width: 160 },
  { id: 'role', header: 'Role', field: 'role', sortable: true, width: 140 },
  { id: 'department', header: 'Department', field: 'department', sortable: true, width: 160 },
  { id: 'email', header: 'Email', field: 'email', width: 220 },
  { id: 'status', header: 'Status', field: 'status', pinned: 'right', sortable: true, width: 100 },
];

rows = [ /* ... */ ];`;

  largeColumns: NxDataGridColumn[] = [
    { id: 'id', header: 'ID', field: 'id', width: 80, sortable: true },
    { id: 'name', header: 'Name', field: 'name', width: 200, sortable: true },
    { id: 'department', header: 'Department', field: 'department', width: 180, sortable: true },
    { id: 'value', header: 'Value', field: 'value', width: 120, sortable: true },
  ];

  largeRows = Array.from({ length: 5000 }, (_, i) => ({
    id: i + 1,
    name: `Employee ${i + 1}`,
    department: ['Platform', 'Product', 'Infra', 'Sales'][i % 4],
    value: Math.round(Math.random() * 100000) / 100,
  }));

  virtualCode = `<nx-advanced-data-grid
    [columns]="largeColumns"
    [rows]="largeRows"
    [virtualScroll]="true"
    [rowHeight]="36">
</nx-advanced-data-grid>`;

  virtualTs = `largeRows = Array.from({ length: 5000 }, (_, i) => ({
  id: i + 1,
  name: \`Employee \${i + 1}\`,
  department: ['Platform', 'Product', 'Infra', 'Sales'][i % 4],
  value: Math.round(Math.random() * 100000) / 100,
}));`;

  filterColumns: NxDataGridColumn[] = [
    { id: 'name', field: 'name', header: 'Name', filterable: true },
    { id: 'role', field: 'role', header: 'Role', filterable: true },
    { id: 'department', field: 'department', header: 'Department', filterable: true },
    { id: 'status', field: 'status', header: 'Status', filterable: true },
  ];

  filterCode = `<nx-advanced-data-grid [columns]="filterColumns" [rows]="rows"></nx-advanced-data-grid>`;

  filterTs = `filterColumns: NxDataGridColumn[] = [
  { id: 'name', field: 'name', header: 'Name', filterable: true },
  { id: 'role', field: 'role', header: 'Role', filterable: true },
  { id: 'department', field: 'department', header: 'Department', filterable: true },
  { id: 'status', field: 'status', header: 'Status', filterable: true },
];`;

  selectedEmployee: Record<string, unknown> | null = null;
  selectedEmployees: Record<string, unknown>[] = [];

  selectionSingleCode = `<nx-advanced-data-grid
    [columns]="columns"
    [rows]="rows"
    [selectionMode]="'single'"
    [(selection)]="selectedEmployee">
</nx-advanced-data-grid>`;

  selectionSingleTs = `selectedEmployee: Record<string, unknown> | null = null;`;

  selectionMultipleCode = `<nx-advanced-data-grid
    [columns]="columns"
    [rows]="rows"
    [selectionMode]="'multiple'"
    [(selection)]="selectedEmployees">
</nx-advanced-data-grid>`;

  selectionMultipleTs = `selectedEmployees: Record<string, unknown>[] = [];`;

  editColumns: NxDataGridColumn[] = [
    { id: 'name', field: 'name', header: 'Name', editable: true },
    { id: 'role', field: 'role', header: 'Role', editable: true },
    { id: 'department', field: 'department', header: 'Department', editable: true },
  ];

  lastEdit: NxDataGridCellEditEvent | null = null;

  editCode = `<nx-advanced-data-grid [columns]="editColumns" [rows]="rows" (cellEditComplete)="onCellEdit($event)">
</nx-advanced-data-grid>
<!-- Double-click an editable cell to edit it -->`;

  editTs = `editColumns: NxDataGridColumn[] = [
  { id: 'name', field: 'name', header: 'Name', editable: true },
  { id: 'role', field: 'role', header: 'Role', editable: true },
  { id: 'department', field: 'department', header: 'Department', editable: true },
];

onCellEdit(event: NxDataGridCellEditEvent): void {
  console.log('cell edited', event);
}`;

  onCellEdit(event: NxDataGridCellEditEvent): void {
    this.lastEdit = event;
  }

  groupColumns: NxDataGridColumn[] = [
    { id: 'name', field: 'name', header: 'Name' },
    { id: 'role', field: 'role', header: 'Role' },
    { id: 'department', field: 'department', header: 'Department' },
    { id: 'email', field: 'email', header: 'Email' },
    { id: 'status', field: 'status', header: 'Status' },
  ];

  columnGroups: NxDataGridColumnGroup[] = [
    { header: 'Employee', colspan: 2 },
    { header: 'Position', colspan: 2 },
    { header: 'Status', colspan: 1 },
  ];

  groupCode = `<nx-advanced-data-grid [columns]="groupColumns" [columnGroups]="columnGroups" [rows]="rows">
</nx-advanced-data-grid>`;

  groupTs = `columnGroups: NxDataGridColumnGroup[] = [
  { header: 'Employee', colspan: 2 },
  { header: 'Position', colspan: 2 },
  { header: 'Status', colspan: 1 },
];`;

  exportCode = `<nx-advanced-data-grid [columns]="columns" [rows]="rows" [showExport]="true" exportFilename="rows">
</nx-advanced-data-grid>`;

  exportTs = `// Click "Export CSV" / "Export Excel" / "Export PDF" in the toolbar.
// exportExcel() writes an Excel-openable HTML table (.xls), not a real .xlsx binary.
// exportPDF() opens a printable view and calls window.print() - "Save as PDF" is a manual step.`;

  groupByFieldCode = `<nx-advanced-data-grid [columns]="groupColumns" [rows]="rows" [groupByField]="'department'">
</nx-advanced-data-grid>`;

  groupByFieldTs = `// Rows render grouped into collapsible sections by row['department'].
// Click a group header to collapse/expand it - groups start expanded.`;

  paginationCode = `<nx-advanced-data-grid
    [columns]="largeColumns"
    [rows]="largeRows"
    [paginator]="true"
    [pageSize]="10"
    [rowsPerPageOptions]="[10, 25, 50]">
</nx-advanced-data-grid>`;

  paginationTs = `// paginator, pageSize, rowsPerPageOptions and (page) work alongside filtering/sorting.`;

  lastReorder: string[] = [];

  reorderCode = `<nx-advanced-data-grid [columns]="columns" [rows]="rows" (columnsChange)="onColumnsReordered($event)">
</nx-advanced-data-grid>`;

  reorderTs = `onColumnsReordered(columns: NxDataGridColumn[]): void {
  console.log('new column order', columns.map((c) => c.id));
}`;

  onColumnsReordered(columns: NxDataGridColumn[]): void {
    this.lastReorder = columns.map((c) => c.id);
  }

  visibilityCode = `<nx-advanced-data-grid [columns]="columns" [rows]="rows"></nx-advanced-data-grid>
<!-- Click the toolbar's "Columns" button to toggle which columns are shown -->`;

  visibilityTs = `// Column visibility is managed internally by the grid - no extra input needed.`;
}
