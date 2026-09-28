import { Component, EventEmitter, Input, Output, booleanAttribute, forwardRef } from '@angular/core';
import {
  AbstractControl,
  ControlValueAccessor,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  ValidationErrors,
  Validator,
} from '@angular/forms';
import { NxInput } from '../ui-input';
import { NxSelect, NxSelectOption } from '../ui-select';

export interface NxAddress {
  street: string;
  street2: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
}

const EMPTY_ADDRESS: NxAddress = {
  street: '',
  street2: '',
  city: '',
  state: '',
  postalCode: '',
  country: '',
};

const DEFAULT_COUNTRIES: NxSelectOption[] = [
  { label: 'United States', value: 'US' },
  { label: 'Canada', value: 'CA' },
  { label: 'United Kingdom', value: 'GB' },
  { label: 'Australia', value: 'AU' },
  { label: 'Germany', value: 'DE' },
  { label: 'France', value: 'FR' },
  { label: 'Spain', value: 'ES' },
  { label: 'Italy', value: 'IT' },
  { label: 'Netherlands', value: 'NL' },
  { label: 'Jordan', value: 'JO' },
  { label: 'United Arab Emirates', value: 'AE' },
  { label: 'Saudi Arabia', value: 'SA' },
  { label: 'India', value: 'IN' },
  { label: 'Japan', value: 'JP' },
  { label: 'Brazil', value: 'BR' },
];

/** A compound street/city/state/postal-code/country field group, emitting one structured address object. */
@Component({
  selector: 'nx-address-input',
  standalone: true,
  imports: [NxInput, NxSelect],
  templateUrl: './ui-address-input.html',
  styleUrl: './ui-address-input.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => NxAddressInput),
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => NxAddressInput),
      multi: true,
    },
  ],
})
export class NxAddressInput implements ControlValueAccessor, Validator {
  @Input() countries: NxSelectOption[] = DEFAULT_COUNTRIES;
  @Input({ transform: booleanAttribute }) disabled = false;
  /** Marks street/city/postalCode/country as required. Validated once touched. */
  @Input({ transform: booleanAttribute }) isRequired = false;

  @Output() valueChange = new EventEmitter<NxAddress>();

  value: NxAddress = { ...EMPTY_ADDRESS };
  touched = false;

  private onChangeFn: (value: NxAddress) => void = () => {};
  private onTouchedFn: () => void = () => {};
  private onValidatorChangeFn: () => void = () => {};

  get displayError(): string {
    if (this.touched && this.isRequired && this.hasMissingRequiredField(this.value)) {
      return 'Please complete the required address fields';
    }
    return '';
  }

  updateField(field: keyof NxAddress, fieldValue: string): void {
    this.value = { ...this.value, [field]: fieldValue };
    this.touched = true;
    this.valueChange.emit(this.value);
    this.onChangeFn(this.value);
    this.onTouchedFn();
  }

  writeValue(value: NxAddress): void {
    this.value = value ? { ...EMPTY_ADDRESS, ...value } : { ...EMPTY_ADDRESS };
  }

  registerOnChange(fn: (value: NxAddress) => void): void {
    this.onChangeFn = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouchedFn = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  validate(control: AbstractControl): ValidationErrors | null {
    if (this.isRequired && this.hasMissingRequiredField(control.value)) {
      return { required: true };
    }
    return null;
  }

  registerOnValidatorChange(fn: () => void): void {
    this.onValidatorChangeFn = fn;
  }

  private hasMissingRequiredField(address: NxAddress | null | undefined): boolean {
    return !address?.street || !address?.city || !address?.postalCode || !address?.country;
  }
}
