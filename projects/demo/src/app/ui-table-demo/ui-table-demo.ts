import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonService } from '../services/common.service';
import { NxTable, NxTableColumn, NxSortMeta } from '../../../../../dist/components';
import { DemoSection } from '../shared/demo-section/demo-section';

@Component({
  selector: 'app-ui-table-demo',
  imports: [NxTable, DemoSection, RouterLink],
  templateUrl: './ui-table-demo.html',
  styleUrl: './ui-table-demo.scss',
})
export class UiTableDemo {
  importCode = `import { NxTable, NxTableColumn, NxSortMeta } from 'nexium-ui';`;

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

  scrollColumns: NxTableColumn[] = [
    { field: 'name', header: 'Name', width: '200px' },
    { field: 'department', header: 'Department', width: '160px' },
    { field: 'role', header: 'Role', width: '160px' },
    { field: 'salary', header: 'Salary', width: '140px', align: 'right' },
  ];

  frozenColumns: NxTableColumn[] = [
    { field: 'id', header: 'ID', frozen: 'left', width: '70px' },
    { field: 'name', header: 'Name', frozen: 'left', width: '160px' },
    { field: 'department', header: 'Department', width: '160px' },
    { field: 'role', header: 'Role', width: '160px' },
    { field: 'salary', header: 'Salary', width: '140px', align: 'right' },
    { field: 'status', header: 'Status', frozen: 'right', width: '110px' },
  ];

  sortMeta: NxSortMeta[] = [];
  multiSortMeta: NxSortMeta[] = [];

  onSort(meta: NxSortMeta[]): void {
    this.sortMeta = meta;
  }

  onMultiSort(meta: NxSortMeta[]): void {
    this.multiSortMeta = meta;
  }

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

  scrollCode = `<nx-table [columns]="scrollColumns" [data]="employees" scrollable scrollHeight="320px">
</nx-table>
<!-- Horizontal scroll is automatic; vertical scroll uses scrollHeight -->`;

  scrollTs = `scrollColumns: NxTableColumn[] = [
  { field: 'name', header: 'Name', width: '200px' },
  { field: 'department', header: 'Department', width: '160px' },
  { field: 'role', header: 'Role', width: '160px' },
  { field: 'salary', header: 'Salary', width: '140px', align: 'right' },
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

  paginatorCode = `<nx-table [columns]="columns" [data]="employees" paginator [rows]="10"
  [rowsPerPageOptions]="[10, 25, 50]">
</nx-table>`;

  paginatorTs = this.columnsDataTs;
}

