import { Component, Input } from '@angular/core';
import { formatNumber } from '../chart-utils';

interface HeatmapCell {
  rowIndex: number;
  columnIndex: number;
  value: number;
  x: number;
  y: number;
  width: number;
  height: number;
  color: string;
}

@Component({
  selector: 'nx-heatmap-chart',
  standalone: true,
  imports: [],
  templateUrl: './ui-heatmap-chart.html',
  styleUrl: './ui-heatmap-chart.scss',
})
export class NxHeatmapChart {
  @Input() rows: string[] = [];
  @Input() columns: string[] = [];
  /** data[rowIndex][columnIndex] */
  @Input() data: number[][] = [];
  @Input() height = 320;
  @Input() valueSuffix = '';

  showTable = false;
  hovered: HeatmapCell | null = null;

  private readonly width = 600;
  private readonly marginTop = 24;
  private readonly marginRight = 16;
  private readonly marginBottom = 8;
  private readonly marginLeft = 96;

  get viewBox(): string {
    return `0 0 ${this.width} ${this.height}`;
  }

  get plotWidth(): number {
    return this.width - this.marginLeft - this.marginRight;
  }

  get plotHeight(): number {
    return this.height - this.marginTop - this.marginBottom;
  }

  private get flatValues(): number[] {
    return this.data.flat();
  }

  get minValue(): number {
    return Math.min(0, ...this.flatValues);
  }

  get maxValue(): number {
    return Math.max(1, ...this.flatValues);
  }

  private normalize(value: number): number {
    const range = this.maxValue - this.minValue || 1;
    return Math.max(0, Math.min(1, (value - this.minValue) / range));
  }

  cellColor(value: number): string {
    const pct = 12 + this.normalize(value) * 83;
    return `color-mix(in srgb, var(--shell-primary) ${pct.toFixed(1)}%, var(--shell-surface))`;
  }

  get cellWidth(): number {
    return this.plotWidth / Math.max(1, this.columns.length);
  }

  get cellHeight(): number {
    return this.plotHeight / Math.max(1, this.rows.length);
  }

  columnLabelX(columnIndex: number): number {
    return this.marginLeft + columnIndex * this.cellWidth + this.cellWidth / 2;
  }

  rowLabelY(rowIndex: number): number {
    return this.marginTop + rowIndex * this.cellHeight + this.cellHeight / 2 + 4;
  }

  get cells(): HeatmapCell[] {
    const result: HeatmapCell[] = [];

    this.rows.forEach((_, rowIndex) => {
      this.columns.forEach((_, columnIndex) => {
        const value = this.data[rowIndex]?.[columnIndex] ?? 0;
        result.push({
          rowIndex,
          columnIndex,
          value,
          x: this.marginLeft + columnIndex * this.cellWidth,
          y: this.marginTop + rowIndex * this.cellHeight,
          width: this.cellWidth,
          height: this.cellHeight,
          color: this.cellColor(value),
        });
      });
    });

    return result;
  }

  onCellEnter(cell: HeatmapCell): void {
    this.hovered = cell;
  }

  onCellLeave(): void {
    this.hovered = null;
  }

  formatValue(value: number): string {
    return `${formatNumber(value)}${this.valueSuffix}`;
  }

  get tooltipStyle(): Record<string, string> {
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
