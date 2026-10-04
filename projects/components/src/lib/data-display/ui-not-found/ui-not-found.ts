import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NxResult } from '../ui-result';

/**
 * A preset of `nx-result` for the "page doesn't exist" full-page state -
 * sensible 404 defaults, all overridable.
 */
@Component({
  selector: 'nx-not-found',
  standalone: true,
  imports: [NxResult],
  template: `
    <nx-result
      status="error"
      [icon]="icon"
      [title]="title"
      [description]="description"
      [actionLabel]="actionLabel"
      (actionClick)="actionClick.emit()">
    </nx-result>
  `,
})
export class NxNotFound {
  @Input() icon = 'nx-search';
  @Input() title = '404 - Page Not Found';
  @Input() description = "The page you're looking for doesn't exist or has been moved.";
  @Input() actionLabel = 'Go back';

  @Output() actionClick = new EventEmitter<void>();
}
