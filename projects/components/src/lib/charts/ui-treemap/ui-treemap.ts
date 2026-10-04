import { Component, EventEmitter, Input, Output, computed, signal } from '@angular/core';
import { formatNumber, seriesColor } from '../chart-utils';
import { NxProLocked } from '../../licensing/ui-pro-locked/ui-pro-locked';
import { nxProLicenseGranted } from '../../licensing/nx-license';

export interface NxTreemapDatum {
  label: string;
  value: number;
  color?: string;
}

interface Rect {
  x: number;
  y: number;
  w: number;
  h: number;
}

interface NxTreemapTile {
  datum: NxTreemapDatum;
  index: number;
  leftPct: number;
  topPct: number;
  widthPct: number;
  heightPct: number;
  color: string;
  textColor: string;
}

/** Worst (least-square) aspect ratio of adding the candidate row, scored against `length` - the fixed side the row is laid out across. Lower is better/more square. */
function worstAspectRatio(row: number[], length: number): number {
  if (row.length === 0) {
    return Infinity;
  }
  const sum = row.reduce((a, b) => a + b, 0);
  const max = Math.max(...row);
  const min = Math.min(...row);
  const lengthSq = length * length;
  const sumSq = sum * sum;
  return Math.max((lengthSq * max) / sumSq, sumSq / (lengthSq * min));
}

/** Lays a completed row of areas into the rectangle, returning the placed rects plus the remaining free rectangle. */
function layoutRow(row: number[], x: number, y: number, w: number, h: number, acrossWidth: boolean): { rects: Rect[]; rest: Rect } {
  const rowSum = row.reduce((a, b) => a + b, 0);
  const rects: Rect[] = [];

  if (acrossWidth) {
    const thickness = w > 0 ? rowSum / w : 0;
    let cursor = x;
    for (const area of row) {
      const itemWidth = thickness > 0 ? area / thickness : 0;
      rects.push({ x: cursor, y, w: itemWidth, h: thickness });
      cursor += itemWidth;
    }
    return { rects, rest: { x, y: y + thickness, w, h: h - thickness } };
  }

  const thickness = h > 0 ? rowSum / h : 0;
  let cursor = y;
  for (const area of row) {
    const itemHeight = thickness > 0 ? area / thickness : 0;
    rects.push({ x, y: cursor, w: thickness, h: itemHeight });
    cursor += itemHeight;
  }
  return { rects, rest: { x: x + thickness, y, w: w - thickness, h } };
}

/** A simplified squarified treemap: greedily grows each row (laid across the container's current shorter side) while doing so keeps tiles closer to square, then cuts the row and recurses into the remaining rectangle. */
function squarify(areas: number[], x: number, y: number, w: number, h: number): Rect[] {
  const result: Rect[] = [];
  let remaining = [...areas];
  let rx = x;
  let ry = y;
  let rw = w;
  let rh = h;

  while (remaining.length > 0) {
    if (rw <= 0 || rh <= 0) {
      remaining.forEach(() => result.push({ x: rx, y: ry, w: 0, h: 0 }));
      break;
    }

    const acrossWidth = rw <= rh;
    const length = acrossWidth ? rw : rh;

    let row: number[] = [];
    let i = 0;
    while (i < remaining.length) {
      const candidate = [...row, remaining[i]];
      if (row.length === 0 || worstAspectRatio(row, length) >= worstAspectRatio(candidate, length)) {
        row = candidate;
        i++;
      } else {
        break;
      }
    }

    const { rects, rest } = layoutRow(row, rx, ry, rw, rh, acrossWidth);
    result.push(...rects);
    remaining = remaining.slice(row.length);
    rx = rest.x;
    ry = rest.y;
    rw = rest.w;
    rh = rest.h;
  }

  return result;
}

function parseRgb(color: string): [number, number, number] | null {
  const hex = /^#([0-9a-f]{3}|[0-9a-f]{6})$/i.exec(color.trim());
  if (hex) {
    let value = hex[1];
    if (value.length === 3) {
      value = value.split('').map((c) => c + c).join('');
    }
    const num = parseInt(value, 16);
    return [(num >> 16) & 255, (num >> 8) & 255, num & 255];
  }
  const rgb = /^rgba?\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)/i.exec(color.trim());
  if (rgb) {
    return [Number(rgb[1]), Number(rgb[2]), Number(rgb[3])];
  }
  return null;
}

/** White text reads fine against the built-in mid-tone chart palette (used when `color` isn't an explicit, parseable rgb/hex - e.g. a `var(--chart-series-n)` reference we can't resolve synchronously). For an explicit color, pick black/white by relative luminance instead. */
function readableTextColor(color: string): string {
  const rgb = parseRgb(color);
  if (!rgb) {
    return '#ffffff';
  }
  const [r, g, b] = rgb;
  const luminance = (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255;
  return luminance > 0.6 ? '#1a1a1a' : '#ffffff';
}

/**
 * A squarified treemap: rectangles sized proportionally to each item's `value` share of the
 * total, laid out to stay close to square (rather than the thin slivers a plain slice-and-dice
 * layout tends to produce once values vary widely).
 */
@Component({
  selector: 'nx-treemap',
  standalone: true,
  imports: [NxProLocked],
  templateUrl: './ui-treemap.html',
  styleUrl: './ui-treemap.scss',
})
export class NxTreemap {
  protected readonly licensed = nxProLicenseGranted();

  private readonly dataSignal = signal<NxTreemapDatum[]>([]);
  @Input()
  get data(): NxTreemapDatum[] {
    return this.dataSignal();
  }
  set data(value: NxTreemapDatum[]) {
    this.dataSignal.set(value ?? []);
  }

  @Input() height = 360;

  @Output() selected = new EventEmitter<{ label: string; value: number }>();

  private readonly width = 640;

  get aspectRatio(): string {
    return `${this.width} / ${this.height}`;
  }

  readonly tiles = computed<NxTreemapTile[]>(() => {
    const data = this.dataSignal();
    if (data.length === 0) {
      return [];
    }

    const total = data.reduce((sum, d) => sum + Math.max(0, d.value), 0) || 1;
    const scale = (this.width * this.height) / total;
    const areas = data.map((d) => Math.max(0, d.value) * scale);
    const rects = squarify(areas, 0, 0, this.width, this.height);

    return data.map((datum, index) => {
      const rect = rects[index] ?? { x: 0, y: 0, w: 0, h: 0 };
      const color = seriesColor(datum.color, index);
      return {
        datum,
        index,
        leftPct: (rect.x / this.width) * 100,
        topPct: (rect.y / this.height) * 100,
        widthPct: (rect.w / this.width) * 100,
        heightPct: (rect.h / this.height) * 100,
        color,
        textColor: readableTextColor(datum.color ?? color),
      };
    });
  });

  select(tile: NxTreemapTile): void {
    this.selected.emit({ label: tile.datum.label, value: tile.datum.value });
  }

  formatValue(value: number): string {
    return formatNumber(value);
  }
}
