import { Component } from '@angular/core';
import {
  UiTable,
  NxTableColumn,
  UiInput,
  UiSelect,
  NxSelectOption,
  UiCard,
  UiCardHeader,
  UiCardTitle,
  UiCardContent,
  UiCardFooter,
  UiButton,
} from 'components';
import { DemoSection } from '../shared/demo-section/demo-section';

@Component({
  selector: 'app-templates-user-management-demo',
  imports: [UiTable, UiInput, UiSelect, UiButton, UiCard, UiCardHeader, UiCardTitle, UiCardContent, UiCardFooter, DemoSection],
  templateUrl: './templates-user-management-demo.html',
})
export class TemplatesUserManagementDemo {
  roleOptions: NxSelectOption[] = [
    { label: 'Admin', value: 'admin' },
    { label: 'Editor', value: 'editor' },
    { label: 'Viewer', value: 'viewer' },
  ];

  inviteEmail = '';
  inviteRole = 'viewer';

  columns: NxTableColumn[] = [
    { field: 'name', header: 'Name' },
    { field: 'email', header: 'Email' },
    { field: 'role', header: 'Role' },
    { field: 'status', header: 'Status' },
  ];

  users: Record<string, unknown>[] = [
    { name: 'Ada Lovelace', email: 'ada@nexium.dev', role: 'Admin', status: 'Active' },
    { name: 'Grace Hopper', email: 'grace@nexium.dev', role: 'Editor', status: 'Active' },
    { name: 'Alan Turing', email: 'alan@nexium.dev', role: 'Viewer', status: 'Invited' },
    { name: 'Margaret Hamilton', email: 'margaret@nexium.dev', role: 'Admin', status: 'Active' },
  ];

  tableCode = `<nx-table [columns]="columns" [data]="users" striped hoverable></nx-table>`;

  inviteCode = `<nx-card variant="elevated">
    <nx-card-header>
        <nx-card-title>Invite a Member</nx-card-title>
    </nx-card-header>
    <nx-card-content>
        <nx-input label="Email" type="email" [(value)]="inviteEmail"></nx-input>
        <nx-select label="Role" [options]="roleOptions" [(value)]="inviteRole"></nx-select>
    </nx-card-content>
    <nx-card-footer>
        <nx-button variant="primary">Send Invite</nx-button>
    </nx-card-footer>
</nx-card>`;

  onInvite(): void {}
}
