import { Component, EventEmitter, Input, Output, booleanAttribute, forwardRef } from '@angular/core';
import { AbstractControl, ControlValueAccessor, NG_VALIDATORS, NG_VALUE_ACCESSOR, ValidationErrors, Validator } from '@angular/forms';

export interface NxSelectOption {
  label: string;
  value: string;
}

@Component({
  selector: 'nx-select',
  standalone: true,
  imports: [],
  template: `
    <div class="nx-select-wrapper">
      @if (label) {
        <label class="nx-select-label">{{ label }}@if (isRequired) {<span class="nx-select-required">*</span>}</label>
      }
      <select
        class="nx-select"
        [class.error]="!!displayError"
        [disabled]="disabled"
        [value]="value"
        [attr.aria-required]="isRequired ? true : null"
        [attr.aria-invalid]="displayError ? true : null"
        (change)="onChange($event)"
        (blur)="onBlur()">
        @if (placeholder) {
          <option value="" disabled selected>{{ placeholder }}</option>
        }
        @for (option of options; track option.value) {
          <option [value]="option.value">{{ option.label }}</option>
        }
      </select>
      @if (displayError) {
        <span class="nx-select-error">{{ displayError }}</span>
      }
    </div>
  `,
  styles: `
    .nx-select-wrapper { display: flex; flex-direction: column; gap: 4px; }
    .nx-select-label { font-size: 14px; font-weight: 600; color: var(--shell-text); }
    .nx-select-required { color: #e74c3c; margin-left: 2px; }
    .nx-select {
      padding: 8px 12px;
      border: 1px solid var(--shell-border);
      border-radius: 4px;
      font-size: 14px;
      background-color: var(--shell-surface);
      color: var(--shell-text);
      outline: none;
    }
    .nx-select:focus { border-color: var(--shell-primary); }
    .nx-select.error { border-color: #e74c3c; }
    .nx-select:disabled { background-color: var(--shell-surface-hover); color: var(--shell-text-muted); cursor: not-allowed; }
    .nx-select option {
      background-color: var(--shell-surface);
      color: var(--shell-text);
    }
    .nx-select option:disabled { color: var(--shell-text-muted); }
    .nx-select-error { font-size: 12px; color: #e74c3c; }
  `,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => NxSelect),
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => NxSelect),
      multi: true,
    },
  ],
})
export class NxSelect implements ControlValueAccessor, Validator {
  @Input() label = '';
  @Input() placeholder = '';
  @Input() options: NxSelectOption[] = [];
  @Input() value = '';
  @Input({ transform: booleanAttribute }) disabled = false;
  /** Marks the field as required - a value must be selected. Validated once touched. */
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

  onChange(event: Event): void {
    this.value = (event.target as HTMLSelectElement).value;
    this.valueChange.emit(this.value);
    this.onChangeFn(this.value);
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
