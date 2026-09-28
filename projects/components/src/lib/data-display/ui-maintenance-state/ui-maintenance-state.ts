import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NxResult } from '../ui-result';

/**
 * A preset of `nx-result` for "temporarily unavailable" full-page states -
 * sensible maintenance-window defaults, all overridable.
 */
@Component({
  selector: 'nx-maintenance-state',
  standalone: true,
  imports: [NxResult],
  template: `
    <nx-result
      status="warning"
      [icon]="icon"
      [title]="title"
      [description]="description"
      [actionLabel]="actionLabel"
      (actionClick)="actionClick.emit()">
    </nx-result>
  `,
})
export class NxMaintenanceState {
  @Input() icon = 'nx-settings';
  @Input() title = "We'll be back soon";
  @Input() description = "We're performing scheduled maintenance. Please check back shortly.";
  @Input() actionLabel = '';

  @Output() actionClick = new EventEmitter<void>();
}
