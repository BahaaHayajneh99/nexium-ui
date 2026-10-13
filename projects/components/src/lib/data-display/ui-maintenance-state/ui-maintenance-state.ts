import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NxResult } from '../ui-result';
import { NxProLocked } from '../../licensing/ui-pro-locked/ui-pro-locked';
import { nxProLicenseGranted } from '../../licensing/nx-license';

/**
 * A preset of `nx-result` for "temporarily unavailable" full-page states -
 * sensible maintenance-window defaults, all overridable.
 */
@Component({
  selector: 'nx-maintenance-state',
  standalone: true,
  imports: [NxResult, NxProLocked],
  template: `
    @if (licensed()) {
      <nx-result
        status="warning"
        [icon]="icon"
        [title]="title"
        [description]="description"
        [actionLabel]="actionLabel"
        (actionClick)="actionClick.emit()">
      </nx-result>
    } @else {
      <nx-pro-locked componentName="Maintenance State"></nx-pro-locked>
    }
  `,
})
export class NxMaintenanceState {
  protected readonly licensed = nxProLicenseGranted();

  @Input() icon = 'nx-settings';
  @Input() title = "We'll be back soon";
  @Input() description = "We're performing scheduled maintenance. Please check back shortly.";
  @Input() actionLabel = '';

  @Output() actionClick = new EventEmitter<void>();
}
