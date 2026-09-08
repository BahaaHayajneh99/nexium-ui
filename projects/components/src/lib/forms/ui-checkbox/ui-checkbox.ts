import { Component, EventEmitter, Input, Output, booleanAttribute, forwardRef } from '@angular/core';
import { NgClass } from '@angular/common';
import { AbstractControl, ControlValueAccessor, NG_VALIDATORS, NG_VALUE_ACCESSOR, ValidationErrors, Validator } from '@angular/forms';

@Component({
  selector: 'nx-checkbox',
  standalone: true,
  imports: [NgClass],
  template: `
    <label class="nx-checkbox" [ngClass]="variant" [class.disabled]="disabled" [class.invalid]="invalid || !!displayError">
      <input
        type="checkbox"
        class="nx-checkbox-input"
        [checked]="checked"
        [disabled]="disabled"
        [attr.aria-required]="isRequired ? true : null"
        [attr.aria-invalid]="(invalid || !!displayError) ? true : null"
        (change)="onChange($event)"
        (blur)="onBlur()" />
      <span class="nx-checkbox-box"></span>
      @if (label) {
        <span class="nx-checkbox-label">{{ label }}@if (isRequired) {<span class="nx-checkbox-required">*</span>}</span>
      }
    </label>
    @if (displayError) {
      <span class="nx-checkbox-error">{{ displayError }}</span>
    }
  `,
  styles: `
    .nx-checkbox {
      position: relative;
      display: inline-flex;
      align-items: center;
      gap: 8px;
      cursor: pointer;
      font-size: 14px;
      color: var(--shell-text);
    }
    .nx-checkbox.disabled { opacity: .6; cursor: not-allowed; }
    .nx-checkbox-input {
      position: absolute;
      width: 18px;
      height: 18px;
      margin: 0;
      opacity: 0;
      cursor: inherit;
    }
    .nx-checkbox-box {
      position: relative;
      flex-shrink: 0;
      width: 18px;
      height: 18px;
      border: 1px solid var(--shell-border);
      border-radius: 4px;
      background-color: var(--shell-surface);
      transition: all .15s ease;
    }
    .nx-checkbox-input:checked + .nx-checkbox-box {
      background-color: var(--shell-primary);
      border-color: var(--shell-primary);
    }
    .nx-checkbox-input:checked + .nx-checkbox-box::after {
      content: '';
      position: absolute;
      left: 5px;
      top: 1px;
      width: 5px;
      height: 10px;
      border: solid #ffffff;
      border-width: 0 2px 2px 0;
      transform: rotate(45deg);
    }
    .nx-checkbox-input:focus-visible + .nx-checkbox-box {
      outline: 2px solid #5dade2;
      outline-offset: 2px;
    }
    .nx-checkbox.filled .nx-checkbox-box { background-color: var(--shell-surface-hover); border-color: transparent; }
    .nx-checkbox.filled .nx-checkbox-input:checked + .nx-checkbox-box { background-color: var(--shell-primary); }
    .nx-checkbox.invalid .nx-checkbox-box { border-color: #e74c3c; }
    .nx-checkbox.invalid .nx-checkbox-label { color: #e74c3c; }
    .nx-checkbox-required { color: #e74c3c; margin-left: 2px; }
    .nx-checkbox-error { display: block; font-size: 12px; color: #e74c3c; margin-top: 4px; }
  `,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => NxCheckbox),
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => NxCheckbox),
      multi: true,
    },
  ],
})
export class NxCheckbox implements ControlValueAccessor, Validator {
  @Input({ transform: booleanAttribute }) checked = false;
  @Input({ transform: booleanAttribute }) disabled = false;
  @Input({ transform: booleanAttribute }) invalid = false;
  @Input() variant: 'outlined' | 'filled' = 'outlined';
  @Input() label = '';
  /** Marks the checkbox as required - must be checked. Validated once touched. */
  @Input({ transform: booleanAttribute }) isRequired = false;
  @Input() requiredErrorMessage = 'This field is required';

  @Output() checkedChange = new EventEmitter<boolean>();

  touched = false;

  private onChangeFn: (value: boolean) => void = () => {};
  private onTouchedFn: () => void = () => {};
  private onValidatorChangeFn: () => void = () => {};

  get displayError(): string {
    if (this.touched && this.isRequired && !this.checked) {
      return this.requiredErrorMessage;
    }
    return '';
  }

  onChange(event: Event): void {
    this.checked = (event.target as HTMLInputElement).checked;
    this.checkedChange.emit(this.checked);
    this.onChangeFn(this.checked);
  }

  onBlur(): void {
    this.touched = true;
    this.onTouchedFn();
  }

  writeValue(value: boolean): void {
    this.checked = !!value;
  }

  registerOnChange(fn: (value: boolean) => void): void {
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
