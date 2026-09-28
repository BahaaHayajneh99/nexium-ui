import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild,
  booleanAttribute,
  numberAttribute,
  signal,
} from '@angular/core';
import { NxProLocked } from '../../licensing/ui-pro-locked/ui-pro-locked';
import { nxProLicenseGranted } from '../../licensing/nx-license';

export type NxDataGridPinned = 'left' | 'right';
export type NxSortDirection = 'asc' | 'desc';
export type NxDataGridSelectionMode = 'single' | 'multiple' | null;

export interface NxDataGridColumn {
  id: string;
  header: string;
  field: string;
  width?: number;
  pinned?: NxDataGridPinned;
  sortable?: boolean;
  filterable?: boolean;
  editable?: boolean;
}

export interface NxDataGridColumnGroup {
  header: string;
  colspan: number;
}

export interface NxDataGridSort {
  field: string;
  direction: NxSortDirection;
}

export interface NxDataGridCellEditEvent {
  row: Record<string, unknown>;
  field: string;
  value: unknown;
  oldValue: unknown;
}

export interface NxDataGridPageEvent {
  first: number;
  rows: number;
}

/**
 * The PRO data grid: sorting, pinned/reorderable/resizable/hideable columns,
 * scrolling, filtering (quick + per-column), row selection, inline editing,
 * column groups, CSV export, pagination, and virtual scrolling.
 */
@Component({
  selector: 'nx-advanced-data-grid',
  standalone: true,
  imports: [NxProLocked],
  templateUrl: './ui-advanced-data-grid.html',
  styleUrl: './ui-advanced-data-grid.scss',
})
export class NxAdvancedDataGrid implements AfterViewInit {
  protected readonly licensed = nxProLicenseGranted();

  @Input() columns: NxDataGridColumn[] = [];
  @Input() rows: Record<string, unknown>[] = [];
  @Input() columnGroups: NxDataGridColumnGroup[] = [];
  @Input() dataKey = '';
  @Output() columnsChange = new EventEmitter<NxDataGridColumn[]>();

  /** Renders only the rows within the visible scroll window, for smooth scrolling of very large datasets. */
  @Input({ transform: booleanAttribute }) virtualScroll = false;
  @Input({ transform: numberAttribute }) rowHeight = 36;

  @Input({ transform: booleanAttribute }) paginator = false;
  @Input({ transform: numberAttribute }) pageSize = 10;
  @Input() rowsPerPageOptions: number[] = [10, 25, 50];
  @Input({ transform: numberAttribute }) totalRecords?: number;
  @Output() page = new EventEmitter<NxDataGridPageEvent>();

  @Input() selectionMode: NxDataGridSelectionMode = null;
  @Input() selection: Record<string, unknown> | Record<string, unknown>[] | null = null;
  @Input({ transform: booleanAttribute }) selectOnRowClick = true;
  @Output() selectionChange = new EventEmitter<Record<string, unknown> | Record<string, unknown>[] | null>();

  @Output() cellEditComplete = new EventEmitter<NxDataGridCellEditEvent>();

  @Input({ transform: booleanAttribute }) showExport = false;
  @Input() exportFilename = 'data';

  @ViewChild('scrollContainer') scrollContainerRef?: ElementRef<HTMLDivElement>;

  quickFilter = signal('');
  sortState = signal<NxDataGridSort[]>([]);
  columnFilters = signal<Record<string, string>>({});
  hiddenColumnIds = signal<Set<string>>(new Set());
  columnMenuOpen = signal(false);

  editingCell: { row: Record<string, unknown>; field: string } | null = null;
  editValue = '';

  first = 0;

  private columnWidths = new Map<string, number>();
  private resizingColumnId: string | null = null;
  private resizeStartX = 0;
  private resizeStartWidth = 0;

  private dragColumnId: string | null = null;

  private scrollTop = 0;
  private virtualStart = 0;
  private virtualEnd = 0;

  constructor(private elementRef: ElementRef<HTMLElement>) {}

  ngAfterViewInit(): void {
    this.recomputeVirtualWindow(this.filteredRows.length);
  }

  // ---------- Columns: visibility, pinning, groups ----------

  get visibleColumns(): NxDataGridColumn[] {
    const hidden = this.hiddenColumnIds();
    return this.columns.filter((c) => !hidden.has(c.id));
  }

  get leftPinnedColumns(): NxDataGridColumn[] {
    return this.visibleColumns.filter((c) => c.pinned === 'left');
  }

  get scrollableColumns(): NxDataGridColumn[] {
    return this.visibleColumns.filter((c) => !c.pinned);
  }

  get rightPinnedColumns(): NxDataGridColumn[] {
    return this.visibleColumns.filter((c) => c.pinned === 'right');
  }

  get selectionColumnWidth(): number {
    return this.selectionMode ? 40 : 0;
  }

  get hasFilterRow(): boolean {
    return this.visibleColumns.some((c) => c.filterable);
  }

  get totalColSpan(): number {
    return this.visibleColumns.length + (this.selectionMode ? 1 : 0);
  }

  columnWidth(column: NxDataGridColumn): number {
    return this.columnWidths.get(column.id) ?? column.width ?? 160;
  }

  leftOffset(column: NxDataGridColumn): number {
    const index = this.leftPinnedColumns.indexOf(column);
    return (
      this.selectionColumnWidth +
      this.leftPinnedColumns.slice(0, index).reduce((sum, c) => sum + this.columnWidth(c), 0)
    );
  }

  rightOffset(column: NxDataGridColumn): number {
    const index = this.rightPinnedColumns.indexOf(column);
    return this.rightPinnedColumns.slice(index + 1).reduce((sum, c) => sum + this.columnWidth(c), 0);
  }

  toggleColumnMenu(): void {
    this.columnMenuOpen.update((open) => !open);
  }

  isColumnVisible(column: NxDataGridColumn): boolean {
    return !this.hiddenColumnIds().has(column.id);
  }

  toggleColumnVisibility(column: NxDataGridColumn): void {
    const next = new Set(this.hiddenColumnIds());
    if (next.has(column.id)) {
      next.delete(column.id);
    } else {
      next.add(column.id);
    }
    this.hiddenColumnIds.set(next);
  }

  onColumnDragStart(column: NxDataGridColumn, event: DragEvent): void {
    this.dragColumnId = column.id;
    event.dataTransfer?.setData('text/plain', column.id);
    if (event.dataTransfer) {
      event.dataTransfer.effectAllowed = 'move';
    }
  }

  onColumnDragOver(event: DragEvent): void {
    event.preventDefault();
  }

  onColumnDrop(targetColumn: NxDataGridColumn, event: DragEvent): void {
    event.preventDefault();
    const draggedId = this.dragColumnId;
    this.dragColumnId = null;
    if (!draggedId || draggedId === targetColumn.id) {
      return;
    }
    const next = [...this.columns];
    const fromIndex = next.findIndex((c) => c.id === draggedId);
    const toIndex = next.findIndex((c) => c.id === targetColumn.id);
    if (fromIndex === -1 || toIndex === -1) {
      return;
    }
    const [moved] = next.splice(fromIndex, 1);
    next.splice(toIndex, 0, moved);
    this.columns = next;
    this.columnsChange.emit(next);
  }

  // ---------- Data pipeline: filter -> sort -> paginate -> virtualize ----------

  get filteredRows(): Record<string, unknown>[] {
    const filter = this.quickFilter().trim().toLowerCase();
    let result = this.rows;
    if (filter) {
      result = result.filter((row) =>
        this.columns.some((column) => String(row[column.field] ?? '').toLowerCase().includes(filter)),
      );
    }

    const columnFilters = Object.entries(this.columnFilters()).filter(([, value]) => value.trim() !== '');
    if (columnFilters.length) {
      result = result.filter((row) =>
        columnFilters.every(([field, value]) =>
          String(row[field] ?? '').toLowerCase().includes(value.toLowerCase()),
        ),
      );
    }

    const sorts = this.sortState();
    if (sorts.length) {
      result = [...result].sort((a, b) => {
        for (const sort of sorts) {
          const aValue = a[sort.field];
          const bValue = b[sort.field];
          if (aValue === bValue) {
            continue;
          }
          const comparison = aValue! > bValue! ? 1 : -1;
          return sort.direction === 'asc' ? comparison : -comparison;
        }
        return 0;
      });
    }
    return result;
  }

  get pagedRows(): Record<string, unknown>[] {
    const rows = this.filteredRows;
    if (!this.paginator) {
      return rows;
    }
    return rows.slice(this.first, this.first + this.pageSize);
  }

  get visibleRows(): Record<string, unknown>[] {
    const rows = this.pagedRows;
    if (!this.virtualScroll) {
      return rows;
    }
    this.recomputeVirtualWindow(rows.length);
    return rows.slice(this.virtualStart, this.virtualEnd);
  }

  get topSpacerHeight(): number {
    return this.virtualScroll ? this.virtualStart * this.rowHeight : 0;
  }

  get bottomSpacerHeight(): number {
    if (!this.virtualScroll) {
      return 0;
    }
    return Math.max(0, this.pagedRows.length - this.virtualEnd) * this.rowHeight;
  }

  onScroll(event: Event): void {
    if (!this.virtualScroll) {
      return;
    }
    this.scrollTop = (event.target as HTMLElement).scrollTop;
  }

  private recomputeVirtualWindow(dataLength: number): void {
    const buffer = 5;
    const containerHeight = this.scrollContainerRef?.nativeElement.clientHeight || 400;
    const start = Math.max(0, Math.floor(this.scrollTop / this.rowHeight) - buffer);
    const visibleCount = Math.ceil(containerHeight / this.rowHeight) + buffer * 2;
    this.virtualStart = Math.min(start, dataLength);
    this.virtualEnd = Math.min(dataLength, start + visibleCount);
  }

  // ---------- Pagination ----------

  get totalRecordsCount(): number {
    return this.totalRecords ?? this.filteredRows.length;
  }

  get totalPages(): number {
    return Math.max(1, Math.ceil(this.totalRecordsCount / this.pageSize));
  }

  get currentPage(): number {
    return Math.floor(this.first / this.pageSize) + 1;
  }

  get pageStart(): number {
    return this.totalRecordsCount === 0 ? 0 : this.first;
  }

  get pageEnd(): number {
    return Math.min(this.first + this.pageSize, this.totalRecordsCount);
  }

  get pageNumbers(): number[] {
    return Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }

  goToPage(pageNum: number): void {
    if (pageNum < 1 || pageNum > this.totalPages || pageNum === this.currentPage) return;
    this.first = (pageNum - 1) * this.pageSize;
    this.emitPage();
  }

  onRowsChange(event: Event): void {
    this.pageSize = Number((event.target as HTMLSelectElement).value);
    this.first = 0;
    this.emitPage();
  }

  private emitPage(): void {
    this.page.emit({ first: this.first, rows: this.pageSize });
  }

  // ---------- Sorting / filtering ----------

  sortDirectionFor(field: string): NxSortDirection | null {
    return this.sortState().find((s) => s.field === field)?.direction ?? null;
  }

  onHeaderClick(column: NxDataGridColumn, event: MouseEvent): void {
    if (!column.sortable) {
      return;
    }
    const current = this.sortState();
    const existingIndex = current.findIndex((s) => s.field === column.field);

    if (!event.shiftKey) {
      if (existingIndex === 0 && current[0].direction === 'asc') {
        this.sortState.set([{ field: column.field, direction: 'desc' }]);
      } else if (existingIndex === 0 && current[0].direction === 'desc') {
        this.sortState.set([]);
      } else {
        this.sortState.set([{ field: column.field, direction: 'asc' }]);
      }
      return;
    }

    if (existingIndex === -1) {
      this.sortState.set([...current, { field: column.field, direction: 'asc' }]);
    } else if (current[existingIndex].direction === 'asc') {
      const next = [...current];
      next[existingIndex] = { field: column.field, direction: 'desc' };
      this.sortState.set(next);
    } else {
      this.sortState.set(current.filter((s) => s.field !== column.field));
    }
  }

  onColumnFilterInput(field: string, event: Event): void {
    this.columnFilters.set({ ...this.columnFilters(), [field]: (event.target as HTMLInputElement).value });
  }

  onResizeStart(column: NxDataGridColumn, event: PointerEvent): void {
    event.preventDefault();
    event.stopPropagation();
    this.resizingColumnId = column.id;
    this.resizeStartX = event.clientX;
    this.resizeStartWidth = this.columnWidth(column);
    window.addEventListener('pointermove', this.onResizeMove);
    window.addEventListener('pointerup', this.onResizeEnd);
  }

  private onResizeMove = (event: PointerEvent): void => {
    if (!this.resizingColumnId) {
      return;
    }
    const delta = event.clientX - this.resizeStartX;
    const nextWidth = Math.max(60, this.resizeStartWidth + delta);
    this.columnWidths.set(this.resizingColumnId, nextWidth);
    this.elementRef.nativeElement.querySelectorAll(`[data-col="${this.resizingColumnId}"]`).forEach((el) => {
      (el as HTMLElement).style.width = `${nextWidth}px`;
      (el as HTMLElement).style.minWidth = `${nextWidth}px`;
    });
  };

  private onResizeEnd = (): void => {
    this.resizingColumnId = null;
    window.removeEventListener('pointermove', this.onResizeMove);
    window.removeEventListener('pointerup', this.onResizeEnd);
  };

  // ---------- Row selection ----------

  isSelected(row: Record<string, unknown>): boolean {
    if (this.selectionMode === 'multiple') {
      return ((this.selection as Record<string, unknown>[]) ?? []).some((r) => this.rowsEqual(r, row));
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
    this.selection = checked ? [...this.pagedRows] : [];
    this.selectionChange.emit(this.selection);
  }

  get allSelected(): boolean {
    return this.pagedRows.length > 0 && this.pagedRows.every((row) => this.isSelected(row));
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

  startEdit(row: Record<string, unknown>, col: NxDataGridColumn): void {
    if (!col.editable) return;
    this.editingCell = { row, field: col.field };
    this.editValue = String(row[col.field] ?? '');
  }

  isEditing(row: Record<string, unknown>, col: NxDataGridColumn): boolean {
    return !!this.editingCell && this.editingCell.row === row && this.editingCell.field === col.field;
  }

  onEditInput(event: Event): void {
    this.editValue = (event.target as HTMLInputElement).value;
  }

  commitEdit(row: Record<string, unknown>, col: NxDataGridColumn): void {
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

  // ---------- Export ----------

  exportCSV(filename = this.exportFilename): void {
    const header = this.visibleColumns.map((col) => this.csvEscape(col.header)).join(',');
    const lines = this.filteredRows.map((row) =>
      this.visibleColumns.map((col) => this.csvEscape(String(row[col.field] ?? ''))).join(','),
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
