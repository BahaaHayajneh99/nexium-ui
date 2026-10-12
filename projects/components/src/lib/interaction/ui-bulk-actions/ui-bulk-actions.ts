import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NxIcon } from '../../data-display/ui-icon';
import { NxProLocked } from '../../licensing/ui-pro-locked/ui-pro-locked';
import { nxProLicenseGranted } from '../../licensing/nx-license';

export interface NxBulkAction {
  key: string;
  label: string;
  icon?: string;
  variant?: 'default' | 'danger';
  disabled?: boolean;
}

/**
 * A floating pill-shaped bar that surfaces once one or more rows are selected in a
 * table, grid, or list elsewhere on the page - it shows the current selection count
 * plus a row of host-defined action buttons (Delete, Archive, Export, Tag, Move, ...)
 * and a "clear selection" control. This is a generic, presentational pairing for any
 * list/table/grid: it does not know about or own the selection itself, it only
 * displays `selectedCount` and emits `actionClick`/`clear` so the host page can act on
 * its own selected-items array.
 *
 * Visibility: there is deliberately no separate `visible` input. The bar derives its
 * shown/hidden state directly from `selectedCount > 0`, so "0 selected" and "bar
 * hidden" can never drift out of sync, and the host only ever has to bind
 * `[selectedCount]`. The bar stays mounted in the DOM at all times (rather than being
 * added/removed with `@if`) specifically so that `selectedCount` crossing zero in
 * either direction animates smoothly - see `.nx-bulk-actions-bar` in the stylesheet.
 */
@Component({
  selector: 'nx-bulk-actions',
  standalone: true,
  imports: [NxIcon, NxProLocked],
  templateUrl: './ui-bulk-actions.html',
  styleUrl: './ui-bulk-actions.scss',
})
export class NxBulkActions {
  protected readonly licensed = nxProLicenseGranted();

  /** How many items are currently selected elsewhere in the app. */
  @Input() selectedCount = 0;
  /** The action buttons to render - fully consumer-defined, never hardcoded. */
  @Input() actions: NxBulkAction[] = [];

  /** Emits the clicked action's `key`. */
  @Output() actionClick = new EventEmitter<string>();
  /** Emits when "Clear selection" is clicked. */
  @Output() clear = new EventEmitter<void>();

  get isVisible(): boolean {
    return this.selectedCount > 0;
  }

  get selectionLabel(): string {
    return `${this.selectedCount} selected`;
  }

  onActionClick(action: NxBulkAction): void {
    if (action.disabled) {
      return;
    }
    this.actionClick.emit(action.key);
  }

  onClear(): void {
    this.clear.emit();
  }
}
