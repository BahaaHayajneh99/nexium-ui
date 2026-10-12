import { Component, EventEmitter, Input, Output, computed, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NxIcon } from '../../data-display/ui-icon';
import { NxProLocked } from '../../licensing/ui-pro-locked/ui-pro-locked';
import { nxProLicenseGranted } from '../../licensing/nx-license';

export interface NxRoleEditorPermission {
  key: string;
  label: string;
}

export interface NxRoleEditorPermissionGroup {
  label: string;
  permissions: NxRoleEditorPermission[];
}

export interface NxRoleEditorSaveEvent {
  name: string;
  description: string;
  permissions: string[];
}

/**
 * A focused edit form for ONE role at a time: name, description, and a flat (ungrouped-grid)
 * checklist of permission toggles grouped under collapsible section headers. This is
 * complementary to `NxPermissionMatrix` (a multi-role grid) and `NxAccessControl` (a user-centric
 * role list) - it edits a single role's own metadata and grants, nothing else.
 */
@Component({
  selector: 'nx-role-editor',
  standalone: true,
  imports: [FormsModule, NxIcon, NxProLocked],
  templateUrl: './ui-role-editor.html',
  styleUrl: './ui-role-editor.scss',
})
export class NxRoleEditor {
  protected readonly licensed = nxProLicenseGranted();

  private readonly roleNameSignal = signal('');
  @Input()
  get roleName(): string {
    return this.roleNameSignal();
  }
  set roleName(value: string) {
    this.roleNameSignal.set(value ?? '');
  }
  @Output() roleNameChange = new EventEmitter<string>();

  private readonly roleDescriptionSignal = signal('');
  @Input()
  get roleDescription(): string {
    return this.roleDescriptionSignal();
  }
  set roleDescription(value: string) {
    this.roleDescriptionSignal.set(value ?? '');
  }
  @Output() roleDescriptionChange = new EventEmitter<string>();

  private readonly permissionGroupsSignal = signal<NxRoleEditorPermissionGroup[]>([]);
  @Input()
  get permissionGroups(): NxRoleEditorPermissionGroup[] {
    return this.permissionGroupsSignal();
  }
  set permissionGroups(value: NxRoleEditorPermissionGroup[]) {
    this.permissionGroupsSignal.set(value ?? []);
  }

  // Normalized to a Set internally regardless of what shape the consumer passed in (Set or
  // array) - every lookup/toggle below only has to deal with one representation.
  private readonly grantedSignal = signal<Set<string>>(new Set());
  @Input()
  get grantedPermissions(): Set<string> | string[] {
    return this.grantedSignal();
  }
  set grantedPermissions(value: Set<string> | string[] | undefined) {
    this.grantedSignal.set(new Set(value ?? []));
  }
  @Output() grantedPermissionsChange = new EventEmitter<Set<string> | string[]>();

  @Output() save = new EventEmitter<NxRoleEditorSaveEvent>();
  @Output() cancel = new EventEmitter<void>();

  collapsedGroups = signal<Set<string>>(new Set());

  readonly grantedCount = computed(() => this.grantedSignal().size);

  readonly totalPermissionCount = computed(() =>
    this.permissionGroups.reduce((sum, group) => sum + group.permissions.length, 0),
  );

  onNameInput(value: string): void {
    this.roleNameSignal.set(value);
    this.roleNameChange.emit(value);
  }

  onDescriptionInput(value: string): void {
    this.roleDescriptionSignal.set(value);
    this.roleDescriptionChange.emit(value);
  }

  isGranted(key: string): boolean {
    return this.grantedSignal().has(key);
  }

  togglePermission(key: string): void {
    const next = new Set(this.grantedSignal());
    if (next.has(key)) {
      next.delete(key);
    } else {
      next.add(key);
    }
    this.emitGranted(next);
  }

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

  groupGrantedCount(group: NxRoleEditorPermissionGroup): number {
    const granted = this.grantedSignal();
    return group.permissions.reduce((count, permission) => count + (granted.has(permission.key) ? 1 : 0), 0);
  }

  isGroupFullyGranted(group: NxRoleEditorPermissionGroup): boolean {
    return group.permissions.length > 0 && this.groupGrantedCount(group) === group.permissions.length;
  }

  /** Clicking the group header's "select all" control grants every permission in the group if any are missing, otherwise clears the whole group. */
  toggleGroup(group: NxRoleEditorPermissionGroup): void {
    const grantAll = !this.isGroupFullyGranted(group);
    const next = new Set(this.grantedSignal());
    for (const permission of group.permissions) {
      grantAll ? next.add(permission.key) : next.delete(permission.key);
    }
    this.emitGranted(next);
  }

  onSave(): void {
    this.save.emit({
      name: this.roleName,
      description: this.roleDescription,
      permissions: Array.from(this.grantedSignal()),
    });
  }

  onCancel(): void {
    this.cancel.emit();
  }

  private emitGranted(next: Set<string>): void {
    this.grantedSignal.set(next);
    this.grantedPermissionsChange.emit(next);
  }
}
