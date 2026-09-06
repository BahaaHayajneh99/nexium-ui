import { Component, EventEmitter, Input, Output, booleanAttribute, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { NxDatepicker } from '../ui-datepicker';

export interface NxDateRangeValue {
  startDate: string;
  endDate: string;
}

@Component({
  selector: 'nx-date-range-picker',
  imports: [NxDatepicker],
  template: `
    <nx-datepicker
      [label]="label"
      [placeholder]="placeholder"
      [value]="startDate"
      [endValue]="endDate"
      [min]="min"
      [max]="max"
      [disabled]="disabled"
      [invalid]="invalid"
      [showIcon]="showIcon"
      [showTime]="showTime"
      [range]="true"
      (valueChange)="onStartDateChange($event)"
      (endValueChange)="onEndDateChange($event)">
    </nx-datepicker>
  `,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => NxDateRangePicker),
      multi: true,
    },
  ],
})
export class NxDateRangePicker implements ControlValueAccessor {
  @Input() label = '';
  @Input() placeholder = 'Select date range';
  @Input() min = '';
  @Input() max = '';
  @Input({ transform: booleanAttribute }) disabled = false;
  @Input({ transform: booleanAttribute }) invalid = false;
  @Input({ transform: booleanAttribute }) showIcon = true;
  @Input({ transform: booleanAttribute }) showTime = false;

  @Input() startDate = '';
  @Input() endDate = '';

  @Output() startDateChange = new EventEmitter<string>();
  @Output() endDateChange = new EventEmitter<string>();
  @Output() valueChange = new EventEmitter<NxDateRangeValue>();

  private onChangeFn: (value: NxDateRangeValue) => void = () => {};
  private onTouchedFn: () => void = () => {};

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

  private emitValue(): void {
    const currentValue: NxDateRangeValue = {
      startDate: this.startDate,
      endDate: this.endDate,
    };

    this.valueChange.emit(currentValue);
    this.onChangeFn(currentValue);
    this.onTouchedFn();
  }
}
