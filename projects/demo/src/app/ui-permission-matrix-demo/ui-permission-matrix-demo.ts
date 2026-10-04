import { Component, inject } from '@angular/core';
import { CommonService } from '../services/common.service';
import { NxPermissionMatrix, NxPermissionMatrixValue, NxPermissionGroup } from 'components';
import { DemoSection } from '../shared/demo-section/demo-section';

@Component({
  selector: 'app-ui-permission-matrix-demo',
  imports: [NxPermissionMatrix, DemoSection],
  templateUrl: './ui-permission-matrix-demo.html',
  styleUrl: './ui-permission-matrix-demo.scss',
})
export class UiPermissionMatrixDemo {
  importCode = `import { NxPermissionMatrix } from 'nexium-ui';`;

  public commonService = inject(CommonService);

  roles = ['Admin', 'Editor', 'Viewer'];
  permissions = ['Create', 'Read', 'Update', 'Delete', 'Publish'];

  value: NxPermissionMatrixValue = {
    Admin: { Create: true, Read: true, Update: true, Delete: true, Publish: true },
    Editor: { Create: true, Read: true, Update: true, Delete: false, Publish: false },
    Viewer: { Create: false, Read: true, Update: false, Delete: false, Publish: false },
  };

  basicCode = `<nx-permission-matrix
    [(roles)]="roles"
    [(permissions)]="permissions"
    [(value)]="value">
</nx-permission-matrix>`;

  basicTs = `roles = ['Admin', 'Editor', 'Viewer'];
permissions = ['Create', 'Read', 'Update', 'Delete', 'Publish'];

value: NxPermissionMatrixValue = {
  Admin: { Create: true, Read: true, Update: true, Delete: true, Publish: true },
  Editor: { Create: true, Read: true, Update: true, Delete: false, Publish: false },
  Viewer: { Create: false, Read: true, Update: false, Delete: false, Publish: false },
};

// "+ Add role" and the per-column "x" both mutate roles in place, via rolesChange - that's why
// [(roles)] needs the two-way banana-in-a-box syntax now instead of a plain [roles] input.
// Export JSON / Import JSON are also available in the toolbar.`;

  // Second example: grouped rows, search, and inheritance.
  groupedRoles = ['Owner', 'Manager', 'Support'];
  groupedPermissions = ['view_billing', 'edit_billing', 'view_users', 'invite_users', 'remove_users', 'view_reports', 'export_reports'];

  permissionGroups: NxPermissionGroup[] = [
    { label: 'Billing', permissions: ['view_billing', 'edit_billing'] },
    { label: 'Users', permissions: ['view_users', 'invite_users', 'remove_users'] },
    { label: 'Reports', permissions: ['view_reports', 'export_reports'] },
  ];

  groupedValue: NxPermissionMatrixValue = {
    Owner: {
      view_billing: true, edit_billing: true,
      view_users: true, invite_users: true, remove_users: true,
      view_reports: true, export_reports: true,
    },
    Manager: {
      view_users: true, invite_users: true,
    },
    Support: {
      view_users: true,
    },
  };

  // Manager inherits everything Owner has (unless overridden), Support inherits from Manager -
  // e.g. Support's "view_users" checkbox is checked but rendered muted/distinct until clicked,
  // since it comes from Manager -> Owner rather than a direct grant.
  inheritance: Record<string, string> = {
    Manager: 'Owner',
    Support: 'Manager',
  };

  groupedCode = `<nx-permission-matrix
    [(roles)]="groupedRoles"
    [(permissions)]="groupedPermissions"
    [(value)]="groupedValue"
    [permissionGroups]="permissionGroups"
    [(inheritance)]="inheritance">
</nx-permission-matrix>`;

  groupedTs = `permissionGroups: NxPermissionGroup[] = [
  { label: 'Billing', permissions: ['view_billing', 'edit_billing'] },
  { label: 'Users', permissions: ['view_users', 'invite_users', 'remove_users'] },
  { label: 'Reports', permissions: ['view_reports', 'export_reports'] },
];

// Manager inherits from Owner, Support inherits from Manager (chained inheritance).
inheritance: Record<string, string> = { Manager: 'Owner', Support: 'Manager' };

// Rows render grouped under collapsible "Billing / Users / Reports" headers, filterable by the
// search box. A cell granted only through inheritance renders muted - clicking it promotes the
// grant to an explicit one on that role instead of toggling it off.`;
}
