import { Component, inject, signal } from '@angular/core';
import { CommonService } from '../services/common.service';
import { NxTransferBox, NxTransferItem } from '../../../../../dist/components';
import { DemoSection } from '../shared/demo-section/demo-section';

const TEAM_MEMBERS: NxTransferItem[] = [
  { id: 'u1', label: 'Ava Thompson' },
  { id: 'u2', label: 'Liam Chen' },
  { id: 'u3', label: 'Sofia Rossi' },
  { id: 'u4', label: 'Noah Patel' },
  { id: 'u5', label: 'Mia Johansson' },
  { id: 'u6', label: 'Ethan Walker' },
  { id: 'u7', label: 'Isabella Garcia' },
  { id: 'u8', label: 'Lucas Müller' },
  { id: 'u9', label: 'Amara Okafor' },
  { id: 'u10', label: 'Yuki Tanaka' },
];

const PERMISSIONS: NxTransferItem[] = [
  { id: 'p1', label: 'View Dashboard' },
  { id: 'p2', label: 'Manage Billing' },
  { id: 'p3', label: 'Edit Users' },
  { id: 'p4', label: 'Delete Projects' },
  { id: 'p5', label: 'View Reports' },
  { id: 'p6', label: 'Manage API Keys' },
  { id: 'p7', label: 'Invite Team Members' },
  { id: 'p8', label: 'Export Data' },
];

@Component({
  selector: 'app-ui-transfer-box-demo',
  imports: [NxTransferBox, DemoSection],
  templateUrl: './ui-transfer-box-demo.html',
  styleUrl: './ui-transfer-box-demo.scss',
})
export class UiTransferBoxDemo {
  importCode = `import { NxTransferBox } from 'nexium-ui';`;

  public commonService = inject(CommonService);

  members = TEAM_MEMBERS;
  projectTeam = signal<string[]>(['u2', 'u5', 'u7']);

  onSelectedIdsChange(ids: string[]): void {
    this.projectTeam.set(ids);
  }

  basicCode = `<nx-transfer-box [items]="members" [selectedIds]="projectTeam" (selectedIdsChange)="onSelectedIdsChange($event)"></nx-transfer-box>`;
  basicTs = `members = [
  { id: 'u1', label: 'Ava Thompson' },
  { id: 'u2', label: 'Liam Chen' },
  // ...
];
projectTeam = ['u2', 'u5', 'u7'];

onSelectedIdsChange(ids: string[]) {
  this.projectTeam = ids;
}`;

  permissions = PERMISSIONS;
  grantedPermissions = signal<string[]>([]);

  onPermissionsChange(ids: string[]): void {
    this.grantedPermissions.set(ids);
  }

  permissionsCode = `<nx-transfer-box [items]="permissions" [selectedIds]="grantedPermissions" (selectedIdsChange)="onPermissionsChange($event)"></nx-transfer-box>`;
  permissionsTs = `// Starting with nothing granted - search either panel, check the permissions you want,
// then use '>' to grant just the checked ones or '>>' to grant everything at once.
permissions = [{ id: 'p1', label: 'View Dashboard' }, /* ... */];
grantedPermissions: string[] = [];`;
}
