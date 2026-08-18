import { Component } from '@angular/core';
import { UiDropdownMenu, NxMenuItem, UiButton } from 'components';
import { DemoSection } from '../shared/demo-section/demo-section';

@Component({
  selector: 'app-ui-dropdown-menu-demo',
  imports: [UiDropdownMenu, UiButton, DemoSection],
  templateUrl: './ui-dropdown-menu-demo.html',
})
export class UiDropdownMenuDemo {
  lastSelected = '';

  items: NxMenuItem[] = [
    { id: 'profile', label: 'View Profile', icon: 'nx-user' },
    { id: 'settings', label: 'Settings', icon: 'nx-settings' },
    { id: 'd1', label: '', divider: true },
    { id: 'logout', label: 'Log Out', icon: 'nx-external-link', danger: true },
  ];

  basicCode = `<nx-dropdown-menu [items]="items" (itemSelect)="onSelect($event)">
    <nx-button nx-dropdown-trigger variant="secondary">Account</nx-button>
</nx-dropdown-menu>`;

  basicTs = `items: NxMenuItem[] = [
  { id: 'profile', label: 'View Profile', icon: 'nx-user' },
  { id: 'settings', label: 'Settings', icon: 'nx-settings' },
  { id: 'd1', label: '', divider: true },
  { id: 'logout', label: 'Log Out', icon: 'nx-external-link', danger: true },
];`;

  onSelect(item: NxMenuItem): void {
    this.lastSelected = item.label;
  }
}
