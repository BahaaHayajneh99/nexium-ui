import { Component, EventEmitter, Input, Output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NxModal } from '../../feedback/ui-modal/ui-modal';
import { NxProLocked } from '../../licensing/ui-pro-locked/ui-pro-locked';
import { nxProLicenseGranted } from '../../licensing/nx-license';

/** Describes one field that can be bulk-set across the selected `records`, reusing this
 *  library's established `{key,label,type,options?}[]` field-schema shape. */
export interface NxBulkEditorField {
  key: string;
  label: string;
  type: 'text' | 'number' | 'select' | 'checkbox' | 'date';
  options?: { label: string; value: unknown }[];
}

/** One field the user opted into, with the value they chose for it. */
export interface NxBulkEditorChange {
  fieldKey: string;
  value: unknown;
}

/**
 * A "set this field to X for all selected records" dialog - the classic enterprise admin/CRM
 * bulk-edit pattern. Typically opened from a bulk-actions bar (e.g. `NxBulkActions`), but this
 * component is standalone: it's just handed the already-selected `records` and doesn't know or
 * care how they were selected.
 *
 * Critical UX rule: a field's own input control starts disabled, and stays disabled until the
 * admin explicitly checks "Apply this field" next to it. Only opted-in fields are included in
 * the `apply` payload - this is what stops an admin from silently overwriting a field they never
 * meant to touch across dozens of records just because it happened to render with some default
 * value. `records` is never mutated here; the host applies the emitted payload itself.
 */
@Component({
  selector: 'nx-bulk-editor',
  standalone: true,
  imports: [FormsModule, NxModal, NxProLocked],
  templateUrl: './ui-bulk-editor.html',
  styleUrl: './ui-bulk-editor.scss',
})
export class NxBulkEditor {
  protected readonly licensed = nxProLicenseGranted();

  @Input() records: Record<string, unknown>[] = [];
  /** Which field on each record to display in the affected-records preview list. */
  @Input() recordLabelKey = 'name';
  @Input() fields: NxBulkEditorField[] = [];

  // Backed by a signal (not a plain field): the setter below needs to run real side-effecting
  // logic (resetting the draft) on every false->true transition, not just store a value.
  private readonly openSignal = signal(false);
  @Input()
  get open(): boolean {
    return this.openSignal();
  }
  set open(value: boolean) {
    const next = !!value;
    const wasOpen = this.openSignal();
    this.openSignal.set(next);
    if (next && !wasOpen) {
      this.resetDraft();
    }
  }
  @Output() openChange = new EventEmitter<boolean>();

  @Output() apply = new EventEmitter<NxBulkEditorChange[]>();
  @Output() cancel = new EventEmitter<void>();

  /** Keys of the fields the admin has explicitly opted into applying. */
  protected readonly appliedKeys = signal<Set<string>>(new Set());
  /** Draft value typed/picked for each field, keyed by field.key - kept even for fields not yet applied. */
  protected readonly draftValues = signal<Record<string, unknown>>({});

  protected isApplied(key: string): boolean {
    return this.appliedKeys().has(key);
  }

  protected toggleApply(key: string, checked: boolean): void {
    this.appliedKeys.update((set) => {
      const next = new Set(set);
      checked ? next.add(key) : next.delete(key);
      return next;
    });
  }

  protected setDraftValue(key: string, value: unknown): void {
    this.draftValues.update((values) => ({ ...values, [key]: value }));
  }

  /** Display label for one affected record in the preview chip list. */
  protected recordLabel(record: Record<string, unknown>): string {
    const value = record[this.recordLabelKey] ?? record['id'] ?? record['name'];
    return value != null ? String(value) : '(unnamed record)';
  }

  protected applyChanges(): void {
    const applied = this.appliedKeys();
    const values = this.draftValues();
    const payload: NxBulkEditorChange[] = this.fields
      .filter((field) => applied.has(field.key))
      .map((field) => ({ fieldKey: field.key, value: values[field.key] }));

    this.apply.emit(payload);
    this.setOpen(false);
  }

  protected handleCancel(): void {
    this.cancel.emit();
    this.setOpen(false);
  }

  private setOpen(value: boolean): void {
    this.open = value;
    this.openChange.emit(value);
  }

  private resetDraft(): void {
    this.appliedKeys.set(new Set());
    const defaults: Record<string, unknown> = {};
    for (const field of this.fields) {
      defaults[field.key] = this.defaultValueFor(field);
    }
    this.draftValues.set(defaults);
  }

  private defaultValueFor(field: NxBulkEditorField): unknown {
    switch (field.type) {
      case 'checkbox':
        return false;
      case 'number':
        return null;
      case 'select':
        return '';
      case 'date':
        return '';
      default:
        return '';
    }
  }
}
