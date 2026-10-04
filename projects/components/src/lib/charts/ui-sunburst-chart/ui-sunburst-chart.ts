import { Component, Input, computed, signal } from '@angular/core';
import { formatNumber, seriesColor } from '../chart-utils';
import { NxProLocked } from '../../licensing/ui-pro-locked/ui-pro-locked';
import { nxProLicenseGranted } from '../../licensing/nx-license';

export interface NxSunburstNode {
  label: string;
  /** Used directly for a leaf (no children). Ignored for a parent - its effective value is the sum of its children's effective values. */
  value?: number;
  color?: string;
  children?: NxSunburstNode[];
}

interface SunburstArc {
  key: string;
  label: string;
  value: number;
  depth: number;
  color: string;
  path: string;
}

const EMPTY_ROOT: NxSunburstNode = { label: '', children: [] };
const CX = 150;
const CY = 150;
const INNER_RADIUS = 36;
const RING_THICKNESS = 26;

function effectiveValue(node: NxSunburstNode): number {
  if (node.children && node.children.length > 0) {
    return node.children.reduce((sum, child) => sum + effectiveValue(child), 0);
  }
  return node.value ?? 0;
}

function polar(radius: number, angle: number): { x: number; y: number } {
  return { x: CX + radius * Math.cos(angle), y: CY + radius * Math.sin(angle) };
}

function arcPath(innerR: number, outerR: number, start: number, end: number): string {
  const largeArc = end - start > Math.PI ? 1 : 0;
  const outerStart = polar(outerR, start);
  const outerEnd = polar(outerR, end);
  const innerStart = polar(innerR, start);
  const innerEnd = polar(innerR, end);

  return [
    `M ${outerStart.x} ${outerStart.y}`,
    `A ${outerR} ${outerR} 0 ${largeArc} 1 ${outerEnd.x} ${outerEnd.y}`,
    `L ${innerEnd.x} ${innerEnd.y}`,
    `A ${innerR} ${innerR} 0 ${largeArc} 0 ${innerStart.x} ${innerStart.y}`,
    'Z',
  ].join(' ');
}

/**
 * Concentric rings of arcs rendering a value hierarchy: the root's direct children form the
 * innermost ring, their children the next ring out, and so on. Within a ring, each node's
 * angular span is proportional to its value as a fraction of its PARENT's total (not the whole
 * circle), and is positioned within its parent's angular range - so the nesting reads visually,
 * not just as N independent full-circle rings.
 */
@Component({
  selector: 'nx-sunburst-chart',
  standalone: true,
  imports: [NxProLocked],
  templateUrl: './ui-sunburst-chart.html',
  styleUrl: './ui-sunburst-chart.scss',
})
export class NxSunburstChart {
  protected readonly licensed = nxProLicenseGranted();

  private readonly dataSignal = signal<NxSunburstNode>(EMPTY_ROOT);
  @Input()
  get data(): NxSunburstNode {
    return this.dataSignal();
  }
  set data(value: NxSunburstNode) {
    this.dataSignal.set(value ?? EMPTY_ROOT);
  }

  get viewBox(): string {
    return '0 0 300 300';
  }

  readonly rootTotal = computed(() => effectiveValue(this.dataSignal()));

  readonly arcs = computed<SunburstArc[]>(() => {
    const root = this.dataSignal();
    const result: SunburstArc[] = [];
    const colorCursor = { count: 0 };
    this.buildArcs(root, 0, -Math.PI / 2, -Math.PI / 2 + Math.PI * 2, colorCursor, result);
    return result;
  });

  private buildArcs(
    node: NxSunburstNode,
    depth: number,
    startAngle: number,
    endAngle: number,
    colorCursor: { count: number },
    out: SunburstArc[],
  ): void {
    const children = node.children ?? [];
    if (children.length === 0) {
      return;
    }

    const total = children.reduce((sum, child) => sum + effectiveValue(child), 0) || 1;
    let cursor = startAngle;

    children.forEach((child) => {
      const value = effectiveValue(child);
      const span = ((endAngle - startAngle) * value) / total;
      const childStart = cursor;
      const childEnd = cursor + span;
      cursor = childEnd;

      const innerR = INNER_RADIUS + depth * RING_THICKNESS;
      const outerR = INNER_RADIUS + (depth + 1) * RING_THICKNESS;

      out.push({
        key: `${depth}-${child.label}-${childStart.toFixed(4)}`,
        label: child.label,
        value,
        depth,
        color: seriesColor(child.color, colorCursor.count++),
        path: arcPath(innerR, outerR, childStart, childEnd),
      });

      this.buildArcs(child, depth + 1, childStart, childEnd, colorCursor, out);
    });
  }

  formatValue(value: number): string {
    return formatNumber(value);
  }
}
