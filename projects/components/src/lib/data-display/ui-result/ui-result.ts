import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NxIcon } from '../ui-icon';

export type NxResultStatus = 'success' | 'error' | 'warning' | 'info';

const DEFAULT_ICONS: Record<NxResultStatus, string> = {
  success: 'nx-check-circle',
  error: 'nx-x-circle',
  warning: 'nx-alert-triangle',
  info: 'nx-info-circle',
};

@Component({
  selector: 'nx-result',
  standalone: true,
  imports: [NxIcon],
  templateUrl: './ui-result.html',
  styleUrl: './ui-result.scss',
})
export class NxResult {
  @Input() status: NxResultStatus = 'info';
  /** An `nx-icon` name. Defaults to a status-appropriate icon (check-circle, x-circle, alert-triangle, or info-circle). */
  @Input() icon = '';
  @Input() title = '';
  @Input() description = '';
  /** Label for the built-in primary action button. Omit to render no button. */
  @Input() actionLabel = '';

  @Output() actionClick = new EventEmitter<void>();

  get resolvedIcon(): string {
    return this.icon || DEFAULT_ICONS[this.status];
  }
}
