import { Component, Input, booleanAttribute, numberAttribute } from '@angular/core';

export type NxComparisonDirection = 'up' | 'down' | 'neutral';

/** Compares a current-period value against a previous one, with a trend arrow and percent delta. */
@Component({
  selector: 'nx-comparison-card',
  standalone: true,
  imports: [],
  templateUrl: './ui-comparison-card.html',
  styleUrl: './ui-comparison-card.scss',
})
export class NxComparisonCard {
  @Input() label = '';
  @Input() currentLabel = 'This period';
  @Input() previousLabel = 'Last period';
  @Input({ transform: numberAttribute }) currentValue = 0;
  @Input({ transform: numberAttribute }) previousValue = 0;
  @Input() prefix = '';
  @Input() suffix = '';
  @Input({ transform: booleanAttribute }) upIsGood = true;

  get deltaPercent(): number {
    if (this.previousValue === 0) {
      return 0;
    }
    return ((this.currentValue - this.previousValue) / Math.abs(this.previousValue)) * 100;
  }

  get direction(): NxComparisonDirection {
    if (this.deltaPercent > 0) {
      return 'up';
    }
    if (this.deltaPercent < 0) {
      return 'down';
    }
    return 'neutral';
  }

  get deltaPercentDisplay(): string {
    return Math.abs(this.deltaPercent).toFixed(1);
  }

  get isGoodDirection(): boolean {
    if (this.direction === 'neutral') {
      return true;
    }
    return this.direction === 'up' ? this.upIsGood : !this.upIsGood;
  }
}
