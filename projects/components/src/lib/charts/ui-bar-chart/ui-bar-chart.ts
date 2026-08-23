import { Component, Input } from '@angular/core';
import { axisTicks, formatNumber, niceMax, roundedTopRectPath, seriesColor } from '../chart-utils';
import { NxChartSeries } from '../chart-types';

interface BarGeometry {
  categoryIndex: number;
  seriesIndex: number;
  x: number;
  y: number;
  width: number;
  height: number;
  path: string;
  color: string;
  value: number;
}

@Component({
  selector: 'nx-bar-chart',
  standalone: true,
  imports: [],
  templateUrl: './ui-bar-chart.html',
  styleUrl: './ui-bar-chart.scss',
})
export class NxBarChart {
  @Input() categories: string[] = [];
  @Input() series: NxChartSeries[] = [];
  @Input() height = 320;
  /** Stacks series within each category band instead of grouping them side by side. */
  @Input() stacked = false;

  showTable = false;
  hovered: BarGeometry | null = null;

  private readonly width = 600;
  private readonly marginTop = 16;
  private readonly marginRight = 16;
  private readonly marginBottom = 32;
  private readonly marginLeft = 44;

  get viewBox(): string {
    return `0 0 ${this.width} ${this.height}`;
  }

  get plotWidth(): number {
    return this.width - this.marginLeft - this.marginRight;
  }

  get plotHeight(): number {
    return this.height - this.marginTop - this.marginBottom;
  }

  get maxValue(): number {
    if (this.stacked) {
      const totals = this.categories.map((_, categoryIndex) =>
        this.series.reduce((sum, s) => sum + (s.data[categoryIndex] ?? 0), 0),
      );
      return niceMax(Math.max(0, ...totals));
    }

    const values = this.series.flatMap((s) => s.data);
    return niceMax(Math.max(0, ...values));
  }

  get yTicks(): number[] {
    return axisTicks(this.maxValue).reverse();
  }

  formatTick(value: number): string {
    return formatNumber(value);
  }

  get bars(): BarGeometry[] {
    const bandWidth = this.plotWidth / Math.max(1, this.categories.length);
    const result: BarGeometry[] = [];

    if (this.stacked) {
      const barWidth = Math.max(1, Math.min(48, bandWidth * 0.6));

      this.categories.forEach((_, categoryIndex) => {
        const x = this.marginLeft + categoryIndex * bandWidth + (bandWidth - barWidth) / 2;
        let stackedTop = this.marginTop + this.plotHeight;

        this.series.forEach((s, seriesIndex) => {
          const value = s.data[categoryIndex] ?? 0;
          const barHeight = (value / this.maxValue) * this.plotHeight;
          const y = stackedTop - barHeight;
          const isTopSegment = seriesIndex === this.series.length - 1;

          result.push({
            categoryIndex,
            seriesIndex,
            x,
            y,
            width: barWidth,
            height: barHeight,
            path: isTopSegment
              ? roundedTopRectPath(x, y, barWidth, barHeight, 4)
              : `M ${x} ${y + barHeight} L ${x} ${y} L ${x + barWidth} ${y} L ${x + barWidth} ${y + barHeight} Z`,
            color: seriesColor(s.color, seriesIndex),
            value,
          });

          stackedTop = y;
        });
      });

      return result;
    }

    const groupWidth = bandWidth * 0.7;
    const gap = 2;
    const rawBarWidth = (groupWidth - gap * (this.series.length - 1)) / Math.max(1, this.series.length);
    const barWidth = Math.max(1, Math.min(24, rawBarWidth));
    const actualGroupWidth = barWidth * this.series.length + gap * (this.series.length - 1);

    this.categories.forEach((_, categoryIndex) => {
      const groupStart = this.marginLeft + categoryIndex * bandWidth + (bandWidth - actualGroupWidth) / 2;

      this.series.forEach((s, seriesIndex) => {
        const value = s.data[categoryIndex] ?? 0;
        const barHeight = (value / this.maxValue) * this.plotHeight;
        const x = groupStart + seriesIndex * (barWidth + gap);
        const y = this.marginTop + this.plotHeight - barHeight;

        result.push({
          categoryIndex,
          seriesIndex,
          x,
          y,
          width: barWidth,
          height: barHeight,
          path: roundedTopRectPath(x, y, barWidth, barHeight, 4),
          color: seriesColor(s.color, seriesIndex),
          value,
        });
      });
    });

    return result;
  }

  get hasLegend(): boolean {
    return this.series.length > 1;
  }

  categoryLabelX(categoryIndex: number): number {
    const bandWidth = this.plotWidth / Math.max(1, this.categories.length);
    return this.marginLeft + categoryIndex * bandWidth + bandWidth / 2;
  }

  tickY(value: number): number {
    return this.marginTop + this.plotHeight - (value / this.maxValue) * this.plotHeight;
  }

  onBarEnter(bar: BarGeometry): void {
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
      left: `${(this.hovered.x + this.hovered.width / 2) / this.width * 100}%`,
      top: `${this.hovered.y / this.height * 100}%`,
    };
  }

  toggleTable(): void {
    this.showTable = !this.showTable;
  }

  swatchColor(s: NxChartSeries, index: number): string {
    return seriesColor(s.color, index);
  }
}
