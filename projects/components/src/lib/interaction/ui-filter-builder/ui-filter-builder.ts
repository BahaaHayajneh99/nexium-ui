import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NxProLocked } from '../../licensing/ui-pro-locked/ui-pro-locked';
import { nxProLicenseGranted } from '../../licensing/nx-license';

export type NxFilterOperator =
  | 'equals'
  | 'notEquals'
  | 'contains'
  | 'greaterThan'
  | 'lessThan'
  | 'isEmpty'
  | 'isNotEmpty';

export interface NxFilterField {
  id: string;
  label: string;
}

export interface NxFilterCondition {
  id: string;
  field: string;
  operator: NxFilterOperator;
  value: string;
}

export const NX_FILTER_OPERATORS: { value: NxFilterOperator; label: string }[] = [
  { value: 'equals', label: 'Equals' },
  { value: 'notEquals', label: 'Not equals' },
  { value: 'contains', label: 'Contains' },
  { value: 'greaterThan', label: 'Greater than' },
  { value: 'lessThan', label: 'Less than' },
  { value: 'isEmpty', label: 'Is empty' },
  { value: 'isNotEmpty', label: 'Is not empty' },
];

function createId(): string {
  return Math.random().toString(36).slice(2, 10);
}

/** A flat list of field/operator/value rows, AND-ed together - the simple counterpart to `NxQueryBuilder`. */
@Component({
  selector: 'nx-filter-builder',
  standalone: true,
  imports: [NxProLocked],
  templateUrl: './ui-filter-builder.html',
  styleUrl: './ui-filter-builder.scss',
})
export class NxFilterBuilder {
  protected readonly licensed = nxProLicenseGranted();

  @Input() fields: NxFilterField[] = [];
  @Input() conditions: NxFilterCondition[] = [];

  @Output() conditionsChange = new EventEmitter<NxFilterCondition[]>();

  readonly operators = NX_FILTER_OPERATORS;

  addCondition(): void {
    const condition: NxFilterCondition = {
      id: createId(),
      field: this.fields[0]?.id ?? '',
      operator: 'equals',
      value: '',
    };
    this.emit([...this.conditions, condition]);
  }

  removeCondition(id: string): void {
    this.emit(this.conditions.filter((c) => c.id !== id));
  }

  updateCondition(id: string, patch: Partial<NxFilterCondition>): void {
    this.emit(this.conditions.map((c) => (c.id === id ? { ...c, ...patch } : c)));
  }

  needsValue(operator: NxFilterOperator): boolean {
    return operator !== 'isEmpty' && operator !== 'isNotEmpty';
  }

  private emit(next: NxFilterCondition[]): void {
    this.conditions = next;
    this.conditionsChange.emit(next);
  }
}
