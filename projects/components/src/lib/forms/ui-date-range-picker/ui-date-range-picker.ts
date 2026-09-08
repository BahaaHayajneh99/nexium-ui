import { Component, EventEmitter, Input, Output, booleanAttribute, forwardRef } from '@angular/core';
import { AbstractControl, ControlValueAccessor, NG_VALIDATORS, NG_VALUE_ACCESSOR, ValidationErrors, Validator } from '@angular/forms';
import { NxDatepicker } from '../ui-datepicker';

export interface NxDateRangeValue {
  startDate: string;
  endDate: string;
}

@Component({
  selector: 'nx-date-range-picker',
  imports: [NxDatepicker],
  template: `
    <div class="nx-date-range-picker-wrapper" [attr.aria-required]="isRequired ? true : null">
      <nx-datepicker
        [label]="label"
        [placeholder]="placeholder"
        [value]="startDate"
        [endValue]="endDate"
        [min]="min"
        [max]="max"
        [disabled]="disabled"
        [invalid]="invalid || !!displayError"
        [showIcon]="showIcon"
        [showTime]="showTime"
        [range]="true"
        (valueChange)="onStartDateChange($event)"
        (endValueChange)="onEndDateChange($event)">
      </nx-datepicker>
      @if (displayError) {
        <span class="nx-date-range-picker-error">{{ displayError }}</span>
      }
    </div>
  `,
  styles: `
    .nx-date-range-picker-wrapper { display: flex; flex-direction: column; gap: 4px; }
    .nx-date-range-picker-error { font-size: 12px; color: #e74c3c; }
  `,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => NxDateRangePicker),
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => NxDateRangePicker),
      multi: true,
    },
  ],
})
export class NxDateRangePicker implements ControlValueAccessor, Validator {
  @Input() label = '';
  @Input() placeholder = 'Select date range';
  @Input() min = '';
  @Input() max = '';
  @Input({ transform: booleanAttribute }) disabled = false;
  @Input({ transform: booleanAttribute }) invalid = false;
  @Input({ transform: booleanAttribute }) showIcon = true;
  @Input({ transform: booleanAttribute }) showTime = false;
  /** Marks the field as required - both a start and end date must be selected. Validated once touched. */
  @Input({ transform: booleanAttribute }) isRequired = false;
  @Input() requiredErrorMessage = 'Please select a date range';

  @Input() startDate = '';
  @Input() endDate = '';

  @Output() startDateChange = new EventEmitter<string>();
  @Output() endDateChange = new EventEmitter<string>();
  @Output() valueChange = new EventEmitter<NxDateRangeValue>();

  touched = false;

  private onChangeFn: (value: NxDateRangeValue) => void = () => {};
  private onTouchedFn: () => void = () => {};
  private onValidatorChangeFn: () => void = () => {};

  private get isValueMissing(): boolean {
    return !this.startDate || !this.endDate;
  }

  get displayError(): string {
    if (!this.touched) {
      return '';
    }
    if (this.isRequired && this.isValueMissing) {
      return this.requiredErrorMessage;
    }
    return '';
  }

  onStartDateChange(value: string): void {
    this.startDate = value;
    this.startDateChange.emit(value);
    this.emitValue();
  }

  onEndDateChange(value: string): void {
    this.endDate = value;
    this.endDateChange.emit(value);
    this.emitValue();
  }

  writeValue(value: NxDateRangeValue | null): void {
    this.startDate = value?.startDate ?? '';
    this.endDate = value?.endDate ?? '';
  }

  registerOnChange(fn: (value: NxDateRangeValue) => void): void {
    this.onChangeFn = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouchedFn = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  validate(control: AbstractControl): ValidationErrors | null {
    if (this.isRequired && this.isValueMissing) {
      return { required: true };
    }
    return null;
  }

  registerOnValidatorChange(fn: () => void): void {
    this.onValidatorChangeFn = fn;
  }

  private emitValue(): void {
    const currentValue: NxDateRangeValue = {
      startDate: this.startDate,
      endDate: this.endDate,
    };

    this.valueChange.emit(currentValue);
    this.onChangeFn(currentValue);
    this.touched = true;
    this.onTouchedFn();
  }
}
