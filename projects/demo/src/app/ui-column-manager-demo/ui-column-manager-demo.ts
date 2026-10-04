import { Component, inject } from '@angular/core';
import { CommonService } from '../services/common.service';
import { NxColumnManager, NxColumnManagerColumn } from 'components';
import { DemoSection } from '../shared/demo-section/demo-section';

@Component({
  selector: 'app-ui-column-manager-demo',
  imports: [NxColumnManager, DemoSection],
  templateUrl: './ui-column-manager-demo.html',
  styleUrl: './ui-column-manager-demo.scss',
})
export class UiColumnManagerDemo {
  importCode = `import { NxColumnManager } from 'nexium-ui';`;

  public commonService = inject(CommonService);

  columns: NxColumnManagerColumn[] = [
    { field: 'id', header: 'ID', visible: true, pinned: 'left' },
    { field: 'name', header: 'Name', visible: true, pinned: null },
    { field: 'department', header: 'Department', visible: true, pinned: null },
    { field: 'email', header: 'Email', visible: true, pinned: null },
    { field: 'status', header: 'Status', visible: true, pinned: null },
  ];

  rows: Record<string, unknown>[] = [
    { id: 1, name: 'Amelia Stone', department: 'Platform', email: 'amelia@nexium-ui.dev', status: 'Active' },
    { id: 2, name: 'Noah Park', department: 'Product', email: 'noah@nexium-ui.dev', status: 'Active' },
    { id: 3, name: 'Layla Kim', department: 'Platform', email: 'layla@nexium-ui.dev', status: 'Away' },
    { id: 4, name: 'Ethan Cole', department: 'Infra', email: 'ethan@nexium-ui.dev', status: 'Active' },
  ];

  basicCode = `<nx-column-manager [columns]="columns" (columnsChange)="onColumnsChange($event)"></nx-column-manager>`;

  basicTs = `columns: NxColumnManagerColumn[] = [
  { field: 'id', header: 'ID', visible: true, pinned: 'left' },
  { field: 'name', header: 'Name', visible: true, pinned: null },
  { field: 'department', header: 'Department', visible: true, pinned: null },
  { field: 'email', header: 'Email', visible: true, pinned: null },
  { field: 'status', header: 'Status', visible: true, pinned: null },
];

onColumnsChange(columns: NxColumnManagerColumn[]): void {
  this.columns = columns; // re-order/visibility/pinning drive this plain table below
}`;

  onColumnsChange(columns: NxColumnManagerColumn[]): void {
    this.columns = columns;
  }

  get visibleColumns(): NxColumnManagerColumn[] {
    const left = this.columns.filter((c) => c.visible && c.pinned === 'left');
    const middle = this.columns.filter((c) => c.visible && !c.pinned);
    const right = this.columns.filter((c) => c.visible && c.pinned === 'right');
    return [...left, ...middle, ...right];
  }
}
