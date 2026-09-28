import { Component, inject } from '@angular/core';
import { NxSortableItem, NxSortableList } from 'components';
import { CommonService } from '../services/common.service';
import { DemoSection } from '../shared/demo-section/demo-section';

@Component({
  selector: 'app-ui-sortable-list-demo',
  imports: [NxSortableList, DemoSection],
  templateUrl: './ui-sortable-list-demo.html',
  styleUrl: './ui-sortable-list-demo.scss',
})
export class UiSortableListDemo {
  importCode = `import { NxSortableList } from 'nexium-ui';`;

  public commonService = inject(CommonService);

  items: NxSortableItem[] = [
    { id: 1, label: 'Collect requirements' },
    { id: 2, label: 'Design wireframes' },
    { id: 3, label: 'Build prototype' },
    { id: 4, label: 'User testing' },
    { id: 5, label: 'Ship to production' },
  ];

  lastOrder = '';

  basicCode = `<nx-sortable-list [(items)]="items" (reordered)="onReordered($event)"></nx-sortable-list>`;

  basicTs = `items: NxSortableItem[] = [
  { id: 1, label: 'Collect requirements' },
  { id: 2, label: 'Design wireframes' },
  { id: 3, label: 'Build prototype' },
  { id: 4, label: 'User testing' },
  { id: 5, label: 'Ship to production' },
];

onReordered(items: NxSortableItem[]): void {
  // items is already the new order - persist it, sync it to a backend, etc.
}`;

  onReordered(items: NxSortableItem[]): void {
    this.lastOrder = items.map((item) => item.label).join(' -> ');
  }
}
