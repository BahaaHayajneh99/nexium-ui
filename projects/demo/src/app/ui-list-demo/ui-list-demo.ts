import { Component, inject } from '@angular/core';
import { CommonService } from '../services/common.service';
import { UiList, NxListItem } from '../../../../../dist/components';
import { DemoSection } from '../shared/demo-section/demo-section';

@Component({
  selector: 'app-ui-list-demo',
  imports: [UiList, DemoSection],
  templateUrl: './ui-list-demo.html',
  styleUrl: './ui-list-demo.scss',
})
export class UiListDemo {
  public commonService = inject(CommonService);
  items: NxListItem[] = [
    { label: 'Dashboard' },
    { label: 'Projects' },
    { label: 'Settings' },
    { label: 'Archived', disabled: true },
  ];

  basicCode = `<nx-list [items]="items">
</nx-list>`;

  basicTs = `items: NxListItem[] = [
  { label: 'Dashboard' },
  { label: 'Projects' },
  { label: 'Settings' },
  { label: 'Archived', disabled: true },
];`;

  borderedCode = `<nx-list [items]="items" bordered>
</nx-list>`;

  borderedTs = this.basicTs;

  hoverableCode = `<nx-list [items]="items" bordered hoverable (itemClick)="onItemClick($event)">
</nx-list>`;

  hoverableTs = `items: NxListItem[] = [
  { label: 'Dashboard' },
  { label: 'Projects' },
  { label: 'Settings' },
  { label: 'Archived', disabled: true },
];

onItemClick(item: NxListItem): void {
  console.log('Clicked', item.label);
}`;

  onItemClick(item: NxListItem): void {
    console.log('Clicked', item.label);
  }
}
