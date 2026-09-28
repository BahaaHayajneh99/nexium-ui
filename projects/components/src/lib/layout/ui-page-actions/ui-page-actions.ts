import { Component } from '@angular/core';

/** A right-aligned action toolbar, with separate secondary/primary slots so primary CTAs always render last. */
@Component({
  selector: 'nx-page-actions',
  standalone: true,
  imports: [],
  template: `
    <div class="nx-page-actions">
      <ng-content select="[nxPageActionsSecondary]"></ng-content>
      <ng-content select="[nxPageActionsPrimary]"></ng-content>
      <ng-content></ng-content>
    </div>
  `,
  styles: `
    .nx-page-actions {
      display: flex;
      align-items: center;
      gap: 8px;
      flex-wrap: wrap;
    }
  `,
})
export class NxPageActions {}
