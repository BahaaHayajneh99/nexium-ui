import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NxResult } from '../ui-result';
import { NxProLocked } from '../../licensing/ui-pro-locked/ui-pro-locked';
import { nxProLicenseGranted } from '../../licensing/nx-license';

/**
 * A preset of `nx-result` for the "you can't view this" full-page state -
 * sensible 403 defaults, all overridable.
 */
@Component({
  selector: 'nx-permission-denied',
  standalone: true,
  imports: [NxResult, NxProLocked],
  template: `
    @if (licensed()) {
      <nx-result
        status="error"
        [icon]="icon"
        [title]="title"
        [description]="description"
        [actionLabel]="actionLabel"
        (actionClick)="actionClick.emit()">
      </nx-result>
    } @else {
      <nx-pro-locked componentName="Permission Denied"></nx-pro-locked>
    }
  `,
})
export class NxPermissionDenied {
  protected readonly licensed = nxProLicenseGranted();

  @Input() icon = 'nx-lock';
  @Input() title = '403 - Access Denied';
  @Input() description = "You don't have permission to view this page.";
  @Input() actionLabel = 'Go back';

  @Output() actionClick = new EventEmitter<void>();
}
