import { Component, Input } from '@angular/core';
import { axisTicks, formatNumber, niceMax, seriesColor } from '../chart-utils';
import { NxBubbleSeries } from '../chart-types';

interface BubblePoint {
  seriesIndex: number;
  pointIndex: number;
  x: number;
  y: number;
  r: number;
  dataX: number;
  dataY: number;
  dataSize: number;
  label?: string;
  color: string;
}

const MIN_RADIUS = 6;
const MAX_RADIUS = 32;

@Component({
  selector: 'nx-bubble-chart',
  standalone: true,
  imports: [],
  templateUrl: './ui-bubble-chart.html',
  styleUrl: './ui-bubble-chart.scss',
})
export class UiBubbleChart {
  @Input() series: NxBubbleSeries[] = [];
  @Input() xLabel = '';
  @Input() yLabel = '';
  @Input() sizeLabel = 'Size';
  @Input() height = 340;

  showTable = false;
  hovered: BubblePoint | null = null;

  private readonly width = 600;
  private readonly marginTop = 24;
  private readonly marginRight = 24;
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

  get xMax(): number {
    const values = this.series.flatMap((s) => s.data.map((d) => d.x));
    return niceMax(Math.max(0, ...values));
  }

  get yMax(): number {
    const values = this.series.flatMap((s) => s.data.map((d) => d.y));
    return niceMax(Math.max(0, ...values));
  }

  private get sizeMax(): number {
    const values = this.series.flatMap((s) => s.data.map((d) => d.size));
    return Math.max(1, ...values);
  }

  get xTicks(): number[] {
    return axisTicks(this.xMax);
  }

  get yTicks(): number[] {
    return axisTicks(this.yMax).reverse();
  }

  formatTick(value: number): string {
    return formatNumber(value);
  }

  get hasLegend(): boolean {
    return this.series.length > 1;
  }

  xAt(value: number): number {
    return this.marginLeft + (value / this.xMax) * this.plotWidth;
  }

  yAt(value: number): number {
    return this.marginTop + this.plotHeight - (value / this.yMax) * this.plotHeight;
  }

  private radiusFor(size: number): number {
    const ratio = Math.sqrt(Math.max(0, size) / this.sizeMax);
    return MIN_RADIUS + ratio * (MAX_RADIUS - MIN_RADIUS);
  }

  get points(): BubblePoint[] {
    const result: BubblePoint[] = [];

    this.series.forEach((s, seriesIndex) => {
      s.data.forEach((d, pointIndex) => {
        result.push({
          seriesIndex,
          pointIndex,
          x: this.xAt(d.x),
          y: this.yAt(d.y),
          r: this.radiusFor(d.size),
          dataX: d.x,
          dataY: d.y,
          dataSize: d.size,
          label: d.label,
          color: seriesColor(s.color, seriesIndex),
        });
      });
    });

    // Larger bubbles first, so smaller ones aren't fully hidden underneath.
    return result.sort((a, b) => b.r - a.r);
  }

  seriesColorAt(s: NxBubbleSeries, index: number): string {
    return seriesColor(s.color, index);
  }

  seriesNameAt(seriesIndex: number): string {
    return this.series[seriesIndex]?.name ?? '';
  }

  onPointEnter(point: BubblePoint): void {
    this.hovered = point;
  }

  onPointLeave(): void {
    this.hovered = null;
  }

  get tooltipStyle(): Record<string, string> {
    if (!this.hovered) {
      return {};
    }

    return {
      left: `${(this.hovered.x / this.width) * 100}%`,
      top: `${(this.hovered.y / this.height) * 100}%`,
    };
  }

  toggleTable(): void {
    this.showTable = !this.showTable;
  }
}
