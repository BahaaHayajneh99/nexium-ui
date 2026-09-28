import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NxIcon } from '../../data-display/ui-icon';

export interface NxCommandBarItem {
  id: string | number;
  label: string;
  icon?: string;
  disabled?: boolean;
}

export interface NxCommandBarGroup {
  items: NxCommandBarItem[];
}

/** A horizontal, grouped toolbar of commands - e.g. a document/editor action bar. */
@Component({
  selector: 'nx-command-bar',
  standalone: true,
  imports: [NxIcon],
  templateUrl: './ui-command-bar.html',
  styleUrl: './ui-command-bar.scss',
})
export class NxCommandBar {
  @Input() groups: NxCommandBarGroup[] = [];

  @Output() commandClick = new EventEmitter<string | number>();

  select(item: NxCommandBarItem): void {
    if (item.disabled) {
      return;
    }
    this.commandClick.emit(item.id);
  }
}
