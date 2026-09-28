import { Component, Input, booleanAttribute } from '@angular/core';

/**
 * Shows its projected content only when `enabled` is true, otherwise shows
 * whatever's projected into the `[nxFeatureFlagFallback]` slot (if
 * anything). A plain named wrapper around what would otherwise be an
 * `@if`/`@else`, useful when the flag check itself is worth naming and
 * reusing consistently across a codebase.
 */
@Component({
  selector: 'nx-feature-flag',
  standalone: true,
  imports: [],
  template: `
    @if (enabled) {
      <ng-content></ng-content>
    } @else {
      <ng-content select="[nxFeatureFlagFallback]"></ng-content>
    }
  `,
})
export class NxFeatureFlag {
  @Input({ transform: booleanAttribute }) enabled = false;
}
