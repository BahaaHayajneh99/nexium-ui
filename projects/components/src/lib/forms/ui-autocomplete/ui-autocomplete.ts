import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild,
  booleanAttribute,
  forwardRef,
  numberAttribute,
} from '@angular/core';
import { NgClass } from '@angular/common';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

export interface NxAutocompleteOption {
  label: string;
  value: any;
  group?: string;
}

/** A plain string, a `{ label, value, group? }` object, or - with `bindLabel`/`bindValue` set - any object shape. */
export type NxAutocompleteOptionInput = string | Record<string, any>;

interface NxAutocompleteRow {
  type: 'group' | 'option';
  group?: string;
  option?: NxAutocompleteOption;
}

@Component({
  selector: 'nx-autocomplete',
  standalone: true,
  imports: [NgClass],
  templateUrl: './ui-autocomplete.html',
  styleUrl: './ui-autocomplete.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => NxAutocomplete),
      multi: true,
    },
  ],
})
export class NxAutocomplete implements ControlValueAccessor {
  @Input() label = '';
  @Input() placeholder = '';
  @Input() options: NxAutocompleteOptionInput[] = [];

  /** Property to read as the display label when `options` are arbitrary objects, e.g. `bindLabel="name"`. */
  @Input() bindLabel?: string;
  /** Property to read as the bound value when `options` are arbitrary objects, e.g. `bindValue="id"`. If omitted, the whole option object becomes the value. */
  @Input() bindValue?: string;

  @Input() values: any[] = [];
  @Input() variant: 'outlined' | 'filled' = 'outlined';
  @Input({ transform: booleanAttribute }) disabled = false;
  @Input({ transform: booleanAttribute }) multiple = false;
  @Input({ transform: booleanAttribute }) floatLabel = false;
  @Input({ transform: booleanAttribute }) showClear = false;
  @Input({ transform: booleanAttribute }) invalid = false;
  @Input({ transform: booleanAttribute }) virtualScroll = false;
  @Input({ transform: numberAttribute }) itemSize = 36;
  @Input({ transform: numberAttribute }) scrollHeight = 200;

  @Output() valueChange = new EventEmitter<any>();
  @Output() valuesChange = new EventEmitter<any[]>();

  @ViewChild('input') private inputRef?: ElementRef<HTMLInputElement>;

  showList = false;
  focused = false;
  query = '';
  scrollTop = 0;

  /** Text shown in the single-select input box - kept in sync with the selected option's label, or free-typed text when `bindLabel`/`bindValue` aren't set. */
  displayValue = '';

  private rawValue: any = '';

  @Input()
  set value(v: any) {
    this.rawValue = v;
    this.displayValue = this.labelForValue(v);
  }
  get value(): any {
    return this.rawValue;
  }

  // In `multiple` mode the CVA value is an array (matching `values`); in
  // single mode it's whatever `bindValue` resolves to (or the raw option/text
  // when `bindValue` isn't set) - writeValue picks the right shape based on
  // `multiple` at the time it's called.
  private onChangeFn: (value: any) => void = () => {};
  private onTouchedFn: () => void = () => {};

  private get isBoundToObjects(): boolean {
    return !!this.bindLabel || !!this.bindValue;
  }

  private toOption(raw: NxAutocompleteOptionInput): NxAutocompleteOption {
    if (typeof raw === 'string') {
      return { label: raw, value: raw };
    }

    if (this.isBoundToObjects) {
      const label = this.bindLabel ? String(raw[this.bindLabel] ?? '') : String(raw['label'] ?? '');
      const value = this.bindValue ? raw[this.bindValue] : raw;
      const group = typeof raw['group'] === 'string' ? raw['group'] : undefined;
      return { label, value, group };
    }

    return { label: String(raw['label'] ?? ''), value: raw['value'], group: raw['group'] };
  }

  private get normalizedOptions(): NxAutocompleteOption[] {
    return this.options.map((option) => this.toOption(option));
  }

  private labelForValue(value: any): string {
    if (value === null || value === undefined || value === '') {
      return typeof value === 'string' ? value : '';
    }

    const match = this.normalizedOptions.find((option) => option.value === value);
    if (match) {
      return match.label;
    }

    return typeof value === 'string' ? value : '';
  }

  /** Resolves a bound value (from `values`) back to its option's label, for chip display. */
  labelFor(value: any): string {
    const match = this.normalizedOptions.find((option) => option.value === value);
    return match ? match.label : String(value);
  }

  get filteredOptions(): NxAutocompleteOption[] {
    const query = (this.multiple ? this.query : this.displayValue).toLowerCase();
    return this.normalizedOptions.filter(
      (option) =>
        option.label.toLowerCase().includes(query) &&
        (!this.multiple || !this.values.includes(option.value))
    );
  }

  // Flattens filtered options into group-header + option rows, assuming
  // options sharing a `group` are listed contiguously in the source array.
  get rows(): NxAutocompleteRow[] {
    const rows: NxAutocompleteRow[] = [];
    const seenGroups = new Set<string>();

    for (const option of this.filteredOptions) {
      if (option.group && !seenGroups.has(option.group)) {
        seenGroups.add(option.group);
        rows.push({ type: 'group', group: option.group });
      }
      rows.push({ type: 'option', option });
    }

    return rows;
  }

  get visibleRows(): NxAutocompleteRow[] {
    if (!this.virtualScroll) {
      return this.rows;
    }

    const start = this.virtualStartIndex;
    const count = Math.ceil(this.scrollHeight / this.itemSize) + 4;
    return this.rows.slice(start, start + count);
  }

  get topSpacerHeight(): number {
    return this.virtualScroll ? this.virtualStartIndex * this.itemSize : 0;
  }

  get bottomSpacerHeight(): number {
    if (!this.virtualScroll) {
      return 0;
    }

    const count = Math.ceil(this.scrollHeight / this.itemSize) + 4;
    const end = this.virtualStartIndex + count;
    return Math.max(0, (this.rows.length - end) * this.itemSize);
  }

  get hasValue(): boolean {
    return this.multiple ? this.values.length > 0 || !!this.query : !!this.displayValue;
  }

  private get virtualStartIndex(): number {
    return Math.max(0, Math.floor(this.scrollTop / this.itemSize) - 2);
  }

  onInput(event: Event): void {
    const inputValue = (event.target as HTMLInputElement).value;

    if (this.multiple) {
      this.query = inputValue;
    } else {
      this.displayValue = inputValue;

      // Free-text mode (no bindLabel/bindValue): what's typed IS the value.
      // Object-bound mode: typing only filters - the value is set on selectOption/clear.
      if (!this.isBoundToObjects) {
        this.rawValue = inputValue;
        this.valueChange.emit(this.rawValue);
        this.onChangeFn(this.rawValue);
      }
    }

    this.showList = true;
  }

  onFocus(): void {
    this.focused = true;
    this.showList = true;
  }

  onBlur(): void {
    this.focused = false;
    this.onTouchedFn();
    setTimeout(() => (this.showList = false), 150);
  }

  onListScroll(event: Event): void {
    this.scrollTop = (event.target as HTMLElement).scrollTop;
  }

  focusInput(): void {
    this.inputRef?.nativeElement.focus();
  }

  selectOption(option: NxAutocompleteOption): void {
    if (this.multiple) {
      if (!this.values.includes(option.value)) {
        this.values = [...this.values, option.value];
        this.valuesChange.emit(this.values);
        this.onChangeFn(this.values);
      }
      this.query = '';
    } else {
      this.rawValue = option.value;
      this.displayValue = option.label;
      this.valueChange.emit(this.rawValue);
      this.onChangeFn(this.rawValue);
      this.showList = false;
    }
  }

  removeChip(value: any, event: Event): void {
    event.stopPropagation();
    this.values = this.values.filter((v) => v !== value);
    this.valuesChange.emit(this.values);
    this.onChangeFn(this.values);
  }

  clear(event: Event): void {
    event.stopPropagation();

    if (this.multiple) {
      this.values = [];
      this.valuesChange.emit(this.values);
      this.onChangeFn(this.values);
    } else {
      this.rawValue = '';
      this.displayValue = '';
      this.valueChange.emit(this.rawValue);
      this.onChangeFn(this.rawValue);
    }

    this.query = '';
  }

  writeValue(value: any): void {
    if (this.multiple) {
      this.values = Array.isArray(value) ? value : [];
    } else {
      this.rawValue = value ?? '';
      this.displayValue = this.labelForValue(this.rawValue);
    }
  }

  registerOnChange(fn: (value: any) => void): void {
    this.onChangeFn = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouchedFn = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }
}
