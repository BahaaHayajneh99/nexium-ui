import { Component, EventEmitter, Input, Output, computed, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NxIcon } from '../../data-display/ui-icon';
import { NxProLocked } from '../../licensing/ui-pro-locked/ui-pro-locked';
import { nxProLicenseGranted } from '../../licensing/nx-license';

export type NxFormFieldType = 'text' | 'textarea' | 'number' | 'email' | 'select' | 'checkbox' | 'radio' | 'date' | 'section';

export interface NxFormFieldCondition {
  /** Another field's `id` in the same schema. */
  fieldId: string;
  operator: 'equals' | 'notEquals' | 'isEmpty' | 'isNotEmpty';
  value?: string;
}

export interface NxFormValidationRule {
  type: 'required' | 'minLength' | 'maxLength' | 'pattern' | 'min' | 'max';
  /** Threshold for minLength/maxLength/min/max, or the regex source for pattern. */
  value?: number | string;
  message?: string;
}

export interface NxFormField {
  id: string;
  type: NxFormFieldType;
  label: string;
  placeholder?: string;
  /** For `select`/`radio` only. */
  options?: { label: string; value: string }[];
  validations?: NxFormValidationRule[];
  /** Conditional visibility - omit to always show this field. */
  visibleWhen?: NxFormFieldCondition;
  /** Only for type `'section'` - a nested group of fields, arbitrary depth. */
  fields?: NxFormField[];
}

export interface NxFormSchema {
  title: string;
  fields: NxFormField[];
}

export interface NxFormBuilderRow {
  field: NxFormField;
  depth: number;
  /** The containing section's id, or `null` for a root-level field. */
  parentId: string | null;
  /** This field's index within its parent's `fields` array (or the schema's root `fields`). */
  index: number;
}

type NxFormBuilderDragPayload = { kind: 'new'; fieldType: NxFormFieldType } | { kind: 'move'; fieldId: string };
type NxFormBuilderDropPosition = 'before' | 'after' | 'inside';

const FIELD_PALETTE: { type: NxFormFieldType; label: string; icon: string }[] = [
  { type: 'text', label: 'Text', icon: 'nx-edit' },
  { type: 'textarea', label: 'Textarea', icon: 'nx-list' },
  { type: 'number', label: 'Number', icon: 'nx-chart-bar' },
  { type: 'email', label: 'Email', icon: 'nx-mail' },
  { type: 'select', label: 'Select', icon: 'nx-chevron-down' },
  { type: 'checkbox', label: 'Checkbox', icon: 'nx-check' },
  { type: 'radio', label: 'Radio', icon: 'nx-check-circle' },
  { type: 'date', label: 'Date', icon: 'nx-calendar' },
  { type: 'section', label: 'Section / Group', icon: 'nx-folder' },
];

let idCounter = 0;
function nextFieldId(): string {
  idCounter += 1;
  return `field-${Date.now()}-${idCounter}`;
}

function defaultLabelFor(type: NxFormFieldType): string {
  switch (type) {
    case 'text':
      return 'Text Field';
    case 'textarea':
      return 'Text Area';
    case 'number':
      return 'Number';
    case 'email':
      return 'Email';
    case 'select':
      return 'Select';
    case 'checkbox':
      return 'Checkbox';
    case 'radio':
      return 'Radio';
    case 'date':
      return 'Date';
    case 'section':
      return 'Section';
  }
}

function defaultFieldFor(type: NxFormFieldType): NxFormField {
  const field: NxFormField = { id: nextFieldId(), type, label: defaultLabelFor(type) };
  if (type === 'select' || type === 'radio') {
    field.options = [
      { label: 'Option 1', value: 'option-1' },
      { label: 'Option 2', value: 'option-2' },
    ];
  }
  if (type === 'section') {
    field.fields = [];
  }
  return field;
}

/** Depth-first flatten of a field tree, sections included alongside their descendants. */
export function flattenFields(fields: NxFormField[]): NxFormField[] {
  const out: NxFormField[] = [];
  for (const field of fields) {
    out.push(field);
    if (field.type === 'section' && field.fields) {
      out.push(...flattenFields(field.fields));
    }
  }
  return out;
}

export function findFieldById(fields: NxFormField[], id: string): NxFormField | null {
  for (const field of fields) {
    if (field.id === id) return field;
    if (field.fields) {
      const found = findFieldById(field.fields, id);
      if (found) return found;
    }
  }
  return null;
}

/** True when `candidateId` identifies `ancestor` itself or any of its nested descendants. */
function isSelfOrDescendant(ancestor: NxFormField, candidateId: string): boolean {
  if (ancestor.id === candidateId) return true;
  for (const child of ancestor.fields ?? []) {
    if (isSelfOrDescendant(child, candidateId)) return true;
  }
  return false;
}

function removeFieldById(fields: NxFormField[], id: string): { fields: NxFormField[]; removed: NxFormField | null } {
  let removed: NxFormField | null = null;
  const next: NxFormField[] = [];
  for (const field of fields) {
    if (field.id === id) {
      removed = field;
      continue;
    }
    if (field.fields) {
      const result = removeFieldById(field.fields, id);
      if (result.removed) removed = result.removed;
      next.push({ ...field, fields: result.fields });
    } else {
      next.push(field);
    }
  }
  return { fields: next, removed };
}

function insertFieldAt(fields: NxFormField[], parentId: string | null, index: number, field: NxFormField): NxFormField[] {
  if (parentId === null) {
    const next = [...fields];
    next.splice(Math.max(0, Math.min(index, next.length)), 0, field);
    return next;
  }
  return fields.map((f) => {
    if (f.id === parentId) {
      const children = [...(f.fields ?? [])];
      children.splice(Math.max(0, Math.min(index, children.length)), 0, field);
      return { ...f, fields: children };
    }
    if (f.fields) {
      return { ...f, fields: insertFieldAt(f.fields, parentId, index, field) };
    }
    return f;
  });
}

function updateFieldById(fields: NxFormField[], id: string, patch: Partial<NxFormField>): NxFormField[] {
  return fields.map((field) => {
    if (field.id === id) return { ...field, ...patch };
    if (field.fields) return { ...field, fields: updateFieldById(field.fields, id, patch) };
    return field;
  });
}

function flattenRows(fields: NxFormField[], depth: number, parentId: string | null, rows: NxFormBuilderRow[]): void {
  fields.forEach((field, index) => {
    rows.push({ field, depth, parentId, index });
    if (field.type === 'section') {
      flattenRows(field.fields ?? [], depth + 1, field.id, rows);
    }
  });
}

/** Evaluates one field's `visibleWhen` condition against the current value map. Always true when there's no condition. */
export function isFieldVisible(field: NxFormField, values: Record<string, unknown>): boolean {
  const condition = field.visibleWhen;
  if (!condition) return true;
  const raw = values[condition.fieldId];
  const str = raw === null || raw === undefined ? '' : String(raw);
  switch (condition.operator) {
    case 'equals':
      return str === (condition.value ?? '');
    case 'notEquals':
      return str !== (condition.value ?? '');
    case 'isEmpty':
      return str.trim() === '';
    case 'isNotEmpty':
      return str.trim() !== '';
    default:
      return true;
  }
}

/**
 * Walks the whole tree once, combining each field's own `visibleWhen` with its ancestors' -
 * a field nested inside a hidden section is never visible, regardless of its own condition.
 */
export function computeVisibilityMap(
  fields: NxFormField[],
  values: Record<string, unknown>,
  parentVisible = true,
  map: Map<string, boolean> = new Map(),
): Map<string, boolean> {
  for (const field of fields) {
    const visible = parentVisible && isFieldVisible(field, values);
    map.set(field.id, visible);
    if (field.type === 'section' && field.fields) {
      computeVisibilityMap(field.fields, values, visible, map);
    }
  }
  return map;
}

function defaultMessageForRule(type: NxFormValidationRule['type']): string {
  switch (type) {
    case 'required':
      return 'This field is required.';
    case 'minLength':
      return 'Too short.';
    case 'maxLength':
      return 'Too long.';
    case 'pattern':
      return 'Value does not match the required format.';
    case 'min':
      return 'Value is below the minimum.';
    case 'max':
      return 'Value is above the maximum.';
  }
}

/** First failing validation message for `value`, or `null` when every rule passes (or there are none). */
export function validateFieldRules(value: unknown, validations?: NxFormValidationRule[]): string | null {
  if (!validations || validations.length === 0) return null;
  const str = value === null || value === undefined ? '' : String(value);
  for (const rule of validations) {
    const message = rule.message?.trim() || defaultMessageForRule(rule.type);
    switch (rule.type) {
      case 'required':
        if (value === undefined || value === null || value === false || str.trim() === '') return message;
        break;
      case 'minLength':
        if (str.length < Number(rule.value ?? 0)) return message;
        break;
      case 'maxLength':
        if (str.trim() !== '' && str.length > Number(rule.value ?? Infinity)) return message;
        break;
      case 'pattern':
        if (str.trim() !== '' && !new RegExp(String(rule.value ?? '')).test(str)) return message;
        break;
      case 'min':
        if (str.trim() !== '' && Number(str) < Number(rule.value)) return message;
        break;
      case 'max':
        if (str.trim() !== '' && Number(str) > Number(rule.value)) return message;
        break;
    }
  }
  return null;
}

export function defaultFieldValue(field: NxFormField): unknown {
  return field.type === 'checkbox' ? false : '';
}

/**
 * A visual, drag-and-drop authoring tool for an `NxFormSchema` - the admin/power-user side of
 * form building. Palette items drag onto the canvas to add fields; existing canvas rows drag to
 * reorder (before/after a sibling) or, when hovered over the middle of a Section row, to nest
 * inside it - sections may nest other sections to any depth. Clicking a row opens an inspector
 * for its label/placeholder/options/validation rules/conditional visibility. A Preview toggle
 * swaps the canvas for a live, fillable rendering of the same schema (a simplified, flat-list
 * rendering - see `NxFormRenderer` for the real nested-fieldset end-user renderer). Export/Import
 * round-trip the schema as JSON via a file download/picker.
 */
@Component({
  selector: 'nx-form-builder',
  standalone: true,
  imports: [FormsModule, NxIcon, NxProLocked],
  templateUrl: './ui-form-builder.html',
  styleUrl: './ui-form-builder.scss',
})
export class NxFormBuilder {
  protected readonly licensed = nxProLicenseGranted();

  // Backed by a signal (not a plain field) so `rows`/`selectedField`/`referenceableFields` below -
  // all `computed()`s reading `this.schema` - actually re-run whenever the toolbar/inspector/drag-
  // drop handlers reassign it, instead of permanently caching whatever they first saw on initial
  // render.
  private readonly schemaSignal = signal<NxFormSchema>({ title: 'Untitled Form', fields: [] });
  @Input()
  get schema(): NxFormSchema {
    return this.schemaSignal();
  }
  set schema(value: NxFormSchema) {
    this.schemaSignal.set(value ?? { title: 'Untitled Form', fields: [] });
  }
  @Output() schemaChange = new EventEmitter<NxFormSchema>();

  protected readonly palette = FIELD_PALETTE;
  protected readonly validationTypes: NxFormValidationRule['type'][] = ['required', 'minLength', 'maxLength', 'pattern', 'min', 'max'];
  protected readonly conditionOperators: NxFormFieldCondition['operator'][] = ['equals', 'notEquals', 'isEmpty', 'isNotEmpty'];

  protected readonly previewMode = signal(false);
  protected readonly selectedFieldId = signal<string | null>(null);
  protected readonly importError = signal<string | null>(null);
  protected readonly newRuleType = signal<NxFormValidationRule['type']>('required');

  protected readonly dropIndicator = signal<{ rowId: string; position: NxFormBuilderDropPosition } | null>(null);
  protected readonly rootDropActive = signal(false);
  protected readonly emptySectionDropActive = signal<string | null>(null);
  private dragPayload: NxFormBuilderDragPayload | null = null;

  protected readonly rows = computed<NxFormBuilderRow[]>(() => {
    const rows: NxFormBuilderRow[] = [];
    flattenRows(this.schema.fields, 0, null, rows);
    return rows;
  });

  protected readonly selectedField = computed<NxFormField | null>(() => {
    const id = this.selectedFieldId();
    return id ? findFieldById(this.schema.fields, id) : null;
  });

  protected readonly referenceableFields = computed<NxFormField[]>(() => {
    const all = flattenFields(this.schema.fields).filter((f) => f.type !== 'section');
    const selected = this.selectedField();
    return selected ? all.filter((f) => f.id !== selected.id) : all;
  });

  // Preview-mode fill state - entirely separate from the editing state above.
  protected readonly previewValues = signal<Record<string, unknown>>({});
  protected readonly previewTouched = signal<Set<string>>(new Set());
  protected readonly previewSubmitted = signal(false);
  protected readonly previewSubmitResult = signal<string | null>(null);

  protected readonly previewVisibilityMap = computed(() => computeVisibilityMap(this.schema.fields, this.previewValues()));

  // --- Toolbar -------------------------------------------------------------

  protected updateTitle(title: string): void {
    this.applySchema({ ...this.schema, title });
  }

  protected togglePreview(): void {
    const next = !this.previewMode();
    if (next) {
      const defaults: Record<string, unknown> = {};
      for (const field of flattenFields(this.schema.fields)) {
        if (field.type !== 'section') defaults[field.id] = defaultFieldValue(field);
      }
      this.previewValues.set(defaults);
      this.previewTouched.set(new Set());
      this.previewSubmitted.set(false);
      this.previewSubmitResult.set(null);
      this.selectedFieldId.set(null);
    }
    this.previewMode.set(next);
  }

  protected exportJson(): void {
    const json = JSON.stringify(this.schema, null, 2);
    const blob = new Blob([json], { type: 'application/json;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${(this.schema.title || 'form-schema').trim().toLowerCase().replace(/\s+/g, '-') || 'form-schema'}.json`;
    link.click();
    URL.revokeObjectURL(url);
  }

  protected onImportFile(fileList: FileList | null): void {
    const file = fileList?.[0];
    if (!file) return;
    this.importError.set(null);
    file
      .text()
      .then((text) => {
        let parsed: unknown;
        try {
          parsed = JSON.parse(text);
        } catch {
          this.importError.set('Could not import file: malformed JSON.');
          return;
        }
        if (!parsed || typeof parsed !== 'object' || typeof (parsed as NxFormSchema).title !== 'string' || !Array.isArray((parsed as NxFormSchema).fields)) {
          this.importError.set('Could not import file: not a valid form schema (expected { title, fields }).');
          return;
        }
        this.applySchema(parsed as NxFormSchema);
        this.selectedFieldId.set(null);
      })
      .catch(() => this.importError.set('Could not read the selected file.'));
  }

  // --- Palette / canvas ------------------------------------------------------

  protected addFieldFromPalette(type: NxFormFieldType): void {
    const field = defaultFieldFor(type);
    const selected = this.selectedField();
    if (selected && selected.type === 'section') {
      this.applySchema({ ...this.schema, fields: insertFieldAt(this.schema.fields, selected.id, selected.fields?.length ?? 0, field) });
    } else {
      this.applySchema({ ...this.schema, fields: [...this.schema.fields, field] });
    }
    this.selectedFieldId.set(field.id);
  }

  protected selectField(id: string): void {
    this.selectedFieldId.set(id);
  }

  protected deleteField(id: string): void {
    const { fields } = removeFieldById(this.schema.fields, id);
    this.applySchema({ ...this.schema, fields });
    const selected = this.selectedFieldId();
    if (selected && !findFieldById(fields, selected)) {
      this.selectedFieldId.set(null);
    }
  }

  protected isDropIndicator(fieldId: string, position: NxFormBuilderDropPosition): boolean {
    const indicator = this.dropIndicator();
    return !!indicator && indicator.rowId === fieldId && indicator.position === position;
  }

  // --- Drag and drop -----------------------------------------------------

  protected onPaletteDragStart(event: DragEvent, fieldType: NxFormFieldType): void {
    this.dragPayload = { kind: 'new', fieldType };
    event.dataTransfer?.setData('text/plain', fieldType);
    if (event.dataTransfer) event.dataTransfer.effectAllowed = 'copy';
  }

  protected onRowDragStart(event: DragEvent, row: NxFormBuilderRow): void {
    this.dragPayload = { kind: 'move', fieldId: row.field.id };
    event.dataTransfer?.setData('text/plain', row.field.id);
    if (event.dataTransfer) event.dataTransfer.effectAllowed = 'move';
  }

  protected onDragEnd(): void {
    this.dragPayload = null;
    this.dropIndicator.set(null);
    this.rootDropActive.set(false);
    this.emptySectionDropActive.set(null);
  }

  protected onRowDragOver(event: DragEvent, row: NxFormBuilderRow): void {
    if (!this.dragPayload) return;
    event.preventDefault();
    const target = event.currentTarget as HTMLElement;
    const rect = target.getBoundingClientRect();
    const ratio = rect.height > 0 ? (event.clientY - rect.top) / rect.height : 0.5;
    let position: NxFormBuilderDropPosition;
    if (row.field.type === 'section' && ratio > 0.3 && ratio < 0.7 && this.canNestInto(row.field.id)) {
      position = 'inside';
    } else {
      position = ratio < 0.5 ? 'before' : 'after';
    }
    this.dropIndicator.set({ rowId: row.field.id, position });
  }

  protected onRowDragLeave(): void {
    this.dropIndicator.set(null);
  }

  protected onRowDrop(event: DragEvent, row: NxFormBuilderRow): void {
    event.preventDefault();
    const indicator = this.dropIndicator();
    const payload = this.dragPayload;
    this.dropIndicator.set(null);
    this.dragPayload = null;
    if (!payload || !indicator) return;
    if (payload.kind === 'move' && payload.fieldId === row.field.id) return;

    let parentId: string | null;
    let index: number;
    if (indicator.position === 'inside') {
      parentId = row.field.id;
      index = row.field.fields?.length ?? 0;
    } else {
      parentId = row.parentId;
      index = indicator.position === 'before' ? row.index : row.index + 1;
    }
    this.performDrop(payload, parentId, index);
  }

  protected onRootDragOver(event: DragEvent): void {
    if (!this.dragPayload) return;
    event.preventDefault();
    this.rootDropActive.set(true);
  }

  protected onRootDragLeave(): void {
    this.rootDropActive.set(false);
  }

  protected onRootDrop(event: DragEvent): void {
    event.preventDefault();
    this.rootDropActive.set(false);
    const payload = this.dragPayload;
    this.dragPayload = null;
    if (!payload) return;
    this.performDrop(payload, null, this.schema.fields.length);
  }

  protected onSectionEmptyDragOver(event: DragEvent, sectionId: string): void {
    if (!this.dragPayload) return;
    event.preventDefault();
    this.emptySectionDropActive.set(sectionId);
  }

  protected onSectionEmptyDragLeave(): void {
    this.emptySectionDropActive.set(null);
  }

  protected onSectionEmptyDrop(event: DragEvent, sectionId: string): void {
    event.preventDefault();
    this.emptySectionDropActive.set(null);
    const payload = this.dragPayload;
    this.dragPayload = null;
    if (!payload) return;
    this.performDrop(payload, sectionId, 0);
  }

  private canNestInto(sectionId: string): boolean {
    if (!this.dragPayload) return false;
    if (this.dragPayload.kind === 'new') return true;
    if (this.dragPayload.fieldId === sectionId) return false;
    const moving = findFieldById(this.schema.fields, this.dragPayload.fieldId);
    return !moving || !isSelfOrDescendant(moving, sectionId);
  }

  /** Shared landing point for every drop target (a row's before/after/inside zone, the root append zone, or an empty section). */
  private performDrop(payload: NxFormBuilderDragPayload, parentId: string | null, index: number): void {
    if (payload.kind === 'new') {
      const field = defaultFieldFor(payload.fieldType);
      this.applySchema({ ...this.schema, fields: insertFieldAt(this.schema.fields, parentId, index, field) });
      this.selectedFieldId.set(field.id);
      return;
    }

    if (payload.fieldId === parentId) return;
    const movingField = findFieldById(this.schema.fields, payload.fieldId);
    if (!movingField) return;
    if (parentId && isSelfOrDescendant(movingField, parentId)) return;

    const sourceRow = this.rows().find((r) => r.field.id === payload.fieldId);
    let targetIndex = index;
    if (sourceRow && sourceRow.parentId === parentId && sourceRow.index < index) {
      targetIndex = index - 1;
    }

    const { fields: withoutMoved, removed } = removeFieldById(this.schema.fields, payload.fieldId);
    if (!removed) return;
    this.applySchema({ ...this.schema, fields: insertFieldAt(withoutMoved, parentId, targetIndex, removed) });
  }

  // --- Inspector -----------------------------------------------------------

  protected updateSelectedField(patch: Partial<NxFormField>): void {
    const id = this.selectedFieldId();
    if (!id) return;
    this.applySchema({ ...this.schema, fields: updateFieldById(this.schema.fields, id, patch) });
  }

  protected addOption(): void {
    const field = this.selectedField();
    if (!field) return;
    const options = [...(field.options ?? [])];
    const n = options.length + 1;
    options.push({ label: `Option ${n}`, value: `option-${n}` });
    this.updateSelectedField({ options });
  }

  protected updateOption(index: number, patch: Partial<{ label: string; value: string }>): void {
    const field = this.selectedField();
    if (!field?.options) return;
    this.updateSelectedField({ options: field.options.map((o, i) => (i === index ? { ...o, ...patch } : o)) });
  }

  protected removeOption(index: number): void {
    const field = this.selectedField();
    if (!field?.options) return;
    this.updateSelectedField({ options: field.options.filter((_, i) => i !== index) });
  }

  protected ruleNeedsValue(type: NxFormValidationRule['type']): boolean {
    return type === 'minLength' || type === 'maxLength' || type === 'pattern' || type === 'min' || type === 'max';
  }

  protected addValidationRule(): void {
    const field = this.selectedField();
    if (!field) return;
    const rule: NxFormValidationRule = { type: this.newRuleType() };
    this.updateSelectedField({ validations: [...(field.validations ?? []), rule] });
  }

  protected updateValidationRule(index: number, patch: Partial<NxFormValidationRule>): void {
    const field = this.selectedField();
    if (!field?.validations) return;
    this.updateSelectedField({ validations: field.validations.map((r, i) => (i === index ? { ...r, ...patch } : r)) });
  }

  protected removeValidationRule(index: number): void {
    const field = this.selectedField();
    if (!field?.validations) return;
    this.updateSelectedField({ validations: field.validations.filter((_, i) => i !== index) });
  }

  protected conditionNeedsValue(operator?: NxFormFieldCondition['operator']): boolean {
    return operator === 'equals' || operator === 'notEquals';
  }

  protected updateConditionField(fieldId: string): void {
    if (!fieldId) {
      this.updateSelectedField({ visibleWhen: undefined });
      return;
    }
    const current = this.selectedField()?.visibleWhen;
    this.updateSelectedField({ visibleWhen: { fieldId, operator: current?.operator ?? 'equals', value: current?.value } });
  }

  protected updateConditionOperator(operator: NxFormFieldCondition['operator']): void {
    const current = this.selectedField()?.visibleWhen;
    if (!current) return;
    this.updateSelectedField({ visibleWhen: { ...current, operator } });
  }

  protected updateConditionValue(value: string): void {
    const current = this.selectedField()?.visibleWhen;
    if (!current) return;
    this.updateSelectedField({ visibleWhen: { ...current, value } });
  }

  protected clearCondition(): void {
    this.updateSelectedField({ visibleWhen: undefined });
  }

  // --- Preview mode --------------------------------------------------------

  protected previewVisible(fieldId: string): boolean {
    return this.previewVisibilityMap().get(fieldId) ?? true;
  }

  protected previewValueChange(fieldId: string, value: unknown): void {
    this.previewValues.update((values) => ({ ...values, [fieldId]: value }));
  }

  protected previewBlur(fieldId: string): void {
    this.previewTouched.update((set) => new Set(set).add(fieldId));
  }

  protected previewFieldError(fieldId: string): string | null {
    if (!this.previewTouched().has(fieldId) && !this.previewSubmitted()) return null;
    if (!this.previewVisible(fieldId)) return null;
    const field = flattenFields(this.schema.fields).find((f) => f.id === fieldId);
    return field ? validateFieldRules(this.previewValues()[fieldId], field.validations) : null;
  }

  protected submitPreview(): void {
    this.previewSubmitted.set(true);
    const visibility = this.previewVisibilityMap();
    const values = this.previewValues();
    const hasError = flattenFields(this.schema.fields)
      .filter((f) => f.type !== 'section')
      .some((f) => (visibility.get(f.id) ?? true) && !!validateFieldRules(values[f.id], f.validations));
    this.previewSubmitResult.set(hasError ? 'This form has validation errors.' : 'This form is valid - preview only, nothing was actually submitted.');
  }

  private applySchema(next: NxFormSchema): void {
    this.schema = next;
    this.schemaChange.emit(next);
  }
}
