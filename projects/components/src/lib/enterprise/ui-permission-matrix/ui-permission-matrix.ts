import { Component, EventEmitter, Input, Output, computed, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NxIcon } from '../../data-display/ui-icon';
import { NxProLocked } from '../../licensing/ui-pro-locked/ui-pro-locked';
import { nxProLicenseGranted } from '../../licensing/nx-license';

export type NxPermissionMatrixValue = Record<string, Record<string, boolean>>;

export interface NxPermissionGroup {
  label: string;
  permissions: string[];
}

interface NxPermissionMatrixExport {
  roles: string[];
  permissions: string[];
  value: NxPermissionMatrixValue;
  inheritance: Record<string, string>;
}

/**
 * A role x permission grid (roles as columns, permissions as rows) - toggle individual cells, or
 * an entire role/permission at once. Also supports inline role management (add/remove), grouping
 * permission rows under collapsible sections, searching rows, role inheritance (a role can
 * inherit another role's grants, shown distinctly and "promotable" to an explicit grant with a
 * click), and JSON export/import of the whole grid's state.
 */
@Component({
  selector: 'nx-permission-matrix',
  standalone: true,
  imports: [FormsModule, NxIcon, NxProLocked],
  templateUrl: './ui-permission-matrix.html',
  styleUrl: './ui-permission-matrix.scss',
})
export class NxPermissionMatrix {
  protected readonly licensed = nxProLicenseGranted();

  // Every @Input() below that's read inside a `computed()` further down is backed by a signal
  // (not a plain field) - a `computed()` that reads a plain field only "sees" it once and then
  // freezes, never re-running when the parent later rebinds a different roles/permissions/groups
  // array (or when this component mutates its own copy via addRole/removeRole/import, etc).
  private readonly rolesSignal = signal<string[]>([]);
  @Input()
  get roles(): string[] {
    return this.rolesSignal();
  }
  set roles(value: string[]) {
    this.rolesSignal.set(value ?? []);
  }
  @Output() rolesChange = new EventEmitter<string[]>();

  private readonly permissionsSignal = signal<string[]>([]);
  @Input()
  get permissions(): string[] {
    return this.permissionsSignal();
  }
  set permissions(value: string[]) {
    this.permissionsSignal.set(value ?? []);
  }
  @Output() permissionsChange = new EventEmitter<string[]>();

  private readonly valueSignal = signal<NxPermissionMatrixValue>({});
  @Input()
  get value(): NxPermissionMatrixValue {
    return this.valueSignal();
  }
  set value(value: NxPermissionMatrixValue) {
    this.valueSignal.set(value ?? {});
  }
  @Output() valueChange = new EventEmitter<NxPermissionMatrixValue>();

  private readonly permissionGroupsSignal = signal<NxPermissionGroup[] | undefined>(undefined);
  /** When provided, permission rows render grouped under collapsible section headers instead of one flat list. */
  @Input()
  get permissionGroups(): NxPermissionGroup[] | undefined {
    return this.permissionGroupsSignal();
  }
  set permissionGroups(value: NxPermissionGroup[] | undefined) {
    this.permissionGroupsSignal.set(value);
  }

  private readonly inheritanceSignal = signal<Record<string, string>>({});
  /** Maps a role name to the role it inherits grants from. */
  @Input()
  get inheritance(): Record<string, string> {
    return this.inheritanceSignal();
  }
  set inheritance(value: Record<string, string>) {
    this.inheritanceSignal.set(value ?? {});
  }
  @Output() inheritanceChange = new EventEmitter<Record<string, string>>();

  searchText = signal('');
  collapsedGroups = signal<Set<string>>(new Set());
  addingRole = signal(false);
  newRoleDraft = signal('');
  importError = signal<string | null>(null);

  /** Flat (ungrouped) rows, filtered by the search box - used when `permissionGroups` isn't set. */
  readonly flatRows = computed<string[]>(() => {
    const term = this.searchText().trim().toLowerCase();
    return term ? this.permissions.filter((p) => p.toLowerCase().includes(term)) : this.permissions;
  });

  /** Grouped rows filtered by the search box - a group with no matching permissions is dropped entirely. `null` when `permissionGroups` isn't set, so the template falls back to `flatRows`. */
  readonly groupedRows = computed<NxPermissionGroup[] | null>(() => {
    const groups = this.permissionGroups;
    if (!groups?.length) return null;
    const term = this.searchText().trim().toLowerCase();
    if (!term) return groups;
    return groups
      .map((g) => ({ label: g.label, permissions: g.permissions.filter((p) => p.toLowerCase().includes(term)) }))
      .filter((g) => g.permissions.length > 0);
  });

  isGroupCollapsed(label: string): boolean {
    return this.collapsedGroups().has(label);
  }

  toggleGroupCollapse(label: string): void {
    this.collapsedGroups.update((set) => {
      const next = new Set(set);
      next.has(label) ? next.delete(label) : next.add(label);
      return next;
    });
  }

  /** Whether a role has this permission set directly on it, ignoring inheritance. */
  isDirectlyGranted(role: string, permission: string): boolean {
    return !!this.value[role]?.[permission];
  }

  /** Effective grant - direct, or inherited through the (possibly chained) `inheritance` map. `visited` guards against inheritance cycles. */
  isGranted(role: string, permission: string, visited = new Set<string>()): boolean {
    if (this.isDirectlyGranted(role, permission)) return true;
    if (visited.has(role)) return false;
    visited.add(role);
    const from = this.inheritance[role];
    if (from && this.roles.includes(from)) {
      return this.isGranted(from, permission, visited);
    }
    return false;
  }

  /** True only when the grant comes purely from inheritance, not a direct entry - used to render it distinctly. */
  isInheritedGranted(role: string, permission: string): boolean {
    return !this.isDirectlyGranted(role, permission) && this.isGranted(role, permission);
  }

  /** Clicking a cell: an inherited grant first "promotes" to an explicit direct grant rather than
   *  toggling off (so the intuitive next click is the one that actually revokes it). */
  toggleCell(role: string, permission: string): void {
    if (this.isInheritedGranted(role, permission)) {
      this.emitValue({ ...this.value, [role]: { ...this.value[role], [permission]: true } });
      return;
    }
    const nextRole = { ...this.value[role], [permission]: !this.isDirectlyGranted(role, permission) };
    this.emitValue({ ...this.value, [role]: nextRole });
  }

  isRoleFullyGranted(role: string): boolean {
    return this.permissions.every((permission) => this.isGranted(role, permission));
  }

  toggleRoleColumn(role: string): void {
    const grantAll = !this.isRoleFullyGranted(role);
    const nextRole: Record<string, boolean> = {};
    for (const permission of this.permissions) {
      nextRole[permission] = grantAll;
    }
    this.emitValue({ ...this.value, [role]: nextRole });
  }

  isPermissionFullyGranted(permission: string): boolean {
    return this.roles.every((role) => this.isGranted(role, permission));
  }

  togglePermissionRow(permission: string): void {
    const grantAll = !this.isPermissionFullyGranted(permission);
    const next: NxPermissionMatrixValue = { ...this.value };
    for (const role of this.roles) {
      next[role] = { ...next[role], [permission]: grantAll };
    }
    this.emitValue(next);
  }

  rolesExcept(role: string): string[] {
    return this.roles.filter((r) => r !== role);
  }

  setInheritance(role: string, from: string): void {
    const next = { ...this.inheritance };
    if (from) {
      next[role] = from;
    } else {
      delete next[role];
    }
    this.inheritance = next;
    this.inheritanceChange.emit(next);
  }

  startAddRole(): void {
    this.addingRole.set(true);
    this.newRoleDraft.set('');
  }

  cancelAddRole(): void {
    this.addingRole.set(false);
    this.newRoleDraft.set('');
  }

  addRole(): void {
    const name = this.newRoleDraft().trim();
    this.addingRole.set(false);
    if (!name || this.roles.includes(name)) {
      this.newRoleDraft.set('');
      return;
    }
    this.roles = [...this.roles, name];
    this.rolesChange.emit(this.roles);
    this.newRoleDraft.set('');
  }

  removeRole(role: string): void {
    this.roles = this.roles.filter((r) => r !== role);
    this.rolesChange.emit(this.roles);

    const nextValue = { ...this.value };
    delete nextValue[role];
    this.emitValue(nextValue);

    if (role in this.inheritance) {
      const nextInheritance = { ...this.inheritance };
      delete nextInheritance[role];
      this.inheritance = nextInheritance;
      this.inheritanceChange.emit(nextInheritance);
    }
  }

  exportJson(): void {
    const payload: NxPermissionMatrixExport = {
      roles: this.roles,
      permissions: this.permissions,
      value: this.value,
      inheritance: this.inheritance,
    };
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'permission-matrix.json';
    link.click();
    URL.revokeObjectURL(url);
  }

  importJson(fileList: FileList | null): void {
    const file = fileList?.[0];
    if (!file) return;
    this.importError.set(null);

    const reader = new FileReader();
    reader.onload = () => {
      try {
        const parsed = JSON.parse(String(reader.result));
        if (
          !parsed ||
          typeof parsed !== 'object' ||
          !Array.isArray(parsed.roles) ||
          !Array.isArray(parsed.permissions) ||
          typeof parsed.value !== 'object'
        ) {
          throw new Error('Unexpected shape.');
        }

        this.roles = parsed.roles;
        this.rolesChange.emit(this.roles);

        this.permissions = parsed.permissions;
        this.permissionsChange.emit(this.permissions);

        this.emitValue(parsed.value ?? {});

        this.inheritance = parsed.inheritance ?? {};
        this.inheritanceChange.emit(this.inheritance);
      } catch {
        this.importError.set('Could not import file: invalid JSON or unexpected shape.');
      }
    };
    reader.onerror = () => this.importError.set('Could not read file.');
    reader.readAsText(file);
  }

  private emitValue(next: NxPermissionMatrixValue): void {
    this.value = next;
    this.valueChange.emit(next);
  }
}
