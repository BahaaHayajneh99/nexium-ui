import { Component, EventEmitter, Input, Output, ViewEncapsulation } from '@angular/core';
import { NxIcon } from '../../data-display/ui-icon';

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
  imports: [NxIcon],
  templateUrl: './ui-menu.html',
  styleUrl: './ui-menu.scss',
  // Unencapsulated so consumers can reuse .nx-menu/.nx-menu-item/.nx-menu-item-icon
  // on their own markup projected into nx-dropdown-menu's [nx-dropdown-content] slot -
  // emulated encapsulation can't reach content that isn't rendered by this component.
  encapsulation: ViewEncapsulation.None,
})
export class NxMenu {
  @Input() items: NxMenuItem[] = [];

  @Output() itemSelect = new EventEmitter<NxMenuItem>();

  onSelect(item: NxMenuItem): void {
    if (item.disabled || item.divider) {
      return;
    }
    this.itemSelect.emit(item);
  }
}
