import { Component, Input, computed, signal } from '@angular/core';
import { formatNumber } from '../chart-utils';
import { NxProLocked } from '../../licensing/ui-pro-locked/ui-pro-locked';
import { nxProLicenseGranted } from '../../licensing/nx-license';

export interface NxCandle {
  date: string;
  open: number;
  high: number;
  low: number;
  close: number;
}

interface CandleGeometry {
  index: number;
  date: string;
  open: number;
  high: number;
  low: number;
  close: number;
  wickX: number;
  yHigh: number;
  yLow: number;
  bodyX: number;
  bodyY: number;
  bodyWidth: number;
  bodyHeight: number;
  color: string;
  isUp: boolean;
}

/** An OHLC candlestick chart: a wick from high to low and a filled body from open to close per candle, green when the close is at or above the open, red otherwise. */
@Component({
  selector: 'nx-candlestick-chart',
  standalone: true,
  imports: [NxProLocked],
  templateUrl: './ui-candlestick-chart.html',
  styleUrl: './ui-candlestick-chart.scss',
})
export class NxCandlestickChart {
  protected readonly licensed = nxProLicenseGranted();

  private readonly dataSignal = signal<NxCandle[]>([]);
  @Input()
  get data(): NxCandle[] {
    return this.dataSignal();
  }
  set data(value: NxCandle[]) {
    this.dataSignal.set(value ?? []);
  }

  @Input() height = 360;

  private readonly width = 680;
  private readonly marginTop = 16;
  private readonly marginRight = 16;
  private readonly marginBottom = 36;
  private readonly marginLeft = 56;

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
    const candles = this.dataSignal();
    if (candles.length === 0) {
      return { min: 0, max: 1 };
    }
    const low = Math.min(...candles.map((c) => c.low));
    const high = Math.max(...candles.map((c) => c.high));
    const pad = Math.max(0.01, (high - low) * 0.08);
    return { min: low - pad, max: high + pad };
  }

  get yTicks(): { value: number; y: number }[] {
    const { min, max } = this.domain;
    const count = 4;
    return Array.from({ length: count + 1 }, (_, i) => {
      const value = min + ((max - min) * i) / count;
      return { value, y: this.yFor(value) };
    }).reverse();
  }

  private yFor(value: number): number {
    const { min, max } = this.domain;
    const range = max - min || 1;
    return this.marginTop + this.plotHeight - ((value - min) / range) * this.plotHeight;
  }

  readonly candles = computed<CandleGeometry[]>(() => {
    const data = this.dataSignal();
    if (data.length === 0) {
      return [];
    }

    const bandWidth = this.plotWidth / data.length;
    const bodyWidth = Math.max(2, Math.min(18, bandWidth * 0.6));

    return data.map((candle, index) => {
      const centerX = this.marginLeft + index * bandWidth + bandWidth / 2;
      const isUp = candle.close >= candle.open;
      const color = isUp ? 'var(--shell-success, #27ae60)' : 'var(--nx-color-danger, #e74c3c)';

      const yOpen = this.yFor(candle.open);
      const yClose = this.yFor(candle.close);
      const bodyTop = Math.min(yOpen, yClose);
      const bodyHeight = Math.max(1, Math.abs(yClose - yOpen));

      return {
        index,
        date: candle.date,
        open: candle.open,
        high: candle.high,
        low: candle.low,
        close: candle.close,
        wickX: centerX,
        yHigh: this.yFor(candle.high),
        yLow: this.yFor(candle.low),
        bodyX: centerX - bodyWidth / 2,
        bodyY: bodyTop,
        bodyWidth,
        bodyHeight,
        color,
        isUp,
      };
    });
  });

  get labelStep(): number {
    const count = this.dataSignal().length;
    return count > 10 ? Math.ceil(count / 8) : 1;
  }

  showLabel(index: number): boolean {
    return index % this.labelStep === 0;
  }

  formatTick(value: number): string {
    return formatNumber(value);
  }
}
