import { Component, Input, booleanAttribute } from '@angular/core';
import { NxSpinnerComponent } from '../../data-display/ui-spinner';

/**
 * Wraps its projected content and, while `loading` is true, covers it with a
 * spinner + optional message and blocks interaction - the "block a section
 * while an async call is in flight" pattern. Set `fullscreen` to cover the
 * whole viewport instead of just the wrapped container.
 */
@Component({
  selector: 'nx-loading-overlay',
  standalone: true,
  imports: [NxSpinnerComponent],
  templateUrl: './ui-loading-overlay.html',
  styleUrl: './ui-loading-overlay.scss',
})
export class NxLoadingOverlay {
  @Input({ transform: booleanAttribute }) loading = false;
  @Input({ transform: booleanAttribute }) fullscreen = false;
  @Input({ transform: booleanAttribute }) blur = true;
  @Input() message = '';
  @Input() spinnerVariant:
    | 'primary'
    | 'secondary'
    | 'success'
    | 'danger'
    | 'warning'
    | 'info'
    | 'dark'
    | 'light' = 'primary';
}
