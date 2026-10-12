import { Component, inject, signal } from '@angular/core';
import { CommonService } from '../services/common.service';
import {
  NxAccessControl,
  NxAccessControlUser,
  NxAccessControlRole,
  NxAccessControlRoleChangedEvent,
  NxAccessControlStatusChangedEvent,
} from 'components';
import { DemoSection } from '../shared/demo-section/demo-section';

@Component({
  selector: 'app-ui-access-control-demo',
  imports: [NxAccessControl, DemoSection],
  templateUrl: './ui-access-control-demo.html',
  styleUrl: './ui-access-control-demo.scss',
})
export class UiAccessControlDemo {
  importCode = `import { NxAccessControl } from 'nexium-ui';`;

  public commonService = inject(CommonService);

  roles: NxAccessControlRole[] = [
    { label: 'Admin', value: 'admin' },
    { label: 'Editor', value: 'editor' },
    { label: 'Viewer', value: 'viewer' },
  ];

  // Signal rather than a plain property: onRoleChanged/onStatusChanged below rebuild this
  // immutably, and in this zoneless demo app a plain property write wouldn't be picked up
  // until some unrelated click happened to trigger a re-render.
  users = signal<NxAccessControlUser[]>([
    { id: 1, name: 'Priya Patel', email: 'priya.patel@example.com', role: 'admin', status: 'active' },
    { id: 2, name: 'Ahmed Al-Masri', email: 'ahmed.almasri@example.com', role: 'editor', status: 'active' },
    { id: 3, name: 'Bahaa Hayajneh', email: 'bahaa.hayajneh@example.com', role: 'admin', status: 'active' },
    { id: 4, name: 'Sara Kim', email: 'sara.kim@example.com', role: 'editor', status: 'suspended' },
    { id: 5, name: 'Lucas Fontaine', email: 'lucas.fontaine@example.com', role: 'viewer', status: 'active' },
    { id: 6, name: 'Mei Chen', email: 'mei.chen@example.com', role: 'viewer', status: 'active' },
    { id: 7, name: 'Daniel Osei', email: 'daniel.osei@example.com', role: 'editor', status: 'active' },
    { id: 8, name: 'Nora Haddad', email: 'nora.haddad@example.com', role: 'viewer', status: 'suspended' },
  ]);

  lastEvent = signal('No changes yet.');

  onRoleChanged(event: NxAccessControlRoleChangedEvent): void {
    this.users.update((list) =>
      list.map((user) => (user.id === event.userId ? { ...user, role: event.newRole } : user)),
    );
    const user = this.users().find((u) => u.id === event.userId);
    this.lastEvent.set(`${user?.name ?? event.userId} reassigned to "${this.roleLabel(event.newRole)}".`);
  }

  onStatusChanged(event: NxAccessControlStatusChangedEvent): void {
    this.users.update((list) =>
      list.map((user) => (user.id === event.userId ? { ...user, status: event.newStatus } : user)),
    );
    const user = this.users().find((u) => u.id === event.userId);
    this.lastEvent.set(`${user?.name ?? event.userId} marked ${event.newStatus}.`);
  }

  private roleLabel(value: string): string {
    return this.roles.find((role) => role.value === value)?.label ?? value;
  }

  basicCode = `<nx-access-control
    [users]="users"
    [roles]="roles"
    (roleChanged)="onRoleChanged($event)"
    (statusChanged)="onStatusChanged($event)">
</nx-access-control>`;

  basicTs = `roles: NxAccessControlRole[] = [
  { label: 'Admin', value: 'admin' },
  { label: 'Editor', value: 'editor' },
  { label: 'Viewer', value: 'viewer' },
];

users: NxAccessControlUser[] = [
  { id: 1, name: 'Priya Patel', email: 'priya.patel@example.com', role: 'admin', status: 'active' },
  // ...more users, each with an id/name/email/role/status
];

onRoleChanged(event: NxAccessControlRoleChangedEvent): void {
  // event: { userId, newRole } - reassign the user's role in your own store.
}

onStatusChanged(event: NxAccessControlStatusChangedEvent): void {
  // event: { userId, newStatus } - 'active' | 'suspended'.
}

// The search box filters by name/email, the role dropdown filters the list by role, the role
// badge on each row is itself a <select> for inline reassignment, and the switch toggles status.`;
}
