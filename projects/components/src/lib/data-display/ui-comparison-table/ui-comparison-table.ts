import { Component, Input, booleanAttribute } from '@angular/core';
import { NxIcon } from '../ui-icon';
import { NxTooltip } from '../../feedback/ui-tooltip';

/** A single plan/tier column header, e.g. "Free", "Pro" or "Enterprise". */
export interface NxComparisonTableColumn {
  /** Plan name shown in the column header, e.g. "Pro". */
  name: string;
  /** Optional subtitle under the name, e.g. "$29/mo" or "For growing teams". */
  description?: string;
  /** Optional small badge above the name, e.g. "Most popular". */
  badge?: string;
  /** Marks this column as the recommended/highlighted plan. */
  highlighted?: boolean;
}

/** A feature cell rendered as a checkmark or a cross/dash. */
export interface NxComparisonTableBooleanCell {
  type: 'boolean';
  /** Whether the feature is included for this column. */
  value: boolean;
  /** Optional info-icon tooltip with more explanation. */
  tooltip?: string;
}

/** A feature cell rendered as free-form text, e.g. "5 users" or "Unlimited". */
export interface NxComparisonTableTextCell {
  type: 'text';
  value: string;
  /** Optional info-icon tooltip with more explanation. */
  tooltip?: string;
  /** Renders the value with stronger emphasis (e.g. "Unlimited"). */
  emphasis?: boolean;
}

export type NxComparisonTableCell = NxComparisonTableBooleanCell | NxComparisonTableTextCell;

/** A single feature row with one cell per column, in column order. */
export interface NxComparisonTableRow {
  /** Feature name shown in the first column, e.g. "SSO". */
  label: string;
  /** Optional info-icon tooltip next to the feature name. */
  tooltip?: string;
  /** One cell per column, matching the order of the `columns` input. */
  cells: NxComparisonTableCell[];
}

/** A named group of rows, e.g. "Core", "AI", "Security". */
export interface NxComparisonTableSection {
  title: string;
  rows: NxComparisonTableRow[];
}

/** How a `false` boolean cell is rendered when the feature is not included. */
export type NxComparisonTableMissingStyle = 'dash' | 'cross';

/**
 * A feature/plan comparison grid - the kind of table used on a pricing page
 * (Free / Pro / Enterprise columns, with rows of features and check/cross/text
 * values per column). Purely presentational and `@Input()`-driven.
 *
 * Rows can be passed flat via `rows`, or grouped into category sections via
 * `sections` (e.g. "Core", "AI", "Security"). When `sections` is set it takes
 * priority over `rows`.
 */
@Component({
  selector: 'nx-comparison-table',
  standalone: true,
  imports: [NxIcon, NxTooltip],
  templateUrl: './ui-comparison-table.html',
  styleUrl: './ui-comparison-table.scss',
})
export class NxComparisonTable {
  @Input() columns: NxComparisonTableColumn[] = [];
  @Input() rows: NxComparisonTableRow[] = [];
  @Input() sections: NxComparisonTableSection[] = [];
  @Input() featureHeader = 'Features';
  @Input() missingStyle: NxComparisonTableMissingStyle = 'dash';
  @Input({ transform: booleanAttribute }) bordered = true;

  get displaySections(): NxComparisonTableSection[] {
    if (this.sections.length) {
      return this.sections;
    }
    return this.rows.length ? [{ title: '', rows: this.rows }] : [];
  }

  cellAt(row: NxComparisonTableRow, columnIndex: number): NxComparisonTableCell | undefined {
    return row.cells[columnIndex];
  }

  trackBySectionIndex(index: number): number {
    return index;
  }
}
