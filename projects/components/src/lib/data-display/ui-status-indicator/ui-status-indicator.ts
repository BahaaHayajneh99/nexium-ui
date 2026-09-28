import { Component, Input, booleanAttribute } from '@angular/core';

export type NxStatusIndicatorVariant = 'success' | 'danger' | 'warning' | 'info' | 'neutral';

/**
 * A small colored dot with an optional label - for a one-glance status
 * (online/offline, active/paused, build passing/failing). Set `pulse` for
 * a "live" animated ring, handy for things actively happening right now.
 */
@Component({
  selector: 'nx-status-indicator',
  standalone: true,
  imports: [],
  templateUrl: './ui-status-indicator.html',
  styleUrl: './ui-status-indicator.scss',
})
export class NxStatusIndicator {
  @Input() variant: NxStatusIndicatorVariant = 'neutral';
  @Input() label = '';
  @Input({ transform: booleanAttribute }) pulse = false;
}
