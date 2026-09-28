import { Component, Input, numberAttribute } from '@angular/core';

/** A responsive grid wrapper for laying out `nx-metric-card`/`nx-sparkline-card`/`nx-kpi-card` tiles. */
@Component({
  selector: 'nx-metric-grid',
  standalone: true,
  imports: [],
  template: `
    <div class="nx-metric-grid" [style.grid-template-columns]="'repeat(auto-fit, minmax(' + minColumnWidth + 'px, 1fr))'">
      <ng-content></ng-content>
    </div>
  `,
  styles: `
    .nx-metric-grid {
      display: grid;
      gap: 16px;
    }
  `,
})
export class NxMetricGrid {
  @Input({ transform: numberAttribute }) minColumnWidth = 200;
}
