import { Component, Input } from '@angular/core';
import { axisTicks, formatNumber, niceMax, roundedTopRectPath, seriesColor } from '../chart-utils';
import { NxMixedSeries } from '../chart-types';

interface MixedBarGeometry {
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
  selector: 'nx-mixed-chart',
  standalone: true,
  imports: [],
  templateUrl: './ui-mixed-chart.html',
  styleUrl: './ui-mixed-chart.scss',
})
export class UiMixedChart {
  @Input() categories: string[] = [];
  @Input() series: NxMixedSeries[] = [];
  @Input() height = 320;

  showTable = false;
  hoveredIndex: number | null = null;

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
    const values = this.series.flatMap((s) => s.data);
    return niceMax(Math.max(0, ...values));
  }

  get yTicks(): number[] {
    return axisTicks(this.maxValue).reverse();
  }

  formatTick(value: number): string {
    return formatNumber(value);
  }

  get hasLegend(): boolean {
    return this.series.length > 1;
  }

  private get barSeries(): NxMixedSeries[] {
    return this.series.filter((s) => s.type === 'bar');
  }

  get lineSeries(): NxMixedSeries[] {
    return this.series.filter((s) => s.type === 'line');
  }

  private get bandWidth(): number {
    return this.plotWidth / Math.max(1, this.categories.length);
  }

  get bars(): MixedBarGeometry[] {
    const barSeries = this.barSeries;
    const bandWidth = this.bandWidth;
    const groupWidth = bandWidth * 0.6;
    const gap = 2;
    const rawBarWidth = (groupWidth - gap * (barSeries.length - 1)) / Math.max(1, barSeries.length);
    const barWidth = Math.max(1, Math.min(28, rawBarWidth));
    const actualGroupWidth = barWidth * barSeries.length + gap * (barSeries.length - 1);

    const result: MixedBarGeometry[] = [];

    this.categories.forEach((_, categoryIndex) => {
      const groupStart = this.marginLeft + categoryIndex * bandWidth + (bandWidth - actualGroupWidth) / 2;

      barSeries.forEach((s, i) => {
        const seriesIndex = this.series.indexOf(s);
        const value = s.data[categoryIndex] ?? 0;
        const barHeight = (value / this.maxValue) * this.plotHeight;
        const x = groupStart + i * (barWidth + gap);
        const y = this.marginTop + this.plotHeight - barHeight;

        result.push({
          categoryIndex,
          seriesIndex,
          x,
          y,
          width: barWidth,
          height: barHeight,
          path: roundedTopRectPath(x, y, barWidth, barHeight, 3),
          color: seriesColor(s.color, seriesIndex),
          value,
        });
      });
    });

    return result;
  }

  pointX(categoryIndex: number): number {
    return this.categories.length > 1
      ? this.marginLeft + categoryIndex * this.bandWidth + this.bandWidth / 2
      : this.marginLeft + this.plotWidth / 2;
  }

  pointY(value: number): number {
    return this.marginTop + this.plotHeight - (value / this.maxValue) * this.plotHeight;
  }

  linePath(s: NxMixedSeries): string {
    return s.data.map((value, i) => `${i === 0 ? 'M' : 'L'} ${this.pointX(i)} ${this.pointY(value)}`).join(' ');
  }

  seriesColorAt(s: NxMixedSeries): string {
    return seriesColor(s.color, this.series.indexOf(s));
  }

  categoryLabelX(categoryIndex: number): number {
    return this.pointX(categoryIndex);
  }

  tickY(value: number): number {
    return this.pointY(value);
  }

  onPointerMove(event: PointerEvent, svgEl: SVGSVGElement): void {
    const rect = svgEl.getBoundingClientRect();
    if (rect.width === 0 || this.categories.length === 0) {
      return;
    }

    const svgX = ((event.clientX - rect.left) / rect.width) * this.width;
    const index = Math.round((svgX - this.marginLeft) / this.bandWidth);
    this.hoveredIndex = Math.max(0, Math.min(this.categories.length - 1, index));
  }

  onPointerLeave(): void {
    this.hoveredIndex = null;
  }

  get tooltipStyle(): Record<string, string> {
    if (this.hoveredIndex === null) {
      return {};
    }

    return {
      left: `${(this.pointX(this.hoveredIndex) / this.width) * 100}%`,
      top: `${(this.marginTop / this.height) * 100}%`,
    };
  }

  toggleTable(): void {
    this.showTable = !this.showTable;
  }
}
