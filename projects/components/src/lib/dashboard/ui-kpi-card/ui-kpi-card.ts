import { Component, Input, numberAttribute } from '@angular/core';

/** A metric card that also shows progress toward a target, e.g. "$42k of $60k". */
@Component({
  selector: 'nx-kpi-card',
  standalone: true,
  imports: [],
  templateUrl: './ui-kpi-card.html',
  styleUrl: './ui-kpi-card.scss',
})
export class NxKpiCard {
  @Input() label = '';
  @Input({ transform: numberAttribute }) value = 0;
  @Input({ transform: numberAttribute }) target = 100;
  @Input() unit = '';

  get percent(): number {
    if (this.target === 0) {
      return 0;
    }
    return Math.min(100, Math.max(0, (this.value / this.target) * 100));
  }

  get roundedPercent(): number {
    return Math.round(this.percent);
  }
}
