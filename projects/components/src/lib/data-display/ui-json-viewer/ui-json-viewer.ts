import { Component, Input } from '@angular/core';
import { NxProLocked } from '../../licensing/ui-pro-locked/ui-pro-locked';
import { nxProLicenseGranted } from '../../licensing/nx-license';

type NxJsonRowType = 'object' | 'array' | 'string' | 'number' | 'boolean' | 'null';

interface NxJsonRow {
  path: string;
  indent: number;
  key: string | null;
  valueType: NxJsonRowType;
  preview: string;
  hasChildren: boolean;
}

/**
 * A read-only, collapsible tree view of a JSON value - rows are flattened
 * from the value (same approach as `nx-tree-table`) rather than built from
 * a recursive template, so any depth "just works".
 */
@Component({
  selector: 'nx-json-viewer',
  standalone: true,
  imports: [NxProLocked],
  templateUrl: './ui-json-viewer.html',
  styleUrl: './ui-json-viewer.scss',
})
export class NxJsonViewer {
  protected readonly licensed = nxProLicenseGranted();

  @Input() value: unknown = null;

  private collapsedPaths = new Set<string>();

  get rows(): NxJsonRow[] {
    const rows: NxJsonRow[] = [];
    this.walk(this.value, '$', 0, null, rows);
    return rows;
  }

  isCollapsed(path: string): boolean {
    return this.collapsedPaths.has(path);
  }

  toggle(path: string): void {
    if (this.collapsedPaths.has(path)) {
      this.collapsedPaths.delete(path);
    } else {
      this.collapsedPaths.add(path);
    }
  }

  private walk(value: unknown, path: string, indent: number, key: string | null, rows: NxJsonRow[]): void {
    const isArray = Array.isArray(value);
    const isObject = value !== null && typeof value === 'object' && !isArray;

    if (isArray || isObject) {
      const entries = isArray
        ? (value as unknown[]).map((item, i) => [String(i), item] as const)
        : Object.entries(value as Record<string, unknown>);

      rows.push({
        path,
        indent,
        key,
        valueType: isArray ? 'array' : 'object',
        preview: isArray ? `Array(${(value as unknown[]).length})` : `Object(${entries.length})`,
        hasChildren: entries.length > 0,
      });

      if (this.collapsedPaths.has(path)) {
        return;
      }

      for (const [childKey, childValue] of entries) {
        this.walk(childValue, `${path}.${childKey}`, indent + 1, childKey, rows);
      }
      return;
    }

    rows.push({
      path,
      indent,
      key,
      valueType: value === null ? 'null' : (typeof value as NxJsonRowType),
      preview: JSON.stringify(value),
      hasChildren: false,
    });
  }
}
