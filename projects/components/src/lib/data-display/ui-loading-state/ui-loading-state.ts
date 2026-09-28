import { Component, Input } from '@angular/core';
import { NxSpinnerComponent } from '../ui-spinner';

export type NxLoadingStateSpinnerVariant =
  | 'primary'
  | 'secondary'
  | 'success'
  | 'danger'
  | 'warning'
  | 'info'
  | 'dark'
  | 'light';

/**
 * A full-section placeholder for "there's nothing to show yet because it's
 * still loading" - the loading sibling of `nx-empty-state` and `nx-result`,
 * for an initial fetch rather than an already-visible section being
 * refreshed (that's what `nx-loading-overlay` is for).
 */
@Component({
  selector: 'nx-loading-state',
  standalone: true,
  imports: [NxSpinnerComponent],
  templateUrl: './ui-loading-state.html',
  styleUrl: './ui-loading-state.scss',
})
export class NxLoadingState {
  @Input() title = 'Loading...';
  @Input() description = '';
  @Input() spinnerVariant: NxLoadingStateSpinnerVariant = 'primary';
  @Input() spinnerSize: 'small' | 'medium' | 'large' = 'large';
}
