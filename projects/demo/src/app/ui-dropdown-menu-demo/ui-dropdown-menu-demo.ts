import { Component } from '@angular/core';
import { NxDropdownMenu, NxMenuItem, NxButton, NxIcon } from 'components';
import { DemoSection } from '../shared/demo-section/demo-section';

interface RiskReview {
  name: string;
  archived: boolean;
  canEdit: boolean;
}

@Component({
  selector: 'app-ui-dropdown-menu-demo',
  imports: [NxDropdownMenu, NxButton, NxIcon, DemoSection],
  templateUrl: './ui-dropdown-menu-demo.html',
})
export class UiDropdownMenuDemo {
  importCode = `import { NxDropdownMenu, NxMenuItem, NxButton } from 'nexium-ui';`;

  lastSelected = '';
  lastAction = '';

  rows: RiskReview[] = [
    { name: 'Vendor onboarding review', archived: false, canEdit: true },
    { name: 'Q1 access audit', archived: true, canEdit: false },
  ];

  customContentCode = `<nx-dropdown-menu>
    <nx-button nx-dropdown-trigger variant="secondary" [icon]="true">
        <nx-icon icon="nx-more-vertical" variant="svg"></nx-icon>
    </nx-button>

    <div nx-dropdown-content class="nx-menu">
        <button class="nx-menu-item" (click)="goToDetails(row)">
            <nx-icon class="nx-menu-item-icon" icon="nx-eye" variant="svg" [size]="16"></nx-icon>
            <span>Details</span>
        </button>

        @if (row.canEdit) {
            <button class="nx-menu-item" (click)="goToEdit(row)">
                <nx-icon class="nx-menu-item-icon" icon="nx-edit" variant="svg" [size]="16"></nx-icon>
                <span>Edit</span>
            </button>
        }

        @if (!row.archived) {
            <button class="nx-menu-item danger" (click)="confirmArchive(row)">
                <nx-icon class="nx-menu-item-icon" icon="nx-folder" variant="svg" [size]="16"></nx-icon>
                <span>Archive</span>
            </button>
        }
    </div>
</nx-dropdown-menu>`;

  goToDetails(row: RiskReview): void {
    this.lastAction = `Details: ${row.name}`;
  }

  goToEdit(row: RiskReview): void {
    this.lastAction = `Edit: ${row.name}`;
  }

  confirmArchive(row: RiskReview): void {
    this.lastAction = `Archive: ${row.name}`;
  }

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
