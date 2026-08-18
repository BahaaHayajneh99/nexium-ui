import { Component, EventEmitter, Input, Output } from '@angular/core';
import { UiIcon } from '../../data-display/ui-icon';

export interface NxMenuItem {
  id: string | number;
  label: string;
  icon?: string;
  disabled?: boolean;
  danger?: boolean;
  /** Renders a separator line instead of an actionable row; other fields are ignored. */
  divider?: boolean;
}

@Component({
  selector: 'nx-menu',
  standalone: true,
  imports: [UiIcon],
  templateUrl: './ui-menu.html',
  styleUrl: './ui-menu.scss',
})
export class UiMenu {
  @Input() items: NxMenuItem[] = [];

  @Output() itemSelect = new EventEmitter<NxMenuItem>();

  onSelect(item: NxMenuItem): void {
    if (item.disabled || item.divider) {
      return;
    }
    this.itemSelect.emit(item);
  }
}
