import { Component, EventEmitter, Input, Output, booleanAttribute, forwardRef, numberAttribute } from '@angular/core';
import { AbstractControl, ControlValueAccessor, NG_VALIDATORS, NG_VALUE_ACCESSOR, ValidationErrors, Validator } from '@angular/forms';
import { NxIcon } from '../../data-display/ui-icon';

@Component({
  selector: 'nx-time-picker',
  standalone: true,
  imports: [NxIcon],
  templateUrl: './ui-time-picker.html',
  styleUrl: './ui-time-picker.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => NxTimePicker),
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => NxTimePicker),
      multi: true,
    },
  ],
})
export class NxTimePicker implements ControlValueAccessor, Validator {
  /** Display/output format - supports `HH` (24h), `hh` (12h), `mm`, `ss`, `A` (AM/PM) tokens, e.g. `'HH:mm'`, `'hh:mm A'`, `'HH:mm:ss'`. */
  @Input() format = 'HH:mm';
  @Input() value = '';
  @Input() placeholder = 'Select time';
  @Input({ transform: booleanAttribute }) disabled = false;
  /** Render the picker panel inline (always open) instead of as a dropdown. */
  @Input({ transform: booleanAttribute }) inline = false;
  @Input({ transform: numberAttribute }) minuteStep = 1;
  /** Earliest selectable time, as a 24-hour `"HH:mm"` string, e.g. `'09:00'`. */
  @Input() minTime?: string;
  /** Latest selectable time, as a 24-hour `"HH:mm"` string, e.g. `'17:00'`. */
  @Input() maxTime?: string;
  /** Marks the field as required - a time must be selected. Validated once touched. */
  @Input({ transform: booleanAttribute }) isRequired = false;
  @Input() requiredErrorMessage = 'Please select a time';

  @Output() valueChange = new EventEmitter<string>();
  /** Alias of `valueChange`, emitted at the same time. */
  @Output() timeChange = new EventEmitter<string>();

  open = false;
  touched = false;

  private hour24 = 0;
  private minute = 0;
  private second = 0;

  private onChangeFn: (value: string) => void = () => {};
  private onTouchedFn: () => void = () => {};
  private onValidatorChangeFn: () => void = () => {};

  get displayError(): string {
    if (!this.touched) {
      return '';
    }
    if (this.isRequired && !this.value) {
      return this.requiredErrorMessage;
    }
    return '';
  }

  get use12Hour(): boolean {
    return /h|A/.test(this.format);
  }

  get showSeconds(): boolean {
    return this.format.includes('ss');
  }

  get displayValue(): string {
    return this.value;
  }

  get selectedHour(): number {
    if (!this.use12Hour) {
      return this.hour24;
    }
    const hour12 = this.hour24 % 12;
    return hour12 === 0 ? 12 : hour12;
  }

  get selectedMinute(): number {
    return this.minute;
  }

  get selectedSecond(): number {
    return this.second;
  }

  get selectedPeriod(): 'AM' | 'PM' {
    return this.hour24 >= 12 ? 'PM' : 'AM';
  }

  get hourOptions(): number[] {
    return this.use12Hour
      ? Array.from({ length: 12 }, (_, i) => i + 1)
      : Array.from({ length: 24 }, (_, i) => i);
  }

  get minuteOptions(): number[] {
    const step = Math.max(1, this.minuteStep);
    const options: number[] = [];
    for (let m = 0; m < 60; m += step) {
      options.push(m);
    }
    return options;
  }

  get secondOptions(): number[] {
    return Array.from({ length: 60 }, (_, i) => i);
  }

  toggle(): void {
    if (this.disabled) {
      return;
    }
    this.open = !this.open;
  }

  onBlur(): void {
    this.touched = true;
    this.onTouchedFn();
    setTimeout(() => (this.open = false), 150);
  }

  selectHour(hour: number): void {
    if (this.use12Hour) {
      let hour24 = hour % 12;
      if (this.selectedPeriod === 'PM') {
        hour24 += 12;
      }
      this.hour24 = hour24;
    } else {
      this.hour24 = hour;
    }
    this.commit();
  }

  selectMinute(minute: number): void {
    this.minute = minute;
    this.commit();
  }

  selectSecond(second: number): void {
    this.second = second;
    this.commit();
  }

  selectPeriod(period: 'AM' | 'PM'): void {
    let hour24 = this.hour24 % 12;
    if (period === 'PM') {
      hour24 += 12;
    }
    this.hour24 = hour24;
    this.commit();
  }

  pad(value: number): string {
    return value.toString().padStart(2, '0');
  }

  private commit(): void {
    this.clampToRange();
    this.value = this.formatValue();
    this.valueChange.emit(this.value);
    this.timeChange.emit(this.value);
    this.onChangeFn(this.value);
  }

  private clampToRange(): void {
    const current = this.hour24 * 60 + this.minute;
    const min = this.parseSimpleTime(this.minTime);
    const max = this.parseSimpleTime(this.maxTime);

    if (min !== null && current < min) {
      this.hour24 = Math.floor(min / 60);
      this.minute = min % 60;
    } else if (max !== null && current > max) {
      this.hour24 = Math.floor(max / 60);
      this.minute = max % 60;
    }
  }

  private parseSimpleTime(time?: string): number | null {
    if (!time) {
      return null;
    }
    const [hour, minute] = time.split(':').map(Number);
    if (Number.isNaN(hour) || Number.isNaN(minute)) {
      return null;
    }
    return hour * 60 + minute;
  }

  private formatValue(): string {
    const period = this.hour24 >= 12 ? 'PM' : 'AM';
    let hour12 = this.hour24 % 12;
    if (hour12 === 0) {
      hour12 = 12;
    }

    return this.format
      .replace('HH', this.pad(this.hour24))
      .replace('hh', this.pad(hour12))
      .replace('mm', this.pad(this.minute))
      .replace('ss', this.pad(this.second))
      .replace('A', period);
  }

  private parseValue(value: string): void {
    this.hour24 = 0;
    this.minute = 0;
    this.second = 0;

    if (!value) {
      return;
    }

    const tokens: string[] = [];
    const pattern = this.format.replace(/HH|hh|mm|ss|A/g, (token) => {
      tokens.push(token);
      return token === 'A' ? '(AM|PM)' : '(\\d{1,2})';
    });

    const match = new RegExp(`^${pattern}$`).exec(value.trim());
    if (!match) {
      return;
    }

    let hour = 0;
    let period: 'AM' | 'PM' | null = null;

    tokens.forEach((token, i) => {
      const raw = match[i + 1];
      if (token === 'HH' || token === 'hh') {
        hour = Number(raw);
      } else if (token === 'mm') {
        this.minute = Number(raw);
      } else if (token === 'ss') {
        this.second = Number(raw);
      } else if (token === 'A') {
        period = raw as 'AM' | 'PM';
      }
    });

    if (period) {
      hour = hour % 12;
      if (period === 'PM') {
        hour += 12;
      }
    }

    this.hour24 = hour;
  }

  writeValue(value: string): void {
    this.value = value ?? '';
    this.parseValue(this.value);
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
}
