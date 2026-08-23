import { Component } from '@angular/core';
import { NxContextMenu, NxMenuItem } from 'components';
import { DemoSection } from '../shared/demo-section/demo-section';

@Component({
  selector: 'app-ui-context-menu-demo',
  imports: [NxContextMenu, DemoSection],
  templateUrl: './ui-context-menu-demo.html',
})
export class UiContextMenuDemo {
  importCode = `import { NxContextMenu, NxMenuItem } from 'nexium-ui';`;

  lastSelected = '';

  items: NxMenuItem[] = [
    { id: 'copy', label: 'Copy', icon: 'nx-copy' },
    { id: 'rename', label: 'Rename', icon: 'nx-edit' },
    { id: 'd1', label: '', divider: true },
    { id: 'delete', label: 'Delete', icon: 'nx-trash', danger: true },
  ];

  basicCode = `<nx-context-menu [items]="items" (itemSelect)="onSelect($event)">
    <div class="surface-box">Right-click anywhere in this box</div>
</nx-context-menu>`;

  basicTs = `items: NxMenuItem[] = [
  { id: 'copy', label: 'Copy', icon: 'nx-copy' },
  { id: 'rename', label: 'Rename', icon: 'nx-edit' },
  { id: 'd1', label: '', divider: true },
  { id: 'delete', label: 'Delete', icon: 'nx-trash', danger: true },
];`;

  onSelect(item: NxMenuItem): void {
    this.lastSelected = item.label;
  }
}
