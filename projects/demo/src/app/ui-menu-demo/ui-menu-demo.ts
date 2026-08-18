import { Component } from '@angular/core';
import { UiMenu, NxMenuItem } from 'components';
import { DemoSection } from '../shared/demo-section/demo-section';

@Component({
  selector: 'app-ui-menu-demo',
  imports: [UiMenu, DemoSection],
  templateUrl: './ui-menu-demo.html',
})
export class UiMenuDemo {
  lastSelected = '';

  items: NxMenuItem[] = [
    { id: 'edit', label: 'Edit', icon: 'nx-edit' },
    { id: 'duplicate', label: 'Duplicate', icon: 'nx-copy' },
    { id: 'share', label: 'Share', icon: 'nx-share' },
    { id: 'archive', label: 'Archive', icon: 'nx-folder', disabled: true },
    { id: 'd1', label: '', divider: true },
    { id: 'delete', label: 'Delete', icon: 'nx-trash', danger: true },
  ];

  basicCode = `<nx-menu [items]="items" (itemSelect)="onSelect($event)"></nx-menu>`;
  basicTs = `items: NxMenuItem[] = [
  { id: 'edit', label: 'Edit', icon: 'nx-edit' },
  { id: 'duplicate', label: 'Duplicate', icon: 'nx-copy' },
  { id: 'share', label: 'Share', icon: 'nx-share' },
  { id: 'archive', label: 'Archive', icon: 'nx-folder', disabled: true },
  { id: 'd1', label: '', divider: true },
  { id: 'delete', label: 'Delete', icon: 'nx-trash', danger: true },
];`;

  onSelect(item: NxMenuItem): void {
    this.lastSelected = item.label;
  }
}
