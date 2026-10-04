import { Component, Input, numberAttribute } from '@angular/core';

export type NxGoalProgressVariant = 'bar' | 'ring';

/** A progress-toward-a-goal indicator, as a linear bar or a ring gauge. */
@Component({
  selector: 'nx-goal-progress',
  standalone: true,
  imports: [],
  templateUrl: './ui-goal-progress.html',
  styleUrl: './ui-goal-progress.scss',
})
export class NxGoalProgress {
  @Input() label = '';
  @Input({ transform: numberAttribute }) value = 0;
  @Input({ transform: numberAttribute }) goal = 100;
  @Input() variant: NxGoalProgressVariant = 'bar';

  private readonly radius = 40;

  get percent(): number {
    if (this.goal === 0) {
      return 0;
    }
    return Math.min(100, Math.max(0, (this.value / this.goal) * 100));
  }

  get roundedPercent(): number {
    return Math.round(this.percent);
  }

  get circumference(): number {
    return 2 * Math.PI * this.radius;
  }

  get dashOffset(): number {
    return this.circumference * (1 - this.percent / 100);
  }
}
