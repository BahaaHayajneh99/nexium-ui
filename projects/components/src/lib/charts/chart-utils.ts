/**
 * Shared, non-public helpers for the nx-*-chart components. Not part of the
 * published API surface - each chart imports what it needs by relative path.
 */

/** Rounds a value up to a "nice" axis maximum (1/2/5/10 x 10^n). */
export function niceMax(value: number): number {
  if (value <= 0) {
    return 1;
  }

  const exponent = Math.floor(Math.log10(value));
  const fraction = value / Math.pow(10, exponent);

  let niceFraction: number;
  if (fraction <= 1) {
    niceFraction = 1;
  } else if (fraction <= 2) {
    niceFraction = 2;
  } else if (fraction <= 5) {
    niceFraction = 5;
  } else {
    niceFraction = 10;
  }

  return niceFraction * Math.pow(10, exponent);
}

/** Evenly spaced tick values from 0 to `max` (inclusive), `count` intervals. */
export function axisTicks(max: number, count = 4): number[] {
  return Array.from({ length: count + 1 }, (_, i) => (max / count) * i);
}

export function formatNumber(value: number): string {
  return Math.round(value * 100) / 100 === Math.round(value)
    ? Math.round(value).toLocaleString()
    : value.toLocaleString(undefined, { maximumFractionDigits: 2 });
}

/** An SVG path for a rectangle rounded only at the top two corners, square at the baseline. */
export function roundedTopRectPath(x: number, y: number, width: number, height: number, radius: number): string {
  const r = Math.max(0, Math.min(radius, height, width / 2));

  if (r === 0) {
    return `M ${x} ${y + height} L ${x} ${y} L ${x + width} ${y} L ${x + width} ${y + height} Z`;
  }

  return [
    `M ${x} ${y + height}`,
    `L ${x} ${y + r}`,
    `Q ${x} ${y} ${x + r} ${y}`,
    `L ${x + width - r} ${y}`,
    `Q ${x + width} ${y} ${x + width} ${y + r}`,
    `L ${x + width} ${y + height}`,
    'Z',
  ].join(' ');
}

/** The 8-slot validated categorical palette, referenced via CSS custom properties so it follows the light/dark theme. */
export const CHART_SERIES_COLOR_VARS = [
  'var(--chart-series-1)',
  'var(--chart-series-2)',
  'var(--chart-series-3)',
  'var(--chart-series-4)',
  'var(--chart-series-5)',
  'var(--chart-series-6)',
  'var(--chart-series-7)',
  'var(--chart-series-8)',
];

export function seriesColor(explicit: string | undefined, index: number): string {
  return explicit ?? CHART_SERIES_COLOR_VARS[index % CHART_SERIES_COLOR_VARS.length];
}
