import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NxIcon } from '../ui-icon';

@Component({
  selector: 'nx-empty-state',
  standalone: true,
  imports: [NxIcon],
  templateUrl: './ui-empty-state.html',
  styleUrl: './ui-empty-state.scss',
})
export class NxEmptyState {
  /** An `nx-icon` name shown above the title, e.g. `'nx-search'`. */
  @Input() icon = '';
  @Input() iconSize: number | string = 48;
  @Input() title = '';
  @Input() description = '';
  /** Label for the built-in primary action button. Omit to render no button. */
  @Input() actionLabel = '';

  @Output() actionClick = new EventEmitter<void>();
}
