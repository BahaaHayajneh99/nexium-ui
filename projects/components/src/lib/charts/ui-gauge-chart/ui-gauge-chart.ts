import { Component, Input } from '@angular/core';
import { formatNumber } from '../chart-utils';

export interface NxGaugeBand {
  /** Upper bound of this band, in data units (the first band starts at `min`). */
  to: number;
  variant: 'success' | 'warning' | 'danger' | 'info';
  label?: string;
}

interface BandArc {
  path: string;
  color: string;
  label: string;
  from: number;
  to: number;
}

const BAND_COLORS: Record<NxGaugeBand['variant'], string> = {
  success: 'var(--success-color)',
  warning: 'var(--warning-color)',
  danger: 'var(--danger-color)',
  info: 'var(--info-color)',
};

@Component({
  selector: 'nx-gauge-chart',
  standalone: true,
  imports: [],
  templateUrl: './ui-gauge-chart.html',
  styleUrl: './ui-gauge-chart.scss',
})
export class NxGaugeChart {
  @Input() value = 0;
  @Input() min = 0;
  @Input() max = 100;
  @Input() label = '';
  @Input() valueSuffix = '';
  @Input() bands: NxGaugeBand[] = [];

  private readonly cx = 150;
  private readonly cy = 150;
  private readonly radius = 112;
  private readonly trackWidth = 22;

  get viewBox(): string {
    return '0 0 300 200';
  }

  private get range(): number {
    return Math.max(1e-6, this.max - this.min);
  }

  private angleFor(value: number): number {
    const fraction = Math.max(0, Math.min(1, (value - this.min) / this.range));
    return Math.PI + fraction * Math.PI;
  }

  private polar(radius: number, angle: number): { x: number; y: number } {
    return { x: this.cx + radius * Math.cos(angle), y: this.cy + radius * Math.sin(angle) };
  }

  private arcPath(startAngle: number, endAngle: number): string {
    const start = this.polar(this.radius, startAngle);
    const end = this.polar(this.radius, endAngle);
    const largeArc = endAngle - startAngle > Math.PI ? 1 : 0;
    return `M ${start.x} ${start.y} A ${this.radius} ${this.radius} 0 ${largeArc} 1 ${end.x} ${end.y}`;
  }

  get trackStrokeWidth(): number {
    return this.trackWidth;
  }

  get bandArcs(): BandArc[] {
    const list: NxGaugeBand[] = this.bands.length > 0 ? this.bands : [{ to: this.max, variant: 'info' }];
    let from = this.min;

    return list.map((band) => {
      const arc: BandArc = {
        path: this.arcPath(this.angleFor(from), this.angleFor(band.to)),
        color: BAND_COLORS[band.variant],
        label: band.label ?? band.variant.charAt(0).toUpperCase() + band.variant.slice(1),
        from,
        to: band.to,
      };
      from = band.to;
      return arc;
    });
  }

  get hasBandLegend(): boolean {
    return this.bands.length > 1;
  }

  get needlePath(): string {
    const angle = this.angleFor(this.value);
    const tip = this.polar(this.radius - this.trackWidth / 2 - 8, angle);
    const b1 = this.polar(8, angle + Math.PI / 2);
    const b2 = this.polar(8, angle - Math.PI / 2);
    return `M ${b1.x} ${b1.y} L ${tip.x} ${tip.y} L ${b2.x} ${b2.y} Z`;
  }

  get minLabelPoint(): { x: number; y: number } {
    return this.polar(this.radius + 16, Math.PI);
  }

  get maxLabelPoint(): { x: number; y: number } {
    return this.polar(this.radius + 16, 2 * Math.PI);
  }

  formatValue(value: number): string {
    return `${formatNumber(value)}${this.valueSuffix}`;
  }

  bandRangeLabel(band: BandArc): string {
    return `${formatNumber(band.from)}–${formatNumber(band.to)}${this.valueSuffix}`;
  }
}
