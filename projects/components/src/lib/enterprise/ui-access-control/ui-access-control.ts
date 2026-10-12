import { Component, EventEmitter, Input, Output, computed, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NxIcon } from '../../data-display/ui-icon';
import { NxAvatar } from '../../data-display/ui-avatar';
import { NxSwitch } from '../../forms/ui-switch';
import { NxProLocked } from '../../licensing/ui-pro-locked/ui-pro-locked';
import { nxProLicenseGranted } from '../../licensing/nx-license';

export interface NxAccessControlRole {
  label: string;
  value: string;
}

export interface NxAccessControlUser {
  id: string | number;
  name: string;
  email: string;
  avatarUrl?: string;
  /** One of the `roles` input's role keys/labels. */
  role: string;
  status: 'active' | 'suspended';
}

export interface NxAccessControlRoleChangedEvent {
  userId: string | number;
  newRole: string;
}

export interface NxAccessControlStatusChangedEvent {
  userId: string | number;
  newStatus: 'active' | 'suspended';
}

/** Cyclical palette applied to role badges/selects by the role's position in the `roles` input, so each role reads as a distinct color without the consumer having to supply one. */
const ROLE_PALETTE = ['primary', 'success', 'warning', 'info', 'danger', 'secondary'] as const;

/**
 * A user-centric admin view for access control: lists users with their avatar/name/email, their
 * currently assigned role (shown as a colored, selectable badge for inline reassignment), and an
 * active/suspended status toggle. Includes a search box (name/email) and a role filter dropdown.
 * This is deliberately NOT a permission grid - see `NxPermissionMatrix` for that.
 */
@Component({
  selector: 'nx-access-control',
  standalone: true,
  imports: [FormsModule, NxIcon, NxAvatar, NxSwitch, NxProLocked],
  templateUrl: './ui-access-control.html',
  styleUrl: './ui-access-control.scss',
})
export class NxAccessControl {
  protected readonly licensed = nxProLicenseGranted();

  // Signal-backed (not a plain field) so `filteredUsers` below re-runs whenever the parent rebinds
  // a new `users` array, rather than freezing on whatever was passed in on first render.
  private readonly usersSignal = signal<NxAccessControlUser[]>([]);
  @Input()
  get users(): NxAccessControlUser[] {
    return this.usersSignal();
  }
  set users(value: NxAccessControlUser[]) {
    this.usersSignal.set(value ?? []);
  }

  private readonly rolesSignal = signal<NxAccessControlRole[]>([]);
  /** The assignable roles, used both for the role-filter dropdown and the inline reassignment dropdown. */
  @Input()
  get roles(): NxAccessControlRole[] {
    return this.rolesSignal();
  }
  set roles(value: NxAccessControlRole[]) {
    this.rolesSignal.set(value ?? []);
  }

  @Output() roleChanged = new EventEmitter<NxAccessControlRoleChangedEvent>();
  @Output() statusChanged = new EventEmitter<NxAccessControlStatusChangedEvent>();

  searchText = signal('');
  roleFilter = signal('');

  readonly filteredUsers = computed<NxAccessControlUser[]>(() => {
    const term = this.searchText().trim().toLowerCase();
    const roleFilter = this.roleFilter();
    return this.users.filter((user) => {
      const matchesTerm =
        !term || user.name.toLowerCase().includes(term) || user.email.toLowerCase().includes(term);
      const matchesRole = !roleFilter || user.role === roleFilter;
      return matchesTerm && matchesRole;
    });
  });

  roleLabel(value: string): string {
    return this.roles.find((role) => role.value === value)?.label ?? value;
  }

  roleVariant(value: string): string {
    const index = this.roles.findIndex((role) => role.value === value);
    return ROLE_PALETTE[index >= 0 ? index % ROLE_PALETTE.length : 0];
  }

  onRoleSelect(user: NxAccessControlUser, newRole: string): void {
    if (!newRole || newRole === user.role) {
      return;
    }
    this.usersSignal.update((list) => list.map((u) => (u.id === user.id ? { ...u, role: newRole } : u)));
    this.roleChanged.emit({ userId: user.id, newRole });
  }

  onStatusToggle(user: NxAccessControlUser, active: boolean): void {
    const newStatus: 'active' | 'suspended' = active ? 'active' : 'suspended';
    if (newStatus === user.status) {
      return;
    }
    this.usersSignal.update((list) => list.map((u) => (u.id === user.id ? { ...u, status: newStatus } : u)));
    this.statusChanged.emit({ userId: user.id, newStatus });
  }
}
