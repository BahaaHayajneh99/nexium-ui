import { Component, Input, computed, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NxProLocked } from '../../licensing/ui-pro-locked/ui-pro-locked';
import { nxProLicenseGranted } from '../../licensing/nx-license';

export type NxPivotAggregation = 'sum' | 'avg' | 'count' | 'min' | 'max';

export interface NxPivotConfig {
  /** One or more fields to group rows by, nested in order (e.g. `['region', 'rep']`). */
  rowFields: string[];
  /** Field whose distinct values become columns. Omit for a flat, non-pivoted total per row group. */
  columnField?: string;
  /** Numeric field to aggregate. */
  valueField: string;
  /** Defaults to `'sum'`. */
  aggregation?: NxPivotAggregation;
}

export interface NxPivotNode {
  key: string;
  path: string;
  depth: number;
  rows: Record<string, unknown>[];
  children: NxPivotNode[];
}

const EMPTY_KEY = '(blank)';

/**
 * A grouped, aggregated pivot view over tabular data: nested row groups (collapsible), an
 * optional column pivot, a chosen aggregation, grand totals, a quick filter, and CSV export.
 */
@Component({
  selector: 'nx-pivot-table',
  standalone: true,
  imports: [FormsModule, NxProLocked],
  templateUrl: './ui-pivot-table.html',
  styleUrl: './ui-pivot-table.scss',
})
export class NxPivotTable {
  protected readonly licensed = nxProLicenseGranted();

  // Backed by signals (not plain fields) so `filteredRows`/`columnValues`/`tree` below - all
  // `computed()`s reading `this.data`/`this.config` - actually re-run when the parent rebinds new
  // source data or a new pivot configuration, instead of permanently caching whatever they first
  // saw on initial render.
  private readonly dataSignal = signal<Record<string, unknown>[]>([]);
  @Input()
  get data(): Record<string, unknown>[] {
    return this.dataSignal();
  }
  set data(value: Record<string, unknown>[]) {
    this.dataSignal.set(value);
  }

  private readonly configSignal = signal<NxPivotConfig | null>(null);
  @Input({ required: true })
  get config(): NxPivotConfig {
    return this.configSignal()!;
  }
  set config(value: NxPivotConfig) {
    this.configSignal.set(value);
  }

  @Input() exportFilename = 'pivot';
  @Input() valueLabel = 'Value';

  quickFilter = signal('');
  private readonly collapsed = signal<Set<string>>(new Set());

  private readonly filteredRows = computed(() => {
    const term = this.quickFilter().trim().toLowerCase();
    if (!term) {
      return this.data;
    }
    return this.data.filter((row) =>
      Object.values(row).some((value) => String(value ?? '').toLowerCase().includes(term)),
    );
  });

  readonly columnValues = computed<string[]>(() => {
    const field = this.config.columnField;
    if (!field) {
      return [];
    }
    const set = new Set(this.filteredRows().map((row) => this.cellKey(row, field)));
    return [...set].sort((a, b) => a.localeCompare(b));
  });

  readonly tree = computed<NxPivotNode[]>(() => this.buildTree(this.filteredRows(), this.config.rowFields, 0, ''));

  readonly visibleRows = computed<NxPivotNode[]>(() => {
    const result: NxPivotNode[] = [];
    const collapsed = this.collapsed();
    const walk = (nodes: NxPivotNode[]) => {
      for (const node of nodes) {
        result.push(node);
        if (node.children.length && !collapsed.has(node.path)) {
          walk(node.children);
        }
      }
    };
    walk(this.tree());
    return result;
  });

  readonly grandTotal = computed(() => this.aggregate(this.filteredRows()));

  grandTotalForColumn(columnValue: string): number {
    const field = this.config.columnField;
    if (!field) {
      return this.grandTotal();
    }
    return this.aggregate(this.filteredRows().filter((row) => this.cellKey(row, field) === columnValue));
  }

  cellValue(node: NxPivotNode, columnValue: string | null): number {
    const field = this.config.columnField;
    if (!field || columnValue === null) {
      return this.aggregate(node.rows);
    }
    return this.aggregate(node.rows.filter((row) => this.cellKey(row, field) === columnValue));
  }

  isCollapsed(path: string): boolean {
    return this.collapsed().has(path);
  }

  toggleNode(path: string): void {
    this.collapsed.update((set) => {
      const next = new Set(set);
      if (next.has(path)) {
        next.delete(path);
      } else {
        next.add(path);
      }
      return next;
    });
  }

  expandAll(): void {
    this.collapsed.set(new Set());
  }

  collapseAll(): void {
    const all = new Set<string>();
    const walk = (nodes: NxPivotNode[]) => {
      for (const node of nodes) {
        if (node.children.length) {
          all.add(node.path);
          walk(node.children);
        }
      }
    };
    walk(this.tree());
    this.collapsed.set(all);
  }

  formatValue(value: number): string {
    const rounded = Math.round(value * 100) / 100;
    return rounded.toLocaleString();
  }

  exportCSV(filename = this.exportFilename): void {
    const groupLabel = this.config.rowFields.join(' / ');
    const columns = this.columnValues();
    const header = [groupLabel, ...(columns.length ? columns : [this.valueLabel]), ...(columns.length ? ['Total'] : [])]
      .map((h) => this.csvEscape(h))
      .join(',');

    const lines = this.visibleRows().map((node) => {
      const label = `${'  '.repeat(node.depth)}${node.key}`;
      const cells = columns.length
        ? [...columns.map((col) => String(this.cellValue(node, col))), String(this.cellValue(node, null))]
        : [String(this.cellValue(node, null))];
      return [this.csvEscape(label), ...cells.map((c) => this.csvEscape(c))].join(',');
    });

    const totalRow = [
      this.csvEscape('Grand Total'),
      ...(columns.length
        ? [...columns.map((col) => String(this.grandTotalForColumn(col))), String(this.grandTotal())]
        : [String(this.grandTotal())]),
    ].join(',');

    const csv = [header, ...lines, totalRow].join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${filename}.csv`;
    link.click();
    URL.revokeObjectURL(url);
  }

  private cellKey(row: Record<string, unknown>, field: string): string {
    const value = row[field];
    return value === undefined || value === null || value === '' ? EMPTY_KEY : String(value);
  }

  private aggregate(rows: Record<string, unknown>[]): number {
    const values = rows.map((row) => Number(row[this.config.valueField]) || 0);
    switch (this.config.aggregation ?? 'sum') {
      case 'avg':
        return values.length ? values.reduce((a, b) => a + b, 0) / values.length : 0;
      case 'count':
        return rows.length;
      case 'min':
        return values.length ? Math.min(...values) : 0;
      case 'max':
        return values.length ? Math.max(...values) : 0;
      case 'sum':
      default:
        return values.reduce((a, b) => a + b, 0);
    }
  }

  private buildTree(rows: Record<string, unknown>[], fields: string[], depth: number, parentPath: string): NxPivotNode[] {
    if (depth >= fields.length) {
      return [];
    }
    const field = fields[depth];
    const groups = new Map<string, Record<string, unknown>[]>();
    for (const row of rows) {
      const key = this.cellKey(row, field);
      const bucket = groups.get(key);
      if (bucket) {
        bucket.push(row);
      } else {
        groups.set(key, [row]);
      }
    }
    return [...groups.entries()]
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([key, groupRows]) => {
        const path = parentPath ? `${parentPath}|${key}` : key;
        return {
          key,
          path,
          depth,
          rows: groupRows,
          children: this.buildTree(groupRows, fields, depth + 1, path),
        };
      });
  }

  private csvEscape(value: string): string {
    if (/[",\n]/.test(value)) {
      return `"${value.replace(/"/g, '""')}"`;
    }
    return value;
  }
}
