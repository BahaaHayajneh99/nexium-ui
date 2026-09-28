import { Component, Input, signal } from '@angular/core';
import { NxIcon } from '../ui-icon';
import { NxProLocked } from '../../licensing/ui-pro-locked/ui-pro-locked';
import { nxProLicenseGranted } from '../../licensing/nx-license';

export interface NxAuditLogChange {
  field: string;
  before: string;
  after: string;
}

export interface NxAuditLogEntry {
  id: string | number;
  user: string;
  date: string;
  action: string;
  entity: string;
  changes?: NxAuditLogChange[];
}

/** A filterable, expandable audit log table showing per-entry before/after field changes. */
@Component({
  selector: 'nx-audit-log',
  standalone: true,
  imports: [NxIcon, NxProLocked],
  templateUrl: './ui-audit-log.html',
  styleUrl: './ui-audit-log.scss',
})
export class NxAuditLog {
  protected readonly licensed = nxProLicenseGranted();

  @Input() entries: NxAuditLogEntry[] = [];

  searchText = signal('');
  actionFilter = signal('all');

  private expandedIds = signal(new Set<string | number>());

  get actions(): string[] {
    return Array.from(new Set(this.entries.map((entry) => entry.action)));
  }

  get filteredEntries(): NxAuditLogEntry[] {
    const search = this.searchText().trim().toLowerCase();
    const action = this.actionFilter();
    return this.entries.filter((entry) => {
      if (action !== 'all' && entry.action !== action) {
        return false;
      }
      if (!search) {
        return true;
      }
      return (
        entry.user.toLowerCase().includes(search) ||
        entry.entity.toLowerCase().includes(search) ||
        entry.action.toLowerCase().includes(search)
      );
    });
  }

  isExpanded(id: string | number): boolean {
    return this.expandedIds().has(id);
  }

  toggleExpanded(id: string | number): void {
    const next = new Set(this.expandedIds());
    if (next.has(id)) {
      next.delete(id);
    } else {
      next.add(id);
    }
    this.expandedIds.set(next);
  }
}
