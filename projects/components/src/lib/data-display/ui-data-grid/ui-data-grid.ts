import { Component, Input, numberAttribute, signal } from '@angular/core';

export interface NxSimpleDataGridColumn {
  field: string;
  header: string;
  sortable?: boolean;
}

export type NxDataGridSortDirection = 'asc' | 'desc' | null;

/**
 * The "80% case, zero config" client-side table: column-click sorting (asc/desc/none),
 * a single global search box, and simple pagination. No virtual scroll, no server-side
 * pagination, no cell editing, no column pinning - for that, reach for the PRO
 * `NxAdvancedDataGrid` instead. `NxDataGrid` is the lighter sibling, intentionally.
 */
@Component({
  selector: 'nx-data-grid',
  standalone: true,
  templateUrl: './ui-data-grid.html',
  styleUrl: './ui-data-grid.scss',
})
export class NxDataGrid {
  @Input() columns: NxSimpleDataGridColumn[] = [];
  @Input() rows: Record<string, unknown>[] = [];
  @Input({ transform: numberAttribute }) pageSize = 10;

  searchTerm = signal('');
  sortField = signal<string | null>(null);
  sortDirection = signal<NxDataGridSortDirection>(null);
  page = signal(1);

  onSearchInput(event: Event): void {
    this.searchTerm.set((event.target as HTMLInputElement).value);
    this.page.set(1);
  }

  onHeaderClick(column: NxSimpleDataGridColumn): void {
    if (!column.sortable) {
      return;
    }
    if (this.sortField() !== column.field) {
      this.sortField.set(column.field);
      this.sortDirection.set('asc');
      return;
    }
    const dir = this.sortDirection();
    if (dir === 'asc') {
      this.sortDirection.set('desc');
    } else if (dir === 'desc') {
      this.sortField.set(null);
      this.sortDirection.set(null);
    } else {
      this.sortDirection.set('asc');
    }
  }

  sortIndicator(field: string): string {
    if (this.sortField() !== field || !this.sortDirection()) {
      return '';
    }
    return this.sortDirection() === 'asc' ? '▲' : '▼';
  }

  // ---------- Data pipeline: search -> sort -> paginate ----------

  get filteredRows(): Record<string, unknown>[] {
    const term = this.searchTerm().trim().toLowerCase();
    if (!term) {
      return this.rows;
    }
    return this.rows.filter((row) =>
      this.columns.some((column) => String(row[column.field] ?? '').toLowerCase().includes(term)),
    );
  }

  get sortedRows(): Record<string, unknown>[] {
    const field = this.sortField();
    const direction = this.sortDirection();
    const rows = this.filteredRows;
    if (!field || !direction) {
      return rows;
    }
    const sorted = [...rows].sort((a, b) => {
      const aValue = a[field];
      const bValue = b[field];
      if (aValue === bValue) {
        return 0;
      }
      return aValue! > bValue! ? 1 : -1;
    });
    return direction === 'asc' ? sorted : sorted.reverse();
  }

  get totalPages(): number {
    return Math.max(1, Math.ceil(this.sortedRows.length / this.pageSize));
  }

  get currentPage(): number {
    return Math.min(this.page(), this.totalPages);
  }

  get pageStart(): number {
    return this.sortedRows.length === 0 ? 0 : (this.currentPage - 1) * this.pageSize;
  }

  get pageEnd(): number {
    return Math.min(this.currentPage * this.pageSize, this.sortedRows.length);
  }

  get pageNumbers(): number[] {
    return Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }

  get pagedRows(): Record<string, unknown>[] {
    const start = this.pageStart;
    return this.sortedRows.slice(start, start + this.pageSize);
  }

  goToPage(pageNum: number): void {
    if (pageNum < 1 || pageNum > this.totalPages || pageNum === this.currentPage) {
      return;
    }
    this.page.set(pageNum);
  }
}
