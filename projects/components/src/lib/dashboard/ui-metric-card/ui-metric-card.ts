import { Component, Input, booleanAttribute } from '@angular/core';
import { NxStatistic, NxStatisticDeltaDirection } from '../../data-display/ui-statistic';

/** A bordered card wrapper around `NxStatistic` - the standard single-KPI dashboard tile. */
@Component({
  selector: 'nx-metric-card',
  standalone: true,
  imports: [NxStatistic],
  template: `
    <div class="nx-metric-card">
      <nx-statistic
        [label]="label"
        [value]="value"
        [prefix]="prefix"
        [suffix]="suffix"
        [delta]="delta"
        [direction]="direction"
        [upIsGood]="upIsGood">
      </nx-statistic>
    </div>
  `,
  styles: `
    .nx-metric-card {
      padding: 16px;
      border: 1px solid var(--shell-border);
      border-radius: var(--nx-radius-md, 8px);
      background-color: var(--shell-surface);
    }
  `,
})
export class NxMetricCard {
  @Input() label = '';
  @Input() value: string | number = '';
  @Input() prefix = '';
  @Input() suffix = '';
  @Input() delta = '';
  @Input() direction?: NxStatisticDeltaDirection;
  @Input({ transform: booleanAttribute }) upIsGood = true;
}
