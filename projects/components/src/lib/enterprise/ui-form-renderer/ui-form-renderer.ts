import { Component, EventEmitter, Input, Output, computed, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgTemplateOutlet } from '@angular/common';
import { NxProLocked } from '../../licensing/ui-pro-locked/ui-pro-locked';
import { nxProLicenseGranted } from '../../licensing/nx-license';
import {
  NxFormField,
  NxFormSchema,
  computeVisibilityMap,
  defaultFieldValue,
  flattenFields,
  validateFieldRules,
} from '../ui-form-builder';

/**
 * Renders an `NxFormSchema` as a real, interactive form for an end user to fill out - the
 * runtime counterpart to `NxFormBuilder`'s authoring canvas. `section` fields recurse (via a
 * self-referencing `ngTemplateOutlet`) into real nested `<fieldset>`s to any depth. A field's
 * `visibleWhen` condition is re-evaluated on every value change, cascading through ancestors: a
 * field nested inside a hidden section is never visible regardless of its own condition, and a
 * hidden field is skipped by validation entirely - it can never block submit. Validation runs on
 * blur and on submit attempt, showing an inline message below the field.
 */
@Component({
  selector: 'nx-form-renderer',
  standalone: true,
  imports: [FormsModule, NgTemplateOutlet, NxProLocked],
  templateUrl: './ui-form-renderer.html',
  styleUrl: './ui-form-renderer.scss',
})
export class NxFormRenderer {
  protected readonly licensed = nxProLicenseGranted();

  // Backed by a signal (not a plain field) so `visibilityMap`/`fieldsById` below - both
  // `computed()`s reading `this.schema` - actually re-run when the parent rebinds a new schema,
  // instead of permanently caching whatever they first saw on initial render. The setter also
  // reconciles `values`: fields that still exist keep whatever the user already typed, new fields
  // get their default, and removed fields are dropped.
  private readonly schemaSignal = signal<NxFormSchema>({ title: '', fields: [] });
  @Input()
  get schema(): NxFormSchema {
    return this.schemaSignal();
  }
  set schema(value: NxFormSchema) {
    const next = value ?? { title: '', fields: [] };
    this.schemaSignal.set(next);
    const current = this.values();
    const merged: Record<string, unknown> = {};
    for (const field of flattenFields(next.fields)) {
      if (field.type === 'section') continue;
      merged[field.id] = Object.prototype.hasOwnProperty.call(current, field.id) ? current[field.id] : defaultFieldValue(field);
    }
    this.values.set(merged);
    this.valuesChange.emit({ ...merged });
    const ids = new Set(Object.keys(merged));
    this.touched.update((set) => new Set([...set].filter((id) => ids.has(id))));
  }

  @Output() valuesChange = new EventEmitter<Record<string, unknown>>();
  @Output() submit = new EventEmitter<Record<string, unknown>>();

  protected readonly values = signal<Record<string, unknown>>({});
  protected readonly touched = signal<Set<string>>(new Set());
  protected readonly submitAttempted = signal(false);

  protected readonly visibilityMap = computed(() => computeVisibilityMap(this.schema.fields, this.values()));

  protected readonly fieldsById = computed<Map<string, NxFormField>>(() => {
    const map = new Map<string, NxFormField>();
    for (const field of flattenFields(this.schema.fields)) map.set(field.id, field);
    return map;
  });

  protected isVisible(fieldId: string): boolean {
    return this.visibilityMap().get(fieldId) ?? true;
  }

  protected setValue(fieldId: string, value: unknown): void {
    this.values.update((values) => ({ ...values, [fieldId]: value }));
    this.valuesChange.emit({ ...this.values() });
  }

  protected onBlur(fieldId: string): void {
    this.touched.update((set) => new Set(set).add(fieldId));
  }

  protected fieldError(fieldId: string): string | null {
    if (!this.touched().has(fieldId) && !this.submitAttempted()) return null;
    if (!this.isVisible(fieldId)) return null;
    const field = this.fieldsById().get(fieldId);
    if (!field) return null;
    return validateFieldRules(this.values()[fieldId], field.validations);
  }

  protected handleSubmit(): void {
    this.submitAttempted.set(true);
    const visibility = this.visibilityMap();
    const values = this.values();
    const hasError = flattenFields(this.schema.fields)
      .filter((f) => f.type !== 'section')
      .some((f) => (visibility.get(f.id) ?? true) && !!validateFieldRules(values[f.id], f.validations));
    if (!hasError) {
      this.submit.emit({ ...values });
    }
  }
}
