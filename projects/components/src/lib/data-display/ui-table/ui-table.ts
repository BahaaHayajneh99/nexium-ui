import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  Output,
  SimpleChanges,
  ViewChild,
  booleanAttribute,
  numberAttribute,
} from '@angular/core';
import { NgClass } from '@angular/common';

export interface NxTableColumn {
  field: string;
  header: string;
  width?: string;
  sortable?: boolean;
  filterable?: boolean;
  editable?: boolean;
  resizable?: boolean;
  frozen?: 'left' | 'right';
  align?: 'left' | 'center' | 'right';
  sortFn?: (a: Record<string, unknown>, b: Record<string, unknown>, order: 1 | -1) => number;
}

export interface NxTableColumnGroup {
  header: string;
  colspan: number;
}

export interface NxSortMeta {
  field: string;
  order: 1 | -1;
}

export interface NxTablePageEvent {
  first: number;
  rows: number;
}

export interface NxTableFilterEvent {
  filters: Record<string, string>;
  globalFilter: string;
}

export interface NxTableLazyLoadEvent {
  first: number;
  rows: number;
}

export interface NxCellEditEvent {
  row: Record<string, unknown>;
  field: string;
  value: unknown;
  oldValue: unknown;
}

export type NxTableSelectionMode = 'single' | 'multiple' | null;
export type NxTableSize = 'sm' | 'md' | 'lg';
export type NxVirtualScrollMode = 'preload' | 'lazy';

@Component({
  selector: 'nx-table',
  standalone: true,
  imports: [NgClass],
  templateUrl: './ui-table.html',
  styleUrl: './ui-table.scss',
})
export class NxTable implements OnChanges, AfterViewInit, OnDestroy {
  @Input() columns: NxTableColumn[] = [];
  @Input() data: Record<string, unknown>[] = [];
  @Input() columnGroups: NxTableColumnGroup[] = [];
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

  // Filtering
  @Input({ transform: booleanAttribute }) customFilter = false;
  @Input({ transform: booleanAttribute }) showGlobalFilter = false;
  @Input() globalFilterFields: string[] = [];
  @Input() globalFilter = '';
  @Output() globalFilterChange = new EventEmitter<string>();
  @Output() filter = new EventEmitter<NxTableFilterEvent>();

  // Row selection
  @Input() selectionMode: NxTableSelectionMode = null;
  @Input() selection: Record<string, unknown> | Record<string, unknown>[] | null = null;
  @Input({ transform: booleanAttribute }) selectOnRowClick = true;
  @Output() selectionChange = new EventEmitter<
    Record<string, unknown> | Record<string, unknown>[] | null
  >();

  // Cell editing
  @Output() cellEditComplete = new EventEmitter<NxCellEditEvent>();

  // Scroll
  @Input({ transform: booleanAttribute }) scrollable = false;
  @Input() scrollHeight = '400px';

  // Virtual scroll
  @Input({ transform: booleanAttribute }) virtualScroll = false;
  @Input({ transform: numberAttribute }) virtualScrollItemSize = 40;
  @Input() virtualScrollMode: NxVirtualScrollMode = 'preload';
  @Output() lazyLoad = new EventEmitter<NxTableLazyLoadEvent>();

  // Export
  @Input({ transform: booleanAttribute }) showExport = false;
  @Input() exportFilename = 'data';

  @ViewChild('scrollContainer') scrollContainerRef?: ElementRef<HTMLDivElement>;
  @ViewChild('editInputRef') editInputRef?: ElementRef<HTMLInputElement>;

  filters: Record<string, string> = {};
  colWidths: Record<string, string> = {};

  first = 0;
  processedData: Record<string, unknown>[] = [];

  editingCell: { row: Record<string, unknown>; field: string } | null = null;
  editValue = '';

  resizingCol: NxTableColumn | null = null;
  private resizeStartX = 0;
  private resizeStartWidth = 0;

  scrollTop = 0;
  virtualStart = 0;
  virtualEnd = 0;

  private readonly resizeMoveHandler = (event: MouseEvent) => this.onResizeMove(event);
  private readonly resizeEndHandler = () => this.onResizeEnd();

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['data'] || changes['columns']) {
      this.first = 0;
    }
    this.updateProcessedData();
  }

  ngAfterViewInit(): void {
    this.recomputeVirtualWindow();
  }

  ngOnDestroy(): void {
    window.removeEventListener('mousemove', this.resizeMoveHandler);
    window.removeEventListener('mouseup', this.resizeEndHandler);
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
    return (
      Object.keys(this.colWidths).length > 0 ||
      this.columns.some((col) => col.width || col.resizable || col.frozen)
    );
  }

  get hasFilterRow(): boolean {
    return this.columns.some((col) => col.filterable);
  }

  get totalColSpan(): number {
    return this.columns.length + (this.selectionMode ? 1 : 0);
  }

  // ---------- Data pipeline: filter -> sort -> paginate -> virtualize ----------

  private updateProcessedData(): void {
    let result = this.data;
    if (!this.customFilter) {
      result = this.applyFilters(result);
    }
    if (!this.customSort) {
      result = this.applySort(result);
    }
    this.processedData = result;
    this.recomputeVirtualWindow();
  }

  private applyFilters(data: Record<string, unknown>[]): Record<string, unknown>[] {
    let result = data;
    const filterEntries = Object.entries(this.filters).filter(
      ([, value]) => value !== '' && value != null,
    );
    if (filterEntries.length) {
      result = result.filter((row) =>
        filterEntries.every(([field, value]) =>
          String(row[field] ?? '')
            .toLowerCase()
            .includes(value.toLowerCase()),
        ),
      );
    }
    if (this.globalFilter) {
      const fields = this.globalFilterFields.length
        ? this.globalFilterFields
        : this.columns.map((col) => col.field);
      const query = this.globalFilter.toLowerCase();
      result = result.filter((row) =>
        fields.some((field) =>
          String(row[field] ?? '')
            .toLowerCase()
            .includes(query),
        ),
      );
    }
    return result;
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

  get visibleRows(): Record<string, unknown>[] {
    if (!this.virtualScroll) {
      return this.pageData;
    }
    return this.pageData.slice(this.virtualStart, this.virtualEnd);
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

  // ---------- Filtering ----------

  onGlobalFilterInput(event: Event): void {
    this.globalFilter = (event.target as HTMLInputElement).value;
    this.globalFilterChange.emit(this.globalFilter);
    this.onFiltersChanged();
  }

  onFilterInput(field: string, event: Event): void {
    this.filters = { ...this.filters, [field]: (event.target as HTMLInputElement).value };
    this.onFiltersChanged();
  }

  private onFiltersChanged(): void {
    this.first = 0;
    if (this.customFilter) {
      this.filter.emit({ filters: this.filters, globalFilter: this.globalFilter });
      return;
    }
    this.updateProcessedData();
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
    this.recomputeVirtualWindow();
    this.page.emit({ first: this.first, rows: this.rows });
  }

  // ---------- Row selection ----------

  isSelected(row: Record<string, unknown>): boolean {
    if (this.selectionMode === 'multiple') {
      return ((this.selection as Record<string, unknown>[]) ?? []).some((r) =>
        this.rowsEqual(r, row),
      );
    }
    if (this.selectionMode === 'single') {
      return this.rowsEqual(this.selection as Record<string, unknown>, row);
    }
    return false;
  }

  private rowsEqual(a: Record<string, unknown>, b: Record<string, unknown>): boolean {
    if (!a || !b) return false;
    if (this.dataKey) return a[this.dataKey] === b[this.dataKey];
    return a === b;
  }

  toggleRowSelection(row: Record<string, unknown>): void {
    const current = (this.selection as Record<string, unknown>[]) ?? [];
    const exists = current.some((r) => this.rowsEqual(r, row));
    const updated = exists ? current.filter((r) => !this.rowsEqual(r, row)) : [...current, row];
    this.selection = updated;
    this.selectionChange.emit(updated);
  }

  selectSingle(row: Record<string, unknown>): void {
    this.selection = row;
    this.selectionChange.emit(row);
  }

  toggleSelectAll(checked: boolean): void {
    this.selection = checked ? [...this.pageData] : [];
    this.selectionChange.emit(this.selection);
  }

  get allSelected(): boolean {
    return this.pageData.length > 0 && this.pageData.every((row) => this.isSelected(row));
  }

  onRowClick(row: Record<string, unknown>): void {
    if (!this.selectionMode || !this.selectOnRowClick) return;
    if (this.selectionMode === 'single') {
      this.selectSingle(row);
    } else {
      this.toggleRowSelection(row);
    }
  }

  // ---------- Cell editing ----------

  startEdit(row: Record<string, unknown>, col: NxTableColumn): void {
    if (!col.editable) return;
    this.editingCell = { row, field: col.field };
    this.editValue = String(row[col.field] ?? '');
  }

  isEditing(row: Record<string, unknown>, col: NxTableColumn): boolean {
    return (
      !!this.editingCell && this.editingCell.row === row && this.editingCell.field === col.field
    );
  }

  onEditInput(event: Event): void {
    this.editValue = (event.target as HTMLInputElement).value;
  }

  commitEdit(row: Record<string, unknown>, col: NxTableColumn): void {
    if (!this.editingCell) return;
    const oldValue = row[col.field];
    if (this.editValue !== oldValue) {
      row[col.field] = this.editValue;
      this.cellEditComplete.emit({ row, field: col.field, value: this.editValue, oldValue });
    }
    this.editingCell = null;
  }

  cancelEdit(): void {
    this.editingCell = null;
  }

  // ---------- Column resize ----------

  onResizeStart(col: NxTableColumn, event: MouseEvent): void {
    event.preventDefault();
    event.stopPropagation();
    this.resizingCol = col;
    this.resizeStartX = event.pageX;
    this.resizeStartWidth = parseInt(this.colWidths[col.field] ?? col.width ?? '150', 10);
    window.addEventListener('mousemove', this.resizeMoveHandler);
    window.addEventListener('mouseup', this.resizeEndHandler);
  }

  private onResizeMove(event: MouseEvent): void {
    if (!this.resizingCol) return;
    const delta = event.pageX - this.resizeStartX;
    const newWidth = Math.max(40, this.resizeStartWidth + delta);
    this.colWidths = { ...this.colWidths, [this.resizingCol.field]: `${newWidth}px` };
  }

  private onResizeEnd(): void {
    this.resizingCol = null;
    window.removeEventListener('mousemove', this.resizeMoveHandler);
    window.removeEventListener('mouseup', this.resizeEndHandler);
  }

  colWidth(col: NxTableColumn): string | null {
    return this.colWidths[col.field] ?? col.width ?? null;
  }

  private colWidthPx(col: NxTableColumn): number {
    const width = this.colWidths[col.field] ?? col.width ?? '150px';
    return parseInt(width, 10) || 150;
  }

  // ---------- Frozen columns ----------

  frozenLeftOffset(col: NxTableColumn): string | null {
    if (col.frozen !== 'left') return null;
    const idx = this.columns.findIndex((c) => c.field === col.field);
    let offset = this.selectionMode ? 40 : 0;
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

  // ---------- Scroll / virtual scroll ----------

  onScroll(event: Event): void {
    this.scrollTop = (event.target as HTMLElement).scrollTop;
    if (this.virtualScroll) {
      this.recomputeVirtualWindow();
      if (this.virtualScrollMode === 'lazy') {
        this.lazyLoad.emit({ first: this.virtualStart, rows: this.virtualEnd - this.virtualStart });
      }
    }
  }

  private recomputeVirtualWindow(): void {
    if (!this.virtualScroll) {
      this.virtualStart = 0;
      this.virtualEnd = this.pageData.length;
      return;
    }
    const itemSize = this.virtualScrollItemSize || 40;
    const buffer = 5;
    const containerHeight = this.scrollContainerRef?.nativeElement.clientHeight || 400;
    const start = Math.max(0, Math.floor(this.scrollTop / itemSize) - buffer);
    const visibleCount = Math.ceil(containerHeight / itemSize) + buffer * 2;
    const dataLength = this.pageData.length;
    this.virtualStart = Math.min(start, dataLength);
    this.virtualEnd = Math.min(dataLength, start + visibleCount);
  }

  get topSpacerHeight(): number {
    return this.virtualScroll ? this.virtualStart * this.virtualScrollItemSize : 0;
  }

  get bottomSpacerHeight(): number {
    if (!this.virtualScroll) return 0;
    return Math.max(0, this.pageData.length - this.virtualEnd) * this.virtualScrollItemSize;
  }

  // ---------- Export ----------

  exportCSV(filename = this.exportFilename): void {
    const header = this.columns.map((col) => this.csvEscape(col.header)).join(',');
    const lines = this.displayData.map((row) =>
      this.columns.map((col) => this.csvEscape(String(row[col.field] ?? ''))).join(','),
    );
    const csv = [header, ...lines].join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${filename}.csv`;
    link.click();
    URL.revokeObjectURL(url);
  }

  private csvEscape(value: string): string {
    if (/[",\n]/.test(value)) {
      return `"${value.replace(/"/g, '""')}"`;
    }
    return value;
  }
}
