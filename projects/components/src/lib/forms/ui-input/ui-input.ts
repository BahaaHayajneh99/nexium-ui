import { Component, EventEmitter, Input, Output, booleanAttribute, forwardRef } from '@angular/core';
import { NgClass } from '@angular/common';
import { AbstractControl, ControlValueAccessor, NG_VALIDATORS, NG_VALUE_ACCESSOR, ValidationErrors, Validator } from '@angular/forms';
import { NxPatternInput, nxPatternErrorMessage, resolveNxPattern } from '../shared/nx-validators';

@Component({
  selector: 'nx-input',
  standalone: true,
  imports: [NgClass],
  template: `
    <div class="nx-input-wrapper">
      @if (label) {
        <label class="nx-input-label">{{ label }}@if (isRequired) {<span class="nx-input-required">*</span>}</label>
      }
      <input
        class="nx-input"
        [ngClass]="{ error: !!displayError }"
        [type]="type"
        [placeholder]="placeholder"
        [disabled]="disabled"
        [attr.aria-required]="isRequired ? true : null"
        [attr.aria-invalid]="displayError ? true : null"
        [value]="value"
        (input)="onInput($event)"
        (blur)="onBlur()" />
      @if (displayError) {
        <span class="nx-input-error">{{ displayError }}</span>
      }
    </div>
  `,
  styles: `
    .nx-input-wrapper { display: flex; flex-direction: column; gap: 4px; }
    .nx-input-label { font-size: 14px; font-weight: 600; color: var(--shell-text); }
    .nx-input-required { color: #e74c3c; margin-left: 2px; }
    .nx-input {
      padding: 8px 12px;
      border: 1px solid var(--shell-border);
      border-radius: 4px;
      background-color: var(--shell-surface);
      color: var(--shell-text);
      font-size: 14px;
      outline: none;
      transition: border-color .2s ease;
    }
    .nx-input:focus { border-color: var(--shell-primary); }
    .nx-input.error { border-color: #e74c3c; }
    .nx-input:disabled { background-color: var(--shell-surface-hover); color: var(--shell-text-muted); cursor: not-allowed; }
    .nx-input-error { font-size: 12px; color: #e74c3c; }
  `,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => NxInput),
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => NxInput),
      multi: true,
    },
  ],
})
export class NxInput implements ControlValueAccessor, Validator {
  @Input() label = '';
  @Input() type: 'text' | 'email' | 'password' | 'number' = 'text';
  @Input() placeholder = '';
  /** Manual error override - takes priority over the built-in required/pattern messages. */
  @Input() error = '';
  @Input() value = '';
  @Input({ transform: booleanAttribute }) disabled = false;
  /** Marks the field as required - shown with a `*` and validated once the field is touched. */
  @Input({ transform: booleanAttribute }) isRequired = false;
  /** Named preset ('email', 'url', 'phone', 'numeric', 'alpha', 'alphanumeric'), a RegExp, or a custom regex source string. */
  @Input() pattern: NxPatternInput = null;
  @Input() requiredErrorMessage = 'This field is required';
  @Input() patternErrorMessage = '';

  @Output() valueChange = new EventEmitter<string>();

  touched = false;

  private onChangeFn: (value: string) => void = () => {};
  private onTouchedFn: () => void = () => {};
  private onValidatorChangeFn: () => void = () => {};

  /** The message actually shown - the `error` override, else the built-in required/pattern check once touched. */
  get displayError(): string {
    if (this.error) {
      return this.error;
    }
    if (!this.touched) {
      return '';
    }
    if (this.isRequired && !this.value) {
      return this.requiredErrorMessage;
    }
    const regex = resolveNxPattern(this.pattern);
    if (regex && this.value && !regex.test(this.value)) {
      return this.patternErrorMessage || nxPatternErrorMessage(this.pattern);
    }
    return '';
  }

  onInput(event: Event): void {
    this.value = (event.target as HTMLInputElement).value;
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
    const value = control.value;
    if (this.isRequired && !value) {
      return { required: true };
    }
    const regex = resolveNxPattern(this.pattern);
    if (regex && value && !regex.test(value)) {
      return { pattern: true };
    }
    return null;
  }

  registerOnValidatorChange(fn: () => void): void {
    this.onValidatorChangeFn = fn;
  }
}
