import { Component, Input } from '@angular/core';
import { axisTicks, formatNumber, niceMax, roundedTopRectPath } from '../chart-utils';

/** A single bar in an nx-waterfall-chart - either a floating delta or an absolute "total" that resets the baseline. */
export interface NxWaterfallPoint {
  /** The x-axis label for this bar. */
  label: string;
  /** The delta this bar contributes to the running total (positive or negative). Ignored as a delta when `isTotal` is true - read as the new absolute running total instead. */
  value: number;
  /** Renders as a full bar from zero and resets the running total to `value`, instead of floating between the previous and next running total. Use for a starting/ending total. */
  isTotal?: boolean;
}

type WaterfallKind = 'increase' | 'decrease' | 'total';

interface WaterfallBar {
  point: NxWaterfallPoint;
  index: number;
  kind: WaterfallKind;
  x: number;
  y: number;
  width: number;
  height: number;
  path: string;
  color: string;
  runningTotalBefore: number;
  runningTotalAfter: number;
  labelY: number;
  labelText: string;
}

interface WaterfallConnector {
  x1: number;
  x2: number;
  y: number;
}

@Component({
  selector: 'nx-waterfall-chart',
  standalone: true,
  imports: [],
  templateUrl: './ui-waterfall-chart.html',
  styleUrl: './ui-waterfall-chart.scss',
})
export class NxWaterfallChart {
  @Input() data: NxWaterfallPoint[] = [];
  @Input() height = 320;

  showTable = false;
  hovered: WaterfallBar | null = null;

  private readonly width = 600;
  private readonly marginTop = 16;
  private readonly marginRight = 16;
  private readonly marginBottom = 32;
  private readonly marginLeft = 52;

  get viewBox(): string {
    return `0 0 ${this.width} ${this.height}`;
  }

  get plotWidth(): number {
    return this.width - this.marginLeft - this.marginRight;
  }

  get plotHeight(): number {
    return this.height - this.marginTop - this.marginBottom;
  }

  /** Running total AFTER each point, carried forward cumulatively except where a "total" point resets it to its own absolute value. */
  private get runningTotals(): number[] {
    let running = 0;
    return this.data.map((point) => {
      running = point.isTotal ? point.value : running + point.value;
      return running;
    });
  }

  private get extent(): { min: number; max: number } {
    const totals = [0, ...this.runningTotals];
    return {
      min: Math.min(0, ...totals),
      max: Math.max(0, ...totals),
    };
  }

  get maxValue(): number {
    return niceMax(this.extent.max);
  }

  /** Only dips below zero when the data actually does - keeps the common "all positive" case anchored at a 0 baseline. */
  get minValue(): number {
    return this.extent.min < 0 ? -niceMax(-this.extent.min) : 0;
  }

  get yTicks(): number[] {
    const range = this.maxValue - this.minValue;
    return axisTicks(range).map((t) => t + this.minValue).reverse();
  }

  formatTick(value: number): string {
    return formatNumber(value);
  }

  tickY(value: number): number {
    const range = this.maxValue - this.minValue || 1;
    return this.marginTop + this.plotHeight - ((value - this.minValue) / range) * this.plotHeight;
  }

  get hasNegativeDip(): boolean {
    return this.minValue < 0;
  }

  get bars(): WaterfallBar[] {
    const bandWidth = this.plotWidth / Math.max(1, this.data.length);
    const barWidth = Math.max(1, Math.min(56, bandWidth * 0.6));
    let running = 0;
    const result: WaterfallBar[] = [];

    this.data.forEach((point, index) => {
      const before = running;
      const after = point.isTotal ? point.value : running + point.value;
      running = after;

      const kind: WaterfallKind = point.isTotal ? 'total' : point.value >= 0 ? 'increase' : 'decrease';

      // A total bar always renders as a full bar from zero; a delta bar floats between
      // its pre- and post-delta running totals, whichever of the two is higher/lower.
      const topValue = point.isTotal ? Math.max(0, point.value) : Math.max(before, after);
      const bottomValue = point.isTotal ? Math.min(0, point.value) : Math.min(before, after);

      const y = this.tickY(topValue);
      const barBottom = this.tickY(bottomValue);
      const barHeight = Math.max(1, barBottom - y);
      const x = this.marginLeft + index * bandWidth + (bandWidth - barWidth) / 2;

      result.push({
        point,
        index,
        kind,
        x,
        y,
        width: barWidth,
        height: barHeight,
        path: roundedTopRectPath(x, y, barWidth, barHeight, 3),
        color: this.colorFor(kind),
        runningTotalBefore: before,
        runningTotalAfter: after,
        labelY: y - 8,
        labelText: this.labelFor(point, kind),
      });
    });

    return result;
  }

  /** Dashed connector between each bar's resulting running total and the next bar's starting point - the classic "staircase" waterfall guide line. */
  get connectors(): WaterfallConnector[] {
    const bars = this.bars;
    const result: WaterfallConnector[] = [];

    for (let i = 0; i < bars.length - 1; i++) {
      const current = bars[i];
      const next = bars[i + 1];
      result.push({
        x1: current.x + current.width,
        x2: next.x,
        y: this.tickY(current.runningTotalAfter),
      });
    }

    return result;
  }

  get legendItems(): { kind: WaterfallKind; label: string; color: string }[] {
    const present = new Set(this.bars.map((bar) => bar.kind));
    const all: { kind: WaterfallKind; label: string; color: string }[] = [
      { kind: 'increase', label: 'Increase', color: this.colorFor('increase') },
      { kind: 'decrease', label: 'Decrease', color: this.colorFor('decrease') },
      { kind: 'total', label: 'Total', color: this.colorFor('total') },
    ];

    return all.filter((item) => present.has(item.kind));
  }

  categoryLabelX(index: number): number {
    const bandWidth = this.plotWidth / Math.max(1, this.data.length);
    return this.marginLeft + index * bandWidth + bandWidth / 2;
  }

  colorFor(kind: WaterfallKind): string {
    switch (kind) {
      case 'increase':
        return 'var(--chart-good)';
      case 'decrease':
        return 'var(--chart-critical)';
      case 'total':
        return 'var(--chart-series-1)';
    }
  }

  private labelFor(point: NxWaterfallPoint, kind: WaterfallKind): string {
    if (kind === 'total') {
      return formatNumber(point.value);
    }

    const sign = point.value >= 0 ? '+' : '-';
    return `${sign}${formatNumber(Math.abs(point.value))}`;
  }

  onBarEnter(bar: WaterfallBar): void {
    this.hovered = bar;
  }

  onBarLeave(): void {
    this.hovered = null;
  }

  get hoveredTooltipStyle(): Record<string, string> {
    if (!this.hovered) {
      return {};
    }

    return {
      left: `${((this.hovered.x + this.hovered.width / 2) / this.width) * 100}%`,
      top: `${(this.hovered.y / this.height) * 100}%`,
    };
  }

  toggleTable(): void {
    this.showTable = !this.showTable;
  }
}
