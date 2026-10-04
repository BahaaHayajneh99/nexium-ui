import { Component, EventEmitter, Input, Output, signal } from '@angular/core';
import { NxProLocked } from '../../licensing/ui-pro-locked/ui-pro-locked';
import { nxProLicenseGranted } from '../../licensing/nx-license';

export type NxColumnManagerPinned = 'left' | 'right' | null;

export interface NxColumnManagerColumn {
  field: string;
  header: string;
  visible: boolean;
  pinned?: NxColumnManagerPinned;
}

/**
 * A standalone column-configuration panel, usable alongside any grid/table - it isn't
 * wired to a specific grid, it just manages a column list (visibility, order, pinning)
 * and emits the updated config via `columnsChange` for the consumer to apply to
 * whatever grid they're using.
 */
@Component({
  selector: 'nx-column-manager',
  standalone: true,
  imports: [NxProLocked],
  templateUrl: './ui-column-manager.html',
  styleUrl: './ui-column-manager.scss',
})
export class NxColumnManager {
  protected readonly licensed = nxProLicenseGranted();

  @Input() columns: NxColumnManagerColumn[] = [];
  @Output() columnsChange = new EventEmitter<NxColumnManagerColumn[]>();

  panelOpen = signal(false);

  private dragField: string | null = null;

  togglePanel(): void {
    this.panelOpen.update((open) => !open);
  }

  closePanel(): void {
    this.panelOpen.set(false);
  }

  toggleVisibility(column: NxColumnManagerColumn): void {
    this.emit(this.columns.map((c) => (c.field === column.field ? { ...c, visible: !c.visible } : c)));
  }

  setPinned(column: NxColumnManagerColumn, pinned: NxColumnManagerPinned): void {
    const next = column.pinned === pinned ? null : pinned;
    this.emit(this.columns.map((c) => (c.field === column.field ? { ...c, pinned: next } : c)));
  }

  onDragStart(column: NxColumnManagerColumn, event: DragEvent): void {
    this.dragField = column.field;
    event.dataTransfer?.setData('text/plain', column.field);
    if (event.dataTransfer) {
      event.dataTransfer.effectAllowed = 'move';
    }
  }

  onDragOver(event: DragEvent): void {
    event.preventDefault();
  }

  onDrop(target: NxColumnManagerColumn, event: DragEvent): void {
    event.preventDefault();
    const draggedField = this.dragField;
    this.dragField = null;
    if (!draggedField || draggedField === target.field) {
      return;
    }
    const next = [...this.columns];
    const fromIndex = next.findIndex((c) => c.field === draggedField);
    const toIndex = next.findIndex((c) => c.field === target.field);
    if (fromIndex === -1 || toIndex === -1) {
      return;
    }
    const [moved] = next.splice(fromIndex, 1);
    next.splice(toIndex, 0, moved);
    this.emit(next);
  }

  private emit(next: NxColumnManagerColumn[]): void {
    this.columns = next;
    this.columnsChange.emit(next);
  }
}
