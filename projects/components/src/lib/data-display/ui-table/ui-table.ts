import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges, booleanAttribute, numberAttribute } from '@angular/core';
import { NgClass } from '@angular/common';

export interface NxTableColumn {
  field: string;
  header: string;
  width?: string;
  sortable?: boolean;
  frozen?: 'left' | 'right';
  align?: 'left' | 'center' | 'right';
  sortFn?: (a: Record<string, unknown>, b: Record<string, unknown>, order: 1 | -1) => number;
}

export interface NxSortMeta {
  field: string;
  order: 1 | -1;
}

export interface NxTablePageEvent {
  first: number;
  rows: number;
}

export type NxTableSize = 'sm' | 'md' | 'lg';

/**
 * A straightforward table: sorting, pinned columns, scrolling, and pagination.
 * For filtering, row selection, inline editing, column groups, resizing, or
 * CSV export, reach for the PRO `NxAdvancedDataGrid` instead.
 */
@Component({
  selector: 'nx-table',
  standalone: true,
  imports: [NgClass],
  templateUrl: './ui-table.html',
  styleUrl: './ui-table.scss',
})
export class NxTable implements OnChanges {
  @Input() columns: NxTableColumn[] = [];
  @Input() data: Record<string, unknown>[] = [];
  @Input() dataKey = '';

  @Input({ transform: booleanAttribute }) striped = false;
  @Input({ transform: booleanAttribute }) bordered = false;
  @Input({ transform: booleanAttribute }) hoverable = false;
  @Input() size: NxTableSize = 'md';

  // Paginator
  @Input({ transform: booleanAttribute }) paginator = false;
  @Input({ transform: numberAttribute }) rows = 10;
  @Input() rowsPerPageOptions: number[] = [10, 25, 50];
  @Input({ transform: numberAttribute }) totalRecords?: number;
  @Output() page = new EventEmitter<NxTablePageEvent>();

  // Sorting
  @Input({ transform: booleanAttribute }) multiSortable = false;
  @Input({ transform: booleanAttribute }) customSort = false;
  @Input() sortMeta: NxSortMeta[] = [];
  @Output() sortMetaChange = new EventEmitter<NxSortMeta[]>();
  @Output() sort = new EventEmitter<NxSortMeta[]>();

  // Scroll
  @Input({ transform: booleanAttribute }) scrollable = false;
  @Input() scrollHeight = '400px';

  first = 0;
  processedData: Record<string, unknown>[] = [];

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['data'] || changes['columns']) {
      this.first = 0;
    }
    this.updateProcessedData();
  }

  get tableClasses() {
    return {
      striped: this.striped,
      bordered: this.bordered,
      hoverable: this.hoverable,
      [`nx-table-${this.size}`]: true,
      'nx-table-fixed': this.fixedLayout,
    };
  }

  get fixedLayout(): boolean {
    return this.columns.some((col) => col.width || col.frozen);
  }

  get totalColSpan(): number {
    return this.columns.length;
  }

  // ---------- Data pipeline: sort -> paginate ----------

  private updateProcessedData(): void {
    this.processedData = this.customSort ? this.data : this.applySort(this.data);
  }

  private applySort(data: Record<string, unknown>[]): Record<string, unknown>[] {
    if (!this.sortMeta.length) {
      return data;
    }
    const sorted = [...data];
    sorted.sort((a, b) => {
      for (const meta of this.sortMeta) {
        const col = this.columns.find((c) => c.field === meta.field);
        const result = col?.sortFn
          ? col.sortFn(a, b, meta.order)
          : this.defaultCompare(a[meta.field], b[meta.field]) * meta.order;
        if (result !== 0) {
          return result;
        }
      }
      return 0;
    });
    return sorted;
  }

  private defaultCompare(a: unknown, b: unknown): number {
    if (a == null && b == null) return 0;
    if (a == null) return -1;
    if (b == null) return 1;
    if (typeof a === 'number' && typeof b === 'number') return a - b;
    return String(a).localeCompare(String(b));
  }

  get displayData(): Record<string, unknown>[] {
    return this.processedData;
  }

  get pageData(): Record<string, unknown>[] {
    if (!this.paginator) {
      return this.displayData;
    }
    return this.displayData.slice(this.first, this.first + this.rows);
  }

  trackByRow = (index: number, row: Record<string, unknown>): unknown => {
    return this.dataKey && row ? row[this.dataKey] : index;
  };

  // ---------- Sorting ----------

  onSort(col: NxTableColumn, event: MouseEvent): void {
    if (!col.sortable) return;
    const isMulti = this.multiSortable && (event.ctrlKey || event.metaKey || event.shiftKey);
    this.updateSortMeta(col.field, isMulti);
    if (!this.customSort) {
      this.updateProcessedData();
    }
    this.sortMetaChange.emit(this.sortMeta);
    this.sort.emit(this.sortMeta);
  }

  private updateSortMeta(field: string, isMulti: boolean): void {
    const existing = this.sortMeta.find((m) => m.field === field);
    if (!isMulti) {
      if (existing && existing.order === 1) {
        this.sortMeta = [{ field, order: -1 }];
      } else if (existing && existing.order === -1) {
        this.sortMeta = [];
      } else {
        this.sortMeta = [{ field, order: 1 }];
      }
      return;
    }
    if (!existing) {
      this.sortMeta = [...this.sortMeta, { field, order: 1 }];
    } else if (existing.order === 1) {
      this.sortMeta = this.sortMeta.map((m) => (m.field === field ? { ...m, order: -1 } : m));
    } else {
      this.sortMeta = this.sortMeta.filter((m) => m.field !== field);
    }
  }

  sortOrderFor(field: string): 1 | -1 | 0 {
    return this.sortMeta.find((m) => m.field === field)?.order ?? 0;
  }

  multiSortIndex(field: string): number | null {
    if (!this.multiSortable || this.sortMeta.length < 2) return null;
    const index = this.sortMeta.findIndex((m) => m.field === field);
    return index === -1 ? null : index + 1;
  }

  // ---------- Pagination ----------

  get totalRecordsCount(): number {
    return this.totalRecords ?? this.displayData.length;
  }

  get totalPages(): number {
    return Math.max(1, Math.ceil(this.totalRecordsCount / this.rows));
  }

  get currentPage(): number {
    return Math.floor(this.first / this.rows) + 1;
  }

  get pageStart(): number {
    return this.totalRecordsCount === 0 ? 0 : this.first;
  }

  get pageEnd(): number {
    return Math.min(this.first + this.rows, this.totalRecordsCount);
  }

  get pageNumbers(): number[] {
    return Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }

  goToPage(pageNum: number): void {
    if (pageNum < 1 || pageNum > this.totalPages || pageNum === this.currentPage) return;
    this.first = (pageNum - 1) * this.rows;
    this.emitPage();
  }

  onRowsChange(event: Event): void {
    this.rows = Number((event.target as HTMLSelectElement).value);
    this.first = 0;
    this.emitPage();
  }

  private emitPage(): void {
    this.page.emit({ first: this.first, rows: this.rows });
  }

  // ---------- Frozen columns ----------

  frozenLeftOffset(col: NxTableColumn): string | null {
    if (col.frozen !== 'left') return null;
    const idx = this.columns.findIndex((c) => c.field === col.field);
    let offset = 0;
    for (let i = 0; i < idx; i++) {
      const c = this.columns[i];
      if (c.frozen === 'left') offset += this.colWidthPx(c);
    }
    return `${offset}px`;
  }

  frozenRightOffset(col: NxTableColumn): string | null {
    if (col.frozen !== 'right') return null;
    const idx = this.columns.findIndex((c) => c.field === col.field);
    let offset = 0;
    for (let i = this.columns.length - 1; i > idx; i--) {
      const c = this.columns[i];
      if (c.frozen === 'right') offset += this.colWidthPx(c);
    }
    return `${offset}px`;
  }

  colWidth(col: NxTableColumn): string | null {
    return col.width ?? null;
  }

  private colWidthPx(col: NxTableColumn): number {
    return parseInt(col.width ?? '150px', 10) || 150;
  }
}
