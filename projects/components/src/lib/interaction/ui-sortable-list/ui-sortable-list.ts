import { Component, EventEmitter, Input, Output, signal } from '@angular/core';
import { NxIcon } from '../../data-display/ui-icon';
import { NxProLocked } from '../../licensing/ui-pro-locked/ui-pro-locked';
import { nxProLicenseGranted } from '../../licensing/nx-license';

export interface NxSortableItem {
  id: string | number;
  label: string;
}

/** A single reorderable list - drag rows by their grip handle to change order. */
@Component({
  selector: 'nx-sortable-list',
  standalone: true,
  imports: [NxIcon, NxProLocked],
  templateUrl: './ui-sortable-list.html',
  styleUrl: './ui-sortable-list.scss',
})
export class NxSortableList {
  protected readonly licensed = nxProLicenseGranted();

  @Input() items: NxSortableItem[] = [];

  @Output() itemsChange = new EventEmitter<NxSortableItem[]>();
  @Output() reordered = new EventEmitter<NxSortableItem[]>();

  dragOverIndex = signal<number | null>(null);

  private draggedIndex: number | null = null;

  onDragStart(index: number, event: DragEvent): void {
    this.draggedIndex = index;
    event.dataTransfer?.setData('text/plain', String(index));
    if (event.dataTransfer) {
      event.dataTransfer.effectAllowed = 'move';
    }
  }

  onDragOver(index: number, event: DragEvent): void {
    event.preventDefault();
    this.dragOverIndex.set(index);
  }

  onDrop(index: number, event: DragEvent): void {
    event.preventDefault();
    this.dragOverIndex.set(null);
    if (this.draggedIndex === null || this.draggedIndex === index) {
      this.draggedIndex = null;
      return;
    }

    const next = [...this.items];
    const [moved] = next.splice(this.draggedIndex, 1);
    next.splice(index, 0, moved);

    this.items = next;
    this.itemsChange.emit(next);
    this.reordered.emit(next);
    this.draggedIndex = null;
  }

  onDragEnd(): void {
    this.draggedIndex = null;
    this.dragOverIndex.set(null);
  }
}
