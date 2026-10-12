import { Component, EventEmitter, Input, Output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NxIcon } from '../../data-display/ui-icon';
import { NxNumber } from '../../forms/ui-number';
import { NxSelect } from '../../forms/ui-select';
import { NxProLocked } from '../../licensing/ui-pro-locked/ui-pro-locked';
import { nxProLicenseGranted } from '../../licensing/nx-license';

export interface NxQuickCreateField {
  /** Property name this field writes into the emitted `create` record. */
  key: string;
  label: string;
  type: 'text' | 'number' | 'select';
  /** Required when `type` is `'select'`. */
  options?: { label: string; value: string }[];
}

/**
 * An inline "add new item" affordance for lists/tables: a small "+ Add" trigger that expands
 * in place - no modal - into a compact mini-form row described by `fields`, then collapses back
 * on save or cancel. Lets a user add a row to a table/list without leaving the current page.
 */
@Component({
  selector: 'nx-quick-create',
  standalone: true,
  imports: [FormsModule, NxIcon, NxNumber, NxSelect, NxProLocked],
  templateUrl: './ui-quick-create.html',
  styleUrl: './ui-quick-create.scss',
})
export class NxQuickCreate {
  protected readonly licensed = nxProLicenseGranted();

  @Input() fields: NxQuickCreateField[] = [];
  @Input() triggerLabel = 'Add';

  private readonly expandedSignal = signal(false);
  @Input()
  get expanded(): boolean {
    return this.expandedSignal();
  }
  set expanded(value: boolean) {
    this.expandedSignal.set(!!value);
    if (value) {
      this.resetDraft();
    }
  }

  @Output() expandedChange = new EventEmitter<boolean>();
  @Output() create = new EventEmitter<Record<string, unknown>>();
  @Output() cancel = new EventEmitter<void>();

  private readonly draft = signal<Record<string, unknown>>({});

  open(): void {
    this.resetDraft();
    this.expandedSignal.set(true);
    this.expandedChange.emit(true);
  }

  fieldValue(key: string): unknown {
    return this.draft()[key];
  }

  textValue(key: string): string {
    const value = this.fieldValue(key);
    return value === null || value === undefined ? '' : String(value);
  }

  numberValue(key: string): number | null {
    const value = this.fieldValue(key);
    return typeof value === 'number' ? value : null;
  }

  setField(key: string, value: unknown): void {
    this.draft.update((current) => ({ ...current, [key]: value }));
  }

  save(): void {
    this.create.emit({ ...this.draft() });
    this.close();
  }

  onCancel(): void {
    this.cancel.emit();
    this.close();
  }

  private close(): void {
    this.expandedSignal.set(false);
    this.expandedChange.emit(false);
  }

  private resetDraft(): void {
    const next: Record<string, unknown> = {};
    for (const field of this.fields) {
      next[field.key] = field.type === 'number' ? null : '';
    }
    this.draft.set(next);
  }
}
