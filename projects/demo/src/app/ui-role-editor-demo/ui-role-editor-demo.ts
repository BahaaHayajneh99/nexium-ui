import { Component, inject } from '@angular/core';
import { CommonService } from '../services/common.service';
import { NxRoleEditor, NxRoleEditorPermissionGroup, NxRoleEditorSaveEvent } from 'components';
import { DemoSection } from '../shared/demo-section/demo-section';

@Component({
  selector: 'app-ui-role-editor-demo',
  imports: [NxRoleEditor, DemoSection],
  templateUrl: './ui-role-editor-demo.html',
  styleUrl: './ui-role-editor-demo.scss',
})
export class UiRoleEditorDemo {
  importCode = `import { NxRoleEditor } from 'nexium-ui';`;

  public commonService = inject(CommonService);

  // Plain (non-signal) properties - [(roleName)] etc. below reassign these directly via the
  // standard two-way "banana in a box" desugaring, the same pattern ui-permission-matrix-demo
  // uses for [(roles)]/[(value)]; the reassignment happens inside a (click)-triggered handler,
  // which is enough to pick up the new value on next render.
  roleName = 'Content Editor';
  roleDescription = 'Can author and publish content, and manage billing read-access, but cannot manage other users.';

  permissionGroups: NxRoleEditorPermissionGroup[] = [
    {
      label: 'Content',
      permissions: [
        { key: 'content_create', label: 'Create content' },
        { key: 'content_edit', label: 'Edit content' },
        { key: 'content_publish', label: 'Publish content' },
        { key: 'content_delete', label: 'Delete content' },
      ],
    },
    {
      label: 'Billing',
      permissions: [
        { key: 'billing_view', label: 'View invoices' },
        { key: 'billing_edit', label: 'Edit payment methods' },
      ],
    },
    {
      label: 'Users',
      permissions: [
        { key: 'users_view', label: 'View team members' },
        { key: 'users_invite', label: 'Invite team members' },
        { key: 'users_remove', label: 'Remove team members' },
      ],
    },
  ];

  grantedPermissions = new Set<string>(['content_create', 'content_edit', 'content_publish', 'billing_view', 'users_view']);

  lastAction = 'No changes saved yet.';

  onSave(event: NxRoleEditorSaveEvent): void {
    this.lastAction = `Saved "${event.name}" with ${event.permissions.length} permission(s) granted.`;
  }

  onCancel(): void {
    this.lastAction = 'Edit cancelled.';
  }

  basicCode = `<nx-role-editor
    [(roleName)]="roleName"
    [(roleDescription)]="roleDescription"
    [permissionGroups]="permissionGroups"
    [(grantedPermissions)]="grantedPermissions"
    (save)="onSave($event)"
    (cancel)="onCancel()">
</nx-role-editor>`;

  basicTs = `permissionGroups: NxRoleEditorPermissionGroup[] = [
  { label: 'Content', permissions: [
    { key: 'content_create', label: 'Create content' },
    { key: 'content_edit', label: 'Edit content' },
    { key: 'content_publish', label: 'Publish content' },
    { key: 'content_delete', label: 'Delete content' },
  ] },
  { label: 'Billing', permissions: [
    { key: 'billing_view', label: 'View invoices' },
    { key: 'billing_edit', label: 'Edit payment methods' },
  ] },
  { label: 'Users', permissions: [
    { key: 'users_view', label: 'View team members' },
    { key: 'users_invite', label: 'Invite team members' },
    { key: 'users_remove', label: 'Remove team members' },
  ] },
];

roleName = 'Content Editor';
roleDescription = 'Can author and publish content...';
grantedPermissions = new Set(['content_create', 'content_edit', 'content_publish', 'billing_view', 'users_view']);

onSave(event: NxRoleEditorSaveEvent): void {
  // event: { name, description, permissions: string[] } - persist the role.
}

onCancel(): void {
  // Discard the edit.
}

// Each permission group has its own collapsible header with a "Select all / Clear all" shortcut
// and an N/M granted counter; roleName/roleDescription/grantedPermissions are all two-way bound.`;
}
