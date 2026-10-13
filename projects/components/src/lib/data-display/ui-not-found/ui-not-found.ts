import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NxResult } from '../ui-result';
import { NxProLocked } from '../../licensing/ui-pro-locked/ui-pro-locked';
import { nxProLicenseGranted } from '../../licensing/nx-license';

/**
 * A preset of `nx-result` for the "page doesn't exist" full-page state -
 * sensible 404 defaults, all overridable.
 */
@Component({
  selector: 'nx-not-found',
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
      <nx-pro-locked componentName="Not Found"></nx-pro-locked>
    }
  `,
})
export class NxNotFound {
  protected readonly licensed = nxProLicenseGranted();

  @Input() icon = 'nx-search';
  @Input() title = '404 - Page Not Found';
  @Input() description = "The page you're looking for doesn't exist or has been moved.";
  @Input() actionLabel = 'Go back';

  @Output() actionClick = new EventEmitter<void>();
}
