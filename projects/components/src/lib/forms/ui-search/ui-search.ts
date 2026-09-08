import { Component, EventEmitter, Input, Output, booleanAttribute, forwardRef } from '@angular/core';
import { AbstractControl, ControlValueAccessor, NG_VALIDATORS, NG_VALUE_ACCESSOR, ValidationErrors, Validator } from '@angular/forms';
import { NxIcon } from '../../data-display/ui-icon';
import { NxPatternInput, nxPatternErrorMessage, resolveNxPattern } from '../shared/nx-validators';

/** A plain string, or a `{ label, ... }`-shaped object (use `bindLabel` if the label lives under a different key). */
export type NxSearchResultInput = string | Record<string, any>;

interface NxSearchResult {
  label: string;
  raw: NxSearchResultInput;
}

@Component({
  selector: 'nx-search',
  standalone: true,
  imports: [NxIcon],
  templateUrl: './ui-search.html',
  styleUrl: './ui-search.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => NxSearch),
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => NxSearch),
      multi: true,
    },
  ],
})
export class NxSearch implements ControlValueAccessor, Validator {
  @Input() placeholder = 'Search...';
  /** Manual error override - takes priority over the built-in required/pattern messages. */
  @Input() error = '';
  @Input() value = '';
  @Input({ transform: booleanAttribute }) disabled = false;
  @Input({ transform: booleanAttribute }) showClear = true;
  /** Marks the field as required - shown with a `*` and validated once the field is touched. */
  @Input({ transform: booleanAttribute }) isRequired = false;
  /** Named preset ('email', 'url', 'phone', 'numeric', 'alpha', 'alphanumeric'), a RegExp, or a custom regex source string. */
  @Input() pattern: NxPatternInput = null;
  @Input() requiredErrorMessage = 'This field is required';
  @Input() patternErrorMessage = '';

  /** Set to true to render the built-in results dropdown below the field. */
  @Input({ transform: booleanAttribute }) showResultsPanel = false;
  /** Results to list in the dropdown - populate as you filter, on every `valueChange`. */
  @Input() results: NxSearchResultInput[] = [];
  /** Property to read as the display label when `results` are objects instead of plain strings. */
  @Input() bindLabel?: string;
  @Input() noResultsText = 'No results found';
  @Input() noResultsHint = 'Try a different search term';

  @Output() valueChange = new EventEmitter<string>();
  /** Emitted when the clear button is pressed (in addition to `valueChange` emitting `''`). */
  @Output() cleared = new EventEmitter<void>();
  /** Emitted with the original `results` entry when a result is picked from the dropdown. */
  @Output() resultSelected = new EventEmitter<NxSearchResultInput>();

  open = false;
  focused = false;
  activeIndex = -1;
  touched = false;

  private onChangeFn: (value: string) => void = () => {};
  private onTouchedFn: () => void = () => {};
  private onValidatorChangeFn: () => void = () => {};

  /** The message actually shown - the `error` override, else the built-in required/pattern check once touched. */
  get displayError(): string {
    if (this.error) {
      return this.error;
    }
    if (!this.touched) {
      return '';
    }
    if (this.isRequired && !this.value) {
      return this.requiredErrorMessage;
    }
    const regex = resolveNxPattern(this.pattern);
    if (regex && this.value && !regex.test(this.value)) {
      return this.patternErrorMessage || nxPatternErrorMessage(this.pattern);
    }
    return '';
  }

  get normalizedResults(): NxSearchResult[] {
    return this.results.map((result) => ({
      label: typeof result === 'string' ? result : String((this.bindLabel ? result[this.bindLabel] : result['label']) ?? ''),
      raw: result,
    }));
  }

  get showPanel(): boolean {
    return this.showResultsPanel && this.open && !!this.value;
  }

  onInput(event: Event): void {
    this.value = (event.target as HTMLInputElement).value;
    this.activeIndex = -1;
    this.open = true;
    this.valueChange.emit(this.value);
    this.onChangeFn(this.value);
  }

  onFocus(): void {
    this.focused = true;
    this.open = true;
  }

  onBlur(): void {
    this.focused = false;
    this.touched = true;
    this.onTouchedFn();
    setTimeout(() => (this.open = false), 150);
  }

  onKeydown(event: KeyboardEvent): void {
    if (!this.showPanel || !this.normalizedResults.length) {
      return;
    }

    if (event.key === 'ArrowDown') {
      event.preventDefault();
      this.activeIndex = Math.min(this.activeIndex + 1, this.normalizedResults.length - 1);
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      this.activeIndex = Math.max(this.activeIndex - 1, 0);
    } else if (event.key === 'Enter' && this.activeIndex >= 0) {
      event.preventDefault();
      this.selectResult(this.normalizedResults[this.activeIndex]);
    } else if (event.key === 'Escape') {
      this.open = false;
    }
  }

  selectResult(result: NxSearchResult): void {
    this.value = result.label;
    this.open = false;
    this.activeIndex = -1;
    this.valueChange.emit(this.value);
    this.onChangeFn(this.value);
    this.resultSelected.emit(result.raw);
  }

  clear(event: Event): void {
    event.preventDefault();
    this.value = '';
    this.valueChange.emit(this.value);
    this.onChangeFn(this.value);
    this.cleared.emit();
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
    const value = control.value;
    if (this.isRequired && !value) {
      return { required: true };
    }
    const regex = resolveNxPattern(this.pattern);
    if (regex && value && !regex.test(value)) {
      return { pattern: true };
    }
    return null;
  }

  registerOnValidatorChange(fn: () => void): void {
    this.onValidatorChangeFn = fn;
  }
}
