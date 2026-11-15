import { Component, Input, computed, numberAttribute, signal } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { formatNumber } from '../chart-utils';
import { NxProLocked } from '../../licensing/ui-pro-locked/ui-pro-locked';
import { nxProLicenseGranted } from '../../licensing/nx-license';

export interface NxBoxPlotDataset {
  label: string;
  min: number;
  q1: number;
  median: number;
  q3: number;
  max: number;
  outliers?: number[];
}

interface BoxGeometry {
  label: string;
  centerX: number;
  boxX: number;
  boxWidth: number;
  yMin: number;
  yQ1: number;
  yMedian: number;
  yQ3: number;
  yMax: number;
  outlierPoints: { x: number; y: number; value: number }[];
}

/** A box-and-whisker chart: per category, a whisker from min to max, a box from Q1 to Q3 with a median line, and small circles for any outliers. */
@Component({
  selector: 'nx-box-plot',
  standalone: true,
  imports: [NxProLocked, NgIf, NgFor],
  templateUrl: './ui-box-plot.html',
  styleUrl: './ui-box-plot.scss',
})
export class NxBoxPlot {
  protected readonly licensed = nxProLicenseGranted();

  private readonly datasetsSignal = signal<NxBoxPlotDataset[]>([]);
  @Input()
  get datasets(): NxBoxPlotDataset[] {
    return this.datasetsSignal();
  }
  set datasets(value: NxBoxPlotDataset[]) {
    this.datasetsSignal.set(value ?? []);
  }

  @Input({ transform: numberAttribute }) height = 300;
  @Input() color = 'var(--shell-primary)';

  private readonly width = 640;
  private readonly marginTop = 16;
  private readonly marginRight = 16;
  private readonly marginBottom = 32;
  private readonly marginLeft = 48;

  get viewBox(): string {
    return `0 0 ${this.width} ${this.height}`;
  }

  private get plotWidth(): number {
    return this.width - this.marginLeft - this.marginRight;
  }

  private get plotHeight(): number {
    return this.height - this.marginTop - this.marginBottom;
  }

  private get domain(): { min: number; max: number } {
    const sets = this.datasetsSignal();
    if (sets.length === 0) {
      return { min: 0, max: 1 };
    }
    const values = sets.flatMap((set) => [set.min, set.max, ...(set.outliers ?? [])]);
    const low = Math.min(...values);
    const high = Math.max(...values);
    const pad = Math.max(0.01, (high - low) * 0.1);
    return { min: low - pad, max: high + pad };
  }

  private yFor(value: number): number {
    const { min, max } = this.domain;
    const range = max - min || 1;
    return this.marginTop + this.plotHeight - ((value - min) / range) * this.plotHeight;
  }

  get yTicks(): { value: number; y: number }[] {
    const { min, max } = this.domain;
    const count = 4;
    return Array.from({ length: count + 1 }, (_, i) => {
      const value = min + ((max - min) * i) / count;
      return { value, y: this.yFor(value) };
    }).reverse();
  }

  readonly boxes = computed<BoxGeometry[]>(() => {
    const sets = this.datasetsSignal();
    if (sets.length === 0) {
      return [];
    }

    const bandWidth = this.plotWidth / sets.length;
    const boxWidth = Math.max(8, Math.min(60, bandWidth * 0.5));

    return sets.map((set, index) => {
      const centerX = this.marginLeft + index * bandWidth + bandWidth / 2;
      return {
        label: set.label,
        centerX,
        boxX: centerX - boxWidth / 2,
        boxWidth,
        yMin: this.yFor(set.min),
        yQ1: this.yFor(set.q1),
        yMedian: this.yFor(set.median),
        yQ3: this.yFor(set.q3),
        yMax: this.yFor(set.max),
        outlierPoints: (set.outliers ?? []).map((value) => ({ x: centerX, y: this.yFor(value), value })),
      };
    });
  });

  formatTick(value: number): string {
    return formatNumber(value);
  }

  trackByTickValue(index: number, tick: { value: number; y: number }): number {
    return tick.value;
  }

  trackByBoxLabel(index: number, box: BoxGeometry): string {
    return box.label;
  }

  trackByOutlierValue(index: number, outlier: { x: number; y: number; value: number }): number {
    return outlier.value;
  }
}
