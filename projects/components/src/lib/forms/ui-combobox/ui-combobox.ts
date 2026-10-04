import {
  ChangeDetectorRef,
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

export interface NxComboboxOption {
  label: string;
  value: unknown;
  disabled?: boolean;
}

/**
 * A searchable, single-select dropdown - like `nx-select`, but with a text
 * box you can filter by typing instead of scanning a native `<select>` list.
 * Unlike `nx-autocomplete`, the value is always one of `options`: typed text
 * that doesn't match a listed option reverts to the current selection on
 * blur rather than becoming free-text.
 */
@Component({
  selector: 'nx-combobox',
  standalone: true,
  imports: [],
  templateUrl: './ui-combobox.html',
  styleUrl: './ui-combobox.scss',
  host: {
    '(document:click)': 'onDocumentClick($event)',
  },
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => NxCombobox),
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => NxCombobox),
      multi: true,
    },
  ],
})
export class NxCombobox implements ControlValueAccessor, Validator {
  @Input() label = '';
  @Input() placeholder = 'Select an option';
  @Input() options: NxComboboxOption[] = [];
  @Input({ transform: booleanAttribute }) disabled = false;
  @Input({ transform: booleanAttribute }) showClear = false;
  /** Manual error override - takes priority over the built-in required message. */
  @Input() error = '';
  /** Marks the field as required - a value must be selected. Validated once touched. */
  @Input({ transform: booleanAttribute }) isRequired = false;
  @Input() requiredErrorMessage = 'Please select an option';

  @Output() valueChange = new EventEmitter<unknown>();

  @ViewChild('inputRef') private inputRef?: ElementRef<HTMLInputElement>;

  open = false;
  activeIndex = 0;
  touched = false;
  /** Text currently shown in the box - the selected option's label, or what's being typed to filter. */
  query = '';

  private rawValue: unknown = '';

  constructor(private elementRef: ElementRef<HTMLElement>, private cdr: ChangeDetectorRef) {}

  @Input()
  set value(v: unknown) {
    this.rawValue = v ?? '';
    this.query = this.labelForValue(this.rawValue);
  }
  get value(): unknown {
    return this.rawValue;
  }

  private onChangeFn: (value: unknown) => void = () => {};
  private onTouchedFn: () => void = () => {};
  private onValidatorChangeFn: () => void = () => {};

  get displayError(): string {
    if (this.error) {
      return this.error;
    }
    if (this.touched && this.isRequired && this.isEmpty(this.rawValue)) {
      return this.requiredErrorMessage;
    }
    return '';
  }

  get filteredOptions(): NxComboboxOption[] {
    const query = this.query.trim().toLowerCase();
    // Nothing typed yet, or the box still just shows the selected label -
    // that's not a search in progress, so show every option.
    if (!query || query === this.labelForValue(this.rawValue).toLowerCase()) {
      return this.options;
    }
    return this.options.filter((option) => option.label.toLowerCase().includes(query));
  }

  onInput(event: Event): void {
    this.query = (event.target as HTMLInputElement).value;
    this.open = true;
    this.activeIndex = 0;
  }

  onFocus(): void {
    this.openList();
  }

  onBlur(): void {
    this.touched = true;
    this.onTouchedFn();
    // Give a mousedown selection on an option a chance to register before
    // closing. This runs outside any Angular-dispatched event, so in a
    // zoneless app markForCheck() is what actually gets it rendered.
    setTimeout(() => {
      this.closeList();
      this.cdr.markForCheck();
    }, 150);
  }

  onKeydown(event: KeyboardEvent): void {
    if (event.key === 'ArrowDown') {
      event.preventDefault();
      if (!this.open) {
        this.openList();
        return;
      }
      this.activeIndex = Math.min(this.activeIndex + 1, this.filteredOptions.length - 1);
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      this.activeIndex = Math.max(this.activeIndex - 1, 0);
    } else if (event.key === 'Home' && this.open) {
      event.preventDefault();
      this.activeIndex = 0;
    } else if (event.key === 'End' && this.open) {
      event.preventDefault();
      this.activeIndex = this.filteredOptions.length - 1;
    } else if (event.key === 'Enter') {
      if (this.open && this.filteredOptions[this.activeIndex]) {
        event.preventDefault();
        this.selectOption(this.filteredOptions[this.activeIndex]);
      }
    } else if (event.key === 'Escape') {
      this.closeList();
    }
  }

  openList(): void {
    if (this.disabled) {
      return;
    }
    this.open = true;
    this.activeIndex = Math.max(
      0,
      this.filteredOptions.findIndex((option) => option.value === this.rawValue)
    );
  }

  toggleList(): void {
    if (this.open) {
      this.closeList();
      return;
    }
    this.openList();
    this.inputRef?.nativeElement.focus();
  }

  closeList(): void {
    this.open = false;
    // A combobox only ever holds one of the listed values - revert any
    // unmatched typed text back to the current selection's label.
    this.query = this.labelForValue(this.rawValue);
  }

  selectOption(option: NxComboboxOption): void {
    if (option.disabled) {
      return;
    }
    this.rawValue = option.value;
    this.query = option.label;
    this.touched = true;
    this.valueChange.emit(this.rawValue);
    this.onChangeFn(this.rawValue);
    this.open = false;
  }

  clear(event: Event): void {
    event.stopPropagation();
    this.rawValue = '';
    this.query = '';
    this.valueChange.emit(this.rawValue);
    this.onChangeFn(this.rawValue);
  }

  onDocumentClick(event: MouseEvent): void {
    if (!this.elementRef.nativeElement.contains(event.target as Node)) {
      this.closeList();
    }
  }

  writeValue(value: unknown): void {
    this.rawValue = value ?? '';
    this.query = this.labelForValue(this.rawValue);
  }

  registerOnChange(fn: (value: unknown) => void): void {
    this.onChangeFn = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouchedFn = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  validate(control: AbstractControl): ValidationErrors | null {
    if (this.isRequired && this.isEmpty(control.value)) {
      return { required: true };
    }
    return null;
  }

  registerOnValidatorChange(fn: () => void): void {
    this.onValidatorChangeFn = fn;
  }

  private isEmpty(value: unknown): boolean {
    return value === '' || value === null || value === undefined;
  }

  private labelForValue(value: unknown): string {
    const match = this.options.find((option) => option.value === value);
    return match ? match.label : '';
  }
}
