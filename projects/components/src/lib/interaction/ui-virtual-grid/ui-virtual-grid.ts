import { Component, Input, computed, numberAttribute, signal } from '@angular/core';
import { NxProLocked } from '../../licensing/ui-pro-locked/ui-pro-locked';
import { nxProLicenseGranted } from '../../licensing/nx-license';

export interface NxVirtualGridCell {
  row: number;
  col: number;
  x: number;
  y: number;
}

/**
 * Renders only the cells visible within a fixed-size viewport (plus a small
 * buffer) along both axes - the 2D sibling of `NxVirtualScroll` - so grids of
 * tens of thousands of cells (e.g. 10,000 rows x 50 columns) stay smooth.
 * Cell content is supplied on demand via `getCellValue` rather than through
 * per-cell content projection, which would require instantiating one
 * template per visible cell on every scroll.
 */
@Component({
  selector: 'nx-virtual-grid',
  standalone: true,
  imports: [NxProLocked],
  templateUrl: './ui-virtual-grid.html',
  styleUrl: './ui-virtual-grid.scss',
})
export class NxVirtualGrid {
  protected readonly licensed = nxProLicenseGranted();

  @Input() getCellValue: (row: number, col: number) => string = () => '';

  // Every dimension below is backed by a signal (not a plain field) so the `computed()`s further
  // down - which read rowCount/columnCount/rowHeight/columnWidth/height/width/buffer - actually
  // re-run when the parent rebinds a new grid size, instead of permanently caching whatever they
  // first saw on initial render.
  private readonly rowCountSignal = signal(0);
  @Input({ transform: numberAttribute })
  get rowCount(): number {
    return this.rowCountSignal();
  }
  set rowCount(value: number) {
    this.rowCountSignal.set(value);
  }

  private readonly columnCountSignal = signal(0);
  @Input({ transform: numberAttribute })
  get columnCount(): number {
    return this.columnCountSignal();
  }
  set columnCount(value: number) {
    this.columnCountSignal.set(value);
  }

  private readonly rowHeightSignal = signal(32);
  @Input({ transform: numberAttribute })
  get rowHeight(): number {
    return this.rowHeightSignal();
  }
  set rowHeight(value: number) {
    this.rowHeightSignal.set(value);
  }

  private readonly columnWidthSignal = signal(120);
  @Input({ transform: numberAttribute })
  get columnWidth(): number {
    return this.columnWidthSignal();
  }
  set columnWidth(value: number) {
    this.columnWidthSignal.set(value);
  }

  private readonly heightSignal = signal(420);
  @Input({ transform: numberAttribute })
  get height(): number {
    return this.heightSignal();
  }
  set height(value: number) {
    this.heightSignal.set(value);
  }

  /** Viewport width in px. Not called out in the original spec (height-only), but required to
   * window the horizontal axis the same way `height` windows the vertical one. */
  private readonly widthSignal = signal(800);
  @Input({ transform: numberAttribute })
  get width(): number {
    return this.widthSignal();
  }
  set width(value: number) {
    this.widthSignal.set(value);
  }

  private readonly bufferSignal = signal(2);
  @Input({ transform: numberAttribute })
  get buffer(): number {
    return this.bufferSignal();
  }
  set buffer(value: number) {
    this.bufferSignal.set(value);
  }

  private readonly scrollTop = signal(0);
  private readonly scrollLeft = signal(0);

  readonly totalHeight = computed(() => this.rowCountSignal() * this.rowHeightSignal());
  readonly totalWidth = computed(() => this.columnCountSignal() * this.columnWidthSignal());

  readonly startRow = computed(() =>
    Math.max(0, Math.floor(this.scrollTop() / this.rowHeightSignal()) - this.bufferSignal()),
  );
  readonly visibleRowCount = computed(
    () => Math.ceil(this.heightSignal() / this.rowHeightSignal()) + this.bufferSignal() * 2,
  );
  readonly endRow = computed(() => Math.min(this.rowCountSignal(), this.startRow() + this.visibleRowCount()));

  readonly startCol = computed(() =>
    Math.max(0, Math.floor(this.scrollLeft() / this.columnWidthSignal()) - this.bufferSignal()),
  );
  readonly visibleColCount = computed(
    () => Math.ceil(this.widthSignal() / this.columnWidthSignal()) + this.bufferSignal() * 2,
  );
  readonly endCol = computed(() => Math.min(this.columnCountSignal(), this.startCol() + this.visibleColCount()));

  /** Visible cells with their absolute pixel position within the full (unwindowed) grid, so they
   * can be positioned directly inside the full-size spacer without any extra translate math. */
  readonly visibleCells = computed<NxVirtualGridCell[]>(() => {
    const cells: NxVirtualGridCell[] = [];
    const rowHeight = this.rowHeightSignal();
    const columnWidth = this.columnWidthSignal();
    for (let row = this.startRow(); row < this.endRow(); row++) {
      for (let col = this.startCol(); col < this.endCol(); col++) {
        cells.push({ row, col, x: col * columnWidth, y: row * rowHeight });
      }
    }
    return cells;
  });

  onScroll(event: Event): void {
    const target = event.target as HTMLElement;
    this.scrollTop.set(target.scrollTop);
    this.scrollLeft.set(target.scrollLeft);
  }
}
