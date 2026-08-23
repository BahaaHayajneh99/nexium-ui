import { Component, Input } from '@angular/core';
import { axisTicks, formatNumber, niceMax, seriesColor } from '../chart-utils';
import { NxChartSeries } from '../chart-types';

interface RadarPoint {
  seriesIndex: number;
  axisIndex: number;
  x: number;
  y: number;
  value: number;
  color: string;
}

@Component({
  selector: 'nx-radar-chart',
  standalone: true,
  imports: [],
  templateUrl: './ui-radar-chart.html',
  styleUrl: './ui-radar-chart.scss',
})
export class NxRadarChart {
  @Input() categories: string[] = [];
  @Input() series: NxChartSeries[] = [];

  showTable = false;
  hovered: RadarPoint | null = null;

  private readonly cx = 150;
  private readonly cy = 150;
  private readonly outerR = 96;

  get viewBox(): string {
    return '0 0 300 300';
  }

  get maxValue(): number {
    const values = this.series.flatMap((s) => s.data);
    return niceMax(Math.max(0, ...values));
  }

  get ringLevels(): number[] {
    return axisTicks(this.maxValue).filter((level) => level > 0);
  }

  formatTick(value: number): string {
    return formatNumber(value);
  }

  get hasLegend(): boolean {
    return this.series.length > 1;
  }

  private angleAt(axisIndex: number): number {
    const count = Math.max(1, this.categories.length);
    return -Math.PI / 2 + (axisIndex * 2 * Math.PI) / count;
  }

  private polar(radius: number, angle: number): { x: number; y: number } {
    return { x: this.cx + radius * Math.cos(angle), y: this.cy + radius * Math.sin(angle) };
  }

  ringPath(level: number): string {
    return this.categories
      .map((_, i) => {
        const p = this.polar((level / this.maxValue) * this.outerR, this.angleAt(i));
        return `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`;
      })
      .concat('Z')
      .join(' ');
  }

  spokePoint(axisIndex: number): { x: number; y: number } {
    return this.polar(this.outerR, this.angleAt(axisIndex));
  }

  labelPoint(axisIndex: number): { x: number; y: number } {
    return this.polar(this.outerR + 20, this.angleAt(axisIndex));
  }

  labelAnchor(axisIndex: number): string {
    const cos = Math.cos(this.angleAt(axisIndex));
    if (cos > 0.3) {
      return 'start';
    }
    if (cos < -0.3) {
      return 'end';
    }
    return 'middle';
  }

  seriesPath(s: NxChartSeries): string {
    return this.categories
      .map((_, i) => {
        const value = s.data[i] ?? 0;
        const p = this.polar((value / this.maxValue) * this.outerR, this.angleAt(i));
        return `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`;
      })
      .concat('Z')
      .join(' ');
  }

  points(s: NxChartSeries, seriesIndex: number): RadarPoint[] {
    return this.categories.map((_, axisIndex) => {
      const value = s.data[axisIndex] ?? 0;
      const p = this.polar((value / this.maxValue) * this.outerR, this.angleAt(axisIndex));
      return { seriesIndex, axisIndex, x: p.x, y: p.y, value, color: seriesColor(s.color, seriesIndex) };
    });
  }

  seriesColorAt(s: NxChartSeries, index: number): string {
    return seriesColor(s.color, index);
  }

  seriesNameAt(seriesIndex: number): string {
    return this.series[seriesIndex]?.name ?? '';
  }

  onPointEnter(point: RadarPoint): void {
    this.hovered = point;
  }

  onPointLeave(): void {
    this.hovered = null;
  }

  formatValue(value: number): string {
    return formatNumber(value);
  }

  get tooltipStyle(): Record<string, string> {
    if (!this.hovered) {
      return {};
    }

    return {
      left: `${(this.hovered.x / 300) * 100}%`,
      top: `${(this.hovered.y / 300) * 100}%`,
    };
  }

  toggleTable(): void {
    this.showTable = !this.showTable;
  }
}
