import { Component, inject } from '@angular/core';
import { CommonService } from '../services/common.service';
import {
  UiTable,
  NxTableColumn,
  NxTableColumnGroup,
  NxSortMeta,
  NxTableFilterEvent,
  NxTableLazyLoadEvent,
  NxCellEditEvent,
} from '../../../../../dist/components';
import { DemoSection } from '../shared/demo-section/demo-section';

@Component({
  selector: 'app-ui-table-demo',
  imports: [UiTable, DemoSection],
  templateUrl: './ui-table-demo.html',
  styleUrl: './ui-table-demo.scss',
})
export class UiTableDemo {
  public commonService = inject(CommonService);
  columns: NxTableColumn[] = [
    { field: 'name', header: 'Name' },
    { field: 'role', header: 'Role' },
    { field: 'status', header: 'Status' },
  ];

  data: Record<string, unknown>[] = [
    { name: 'Alice Johnson', role: 'Frontend Engineer', status: 'Active' },
    { name: 'Bob Smith', role: 'Backend Engineer', status: 'Active' },
    { name: 'Carol Davis', role: 'Designer', status: 'Away' },
  ];

  // Larger dataset used to demonstrate sort/filter/select/edit/paginate/scroll/virtual-scroll features.
  employees: Record<string, unknown>[] = Array.from({ length: 60 }, (_, i) => ({
    id: i + 1,
    name: `Employee ${i + 1}`,
    department: ['Engineering', 'Design', 'Sales', 'Support'][i % 4],
    role: ['Engineer', 'Manager', 'Designer', 'Analyst'][i % 4],
    salary: 40000 + ((i * 1337) % 60000),
    status: i % 3 === 0 ? 'Away' : 'Active',
  }));

  sortableColumns: NxTableColumn[] = [
    { field: 'name', header: 'Name', sortable: true },
    { field: 'department', header: 'Department', sortable: true },
    { field: 'salary', header: 'Salary', sortable: true, align: 'right' },
    { field: 'status', header: 'Status', sortable: true },
  ];

  customSortColumns: NxTableColumn[] = [
    {
      field: 'status',
      header: 'Status',
      sortable: true,
      sortFn: (a, b, order) => {
        const rank = (v: unknown) => (v === 'Active' ? 0 : 1);
        return (rank(a['status']) - rank(b['status'])) * order;
      },
    },
    { field: 'name', header: 'Name', sortable: true },
    { field: 'department', header: 'Department', sortable: true },
  ];

  filterColumns: NxTableColumn[] = [
    { field: 'name', header: 'Name', filterable: true },
    { field: 'department', header: 'Department', filterable: true },
    { field: 'role', header: 'Role', filterable: true },
    { field: 'status', header: 'Status', filterable: true },
  ];

  editableColumns: NxTableColumn[] = [
    { field: 'name', header: 'Name', editable: true },
    { field: 'department', header: 'Department', editable: true },
    { field: 'salary', header: 'Salary', editable: true, align: 'right' },
  ];

  resizableColumns: NxTableColumn[] = [
    { field: 'name', header: 'Name', resizable: true, width: '200px' },
    { field: 'department', header: 'Department', resizable: true, width: '160px' },
    { field: 'role', header: 'Role', resizable: true, width: '160px' },
    { field: 'salary', header: 'Salary', resizable: true, width: '140px', align: 'right' },
  ];

  frozenColumns: NxTableColumn[] = [
    { field: 'id', header: 'ID', frozen: 'left', width: '70px' },
    { field: 'name', header: 'Name', frozen: 'left', width: '160px' },
    { field: 'department', header: 'Department', width: '160px' },
    { field: 'role', header: 'Role', width: '160px' },
    { field: 'salary', header: 'Salary', width: '140px', align: 'right' },
    { field: 'status', header: 'Status', frozen: 'right', width: '110px' },
  ];

  groupColumns: NxTableColumn[] = [
    { field: 'name', header: 'Name' },
    { field: 'department', header: 'Department' },
    { field: 'role', header: 'Role' },
    { field: 'salary', header: 'Salary', align: 'right' },
    { field: 'status', header: 'Status' },
  ];

  columnGroups: NxTableColumnGroup[] = [
    { header: 'Employee', colspan: 2 },
    { header: 'Position', colspan: 2 },
    { header: 'Status', colspan: 1 },
  ];

  sortMeta: NxSortMeta[] = [];
  multiSortMeta: NxSortMeta[] = [];
  selectedEmployee: Record<string, unknown> | null = null;
  selectedEmployees: Record<string, unknown>[] = [];
  lazyData: Record<string, unknown>[] = [];

  constructor() {
    this.lazyData = new Array(this.employees.length);
  }

  onSort(meta: NxSortMeta[]): void {
    this.sortMeta = meta;
  }

  onMultiSort(meta: NxSortMeta[]): void {
    this.multiSortMeta = meta;
  }

  onFilter(event: NxTableFilterEvent): void {
    console.log('filter changed', event);
  }

  onCellEditComplete(event: NxCellEditEvent): void {
    console.log('cell edited', event);
  }

  onLazyLoad(event: NxTableLazyLoadEvent): void {
    const slice = this.employees.slice(event.first, event.first + event.rows);
    const next = [...this.lazyData];
    slice.forEach((row, i) => (next[event.first + i] = row));
    this.lazyData = next;
  }

  exportCode = `<nx-table #table [columns]="columns" [data]="data" showExport></nx-table>`;

  columnsDataTs = `columns: NxTableColumn[] = [
  { field: 'name', header: 'Name' },
  { field: 'role', header: 'Role' },
  { field: 'status', header: 'Status' },
];

data: Record<string, unknown>[] = [
  { name: 'Alice Johnson', role: 'Frontend Engineer', status: 'Active' },
  { name: 'Bob Smith', role: 'Backend Engineer', status: 'Active' },
  { name: 'Carol Davis', role: 'Designer', status: 'Away' },
];`;

  exportTs = this.columnsDataTs;

  basicCode = `<nx-table [columns]="columns" [data]="data">
</nx-table>`;

  basicTs = this.columnsDataTs;

  stripedCode = `<nx-table [columns]="columns" [data]="data" striped>
</nx-table>`;

  stripedTs = this.columnsDataTs;

  borderedCode = `<nx-table [columns]="columns" [data]="data" bordered>
</nx-table>`;

  borderedTs = this.columnsDataTs;

  hoverableCode = `<nx-table [columns]="columns" [data]="data" hoverable>
</nx-table>`;

  hoverableTs = this.columnsDataTs;

  sizeCode = `<nx-table [columns]="columns" [data]="data" size="sm"></nx-table>
<nx-table [columns]="columns" [data]="data" size="md"></nx-table>
<nx-table [columns]="columns" [data]="data" size="lg"></nx-table>`;

  sizeTs = this.columnsDataTs;

  sortCode = `<nx-table [columns]="sortableColumns" [data]="employees" (sort)="onSort($event)">
</nx-table>`;

  sortTs = `sortableColumns: NxTableColumn[] = [
  { field: 'name', header: 'Name', sortable: true },
  { field: 'department', header: 'Department', sortable: true },
  { field: 'salary', header: 'Salary', sortable: true, align: 'right' },
  { field: 'status', header: 'Status', sortable: true },
];

onSort(meta: NxSortMeta[]): void {
  this.sortMeta = meta;
}`;

  multiSortCode = `<nx-table [columns]="sortableColumns" [data]="employees" multiSortable
  (sort)="onMultiSort($event)">
</nx-table>
<!-- Ctrl/Shift + click column headers to sort by multiple columns -->`;

  multiSortTs = `onMultiSort(meta: NxSortMeta[]): void {
  this.multiSortMeta = meta;
}`;

  customSortCode = `<nx-table [columns]="customSortColumns" [data]="employees">
</nx-table>
<!-- Provide a col.sortFn to control comparison logic per column -->`;

  customSortTs = `customSortColumns: NxTableColumn[] = [
  {
    field: 'status',
    header: 'Status',
    sortable: true,
    sortFn: (a, b, order) => {
      const rank = (v: unknown) => (v === 'Active' ? 0 : 1);
      return (rank(a['status']) - rank(b['status'])) * order;
    },
  },
  { field: 'name', header: 'Name', sortable: true },
  { field: 'department', header: 'Department', sortable: true },
];`;

  filterCode = `<nx-table [columns]="filterColumns" [data]="employees" showGlobalFilter>
</nx-table>
<!-- Set col.filterable to show a per-column filter input -->`;

  filterTs = `filterColumns: NxTableColumn[] = [
  { field: 'name', header: 'Name', filterable: true },
  { field: 'department', header: 'Department', filterable: true },
  { field: 'role', header: 'Role', filterable: true },
  { field: 'status', header: 'Status', filterable: true },
];

onFilter(event: NxTableFilterEvent): void {
  console.log('filter changed', event);
}`;

  selectionSingleCode = `<nx-table [columns]="columns" [data]="employees" selectionMode="single"
  [(selection)]="selectedEmployee">
</nx-table>`;

  selectionSingleTs = `selectedEmployee: Record<string, unknown> | null = null;`;

  selectionMultipleCode = `<nx-table [columns]="columns" [data]="employees" selectionMode="multiple"
  [(selection)]="selectedEmployees">
</nx-table>`;

  selectionMultipleTs = `selectedEmployees: Record<string, unknown>[] = [];`;

  editCode = `<nx-table [columns]="editableColumns" [data]="employees"
  (cellEditComplete)="onCellEditComplete($event)">
</nx-table>
<!-- Double-click an editable cell to edit it -->`;

  editTs = `editableColumns: NxTableColumn[] = [
  { field: 'name', header: 'Name', editable: true },
  { field: 'department', header: 'Department', editable: true },
  { field: 'salary', header: 'Salary', editable: true, align: 'right' },
];

onCellEditComplete(event: NxCellEditEvent): void {
  console.log('cell edited', event);
}`;

  scrollCode = `<nx-table [columns]="resizableColumns" [data]="employees" scrollable scrollHeight="320px">
</nx-table>
<!-- Horizontal scroll is automatic; vertical scroll uses scrollHeight -->`;

  scrollTs = `resizableColumns: NxTableColumn[] = [
  { field: 'name', header: 'Name', resizable: true, width: '200px' },
  { field: 'department', header: 'Department', resizable: true, width: '160px' },
  { field: 'role', header: 'Role', resizable: true, width: '160px' },
  { field: 'salary', header: 'Salary', resizable: true, width: '140px', align: 'right' },
];`;

  frozenCode = `<nx-table [columns]="frozenColumns" [data]="employees" scrollable scrollHeight="320px">
</nx-table>
<!-- Set col.frozen to 'left' or 'right' to pin columns while scrolling horizontally -->`;

  frozenTs = `frozenColumns: NxTableColumn[] = [
  { field: 'id', header: 'ID', frozen: 'left', width: '70px' },
  { field: 'name', header: 'Name', frozen: 'left', width: '160px' },
  { field: 'department', header: 'Department', width: '160px' },
  { field: 'role', header: 'Role', width: '160px' },
  { field: 'salary', header: 'Salary', width: '140px', align: 'right' },
  { field: 'status', header: 'Status', frozen: 'right', width: '110px' },
];`;

  virtualPreloadCode = `<nx-table [columns]="columns" [data]="employees" virtualScroll
  virtualScrollMode="preload" scrollHeight="320px">
</nx-table>`;

  virtualPreloadTs = this.columnsDataTs;

  virtualLazyCode = `<nx-table [columns]="columns" [data]="lazyData" virtualScroll
  virtualScrollMode="lazy" [totalRecords]="employees.length" scrollHeight="320px"
  (lazyLoad)="onLazyLoad($event)">
</nx-table>`;

  virtualLazyTs = `lazyData: Record<string, unknown>[] = new Array(this.employees.length);

onLazyLoad(event: NxTableLazyLoadEvent): void {
  const slice = this.employees.slice(event.first, event.first + event.rows);
  const next = [...this.lazyData];
  slice.forEach((row, i) => (next[event.first + i] = row));
  this.lazyData = next;
}`;

  groupCode = `<nx-table [columns]="groupColumns" [columnGroups]="columnGroups" [data]="employees">
</nx-table>`;

  groupTs = `groupColumns: NxTableColumn[] = [
  { field: 'name', header: 'Name' },
  { field: 'department', header: 'Department' },
  { field: 'role', header: 'Role' },
  { field: 'salary', header: 'Salary', align: 'right' },
  { field: 'status', header: 'Status' },
];

columnGroups: NxTableColumnGroup[] = [
  { header: 'Employee', colspan: 2 },
  { header: 'Position', colspan: 2 },
  { header: 'Status', colspan: 1 },
];`;

  resizeCode = `<nx-table [columns]="resizableColumns" [data]="employees">
</nx-table>
<!-- Drag the handle on the right edge of a resizable column header -->`;

  resizeTs = this.scrollTs;

  paginatorCode = `<nx-table [columns]="columns" [data]="employees" paginator [rows]="10"
  [rowsPerPageOptions]="[10, 25, 50]">
</nx-table>`;

  paginatorTs = this.columnsDataTs;
}

