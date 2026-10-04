import { Component, Input, computed, signal } from '@angular/core';
import { formatNumber, seriesColor } from '../chart-utils';
import { NxProLocked } from '../../licensing/ui-pro-locked/ui-pro-locked';
import { nxProLicenseGranted } from '../../licensing/nx-license';

export interface NxSankeyNode {
  id: string;
  label: string;
}

export interface NxSankeyLink {
  source: string;
  target: string;
  value: number;
}

interface SankeyNodeLayout {
  id: string;
  label: string;
  layer: number;
  x: number;
  y: number;
  width: number;
  height: number;
  color: string;
  total: number;
}

interface SankeyLinkLayout {
  key: string;
  sourceLabel: string;
  targetLabel: string;
  value: number;
  path: string;
  strokeWidth: number;
  color: string;
}

interface SankeyLayout {
  nodes: SankeyNodeLayout[];
  links: SankeyLinkLayout[];
  maxLayer: number;
}

const EMPTY_LAYOUT: SankeyLayout = { nodes: [], links: [], maxLayer: 0 };

/**
 * A simplified Sankey diagram: nodes are assigned to layers/columns via longest-path-from-sources
 * (a node with no incoming links is layer 0; otherwise it's `1 + max(layer of its incoming
 * sources)`), stacked vertically within each column with height proportional to total through-
 * flow, and connected with cubic-bezier flow links whose stroke-width is proportional to value.
 * Not a full d3-sankey port - link endpoints are stacked along each node's edge proportionally
 * to value so overlapping flows fan out readably, but there's no ribbon-area rendering.
 */
@Component({
  selector: 'nx-sankey-chart',
  standalone: true,
  imports: [NxProLocked],
  templateUrl: './ui-sankey-chart.html',
  styleUrl: './ui-sankey-chart.scss',
})
export class NxSankeyChart {
  protected readonly licensed = nxProLicenseGranted();

  // Backed by signals (not plain fields) so `layout` below - a `computed()` reading them - actually
  // re-runs when the parent rebinds new nodes/links, instead of permanently caching the first value.
  private readonly nodesSignal = signal<NxSankeyNode[]>([]);
  @Input()
  get nodes(): NxSankeyNode[] {
    return this.nodesSignal();
  }
  set nodes(value: NxSankeyNode[]) {
    this.nodesSignal.set(value ?? []);
  }

  private readonly linksSignal = signal<NxSankeyLink[]>([]);
  @Input()
  get links(): NxSankeyLink[] {
    return this.linksSignal();
  }
  set links(value: NxSankeyLink[]) {
    this.linksSignal.set(value ?? []);
  }

  @Input() height = 360;

  private readonly width = 680;
  private readonly marginTop = 12;
  private readonly marginRight = 110;
  private readonly marginBottom = 12;
  private readonly marginLeft = 90;
  private readonly nodeWidth = 16;
  private readonly nodeGap = 10;

  get viewBox(): string {
    return `0 0 ${this.width} ${this.height}`;
  }

  private get plotWidth(): number {
    return this.width - this.marginLeft - this.marginRight;
  }

  private get plotHeight(): number {
    return this.height - this.marginTop - this.marginBottom;
  }

  readonly layout = computed<SankeyLayout>(() => {
    const nodes = this.nodesSignal();
    const links = this.linksSignal();
    if (nodes.length === 0) {
      return EMPTY_LAYOUT;
    }

    const layerOf = this.computeLayers(nodes, links);
    const maxLayer = Math.max(0, ...nodes.map((n) => layerOf.get(n.id) ?? 0));
    const columnCount = maxLayer + 1;
    const columnGap = columnCount > 1 ? (this.plotWidth - this.nodeWidth) / (columnCount - 1) : 0;

    const outgoingTotal = new Map<string, number>();
    const incomingTotal = new Map<string, number>();
    for (const link of links) {
      outgoingTotal.set(link.source, (outgoingTotal.get(link.source) ?? 0) + link.value);
      incomingTotal.set(link.target, (incomingTotal.get(link.target) ?? 0) + link.value);
    }

    const columns: NxSankeyNode[][] = Array.from({ length: columnCount }, () => []);
    nodes.forEach((n) => columns[layerOf.get(n.id) ?? 0].push(n));

    const nodeLayouts = new Map<string, SankeyNodeLayout>();
    let colorCursor = 0;

    columns.forEach((columnNodes, columnIndex) => {
      const totals = columnNodes.map(
        (n) => (outgoingTotal.get(n.id) ?? 0) + (incomingTotal.get(n.id) ?? 0) || 1,
      );
      const sumTotals = totals.reduce((a, b) => a + b, 0) || 1;
      const availableHeight = Math.max(1, this.plotHeight - this.nodeGap * Math.max(0, columnNodes.length - 1));

      let cursor = this.marginTop;
      columnNodes.forEach((n, i) => {
        const h = Math.max(6, (totals[i] / sumTotals) * availableHeight);
        nodeLayouts.set(n.id, {
          id: n.id,
          label: n.label,
          layer: columnIndex,
          x: this.marginLeft + columnIndex * columnGap,
          y: cursor,
          width: this.nodeWidth,
          height: h,
          color: seriesColor(undefined, colorCursor++),
          total: totals[i],
        });
        cursor += h + this.nodeGap;
      });
    });

    const outCursor = new Map<string, number>();
    const inCursor = new Map<string, number>();
    nodeLayouts.forEach((nl) => {
      outCursor.set(nl.id, nl.y);
      inCursor.set(nl.id, nl.y);
    });

    const maxValue = Math.max(1, ...links.map((l) => l.value));
    const maxStroke = 26;
    const minStroke = 1.5;

    const linkLayouts: SankeyLinkLayout[] = [];
    links.forEach((link, index) => {
      const sourceNode = nodeLayouts.get(link.source);
      const targetNode = nodeLayouts.get(link.target);
      if (!sourceNode || !targetNode) {
        return;
      }

      const outTotal = outgoingTotal.get(link.source) ?? link.value;
      const inTotal = incomingTotal.get(link.target) ?? link.value;
      const sourceSegmentHeight = (link.value / outTotal) * sourceNode.height;
      const targetSegmentHeight = (link.value / inTotal) * targetNode.height;

      const sourceTop = outCursor.get(link.source) ?? sourceNode.y;
      const targetTop = inCursor.get(link.target) ?? targetNode.y;
      const sy = sourceTop + sourceSegmentHeight / 2;
      const ty = targetTop + targetSegmentHeight / 2;

      outCursor.set(link.source, sourceTop + sourceSegmentHeight);
      inCursor.set(link.target, targetTop + targetSegmentHeight);

      const x1 = sourceNode.x + sourceNode.width;
      const x2 = targetNode.x;
      const midX = (x1 + x2) / 2;

      linkLayouts.push({
        key: `${link.source}-${link.target}-${index}`,
        sourceLabel: sourceNode.label,
        targetLabel: targetNode.label,
        value: link.value,
        path: `M ${x1} ${sy} C ${midX} ${sy}, ${midX} ${ty}, ${x2} ${ty}`,
        strokeWidth: Math.max(minStroke, (link.value / maxValue) * maxStroke),
        color: sourceNode.color,
      });
    });

    return { nodes: [...nodeLayouts.values()], links: linkLayouts, maxLayer };
  });

  private computeLayers(nodes: NxSankeyNode[], links: NxSankeyLink[]): Map<string, number> {
    const incomingBySource = new Map<string, NxSankeyLink[]>();
    for (const link of links) {
      const list = incomingBySource.get(link.target) ?? [];
      list.push(link);
      incomingBySource.set(link.target, list);
    }

    const layer = new Map<string, number>();

    const resolve = (id: string, guard: Set<string>): number => {
      const cached = layer.get(id);
      if (cached !== undefined) {
        return cached;
      }
      if (guard.has(id)) {
        // Cycle - treat as layer 0 rather than recursing forever.
        return 0;
      }
      guard.add(id);

      const incoming = incomingBySource.get(id) ?? [];
      const value = incoming.length === 0 ? 0 : 1 + Math.max(...incoming.map((l) => resolve(l.source, guard)));
      layer.set(id, value);
      return value;
    };

    nodes.forEach((n) => resolve(n.id, new Set()));
    return layer;
  }

  nodeLabelX(node: SankeyNodeLayout, maxLayer: number): number {
    return node.layer === maxLayer ? node.x - 8 : node.x + node.width + 8;
  }

  nodeLabelAnchor(node: SankeyNodeLayout, maxLayer: number): string {
    return node.layer === maxLayer ? 'end' : 'start';
  }

  formatValue(value: number): string {
    return formatNumber(value);
  }
}
