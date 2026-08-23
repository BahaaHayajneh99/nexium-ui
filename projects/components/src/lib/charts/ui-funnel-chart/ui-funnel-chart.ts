import { Component, Input } from '@angular/core';
import { formatNumber, seriesColor } from '../chart-utils';

export interface NxFunnelStage {
  label: string;
  value: number;
  color?: string;
}

interface FunnelBar {
  stage: NxFunnelStage;
  index: number;
  path: string;
  color: string;
  percentOfFirst: number;
  labelY: number;
}

@Component({
  selector: 'nx-funnel-chart',
  standalone: true,
  imports: [],
  templateUrl: './ui-funnel-chart.html',
  styleUrl: './ui-funnel-chart.scss',
})
export class NxFunnelChart {
  @Input() stages: NxFunnelStage[] = [];
  @Input() height = 320;

  showTable = false;
  hoveredIndex: number | null = null;

  private readonly width = 600;
  private readonly marginTop = 12;
  private readonly marginBottom = 12;
  private readonly gap = 3;
  private readonly plotLeft = 40;
  private readonly plotRight = 280;
  readonly labelX = 300;

  get viewBox(): string {
    return `0 0 ${this.width} ${this.height}`;
  }

  private get maxValue(): number {
    return Math.max(1, ...this.stages.map((s) => s.value));
  }

  private get rowHeight(): number {
    const plotHeight = this.height - this.marginTop - this.marginBottom;
    return plotHeight / Math.max(1, this.stages.length);
  }

  private halfWidthFor(value: number): number {
    const fullWidth = this.plotRight - this.plotLeft;
    return (value / this.maxValue) * (fullWidth / 2);
  }

  get bars(): FunnelBar[] {
    const cx = this.plotLeft + (this.plotRight - this.plotLeft) / 2;

    return this.stages.map((stage, index) => {
      const y0 = this.marginTop + index * this.rowHeight + this.gap / 2;
      const y1 = this.marginTop + (index + 1) * this.rowHeight - this.gap / 2;

      const topHalf = this.halfWidthFor(stage.value);
      const nextValue = this.stages[index + 1]?.value ?? stage.value * 0.82;
      const bottomHalf = this.halfWidthFor(nextValue);

      const path = [
        `M ${cx - topHalf} ${y0}`,
        `L ${cx + topHalf} ${y0}`,
        `L ${cx + bottomHalf} ${y1}`,
        `L ${cx - bottomHalf} ${y1}`,
        'Z',
      ].join(' ');

      return {
        stage,
        index,
        path,
        color: seriesColor(stage.color, index),
        percentOfFirst: this.stages[0]?.value ? (stage.value / this.stages[0].value) * 100 : 0,
        labelY: (y0 + y1) / 2,
      };
    });
  }

  onBarEnter(index: number): void {
    this.hoveredIndex = index;
  }

  onBarLeave(): void {
    this.hoveredIndex = null;
  }

  formatValue(value: number): string {
    return formatNumber(value);
  }

  formatPercent(value: number): string {
    return `${Math.round(value * 10) / 10}%`;
  }

  toggleTable(): void {
    this.showTable = !this.showTable;
  }
}
