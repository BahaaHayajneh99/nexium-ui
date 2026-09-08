import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  QueryList,
  ViewChildren,
  booleanAttribute,
  forwardRef,
  numberAttribute,
} from '@angular/core';
import { AbstractControl, ControlValueAccessor, NG_VALIDATORS, NG_VALUE_ACCESSOR, ValidationErrors, Validator } from '@angular/forms';

export type NxOtpInputType = 'number' | 'text';

@Component({
  selector: 'nx-otp-input',
  standalone: true,
  imports: [],
  templateUrl: './ui-otp-input.html',
  styleUrl: './ui-otp-input.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => NxOtpInput),
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => NxOtpInput),
      multi: true,
    },
  ],
})
export class NxOtpInput implements ControlValueAccessor, Validator {
  @Input({ transform: numberAttribute }) length = 6;
  @Input() value = '';
  @Input() type: NxOtpInputType = 'number';
  @Input({ transform: booleanAttribute }) disabled = false;
  @Input({ transform: booleanAttribute }) invalid = false;
  /** Marks the field as required - a code must be entered. Validated once touched. */
  @Input({ transform: booleanAttribute }) isRequired = false;
  @Input() requiredErrorMessage = 'Please enter a code';

  @Output() valueChange = new EventEmitter<string>();
  @Output() completed = new EventEmitter<string>();

  @ViewChildren('cell') private cells!: QueryList<ElementRef<HTMLInputElement>>;

  touched = false;

  private onChangeFn: (value: string) => void = () => {};
  private onTouchedFn: () => void = () => {};
  private onValidatorChangeFn: () => void = () => {};

  get indexes(): number[] {
    return Array.from({ length: this.length }, (_, i) => i);
  }

  get displayError(): string {
    if (!this.touched) {
      return '';
    }
    if (this.isRequired && !this.value) {
      return this.requiredErrorMessage;
    }
    return '';
  }

  digitAt(index: number): string {
    return this.value[index] ?? '';
  }

  onInput(index: number, event: Event): void {
    const input = event.target as HTMLInputElement;
    const char = input.value.slice(-1);

    if (char && this.type === 'number' && !/[0-9]/.test(char)) {
      input.value = this.digitAt(index);
      return;
    }

    const chars = this.value.padEnd(this.length, ' ').split('');
    chars[index] = char;
    this.setValue(chars.join('').trimEnd());

    if (char && index < this.length - 1) {
      this.focusCell(index + 1);
    }
  }

  onKeydown(index: number, event: KeyboardEvent): void {
    if (event.key === 'Backspace' && !this.digitAt(index) && index > 0) {
      this.focusCell(index - 1);
    } else if (event.key === 'ArrowLeft' && index > 0) {
      this.focusCell(index - 1);
    } else if (event.key === 'ArrowRight' && index < this.length - 1) {
      this.focusCell(index + 1);
    }
  }

  onPaste(event: ClipboardEvent): void {
    event.preventDefault();
    const pasted = event.clipboardData?.getData('text') ?? '';
    const filtered = this.type === 'number' ? pasted.replace(/\D/g, '') : pasted;
    this.setValue(filtered.slice(0, this.length));
    this.touched = true;
    this.focusCell(Math.min(this.value.length, this.length - 1));
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

  private setValue(value: string): void {
    this.value = value;
    this.valueChange.emit(value);
    this.onChangeFn(value);
    if (value.length === this.length) {
      this.completed.emit(value);
    }
  }

  private focusCell(index: number): void {
    queueMicrotask(() => this.cells.get(index)?.nativeElement.focus());
  }
}
