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
  value: string;
  group?: string;
}

export type NxAutocompleteOptionInput = string | NxAutocompleteOption;

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
  @Input() value = '';
  @Input() values: string[] = [];
  @Input() variant: 'outlined' | 'filled' = 'outlined';
  @Input({ transform: booleanAttribute }) disabled = false;
  @Input({ transform: booleanAttribute }) multiple = false;
  @Input({ transform: booleanAttribute }) floatLabel = false;
  @Input({ transform: booleanAttribute }) showClear = false;
  @Input({ transform: booleanAttribute }) invalid = false;
  @Input({ transform: booleanAttribute }) virtualScroll = false;
  @Input({ transform: numberAttribute }) itemSize = 36;
  @Input({ transform: numberAttribute }) scrollHeight = 200;

  @Output() valueChange = new EventEmitter<string>();
  @Output() valuesChange = new EventEmitter<string[]>();

  @ViewChild('input') private inputRef?: ElementRef<HTMLInputElement>;

  showList = false;
  focused = false;
  query = '';
  scrollTop = 0;

  // In `multiple` mode the CVA value is string[] (matching `values`); in
  // single mode it's a plain string (matching `value`) - writeValue picks
  // the right shape based on `multiple` at the time it's called.
  private onChangeFn: (value: string | string[]) => void = () => {};
  private onTouchedFn: () => void = () => {};

  private get normalizedOptions(): NxAutocompleteOption[] {
    return this.options.map((option) =>
      typeof option === 'string' ? { label: option, value: option } : option
    );
  }

  get filteredOptions(): NxAutocompleteOption[] {
    const query = (this.multiple ? this.query : this.value).toLowerCase();
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
    return this.multiple ? this.values.length > 0 || !!this.query : !!this.value;
  }

  private get virtualStartIndex(): number {
    return Math.max(0, Math.floor(this.scrollTop / this.itemSize) - 2);
  }

  onInput(event: Event): void {
    const inputValue = (event.target as HTMLInputElement).value;

    if (this.multiple) {
      this.query = inputValue;
    } else {
      this.value = inputValue;
      this.valueChange.emit(this.value);
      this.onChangeFn(this.value);
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
      this.value = option.label;
      this.valueChange.emit(this.value);
      this.onChangeFn(this.value);
      this.showList = false;
    }
  }

  removeChip(value: string, event: Event): void {
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
      this.value = '';
      this.valueChange.emit(this.value);
      this.onChangeFn(this.value);
    }

    this.query = '';
  }

  writeValue(value: string | string[]): void {
    if (this.multiple) {
      this.values = Array.isArray(value) ? value : [];
    } else {
      this.value = typeof value === 'string' ? value : '';
    }
  }

  registerOnChange(fn: (value: string | string[]) => void): void {
    this.onChangeFn = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouchedFn = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }
}
