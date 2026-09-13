import { Component, EventEmitter, Input, Output, booleanAttribute, forwardRef } from '@angular/core';
import { AbstractControl, ControlValueAccessor, NG_VALIDATORS, NG_VALUE_ACCESSOR, ValidationErrors, Validator } from '@angular/forms';

export type NxUnitPosition = 'prefix' | 'suffix';

@Component({
  selector: 'nx-unit-input',
  standalone: true,
  imports: [],
  templateUrl: './ui-unit-input.html',
  styleUrl: './ui-unit-input.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => NxUnitInput),
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => NxUnitInput),
      multi: true,
    },
  ],
})
export class NxUnitInput implements ControlValueAccessor, Validator {
  @Input() label = '';
  @Input() placeholder = '';
  /** The list of selectable units, e.g. ['$', '%', 'kg'] - fully driven by the consumer, not hardcoded. */
  @Input() units: string[] = ['$'];
  /** Position of the unit relative to the numeric input. */
  @Input() unitPosition: NxUnitPosition = 'suffix';
  @Input({ transform: booleanAttribute }) disabled = false;
  /** Manual error override - takes priority over the built-in required message. */
  @Input() error = '';
  @Input({ transform: booleanAttribute }) isRequired = false;
  @Input() requiredErrorMessage = 'This field is required';

  /** The currently selected unit - defaults to the first entry in `units` when left unset. */
  @Input() unit = '';

  @Output() unitChange = new EventEmitter<string>();

  value: number | null = null;
  touched = false;

  private onChangeFn: (value: number | null) => void = () => {};
  private onTouchedFn: () => void = () => {};
  private onValidatorChangeFn: () => void = () => {};

  get effectiveUnit(): string {
    return this.unit || this.units[0] || '';
  }

  get displayError(): string {
    if (this.error) {
      return this.error;
    }
    if (this.touched && this.isRequired && this.value === null) {
      return this.requiredErrorMessage;
    }
    return '';
  }

  onValueInput(event: Event): void {
    const raw = (event.target as HTMLInputElement).value;
    this.value = raw === '' ? null : Number(raw);
    this.onChangeFn(this.value);
  }

  onUnitSelect(event: Event): void {
    this.unit = (event.target as HTMLSelectElement).value;
    this.unitChange.emit(this.unit);
  }

  onBlur(): void {
    this.touched = true;
    this.onTouchedFn();
  }

  writeValue(value: number | null): void {
    this.value = value ?? null;
  }

  registerOnChange(fn: (value: number | null) => void): void {
    this.onChangeFn = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouchedFn = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  validate(control: AbstractControl): ValidationErrors | null {
    if (this.isRequired && (control.value === null || control.value === undefined)) {
      return { required: true };
    }
    return null;
  }

  registerOnValidatorChange(fn: () => void): void {
    this.onValidatorChangeFn = fn;
  }
}
