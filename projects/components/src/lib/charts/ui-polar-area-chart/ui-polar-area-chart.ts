import { Component, Input } from '@angular/core';
import { formatNumber, seriesColor } from '../chart-utils';

export interface NxPolarAreaDatum {
  label: string;
  value: number;
  color?: string;
}

interface PolarWedge {
  datum: NxPolarAreaDatum;
  index: number;
  color: string;
  path: string;
  labelPoint: { x: number; y: number };
}

/**
 * Looks like a pie/rose chart but isn't one: every wedge gets an EQUAL angular slice
 * (360deg / N), while each wedge's radius scales with its value relative to the dataset max.
 * Angle alone never carries the data here - only radius does - which is the one defining
 * visual difference from a pie chart (where angle varies and radius is constant).
 */
@Component({
  selector: 'nx-polar-area-chart',
  standalone: true,
  imports: [],
  templateUrl: './ui-polar-area-chart.html',
  styleUrl: './ui-polar-area-chart.scss',
})
export class NxPolarAreaChart {
  @Input() data: NxPolarAreaDatum[] = [];

  showTable = false;
  hoveredIndex: number | null = null;

  private readonly cx = 150;
  private readonly cy = 150;
  private readonly outerR = 110;

  get viewBox(): string {
    return '0 0 300 300';
  }

  get maxValue(): number {
    return Math.max(1, ...this.data.map((d) => d.value));
  }

  /** Radius fractions for the reference gridline circles (25/50/75/100%). */
  get gridRadii(): number[] {
    return [0.25, 0.5, 0.75, 1].map((fraction) => this.outerR * fraction);
  }

  get gridLabels(): { radius: number; text: string }[] {
    return [0.25, 0.5, 0.75, 1].map((fraction) => ({
      radius: this.outerR * fraction,
      text: `${Math.round(fraction * 100)}%`,
    }));
  }

  get wedges(): PolarWedge[] {
    const n = this.data.length;
    if (n === 0) {
      return [];
    }

    const sliceAngle = (Math.PI * 2) / n;
    const startOffset = -Math.PI / 2;

    return this.data.map((datum, index) => {
      const start = startOffset + index * sliceAngle;
      const end = start + sliceAngle;
      const radius = Math.max(2, (datum.value / this.maxValue) * this.outerR);
      const midAngle = (start + end) / 2;

      return {
        datum,
        index,
        color: seriesColor(datum.color, index),
        path: this.wedgePath(start, end, radius),
        labelPoint: this.polar(Math.min(radius, this.outerR) * 0.6 + 14, midAngle),
      };
    });
  }

  get hasLegend(): boolean {
    return this.data.length > 0;
  }

  get hoveredWedge(): PolarWedge | null {
    return this.hoveredIndex !== null ? this.wedges[this.hoveredIndex] ?? null : null;
  }

  private polar(radius: number, angle: number): { x: number; y: number } {
    return { x: this.cx + radius * Math.cos(angle), y: this.cy + radius * Math.sin(angle) };
  }

  private wedgePath(start: number, end: number, radius: number): string {
    const outerStart = this.polar(radius, start);
    const outerEnd = this.polar(radius, end);
    const largeArc = end - start > Math.PI ? 1 : 0;

    return `M ${this.cx} ${this.cy} L ${outerStart.x} ${outerStart.y} A ${radius} ${radius} 0 ${largeArc} 1 ${outerEnd.x} ${outerEnd.y} Z`;
  }

  onWedgeEnter(index: number): void {
    this.hoveredIndex = index;
  }

  onWedgeLeave(): void {
    this.hoveredIndex = null;
  }

  formatValue(value: number): string {
    return formatNumber(value);
  }

  get tooltipStyle(): Record<string, string> {
    const wedge = this.hoveredWedge;
    if (!wedge) {
      return {};
    }

    return {
      left: `${(wedge.labelPoint.x / 300) * 100}%`,
      top: `${(wedge.labelPoint.y / 300) * 100}%`,
    };
  }

  toggleTable(): void {
    this.showTable = !this.showTable;
  }
}
