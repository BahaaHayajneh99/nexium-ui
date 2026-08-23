import { Component, Input, booleanAttribute } from '@angular/core';
import { formatNumber } from '../chart-utils';

@Component({
  selector: 'nx-sparkline',
  standalone: true,
  imports: [],
  templateUrl: './ui-sparkline.html',
  styleUrl: './ui-sparkline.scss',
})
export class NxSparkline {
  @Input() data: number[] = [];
  @Input() color = 'var(--shell-primary)';
  @Input({ transform: booleanAttribute }) showArea = false;
  @Input({ transform: booleanAttribute }) showLastPoint = true;
  @Input() width = 120;
  @Input() height = 32;

  private readonly padding = 3;

  get viewBox(): string {
    return `0 0 ${this.width} ${this.height}`;
  }

  private get minValue(): number {
    return Math.min(...this.data);
  }

  private get maxValue(): number {
    return Math.max(...this.data);
  }

  private get range(): number {
    return this.maxValue - this.minValue || 1;
  }

  private pointX(index: number): number {
    const steps = Math.max(1, this.data.length - 1);
    return this.padding + (index / steps) * (this.width - this.padding * 2);
  }

  private pointY(value: number): number {
    return this.height - this.padding - ((value - this.minValue) / this.range) * (this.height - this.padding * 2);
  }

  get linePath(): string {
    return this.data.map((value, i) => `${i === 0 ? 'M' : 'L'} ${this.pointX(i)} ${this.pointY(value)}`).join(' ');
  }

  get areaPath(): string {
    if (this.data.length === 0) {
      return '';
    }

    const lastX = this.pointX(this.data.length - 1);
    const firstX = this.pointX(0);
    return `${this.linePath} L ${lastX} ${this.height} L ${firstX} ${this.height} Z`;
  }

  get lastPoint(): { x: number; y: number } | null {
    if (!this.showLastPoint || this.data.length === 0) {
      return null;
    }

    const index = this.data.length - 1;
    return { x: this.pointX(index), y: this.pointY(this.data[index]) };
  }

  get trendDirection(): 'up' | 'down' | 'flat' {
    if (this.data.length < 2) {
      return 'flat';
    }

    const delta = this.data[this.data.length - 1] - this.data[0];
    return delta > 0 ? 'up' : delta < 0 ? 'down' : 'flat';
  }

  get ariaLabel(): string {
    if (this.data.length === 0) {
      return 'Sparkline, no data';
    }

    return `Sparkline trend, ${this.trendDirection}, from ${formatNumber(this.data[0])} to ${formatNumber(this.data[this.data.length - 1])}`;
  }
}
