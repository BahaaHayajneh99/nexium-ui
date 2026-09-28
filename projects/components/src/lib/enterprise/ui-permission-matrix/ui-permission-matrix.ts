import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NxProLocked } from '../../licensing/ui-pro-locked/ui-pro-locked';
import { nxProLicenseGranted } from '../../licensing/nx-license';

export type NxPermissionMatrixValue = Record<string, Record<string, boolean>>;

/** A role x permission grid - toggle individual cells, or an entire row/column at once. */
@Component({
  selector: 'nx-permission-matrix',
  standalone: true,
  imports: [NxProLocked],
  templateUrl: './ui-permission-matrix.html',
  styleUrl: './ui-permission-matrix.scss',
})
export class NxPermissionMatrix {
  protected readonly licensed = nxProLicenseGranted();

  @Input() roles: string[] = [];
  @Input() permissions: string[] = [];
  @Input() value: NxPermissionMatrixValue = {};

  @Output() valueChange = new EventEmitter<NxPermissionMatrixValue>();

  isGranted(role: string, permission: string): boolean {
    return !!this.value[role]?.[permission];
  }

  toggleCell(role: string, permission: string): void {
    const nextRole = { ...this.value[role], [permission]: !this.isGranted(role, permission) };
    this.emit({ ...this.value, [role]: nextRole });
  }

  isRowFullyGranted(role: string): boolean {
    return this.permissions.every((permission) => this.isGranted(role, permission));
  }

  toggleRow(role: string): void {
    const grantAll = !this.isRowFullyGranted(role);
    const nextRole: Record<string, boolean> = {};
    for (const permission of this.permissions) {
      nextRole[permission] = grantAll;
    }
    this.emit({ ...this.value, [role]: nextRole });
  }

  isColumnFullyGranted(permission: string): boolean {
    return this.roles.every((role) => this.isGranted(role, permission));
  }

  toggleColumn(permission: string): void {
    const grantAll = !this.isColumnFullyGranted(permission);
    const next: NxPermissionMatrixValue = { ...this.value };
    for (const role of this.roles) {
      next[role] = { ...next[role], [permission]: grantAll };
    }
    this.emit(next);
  }

  private emit(next: NxPermissionMatrixValue): void {
    this.value = next;
    this.valueChange.emit(next);
  }
}
