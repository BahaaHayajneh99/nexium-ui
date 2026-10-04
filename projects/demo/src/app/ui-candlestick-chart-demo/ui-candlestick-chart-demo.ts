import { Component, inject } from '@angular/core';
import { CommonService } from '../services/common.service';
import { NxCandlestickChart, NxCandle } from 'components';
import { DemoSection } from '../shared/demo-section/demo-section';

/** A simple seeded PRNG so the "random" walk below is reproducible across renders instead of reshuffling on every change detection. */
function mulberry32(seed: number): () => number {
  let a = seed;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function generateCandles(days: number, startPrice: number, seed: number): NxCandle[] {
  const random = mulberry32(seed);
  const candles: NxCandle[] = [];
  let close = startPrice;
  const start = new Date('2026-01-05T00:00:00Z');

  for (let i = 0; i < days; i++) {
    const open = close;
    const delta = (random() - 0.5) * (startPrice * 0.04);
    close = Math.max(1, open + delta);
    const high = Math.max(open, close) + random() * (startPrice * 0.015);
    const low = Math.max(0.5, Math.min(open, close) - random() * (startPrice * 0.015));

    const date = new Date(start);
    date.setDate(date.getDate() + i);

    candles.push({
      date: date.toISOString().slice(0, 10),
      open: Math.round(open * 100) / 100,
      high: Math.round(high * 100) / 100,
      low: Math.round(low * 100) / 100,
      close: Math.round(close * 100) / 100,
    });
  }

  return candles;
}

@Component({
  selector: 'app-ui-candlestick-chart-demo',
  imports: [NxCandlestickChart, DemoSection],
  templateUrl: './ui-candlestick-chart-demo.html',
  styleUrl: './ui-candlestick-chart-demo.scss',
})
export class UiCandlestickChartDemo {
  importCode = `import { NxCandlestickChart } from 'nexium-ui';`;

  public commonService = inject(CommonService);

  // Clearly-synthetic data generated with a seeded random walk - not a real ticker or live feed.
  monthSeries = generateCandles(24, 128, 1337);
  quarterSeries = generateCandles(30, 54, 9001);

  basicCode = `<nx-candlestick-chart [data]="monthSeries"></nx-candlestick-chart>`;

  basicTs = `// 24 synthetic trading days, generated with a seeded random walk (not a real ticker/feed)
monthSeries: NxCandle[] = [
  { date: '2026-01-05', open: 128.0, high: 130.4, low: 126.8, close: 129.1 },
  { date: '2026-01-06', open: 129.1, high: 131.9, low: 128.3, close: 130.7 },
  // ...
];`;

  longCode = `<nx-candlestick-chart [data]="quarterSeries"></nx-candlestick-chart>`;

  longTs = `// With more candles than fit legibly, only every Nth date label is shown along the x-axis.
quarterSeries: NxCandle[] = generateCandles(30, 54, 9001);`;
}
