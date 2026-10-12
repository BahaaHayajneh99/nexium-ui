import { Component, EventEmitter, Input, OnChanges, Output, QueryList, SimpleChanges, ViewChildren, booleanAttribute, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NxInput } from '../../forms/ui-input/ui-input';
import { NxSelect, NxSelectOption } from '../../forms/ui-select/ui-select';
import { NxCheckbox } from '../../forms/ui-checkbox/ui-checkbox';
import { NxTextarea } from '../../forms/ui-textarea/ui-textarea';
import { NxNumber } from '../../forms/ui-number/ui-number';
import { NxButton } from '../../forms/ui-button/ui-button';
import { NxProLocked } from '../../licensing/ui-pro-locked/ui-pro-locked';
import { nxProLicenseGranted } from '../../licensing/nx-license';

/** The kind of control a field renders as. */
export type NxJSONSchemaFieldType = 'string' | 'email' | 'number' | 'boolean' | 'select' | 'textarea';

/**
 * One field's definition. This is a deliberately small, NexiumUI-flavored shape "inspired by"
 * JSON Schema - not an implementation of the JSON Schema standard - so a plain object literal is
 * enough to describe a whole form, e.g.:
 *
 * ```ts
 * {
 *   name: { type: 'string', label: 'Name', required: true },
 *   email: { type: 'email', label: 'Email', required: true },
 *   age: { type: 'number', label: 'Age' },
 *   role: { type: 'select', label: 'Role', options: ['Admin', 'Editor', 'Viewer'] },
 * }
 * ```
 */
export interface NxJSONSchemaField {
  /** Which control renders for this field: text/email/number inputs, a checkbox, a select, or a multiline textarea. */
  type: NxJSONSchemaFieldType;
  /** Shown as the field's label; falls back to the field's key if omitted. */
  label?: string;
  /** When true, the field must have a value (a checked box, for booleans) before submit succeeds. */
  required?: boolean;
  /** Placeholder text for string/email/number/textarea/select fields. */
  placeholder?: string;
  /** Options for `type: 'select'` - either plain strings (used as both label and value) or explicit `{ label, value }` pairs. */
  options?: Array<string | NxSelectOption>;
  /** Pre-fills the field when neither `initialValue` nor an existing form value supplies one. */
  defaultValue?: string | number | boolean | null;
  /** Row count for `type: 'textarea'` (default 4). */
  rows?: number;
  /** Overrides the default "this field is required" message shown once the field is touched or submit is attempted. */
  requiredErrorMessage?: string;
}

/** A schema is just a map of field name -> field definition, rendered in key order. */
export type NxJSONSchema = Record<string, NxJSONSchemaField>;

function defaultValueFor(field: NxJSONSchemaField): unknown {
  if (field.defaultValue !== undefined) {
    return field.defaultValue;
  }
  if (field.type === 'boolean') {
    return false;
  }
  if (field.type === 'number') {
    return null;
  }
  return '';
}

function normalizeOptions(options: Array<string | NxSelectOption> | undefined): NxSelectOption[] {
  return (options ?? []).map((option) => (typeof option === 'string' ? { label: option, value: option } : option));
}

/** Shape every rendered primitive (`nx-input`/`nx-select`/`nx-checkbox`/`nx-textarea`/`nx-number`) satisfies - used to force validation display on submit without caring which type a given field rendered as. */
interface NxValidatableControl {
  touched: boolean;
  readonly displayError: string;
}

/**
 * Generates a real, interactive form from a lightweight field-definition object (`NxJSONSchema`) -
 * one real `nx-input`/`nx-select`/`nx-checkbox`/`nx-textarea`/`nx-number` per field, wired to an
 * assembled value object that's emitted on every change via `valueChange`. Required fields are
 * validated using each primitive's own built-in required-field handling (so errors already show on
 * blur for free); submitting additionally force-touches every field so nothing untouched can hide
 * an error, and `submit` only fires once every field passes.
 */
@Component({
  selector: 'nx-json-schema-form',
  standalone: true,
  imports: [FormsModule, NxInput, NxSelect, NxCheckbox, NxTextarea, NxNumber, NxButton, NxProLocked],
  templateUrl: './ui-json-schema-form.html',
  styleUrl: './ui-json-schema-form.scss',
})
export class NxJSONSchemaForm implements OnChanges {
  protected readonly licensed = nxProLicenseGranted();

  @Input() schema: NxJSONSchema = {};
  /** Pre-populates the form. Only used for keys that don't already have a value (e.g. from a previous schema change). */
  @Input() initialValue: Record<string, unknown> | null = null;
  @Input() submitLabel = 'Submit';
  @Input({ transform: booleanAttribute }) showSubmitButton = true;

  /** Emits the full assembled `{ [fieldName]: value }` object on every field change. */
  @Output() valueChange = new EventEmitter<Record<string, unknown>>();
  /** Emits the assembled value object once every field passes required-field validation. */
  @Output() submit = new EventEmitter<Record<string, unknown>>();

  protected readonly values = signal<Record<string, unknown>>({});
  protected readonly submitAttempted = signal(false);
  protected fieldKeys: string[] = [];

  @ViewChildren('ctrl') private controls?: QueryList<NxValidatableControl>;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['schema'] || changes['initialValue']) {
      this.rebuildValues();
    }
  }

  protected field(key: string): NxJSONSchemaField {
    return this.schema[key];
  }

  protected selectOptions(field: NxJSONSchemaField): NxSelectOption[] {
    return normalizeOptions(field.options);
  }

  protected asString(value: unknown): string {
    return value === null || value === undefined ? '' : String(value);
  }

  protected asNumber(value: unknown): number | null {
    return typeof value === 'number' ? value : value === null || value === undefined || value === '' ? null : Number(value);
  }

  protected asBoolean(value: unknown): boolean {
    return !!value;
  }

  protected setValue(key: string, value: unknown): void {
    this.values.update((current) => ({ ...current, [key]: value }));
    this.valueChange.emit({ ...this.values() });
  }

  protected handleSubmit(): void {
    this.submitAttempted.set(true);
    this.controls?.forEach((control) => (control.touched = true));
    const hasError = this.controls ? this.controls.some((control) => !!control.displayError) : false;
    if (!hasError) {
      this.submit.emit({ ...this.values() });
    }
  }

  private rebuildValues(): void {
    const schema = this.schema ?? {};
    const initial = this.initialValue ?? {};
    const current = this.values();
    const merged: Record<string, unknown> = {};
    for (const key of Object.keys(schema)) {
      if (Object.prototype.hasOwnProperty.call(current, key)) {
        merged[key] = current[key];
      } else if (Object.prototype.hasOwnProperty.call(initial, key)) {
        merged[key] = initial[key];
      } else {
        merged[key] = defaultValueFor(schema[key]);
      }
    }
    this.fieldKeys = Object.keys(schema);
    this.values.set(merged);
    this.valueChange.emit({ ...merged });
  }
}
