import { Component, Input, OnChanges, OnDestroy, SimpleChanges } from '@angular/core';
import { NxProLocked } from '../../licensing/ui-pro-locked/ui-pro-locked';
import { nxProLicenseGranted } from '../../licensing/nx-license';

export type NxNumberTickerEasing = 'linear' | 'ease-out';

/**
 * Displays a number that smoothly counts up/down from its previous value to a newly bound
 * `value` via `requestAnimationFrame`, instead of just snapping to the new number - distinct
 * from `NxStatistic`, which is a labeled stat card and renders its value as-is. This component
 * is just the counting-animation primitive, reusable anywhere a number updates (a live total, a
 * price, a progress count, ...).
 */
@Component({
  selector: 'nx-number-ticker',
  standalone: true,
  imports: [NxProLocked],
  templateUrl: './ui-number-ticker.html',
  styleUrl: './ui-number-ticker.scss',
})
export class NxNumberTicker implements OnChanges, OnDestroy {
  protected readonly licensed = nxProLicenseGranted();

  @Input() value = 0;
  @Input() duration = 800;
  @Input() decimals = 0;
  @Input() prefix = '';
  @Input() suffix = '';
  @Input() separator = ',';
  @Input() easing: NxNumberTickerEasing = 'ease-out';

  protected displayValue = '0';

  private currentValue = 0;
  private frameId: number | null = null;

  constructor() {
    this.renderValue(this.currentValue);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (!changes['value']) {
      return;
    }
    this.animateTo(this.currentValue, this.value);
  }

  private animateTo(from: number, to: number): void {
    this.cancelAnimation();

    if (this.duration <= 0) {
      this.currentValue = to;
      this.renderValue(to);
      return;
    }

    const startTime = performance.now();
    const delta = to - from;

    const step = (now: number) => {
      const elapsed = now - startTime;
      const linearProgress = Math.min(1, elapsed / this.duration);
      const progress = this.easing === 'ease-out' ? 1 - Math.pow(1 - linearProgress, 3) : linearProgress;

      this.currentValue = from + delta * progress;
      this.renderValue(this.currentValue);

      if (linearProgress < 1) {
        this.frameId = requestAnimationFrame(step);
      } else {
        this.currentValue = to;
        this.renderValue(to);
        this.frameId = null;
      }
    };

    this.frameId = requestAnimationFrame(step);
  }

  private renderValue(num: number): void {
    const fixed = num.toFixed(Math.max(0, this.decimals));
    const [intPart, decimalPart] = fixed.split('.');
    const grouped = this.applySeparator(intPart);
    this.displayValue = `${this.prefix}${grouped}${decimalPart ? '.' + decimalPart : ''}${this.suffix}`;
  }

  private applySeparator(intPart: string): string {
    const negative = intPart.startsWith('-');
    const digits = negative ? intPart.slice(1) : intPart;
    const grouped = digits.replace(/\B(?=(\d{3})+(?!\d))/g, this.separator);
    return negative ? `-${grouped}` : grouped;
  }

  private cancelAnimation(): void {
    if (this.frameId !== null) {
      cancelAnimationFrame(this.frameId);
      this.frameId = null;
    }
  }

  ngOnDestroy(): void {
    this.cancelAnimation();
  }
}
