import { Component, Input, booleanAttribute } from '@angular/core';

export type NxStatisticDeltaDirection = 'up' | 'down' | 'neutral';

@Component({
  selector: 'nx-statistic',
  standalone: true,
  imports: [],
  templateUrl: './ui-statistic.html',
  styleUrl: './ui-statistic.scss',
})
export class NxStatistic {
  @Input() label = '';
  @Input() value: string | number = '';
  @Input() prefix = '';
  @Input() suffix = '';
  /** e.g. '+12.4%' or '-3.2%' - the sign, if present, drives the direction unless direction is set explicitly. */
  @Input() delta = '';
  @Input() direction?: NxStatisticDeltaDirection;
  /** When false (e.g. a churn-rate stat), an "up" delta is treated as bad and colored accordingly. */
  @Input({ transform: booleanAttribute }) upIsGood = true;

  get resolvedDirection(): NxStatisticDeltaDirection {
    if (this.direction) {
      return this.direction;
    }
    if (this.delta.startsWith('+')) {
      return 'up';
    }
    if (this.delta.startsWith('-')) {
      return 'down';
    }
    return 'neutral';
  }

  get deltaClass(): string {
    if (this.resolvedDirection === 'neutral') {
      return 'neutral';
    }
    const isGoodDirection = this.resolvedDirection === 'up' ? this.upIsGood : !this.upIsGood;
    return isGoodDirection ? 'good' : 'bad';
  }
}
