import { Component, EventEmitter, Input, Output, booleanAttribute, forwardRef } from '@angular/core';
import { AbstractControl, ControlValueAccessor, NG_VALIDATORS, NG_VALUE_ACCESSOR, ValidationErrors, Validator } from '@angular/forms';

export interface NxRadioOption {
  label: string;
  value: string;
}

@Component({
  selector: 'nx-radio-group',
  standalone: true,
  imports: [],
  template: `
    <div class="nx-radio-group" [class.inline]="inline">
      @for (option of options; track option.value) {
        <label class="nx-radio" [class.disabled]="disabled">
          <input
            type="radio"
            [name]="name"
            [value]="option.value"
            [checked]="option.value === value"
            [disabled]="disabled"
            [attr.aria-required]="isRequired ? true : null"
            (change)="onChange(option.value)"
            (blur)="onBlur()" />
          <span>{{ option.label }}</span>
        </label>
      }
    </div>
    @if (displayError) {
      <span class="nx-radio-group-error">{{ displayError }}</span>
    }
  `,
  styles: `
    .nx-radio-group { display: flex; flex-direction: column; gap: 8px; }
    .nx-radio-group.inline { flex-direction: row; flex-wrap: wrap; gap: 16px; }
    .nx-radio {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      cursor: pointer;
      font-size: 14px;
      color: var(--shell-text);
    }
    .nx-radio.disabled { opacity: .6; cursor: not-allowed; }
    .nx-radio input { width: 16px; height: 16px; accent-color: var(--shell-primary); cursor: inherit; }
    .nx-radio-group-error { display: block; font-size: 12px; color: #e74c3c; margin-top: 4px; }
  `,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => NxRadioGroup),
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => NxRadioGroup),
      multi: true,
    },
  ],
})
export class NxRadioGroup implements ControlValueAccessor, Validator {
  @Input() name = 'nx-radio-group';
  @Input() options: NxRadioOption[] = [];
  @Input() value = '';
  @Input({ transform: booleanAttribute }) disabled = false;
  @Input({ transform: booleanAttribute }) inline = false;
  /** Marks the group as required - a value must be selected. Validated once touched. */
  @Input({ transform: booleanAttribute }) isRequired = false;
  @Input() requiredErrorMessage = 'Please select an option';

  @Output() valueChange = new EventEmitter<string>();

  touched = false;

  private onChangeFn: (value: string) => void = () => {};
  private onTouchedFn: () => void = () => {};
  private onValidatorChangeFn: () => void = () => {};

  get displayError(): string {
    if (this.touched && this.isRequired && !this.value) {
      return this.requiredErrorMessage;
    }
    return '';
  }

  onChange(value: string): void {
    this.value = value;
    this.touched = true;
    this.valueChange.emit(value);
    this.onChangeFn(value);
    this.onTouchedFn();
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
}
