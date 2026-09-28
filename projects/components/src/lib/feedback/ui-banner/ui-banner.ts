import { Component, EventEmitter, Input, Output, booleanAttribute } from '@angular/core';
import { NxIcon } from '../../data-display/ui-icon';

export type NxBannerVariant = 'info' | 'success' | 'warning' | 'danger';

const DEFAULT_ICONS: Record<NxBannerVariant, string> = {
  info: 'nx-info-circle',
  success: 'nx-check-circle',
  warning: 'nx-alert-triangle',
  danger: 'nx-x-circle',
};

/**
 * A full-width, dismissible announcement strip - for a page-level notice
 * ("scheduled maintenance", "your trial ends in 3 days", "changes saved")
 * rather than a message tied to one section, which is what `nx-alert`'s
 * inline card is for.
 */
@Component({
  selector: 'nx-banner',
  standalone: true,
  imports: [NxIcon],
  templateUrl: './ui-banner.html',
  styleUrl: './ui-banner.scss',
})
export class NxBanner {
  @Input() variant: NxBannerVariant = 'info';
  @Input() message = '';
  @Input() icon = '';
  @Input() actionLabel = '';
  @Input({ transform: booleanAttribute }) dismissible = true;
  @Input({ transform: booleanAttribute }) open = true;

  @Output() openChange = new EventEmitter<boolean>();
  @Output() actionClick = new EventEmitter<void>();
  @Output() dismissed = new EventEmitter<void>();

  get resolvedIcon(): string {
    return this.icon || DEFAULT_ICONS[this.variant];
  }

  dismiss(): void {
    if (!this.open) {
      return;
    }
    this.open = false;
    this.openChange.emit(false);
    this.dismissed.emit();
  }
}
