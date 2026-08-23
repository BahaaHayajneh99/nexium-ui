import { Component, Input } from '@angular/core';
import { formatNumber, seriesColor } from '../chart-utils';

export interface NxPieDatum {
  label: string;
  value: number;
  color?: string;
}

interface PieSlice {
  datum: NxPieDatum;
  index: number;
  percent: number;
  color: string;
  path: string;
  labelPoint: { x: number; y: number };
}

@Component({
  selector: 'nx-pie-chart',
  standalone: true,
  imports: [],
  templateUrl: './ui-pie-chart.html',
  styleUrl: './ui-pie-chart.scss',
})
export class NxPieChart {
  @Input() data: NxPieDatum[] = [];
  /** 0 for a full pie; e.g. 0.6 for a donut. Clamped to [0, 0.9]. */
  @Input() innerRadius = 0;

  showTable = false;
  hoveredIndex: number | null = null;

  private readonly cx = 150;
  private readonly cy = 150;
  private readonly outerR = 110;

  get viewBox(): string {
    return '0 0 300 300';
  }

  private get innerR(): number {
    return this.outerR * Math.max(0, Math.min(0.9, this.innerRadius));
  }

  get total(): number {
    return this.data.reduce((sum, d) => sum + d.value, 0);
  }

  get hasLegend(): boolean {
    return this.data.length > 1;
  }

  get isDonut(): boolean {
    return this.innerR > 0;
  }

  get slices(): PieSlice[] {
    let cursor = -Math.PI / 2;
    const total = this.total;

    return this.data.map((datum, index) => {
      const fraction = total > 0 ? datum.value / total : 0;
      const angle = fraction * Math.PI * 2;
      const start = cursor;
      const end = Math.min(cursor + angle, start + Math.PI * 2 - 0.0001);
      cursor += angle;

      const midR = (this.outerR + this.innerR) / 2;
      const midAngle = (start + end) / 2;

      return {
        datum,
        index,
        percent: fraction * 100,
        color: seriesColor(datum.color, index),
        path: this.slicePath(start, end),
        labelPoint: this.polar(midR, midAngle),
      };
    });
  }

  get hoveredSlice(): PieSlice | null {
    return this.hoveredIndex !== null ? this.slices[this.hoveredIndex] ?? null : null;
  }

  private polar(radius: number, angle: number): { x: number; y: number } {
    return { x: this.cx + radius * Math.cos(angle), y: this.cy + radius * Math.sin(angle) };
  }

  private slicePath(start: number, end: number): string {
    const outerStart = this.polar(this.outerR, start);
    const outerEnd = this.polar(this.outerR, end);
    const largeArc = end - start > Math.PI ? 1 : 0;

    if (this.innerR <= 0) {
      return `M ${this.cx} ${this.cy} L ${outerStart.x} ${outerStart.y} A ${this.outerR} ${this.outerR} 0 ${largeArc} 1 ${outerEnd.x} ${outerEnd.y} Z`;
    }

    const innerStart = this.polar(this.innerR, start);
    const innerEnd = this.polar(this.innerR, end);

    return [
      `M ${outerStart.x} ${outerStart.y}`,
      `A ${this.outerR} ${this.outerR} 0 ${largeArc} 1 ${outerEnd.x} ${outerEnd.y}`,
      `L ${innerEnd.x} ${innerEnd.y}`,
      `A ${this.innerR} ${this.innerR} 0 ${largeArc} 0 ${innerStart.x} ${innerStart.y}`,
      'Z',
    ].join(' ');
  }

  onSliceEnter(index: number): void {
    this.hoveredIndex = index;
  }

  onSliceLeave(): void {
    this.hoveredIndex = null;
  }

  formatValue(value: number): string {
    return formatNumber(value);
  }

  formatPercent(value: number): string {
    return `${Math.round(value * 10) / 10}%`;
  }

  get tooltipStyle(): Record<string, string> {
    const slice = this.hoveredSlice;
    if (!slice) {
      return {};
    }

    return {
      left: `${(slice.labelPoint.x / 300) * 100}%`,
      top: `${(slice.labelPoint.y / 300) * 100}%`,
    };
  }

  toggleTable(): void {
    this.showTable = !this.showTable;
  }
}
