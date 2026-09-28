import { Component, EventEmitter, Input, Output } from '@angular/core';

export interface NxFilterChipOption {
  id: string | number;
  label: string;
  count?: number;
}

/**
 * A row of toggleable filter chips - a multi-select set of active filters,
 * each with an optional result count, plus a "Clear all" affordance once
 * anything is selected.
 */
@Component({
  selector: 'nx-filter-chip-group',
  standalone: true,
  imports: [],
  templateUrl: './ui-filter-chip-group.html',
  styleUrl: './ui-filter-chip-group.scss',
})
export class NxFilterChipGroup {
  @Input() options: NxFilterChipOption[] = [];
  @Input() selectedIds: Array<string | number> = [];
  @Input() clearLabel = 'Clear all';

  @Output() selectedIdsChange = new EventEmitter<Array<string | number>>();

  isSelected(id: string | number): boolean {
    return this.selectedIds.includes(id);
  }

  toggle(id: string | number): void {
    this.selectedIds = this.isSelected(id)
      ? this.selectedIds.filter((selected) => selected !== id)
      : [...this.selectedIds, id];
    this.selectedIdsChange.emit(this.selectedIds);
  }

  clearAll(): void {
    this.selectedIds = [];
    this.selectedIdsChange.emit(this.selectedIds);
  }
}
