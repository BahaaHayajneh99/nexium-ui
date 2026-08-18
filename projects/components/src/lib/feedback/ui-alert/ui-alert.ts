import { booleanAttribute, Component, EventEmitter, Input, Output } from '@angular/core';
import { NgClass } from '@angular/common';
import { UiIcon } from '../../data-display/ui-icon';

export type NxAlertVariant = 'success' | 'danger' | 'warning' | 'info';

const NX_ALERT_ICONS: Record<NxAlertVariant, string> = {
  success: 'nx-check-circle',
  danger: 'nx-x-circle',
  warning: 'nx-alert-triangle',
  info: 'nx-info-circle',
};

@Component({
  selector: 'nx-alert',
  standalone: true,
  imports: [NgClass, UiIcon],
  templateUrl: './ui-alert.html',
  styleUrl: './ui-alert.scss',
})
export class UiAlert {
  @Input() variant: NxAlertVariant = 'info';
  @Input() title = '';
  @Input({ transform: booleanAttribute }) icon = true;
  @Input({ transform: booleanAttribute }) dismissible = false;

  @Output() dismissed = new EventEmitter<void>();

  visible = true;

  get iconName(): string {
    return NX_ALERT_ICONS[this.variant];
  }

  dismiss(): void {
    this.visible = false;
    this.dismissed.emit();
  }
}
