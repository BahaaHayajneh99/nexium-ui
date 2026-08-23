import { Component, Input } from '@angular/core';
import { axisTicks, formatNumber, niceMax, seriesColor } from '../chart-utils';
import { NxScatterSeries } from '../chart-types';

interface ScatterPoint {
  seriesIndex: number;
  pointIndex: number;
  x: number;
  y: number;
  dataX: number;
  dataY: number;
  label?: string;
  color: string;
}

@Component({
  selector: 'nx-scatter-chart',
  standalone: true,
  imports: [],
  templateUrl: './ui-scatter-chart.html',
  styleUrl: './ui-scatter-chart.scss',
})
export class NxScatterChart {
  @Input() series: NxScatterSeries[] = [];
  @Input() xLabel = '';
  @Input() yLabel = '';
  @Input() height = 320;

  showTable = false;
  hovered: ScatterPoint | null = null;

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

  get xMax(): number {
    const values = this.series.flatMap((s) => s.data.map((d) => d.x));
    return niceMax(Math.max(0, ...values));
  }

  get yMax(): number {
    const values = this.series.flatMap((s) => s.data.map((d) => d.y));
    return niceMax(Math.max(0, ...values));
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

  get points(): ScatterPoint[] {
    const result: ScatterPoint[] = [];

    this.series.forEach((s, seriesIndex) => {
      s.data.forEach((d, pointIndex) => {
        result.push({
          seriesIndex,
          pointIndex,
          x: this.xAt(d.x),
          y: this.yAt(d.y),
          dataX: d.x,
          dataY: d.y,
          label: d.label,
          color: seriesColor(s.color, seriesIndex),
        });
      });
    });

    return result;
  }

  seriesColorAt(s: NxScatterSeries, index: number): string {
    return seriesColor(s.color, index);
  }

  seriesNameAt(seriesIndex: number): string {
    return this.series[seriesIndex]?.name ?? '';
  }

  onPointEnter(point: ScatterPoint): void {
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
