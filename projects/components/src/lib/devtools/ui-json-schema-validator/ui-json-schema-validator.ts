import { Component, EventEmitter, Input, OnInit, Output, signal } from '@angular/core';
import { NxIcon } from '../../data-display/ui-icon';
import { NxProLocked } from '../../licensing/ui-pro-locked/ui-pro-locked';
import { nxProLicenseGranted } from '../../licensing/nx-license';

/** A single JSON Schema node - deliberately a small subset (not the full JSON Schema spec). */
export interface NxJsonSchemaNode {
  type?: 'string' | 'number' | 'integer' | 'boolean' | 'object' | 'array' | 'null';
  required?: string[];
  properties?: Record<string, NxJsonSchemaNode>;
  items?: NxJsonSchemaNode;
  enum?: unknown[];
  minimum?: number;
  maximum?: number;
  minLength?: number;
  maxLength?: number;
}

export interface NxJsonSchemaValidationResult {
  valid: boolean;
  errors: string[];
}

function typeOf(value: unknown): string {
  if (value === null) return 'null';
  if (Array.isArray(value)) return 'array';
  return typeof value;
}

/**
 * Recursively validates `value` against `schema`, pushing human-readable error strings (prefixed
 * with the dotted/bracketed `path`) into `errors`. Hand-rolled - supports only the subset of JSON
 * Schema this component documents (type/required/properties/items/enum/minimum/maximum/
 * minLength/maxLength), not the full spec (no $ref, allOf/anyOf, patternProperties, etc).
 */
function validateNode(value: unknown, schema: NxJsonSchemaNode, path: string, errors: string[]): void {
  if (schema.type) {
    const actual = typeOf(value);
    const expected = schema.type === 'integer' ? 'number' : schema.type;
    const matchesType =
      actual === expected || (schema.type === 'integer' && actual === 'number' && Number.isInteger(value));
    if (!matchesType) {
      errors.push(`${path || 'value'}: must be of type ${schema.type}, got ${actual}`);
      return;
    }
  }

  if (schema.enum && !schema.enum.some((option) => JSON.stringify(option) === JSON.stringify(value))) {
    errors.push(`${path || 'value'}: must be one of ${schema.enum.map((o) => JSON.stringify(o)).join(', ')}`);
  }

  if (typeof value === 'number') {
    if (schema.minimum !== undefined && value < schema.minimum) {
      errors.push(`${path || 'value'}: must be >= ${schema.minimum}`);
    }
    if (schema.maximum !== undefined && value > schema.maximum) {
      errors.push(`${path || 'value'}: must be <= ${schema.maximum}`);
    }
  }

  if (typeof value === 'string') {
    if (schema.minLength !== undefined && value.length < schema.minLength) {
      errors.push(`${path || 'value'}: must have length >= ${schema.minLength}`);
    }
    if (schema.maxLength !== undefined && value.length > schema.maxLength) {
      errors.push(`${path || 'value'}: must have length <= ${schema.maxLength}`);
    }
  }

  if (schema.properties && typeOf(value) === 'object') {
    const obj = value as Record<string, unknown>;
    for (const key of schema.required ?? []) {
      if (!(key in obj)) {
        errors.push(`${path ? `${path}.${key}` : key}: is required`);
      }
    }
    for (const [key, childSchema] of Object.entries(schema.properties)) {
      if (key in obj) {
        validateNode(obj[key], childSchema, path ? `${path}.${key}` : key, errors);
      }
    }
  }

  if (schema.items && typeOf(value) === 'array') {
    (value as unknown[]).forEach((item, index) => {
      validateNode(item, schema.items as NxJsonSchemaNode, `${path || 'value'}[${index}]`, errors);
    });
  }
}

/**
 * Validates a JSON data document against a (small, hand-rolled subset of) JSON Schema document -
 * two textareas (schema + data), a "Validate" button, and a results panel listing human-readable
 * errors or a success state. No external JSON Schema library involved.
 */
@Component({
  selector: 'nx-json-schema-validator',
  standalone: true,
  imports: [NxIcon, NxProLocked],
  templateUrl: './ui-json-schema-validator.html',
  styleUrl: './ui-json-schema-validator.scss',
})
export class NxJsonSchemaValidator implements OnInit {
  protected readonly licensed = nxProLicenseGranted();

  @Input() schema = '';
  @Input() data = '';

  @Output() validated = new EventEmitter<NxJsonSchemaValidationResult>();

  protected readonly schemaText = signal('');
  protected readonly dataText = signal('');
  protected readonly result = signal<NxJsonSchemaValidationResult | null>(null);
  protected readonly parseError = signal<string | null>(null);

  ngOnInit(): void {
    this.schemaText.set(this.schema);
    this.dataText.set(this.data);
  }

  onSchemaChange(value: string): void {
    this.schemaText.set(value);
  }

  onDataChange(value: string): void {
    this.dataText.set(value);
  }

  validate(): void {
    this.parseError.set(null);
    this.result.set(null);

    let parsedSchema: NxJsonSchemaNode;
    let parsedData: unknown;

    try {
      parsedSchema = JSON.parse(this.schemaText() || '{}');
    } catch (err) {
      this.parseError.set(`Schema is not valid JSON: ${err instanceof Error ? err.message : 'parse error'}`);
      return;
    }

    try {
      parsedData = JSON.parse(this.dataText() || 'null');
    } catch (err) {
      this.parseError.set(`Data is not valid JSON: ${err instanceof Error ? err.message : 'parse error'}`);
      return;
    }

    const errors: string[] = [];
    validateNode(parsedData, parsedSchema, '', errors);
    const outcome: NxJsonSchemaValidationResult = { valid: errors.length === 0, errors };
    this.result.set(outcome);
    this.validated.emit(outcome);
  }
}
