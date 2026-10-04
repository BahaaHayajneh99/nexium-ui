import { Component, EventEmitter, Input, Output, signal } from '@angular/core';
import { NxProLocked } from '../../licensing/ui-pro-locked/ui-pro-locked';
import { nxProLicenseGranted } from '../../licensing/nx-license';
import { NxFilterBuilder, NxFilterCondition, NxFilterField } from '../../interaction/ui-filter-builder';

export type NxQuickFilterFieldType = 'text' | 'select' | 'dateRange' | 'numberRange';

export interface NxQuickFilterField {
  field: string;
  label: string;
  type: NxQuickFilterFieldType;
  options?: string[];
}

export interface NxNumberOrDateRange {
  from?: string;
  to?: string;
}

/**
 * A compact, grid-oriented quick-filter toolbar meant to sit above a table - NOT a
 * rule-builder clone of `NxFilterBuilder`/`NxQueryBuilder` (which already do flat and
 * nested rule construction). Renders one inline control per field (text/select/date
 * range/number range), plus a "More filters" toggle that reveals an embedded
 * `NxFilterBuilder` for power-user rule construction beyond the quick fields. Both
 * sources are merged into a single emitted value: the quick-filter values, plus the
 * filter-builder's own rules under the reserved `_advanced` key.
 */
@Component({
  selector: 'nx-advanced-filters',
  standalone: true,
  imports: [NxProLocked, NxFilterBuilder],
  templateUrl: './ui-advanced-filters.html',
  styleUrl: './ui-advanced-filters.scss',
})
export class NxAdvancedFilters {
  protected readonly licensed = nxProLicenseGranted();

  @Input() fields: NxQuickFilterField[] = [];
  @Output() valuesChange = new EventEmitter<Record<string, unknown>>();

  moreFiltersOpen = signal(false);
  values = signal<Record<string, unknown>>({});
  advancedConditions: NxFilterCondition[] = [];

  get advancedFields(): NxFilterField[] {
    return this.fields.map((field) => ({ id: field.field, label: field.label }));
  }

  toggleMoreFilters(): void {
    this.moreFiltersOpen.update((open) => !open);
  }

  onTextInput(field: NxQuickFilterField, event: Event): void {
    this.setValue(field.field, (event.target as HTMLInputElement).value);
  }

  onSelectChange(field: NxQuickFilterField, event: Event): void {
    this.setValue(field.field, (event.target as HTMLSelectElement).value);
  }

  onRangeInput(field: NxQuickFilterField, part: 'from' | 'to', event: Event): void {
    const current = (this.values()[field.field] as NxNumberOrDateRange | undefined) ?? {};
    this.setValue(field.field, { ...current, [part]: (event.target as HTMLInputElement).value });
  }

  onAdvancedConditionsChange(conditions: NxFilterCondition[]): void {
    this.advancedConditions = conditions;
    this.emit();
  }

  clearAll(): void {
    this.values.set({});
    this.advancedConditions = [];
    this.emit();
  }

  private setValue(field: string, value: unknown): void {
    this.values.set({ ...this.values(), [field]: value });
    this.emit();
  }

  private emit(): void {
    this.valuesChange.emit({ ...this.values(), _advanced: this.advancedConditions });
  }
}
