import { Component, computed, inject, signal } from '@angular/core';
import { CommonService } from '../services/common.service';
import { NxBulkActions, NxBulkAction } from 'components';
import { DemoSection } from '../shared/demo-section/demo-section';

interface DemoRow {
  id: number;
  name: string;
  email: string;
  role: string;
}

@Component({
  selector: 'app-ui-bulk-actions-demo',
  imports: [NxBulkActions, DemoSection],
  templateUrl: './ui-bulk-actions-demo.html',
  styleUrl: './ui-bulk-actions-demo.scss',
})
export class UiBulkActionsDemo {
  importCode = `import { NxBulkActions } from 'nexium-ui';`;

  public commonService = inject(CommonService);

  rows: DemoRow[] = [
    { id: 1, name: 'Priya Patel', email: 'priya@example.com', role: 'Admin' },
    { id: 2, name: 'Ahmed Al-Masri', email: 'ahmed@example.com', role: 'Editor' },
    { id: 3, name: 'Bahaa Hayajneh', email: 'bahaa@example.com', role: 'Owner' },
    { id: 4, name: 'Lina Gomez', email: 'lina@example.com', role: 'Viewer' },
    { id: 5, name: 'Noah Kim', email: 'noah@example.com', role: 'Editor' },
  ];

  // The host page owns the selection - NxBulkActions never reads or mutates this set
  // itself, it only ever receives `selectedCount` and emits `actionClick` / `clear`.
  selectedIds = signal<Set<number>>(new Set());
  selectedCount = computed(() => this.selectedIds().size);

  /** Transient confirmation banner shown after an action runs - a stand-in for a real toast. */
  lastMessage = signal('');
  private messageTimeout: ReturnType<typeof setTimeout> | null = null;

  actions: NxBulkAction[] = [
    { key: 'delete', label: 'Delete', icon: 'nx-trash', variant: 'danger' },
    { key: 'archive', label: 'Archive', icon: 'nx-folder' },
    { key: 'export', label: 'Export', icon: 'nx-download' },
  ];

  isSelected(id: number): boolean {
    return this.selectedIds().has(id);
  }

  toggleRow(id: number): void {
    this.selectedIds.update((current) => {
      const next = new Set(current);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  }

  allSelected(): boolean {
    return this.rows.length > 0 && this.selectedIds().size === this.rows.length;
  }

  toggleAll(): void {
    this.selectedIds.set(this.allSelected() ? new Set() : new Set(this.rows.map((row) => row.id)));
  }

  onActionClick(key: string): void {
    const names = this.rows
      .filter((row) => this.selectedIds().has(row.id))
      .map((row) => row.name)
      .join(', ');

    console.log(`[ui-bulk-actions-demo] action "${key}" on:`, names);

    const action = this.actions.find((candidate) => candidate.key === key);
    this.showMessage(`${action?.label ?? key} applied to ${this.selectedCount()} item(s): ${names}`);

    // In a real app the action would call a service and then clear the selection
    // once it succeeds - the demo does the same for delete/archive, since those rows
    // conceptually leave the list, but leaves the selection intact for export.
    if (key === 'delete' || key === 'archive') {
      this.selectedIds.set(new Set());
    }
  }

  onClear(): void {
    this.selectedIds.set(new Set());
    this.showMessage('Selection cleared.');
  }

  private showMessage(message: string): void {
    this.lastMessage.set(message);
    if (this.messageTimeout) {
      clearTimeout(this.messageTimeout);
    }
    this.messageTimeout = setTimeout(() => this.lastMessage.set(''), 3000);
  }

  basicCode = `<nx-bulk-actions
    [selectedCount]="selectedIds().size"
    [actions]="actions"
    (actionClick)="onActionClick($event)"
    (clear)="onClear()">
</nx-bulk-actions>`;

  basicTs = `actions: NxBulkAction[] = [
  { key: 'delete', label: 'Delete', icon: 'nx-trash', variant: 'danger' },
  { key: 'archive', label: 'Archive', icon: 'nx-folder' },
  { key: 'export', label: 'Export', icon: 'nx-download' },
];

onActionClick(key: string): void {
  // key is whichever action's button was clicked - look it up in the selected rows
  // and act on them (call an API, then clear the selection, etc).
}

onClear(): void {
  // "Clear selection" was clicked - reset the host's own selection state.
}`;
}
