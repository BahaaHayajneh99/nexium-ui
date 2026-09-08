import { Component, EventEmitter, Input, Output, booleanAttribute, forwardRef } from '@angular/core';
import { AbstractControl, ControlValueAccessor, NG_VALIDATORS, NG_VALUE_ACCESSOR, ValidationErrors, Validator } from '@angular/forms';

@Component({
  selector: 'nx-switch',
  standalone: true,
  imports: [],
  template: `
    <label class="nx-switch" [class.disabled]="disabled">
      <input
        type="checkbox"
        [checked]="checked"
        [disabled]="disabled"
        [attr.aria-required]="isRequired ? true : null"
        [attr.aria-invalid]="!!displayError ? true : null"
        (change)="onChange($event)"
        (blur)="onBlur()" />
      <span class="nx-switch-track">
        <span class="nx-switch-thumb"></span>
      </span>
      @if (label) {
        <span class="nx-switch-label">{{ label }}@if (isRequired) {<span class="nx-switch-required">*</span>}</span>
      }
    </label>
    @if (displayError) {
      <span class="nx-switch-error">{{ displayError }}</span>
    }
  `,
  styles: `
    .nx-switch { display: inline-flex; align-items: center; gap: 8px; cursor: pointer; font-size: 14px; color: var(--shell-text); }
    .nx-switch.disabled { opacity: .6; cursor: not-allowed; }
    .nx-switch input { display: none; }
    .nx-switch-track {
      position: relative;
      width: 40px;
      height: 22px;
      background-color: var(--shell-scrollbar-thumb);
      border-radius: 999px;
      transition: background-color .2s ease;
    }
    .nx-switch-thumb {
      position: absolute;
      top: 2px;
      left: 2px;
      width: 18px;
      height: 18px;
      background-color: #ffffff;
      border-radius: 50%;
      transition: transform .2s ease;
    }
    .nx-switch input:checked + .nx-switch-track { background-color: var(--shell-primary); }
    .nx-switch input:checked + .nx-switch-track .nx-switch-thumb { transform: translateX(18px); }
    .nx-switch-required { color: #e74c3c; margin-left: 2px; }
    .nx-switch-error { display: block; font-size: 12px; color: #e74c3c; margin-top: 4px; }
  `,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => NxSwitch),
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => NxSwitch),
      multi: true,
    },
  ],
})
export class NxSwitch implements ControlValueAccessor, Validator {
  @Input({ transform: booleanAttribute }) checked = false;
  @Input({ transform: booleanAttribute }) disabled = false;
  @Input() label = '';
  /** Marks the switch as required - must be checked. Validated once touched. */
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
