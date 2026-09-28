import { Component, inject } from '@angular/core';
import { CommonService } from '../services/common.service';
import { NxMenuItem, NxPopoverMenu } from '../../../../../dist/components';
import { DemoSection } from '../shared/demo-section/demo-section';

@Component({
  selector: 'app-ui-popover-menu-demo',
  imports: [NxPopoverMenu, DemoSection],
  templateUrl: './ui-popover-menu-demo.html',
  styleUrl: './ui-popover-menu-demo.scss',
})
export class UiPopoverMenuDemo {
  importCode = `import { NxPopoverMenu } from 'nexium-ui';`;

  public commonService = inject(CommonService);

  items: NxMenuItem[] = [
    { id: 'edit', label: 'Edit', icon: 'nx-edit' },
    { id: 'share', label: 'Share', icon: 'nx-share' },
    { id: 'divider', label: '', divider: true },
    { id: 'delete', label: 'Delete', icon: 'nx-trash', danger: true },
  ];

  selected = '';

  onSelect(item: NxMenuItem): void {
    this.selected = item.label;
  }

  basicCode = `<nx-popover-menu [items]="items" (itemSelect)="onSelect($event)">
    <button nx-popover-menu-trigger>Actions</button>
</nx-popover-menu>`;

  basicTs = `items: NxMenuItem[] = [
  { id: 'edit', label: 'Edit', icon: 'nx-edit' },
  { id: 'share', label: 'Share', icon: 'nx-share' },
  { id: 'divider', label: '', divider: true },
  { id: 'delete', label: 'Delete', icon: 'nx-trash', danger: true },
];

onSelect(item: NxMenuItem): void {
  this.selected = item.label;
}`;

  placementCode = `<nx-popover-menu [items]="items" placement="bottom-end">...</nx-popover-menu>
<nx-popover-menu [items]="items" placement="right">...</nx-popover-menu>`;

  placementTs = `// placement accepts 8 positions: top(-start|-end), bottom(-start|-end), left, right -
// and auto-flips vertically if the panel would overflow the viewport.`;

  customCode = `<nx-popover-menu>
    <button nx-popover-menu-trigger>Custom content</button>
    <div style="padding: 8px 12px; width: 200px;">
        Any projected content works too, not just a menu list.
    </div>
</nx-popover-menu>`;

  customTs = `// Omit \`items\` (or leave it empty) and project whatever you like instead.`;
}
