import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild,
  booleanAttribute,
  forwardRef,
} from '@angular/core';
import {
  AbstractControl,
  ControlValueAccessor,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  ValidationErrors,
  Validator,
} from '@angular/forms';
import { NxProLocked } from '../../licensing/ui-pro-locked/ui-pro-locked';
import { nxProLicenseGranted } from '../../licensing/nx-license';

export interface NxFormulaField {
  /** The identifier typed between the delimiters, e.g. `price` for `{{price}}`. */
  name: string;
  label: string;
}

export interface NxFormulaToken {
  name: string;
  label: string;
  /** False when the referenced name isn't in `fields` - shown as a flagged/unknown token. */
  known: boolean;
}

function escapeRegExp(text: string): string {
  return text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

/**
 * A single-line formula/expression input: typing the trigger (`{{` by
 * default) opens a suggestion list of `fields` to insert as `{{name}}`
 * references, and every reference currently in the value is surfaced below
 * as a resolved (or flagged-unknown) token chip. Same trigger/suggestion
 * interaction as `nx-mention`, but tokens need an explicit closing
 * delimiter rather than trailing whitespace, so formulas like
 * `{{price}}*{{qty}}` with no spaces between tokens still parse correctly.
 */
@Component({
  selector: 'nx-formula-input',
  standalone: true,
  imports: [NxProLocked],
  templateUrl: './ui-formula-input.html',
  styleUrl: './ui-formula-input.scss',
  host: {
    '(document:click)': 'onDocumentClick($event)',
  },
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => NxFormulaInput),
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => NxFormulaInput),
      multi: true,
    },
  ],
})
export class NxFormulaInput implements ControlValueAccessor, Validator {
  protected readonly licensed = nxProLicenseGranted();

  @Input() value = '';
  @Input() placeholder = 'Type {{ to insert a field...';
  @Input() fields: NxFormulaField[] = [];
  @Input() triggerOpen = '{{';
  @Input() triggerClose = '}}';
  @Input({ transform: booleanAttribute }) disabled = false;
  @Input({ transform: booleanAttribute }) showTokens = true;
  /** Manual error override - takes priority over the built-in required message. */
  @Input() error = '';
  /** Marks the field as required - shown once the field is touched. */
  @Input({ transform: booleanAttribute }) isRequired = false;
  @Input() requiredErrorMessage = 'This field is required';

  @Output() valueChange = new EventEmitter<string>();
  @Output() tokensChange = new EventEmitter<NxFormulaToken[]>();
  @Output() fieldInserted = new EventEmitter<NxFormulaField>();

  @ViewChild('inputRef') private inputRef!: ElementRef<HTMLInputElement>;

  open = false;
  activeIndex = 0;
  touched = false;

  private triggerIndex: number | null = null;
  private query = '';
  private onChangeFn: (value: string) => void = () => {};
  private onTouchedFn: () => void = () => {};
  private onValidatorChangeFn: () => void = () => {};

  constructor(private elementRef: ElementRef<HTMLElement>) {}

  get displayError(): string {
    if (this.error) {
      return this.error;
    }
    if (this.touched && this.isRequired && !this.value) {
      return this.requiredErrorMessage;
    }
    return '';
  }

  get filteredFields(): NxFormulaField[] {
    const query = this.query.toLowerCase();
    return this.fields
      .filter((field) => field.name.toLowerCase().includes(query) || field.label.toLowerCase().includes(query))
      .slice(0, 8);
  }

  /** Every `{{token}}` reference currently in the formula, resolved against `fields`. */
  get tokens(): NxFormulaToken[] {
    const pattern = new RegExp(`${escapeRegExp(this.triggerOpen)}(.*?)${escapeRegExp(this.triggerClose)}`, 'g');
    const found: NxFormulaToken[] = [];
    let match: RegExpExecArray | null;

    while ((match = pattern.exec(this.value))) {
      const name = match[1].trim();
      const field = this.fields.find((f) => f.name === name);
      found.push({ name, label: field ? field.label : name, known: !!field });
    }

    return found;
  }

  onInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.value = input.value;
    this.valueChange.emit(this.value);
    this.onChangeFn(this.value);
    this.tokensChange.emit(this.tokens);
    this.updateFormulaContext(input.selectionStart ?? this.value.length);
  }

  onKeydown(event: KeyboardEvent): void {
    if (!this.open || this.filteredFields.length === 0) {
      return;
    }

    if (event.key === 'ArrowDown') {
      event.preventDefault();
      this.activeIndex = (this.activeIndex + 1) % this.filteredFields.length;
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      this.activeIndex = (this.activeIndex - 1 + this.filteredFields.length) % this.filteredFields.length;
    } else if (event.key === 'Enter' || event.key === 'Tab') {
      event.preventDefault();
      this.insertField(this.filteredFields[this.activeIndex]);
    } else if (event.key === 'Escape') {
      this.open = false;
    }
  }

  insertField(field: NxFormulaField): void {
    const input = this.inputRef.nativeElement;
    const cursor = input.selectionStart ?? this.value.length;

    // Recomputed fresh from the live cursor/value rather than trusting
    // `this.triggerIndex` as cached from the last keystroke - that cache
    // can go stale (e.g. a mousedown on a suggestion landing a moment
    // after the underlying text or selection changed), which previously
    // could insert against the wrong position and duplicate a delimiter.
    const uptoCursor = this.value.slice(0, cursor);
    const triggerIndex = uptoCursor.lastIndexOf(this.triggerOpen);
    if (triggerIndex === -1) {
      return;
    }

    const before = this.value.slice(0, triggerIndex);
    const after = this.value.slice(cursor);
    const inserted = `${this.triggerOpen}${field.name}${this.triggerClose}`;

    this.value = `${before}${inserted}${after}`;
    this.valueChange.emit(this.value);
    this.onChangeFn(this.value);
    this.tokensChange.emit(this.tokens);
    this.fieldInserted.emit(field);
    this.open = false;
    this.triggerIndex = null;
    this.query = '';

    const nextCursor = before.length + inserted.length;
    queueMicrotask(() => {
      input.focus();
      input.setSelectionRange(nextCursor, nextCursor);
    });
  }

  onDocumentClick(event: MouseEvent): void {
    if (!this.elementRef.nativeElement.contains(event.target as Node)) {
      this.open = false;
    }
  }

  onBlur(): void {
    this.touched = true;
    this.onTouchedFn();
  }

  writeValue(value: string): void {
    this.value = value ?? '';
  }

  registerOnChange(fn: (value: string) => void): void {
    this.onChangeFn = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouchedFn = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  validate(control: AbstractControl): ValidationErrors | null {
    if (this.isRequired && !control.value) {
      return { required: true };
    }
    return null;
  }

  registerOnValidatorChange(fn: () => void): void {
    this.onValidatorChangeFn = fn;
  }

  private updateFormulaContext(cursor: number): void {
    const uptoCursor = this.value.slice(0, cursor);
    const triggerPos = uptoCursor.lastIndexOf(this.triggerOpen);

    if (triggerPos === -1) {
      this.open = false;
      this.triggerIndex = null;
      return;
    }

    // Already closed before the cursor, or whitespace crept in - the trigger
    // belongs to a finished (or abandoned) token, not one being typed now.
    const afterTrigger = uptoCursor.slice(triggerPos + this.triggerOpen.length);
    if (afterTrigger.includes(this.triggerClose) || /\s/.test(afterTrigger)) {
      this.open = false;
      this.triggerIndex = null;
      return;
    }

    this.triggerIndex = triggerPos;
    this.query = afterTrigger;
    this.activeIndex = 0;
    this.open = this.filteredFields.length > 0;
  }
}
