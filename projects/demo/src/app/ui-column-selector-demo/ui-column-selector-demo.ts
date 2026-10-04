import { Component, inject } from '@angular/core';
import { NxColumnSelector, NxColumnSelectorColumn } from 'components';
import { CommonService } from '../services/common.service';
import { DemoSection } from '../shared/demo-section/demo-section';

@Component({
  selector: 'app-ui-column-selector-demo',
  imports: [NxColumnSelector, DemoSection],
  templateUrl: './ui-column-selector-demo.html',
  styleUrl: './ui-column-selector-demo.scss',
})
export class UiColumnSelectorDemo {
  importCode = `import { NxColumnSelector } from 'nexium-ui';`;

  public commonService = inject(CommonService);

  columns: NxColumnSelectorColumn[] = [
    { id: 'name', label: 'Name', visible: true },
    { id: 'email', label: 'Email', visible: true },
    { id: 'role', label: 'Role', visible: true },
    { id: 'lastActive', label: 'Last active', visible: false },
    { id: 'createdAt', label: 'Created at', visible: false },
  ];

  basicCode = `<nx-column-selector [(columns)]="columns"></nx-column-selector>`;

  basicTs = `columns: NxColumnSelectorColumn[] = [
  { id: 'name', label: 'Name', visible: true },
  { id: 'email', label: 'Email', visible: true },
  { id: 'role', label: 'Role', visible: true },
  { id: 'lastActive', label: 'Last active', visible: false },
  { id: 'createdAt', label: 'Created at', visible: false },
];`;

  get visibleColumns(): NxColumnSelectorColumn[] {
    return this.columns.filter((column) => column.visible);
  }
}
