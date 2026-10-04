import { Component, ContentChild, ElementRef, EventEmitter, HostListener, Input, Output, TemplateRef, ViewChild, computed, signal } from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { NxProLocked } from '../../licensing/ui-pro-locked/ui-pro-locked';
import { nxProLicenseGranted } from '../../licensing/nx-license';

/** A single widget's position/size on the grid, in whole grid-cell units (not px). */
export interface NxWidgetLayoutItem {
  id: string;
  x: number;
  y: number;
  w: number;
  h: number;
}

interface NxWidgetDragState {
  id: string;
  mode: 'move' | 'resize';
  startClientX: number;
  startClientY: number;
  originX: number;
  originY: number;
  originW: number;
  originH: number;
  /** Snapshotted at gesture start so a mid-drag reflow (e.g. a window resize) can't jitter the math. */
  cellWidth: number;
}

/**
 * Generic drag-and-resize grid layout engine. The mechanics only - what's actually displayed in
 * each cell is projected in via a single `<ng-template let-item>` child, instantiated once per
 * `layout` entry with that `NxWidgetLayoutItem` as its context (`item.id` is how a consumer looks
 * up its own widget data).
 *
 * Drag a widget's header to reposition it; drag its bottom-right handle to resize it. Both snap
 * to whole grid cells and only commit (updating `layout` and emitting `layoutChange`) when the
 * gesture ends on mouseup - intermediate mousemove frames update the live visual position only.
 * Collision response on commit is intentionally simple: any widget left overlapping another is
 * pushed straight down below it - this is not a full bin-packing algorithm, widgets are never
 * shifted sideways or backfilled into freed gaps.
 */
@Component({
  selector: 'nx-widget-grid',
  standalone: true,
  imports: [NgTemplateOutlet, NxProLocked],
  templateUrl: './ui-widget-grid.html',
  styleUrl: './ui-widget-grid.scss',
})
export class NxWidgetGrid {
  protected readonly licensed = nxProLicenseGranted();

  // Signal-backed (not a plain field) because `items` below is a `computed()` reading it - a
  // computed over a plain `@Input()` would freeze at whatever the first-bound value was and never
  // see a later rebind from the parent.
  private readonly layoutSignal = signal<NxWidgetLayoutItem[]>([]);

  @Input()
  get layout(): NxWidgetLayoutItem[] {
    return this.layoutSignal();
  }
  set layout(value: NxWidgetLayoutItem[]) {
    // Swallow echoes of our own in-flight drag/resize so a parent re-render mid-gesture
    // (e.g. triggered by something unrelated) can't yank the widget back to its pre-drag spot.
    if (this.dragState) return;
    this.layoutSignal.set(value ?? []);
  }

  @Input() columns = 12;
  @Input() rowHeight = 80;
  @Input() gap = 12;

  @Output() layoutChange = new EventEmitter<NxWidgetLayoutItem[]>();

  @ContentChild(TemplateRef) itemTemplate?: TemplateRef<{ $implicit: NxWidgetLayoutItem }>;
  @ViewChild('gridEl') private gridEl?: ElementRef<HTMLElement>;

  readonly items = computed(() => this.layoutSignal());

  readonly activeId = signal<string | null>(null);

  private dragState: NxWidgetDragState | null = null;

  /** Public positioning helper - the CSS grid placement for one layout item. */
  styleFor(item: NxWidgetLayoutItem): { gridColumn: string; gridRow: string } {
    return {
      gridColumn: `${item.x + 1} / span ${Math.max(1, item.w)}`,
      gridRow: `${item.y + 1} / span ${Math.max(1, item.h)}`,
    };
  }

  startMove(item: NxWidgetLayoutItem, event: MouseEvent): void {
    if (event.button !== 0) return;
    event.preventDefault();
    this.beginDrag(item, 'move', event);
  }

  startResize(item: NxWidgetLayoutItem, event: MouseEvent): void {
    if (event.button !== 0) return;
    event.preventDefault();
    event.stopPropagation();
    this.beginDrag(item, 'resize', event);
  }

  private beginDrag(item: NxWidgetLayoutItem, mode: 'move' | 'resize', event: MouseEvent): void {
    this.dragState = {
      id: item.id,
      mode,
      startClientX: event.clientX,
      startClientY: event.clientY,
      originX: item.x,
      originY: item.y,
      originW: item.w,
      originH: item.h,
      cellWidth: this.measureCellWidth(),
    };
    this.activeId.set(item.id);
  }

  private measureCellWidth(): number {
    const width = this.gridEl?.nativeElement.clientWidth ?? 0;
    if (width <= 0 || this.columns <= 0) return 80;
    return (width - this.gap * (this.columns - 1)) / this.columns;
  }

  @HostListener('document:mousemove', ['$event'])
  onDocumentMouseMove(event: MouseEvent): void {
    const drag = this.dragState;
    if (!drag) return;

    const colSpanPx = drag.cellWidth + this.gap;
    const rowSpanPx = this.rowHeight + this.gap;
    const deltaCols = Math.round((event.clientX - drag.startClientX) / Math.max(1, colSpanPx));
    const deltaRows = Math.round((event.clientY - drag.startClientY) / Math.max(1, rowSpanPx));

    const current = this.layoutSignal();
    const index = current.findIndex((i) => i.id === drag.id);
    if (index === -1) return;
    const item = current[index];

    let next: NxWidgetLayoutItem;
    if (drag.mode === 'move') {
      const maxX = Math.max(0, this.columns - item.w);
      const x = Math.min(maxX, Math.max(0, drag.originX + deltaCols));
      const y = Math.max(0, drag.originY + deltaRows);
      if (x === item.x && y === item.y) return;
      next = { ...item, x, y };
    } else {
      const maxW = Math.max(1, this.columns - item.x);
      const w = Math.min(maxW, Math.max(1, drag.originW + deltaCols));
      const h = Math.max(1, drag.originH + deltaRows);
      if (w === item.w && h === item.h) return;
      next = { ...item, w, h };
    }

    const updated = [...current];
    updated[index] = next;
    this.layoutSignal.set(updated);
  }

  @HostListener('document:mouseup')
  onDocumentMouseUp(): void {
    if (!this.dragState) return;
    this.dragState = null;
    this.activeId.set(null);
    const resolved = this.resolveCollisions(this.layoutSignal());
    this.layoutSignal.set(resolved);
    this.layoutChange.emit(resolved.map((i) => ({ ...i })));
  }

  /**
   * Basic, non-destructive collision response: any widget left overlapping another's rectangle is
   * pushed straight down to just beneath it. Runs several passes so a push that creates a new
   * overlap further down also gets resolved, but it is NOT a true packing/compaction algorithm -
   * nothing is ever shifted sideways or moved up to fill a gap a push leaves behind.
   */
  private resolveCollisions(items: NxWidgetLayoutItem[]): NxWidgetLayoutItem[] {
    const result = items.map((i) => ({ ...i }));
    const overlaps = (a: NxWidgetLayoutItem, b: NxWidgetLayoutItem): boolean =>
      a.x < b.x + b.w && a.x + a.w > b.x && a.y < b.y + b.h && a.y + a.h > b.y;

    for (let pass = 0; pass < 50; pass++) {
      let changed = false;
      for (let i = 0; i < result.length; i++) {
        for (let j = 0; j < result.length; j++) {
          if (i === j) continue;
          if (overlaps(result[i], result[j])) {
            result[j].y = result[i].y + result[i].h;
            changed = true;
          }
        }
      }
      if (!changed) break;
    }
    return result;
  }
}
