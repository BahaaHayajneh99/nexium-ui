import { Component, Input } from '@angular/core';
import { axisTicks, formatNumber, niceMax, seriesColor } from '../chart-utils';
import { NxChartSeries } from '../chart-types';

@Component({
  selector: 'nx-area-chart',
  standalone: true,
  imports: [],
  templateUrl: './ui-area-chart.html',
  styleUrl: './ui-area-chart.scss',
})
export class UiAreaChart {
  @Input() categories: string[] = [];
  @Input() series: NxChartSeries[] = [];
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

  private get baselineY(): number {
    return this.marginTop + this.plotHeight;
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

  private get bandWidth(): number {
    const steps = Math.max(1, this.categories.length - 1);
    return this.plotWidth / steps;
  }

  pointX(index: number): number {
    return this.categories.length > 1 ? this.marginLeft + index * this.bandWidth : this.marginLeft + this.plotWidth / 2;
  }

  pointY(value: number): number {
    return this.marginTop + this.plotHeight - (value / this.maxValue) * this.plotHeight;
  }

  linePath(s: NxChartSeries): string {
    return s.data
      .map((value, i) => `${i === 0 ? 'M' : 'L'} ${this.pointX(i)} ${this.pointY(value)}`)
      .join(' ');
  }

  areaPath(s: NxChartSeries): string {
    if (s.data.length === 0) {
      return '';
    }

    const lastIndex = s.data.length - 1;
    return `${this.linePath(s)} L ${this.pointX(lastIndex)} ${this.baselineY} L ${this.pointX(0)} ${this.baselineY} Z`;
  }

  seriesColorAt(s: NxChartSeries, index: number): string {
    return seriesColor(s.color, index);
  }

  categoryLabelX(index: number): number {
    return this.pointX(index);
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
