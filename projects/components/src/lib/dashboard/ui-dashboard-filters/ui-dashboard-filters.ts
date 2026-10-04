import { Component, EventEmitter, Input, Output, signal } from '@angular/core';
import { NxProLocked } from '../../licensing/ui-pro-locked/ui-pro-locked';
import { nxProLicenseGranted } from '../../licensing/nx-license';

/** One additional dropdown filter beyond the built-in date range, e.g. "Region" or "Team". */
export interface NxDashboardExtraFilter {
  key: string;
  label: string;
  options: string[];
}

/** The shared filter-state object this bar emits - in a real app, dashboard widgets would react to it. */
export interface NxDashboardFilterState {
  dateRange?: { from: string; to: string };
  [key: string]: unknown;
}

/**
 * A filter bar meant to sit above a dashboard's widgets: a built-in date-range picker plus any
 * number of extra dropdown filters (`extraFilters`), in either instant-apply or button-apply mode.
 * This component only emits the filter state (`filtersChange`) - it does not filter any data
 * itself, that's left to whatever widgets consume the emitted state.
 */
@Component({
  selector: 'nx-dashboard-filters',
  standalone: true,
  imports: [NxProLocked],
  templateUrl: './ui-dashboard-filters.html',
  styleUrl: './ui-dashboard-filters.scss',
})
export class NxDashboardFilters {
  protected readonly licensed = nxProLicenseGranted();

  @Input() extraFilters: NxDashboardExtraFilter[] = [];
  @Input() applyMode: 'instant' | 'button' = 'instant';

  @Output() filtersChange = new EventEmitter<NxDashboardFilterState>();

  readonly dateFrom = signal('');
  readonly dateTo = signal('');
  readonly extraValues = signal<Record<string, string>>({});

  /** Whether the current draft differs from what was last emitted - only meaningful in 'button' mode. */
  readonly dirty = signal(false);

  onDateFromChange(value: string): void {
    this.dateFrom.set(value);
    this.dirty.set(true);
    this.maybeApply();
  }

  onDateToChange(value: string): void {
    this.dateTo.set(value);
    this.dirty.set(true);
    this.maybeApply();
  }

  onExtraChange(key: string, value: string): void {
    this.extraValues.set({ ...this.extraValues(), [key]: value });
    this.dirty.set(true);
    this.maybeApply();
  }

  private maybeApply(): void {
    if (this.applyMode === 'instant') {
      this.apply();
    }
  }

  apply(): void {
    this.dirty.set(false);
    this.filtersChange.emit(this.buildState());
  }

  reset(): void {
    this.dateFrom.set('');
    this.dateTo.set('');
    this.extraValues.set({});
    this.dirty.set(false);
    this.filtersChange.emit(this.buildState());
  }

  activeFilterCount(): number {
    let count = this.dateFrom() || this.dateTo() ? 1 : 0;
    count += Object.values(this.extraValues()).filter((v) => !!v).length;
    return count;
  }

  currentStateJson(): string {
    return JSON.stringify(this.buildState(), null, 2);
  }

  private buildState(): NxDashboardFilterState {
    const state: NxDashboardFilterState = {};
    if (this.dateFrom() || this.dateTo()) {
      state.dateRange = { from: this.dateFrom(), to: this.dateTo() };
    }
    for (const [key, value] of Object.entries(this.extraValues())) {
      if (value) state[key] = value;
    }
    return state;
  }
}
