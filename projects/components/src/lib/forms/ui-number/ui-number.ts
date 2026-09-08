import { Component, EventEmitter, Input, Output, booleanAttribute, forwardRef } from '@angular/core';
import { AbstractControl, ControlValueAccessor, NG_VALIDATORS, NG_VALUE_ACCESSOR, ValidationErrors, Validator } from '@angular/forms';

@Component({
  selector: 'nx-number',
  standalone: true,
  template: `
    <div class="nx-number-wrapper">
      @if (label) {
        <label class="nx-number-label">{{ label }}@if (isRequired) {<span class="nx-number-required">*</span>}</label>
      }

      <div class="nx-number-field">
        @if (showStepButtons && showDecreaseButton) {
          <button
            type="button"
            class="nx-number-step"
            (click)="decrement()"
            [disabled]="disabled || !canDecrement()"
            aria-label="Decrease value">
            -
          </button>
        }

        @if (prefix) {
          <span class="nx-number-affix">{{ prefix }}</span>
        }

        <input
          class="nx-number-input"
          type="number"
          inputmode="decimal"
          [placeholder]="placeholder"
          [disabled]="disabled"
          [min]="min ?? null"
          [max]="max ?? null"
          [step]="step"
          [value]="value ?? ''"
          [attr.aria-required]="isRequired ? true : null"
          [attr.aria-invalid]="displayError ? true : null"
          (input)="onInput($event)"
          (blur)="onBlur()" />

        @if (suffix) {
          <span class="nx-number-affix">{{ suffix }}</span>
        }

        @if (showStepButtons && showIncreaseButton) {
          <button
            type="button"
            class="nx-number-step"
            (click)="increment()"
            [disabled]="disabled || !canIncrement()"
            aria-label="Increase value">
            +
          </button>
        }
      </div>

      @if (displayError) {
        <span class="nx-number-error">{{ displayError }}</span>
      }
    </div>
  `,
  styles: `
    .nx-number-wrapper {
      display: flex;
      flex-direction: column;
      gap: 4px;
      width: 100%;
    }

    .nx-number-label {
      font-size: 14px;
      font-weight: 600;
      color: var(--shell-text);
    }

    .nx-number-field {
      display: flex;
      gap: 8px;
      align-items: center;
    }

    .nx-number-affix {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      height: 32px;
      min-width: 32px;
      padding: 0 8px;
      border: 1px solid var(--shell-border);
      border-radius: 4px;
      background: var(--shell-surface-hover);
      color: var(--shell-text-secondary);
      font-size: 13px;
      white-space: nowrap;
    }

    .nx-number-input {
      width: 100%;
      padding: 8px 12px;
      border: 1px solid var(--shell-border);
      border-radius: 4px;
      background-color: var(--shell-surface);
      color: var(--shell-text);
      font-size: 14px;
      outline: none;
      transition: border-color .2s ease;
      appearance: textfield;
      -moz-appearance: textfield;
    }

    .nx-number-input::-webkit-outer-spin-button,
    .nx-number-input::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }

    .nx-number-input:focus {
      border-color: var(--shell-primary);
    }

    .nx-number-input:disabled {
      background-color: var(--shell-surface-hover);
      color: var(--shell-text-muted);
      cursor: not-allowed;
    }

    .nx-number-step {
      width: 32px;
      height: 32px;
      border: 1px solid var(--shell-border);
      border-radius: 4px;
      background: var(--shell-surface);
      color: var(--shell-text);
      cursor: pointer;
      font-size: 16px;
      line-height: 1;
      transition: border-color .2s ease, background-color .2s ease;
    }

    .nx-number-step:hover:not(:disabled) {
      border-color: var(--shell-primary);
      background: var(--shell-surface-hover);
    }

    .nx-number-step:disabled {
      opacity: .5;
      cursor: not-allowed;
    }

    .nx-number-error {
      font-size: 12px;
      color: #e74c3c;
    }

    .nx-number-required {
      color: #e74c3c;
      margin-left: 2px;
    }
  `,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => NxNumber),
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => NxNumber),
      multi: true,
    },
  ],
})
export class NxNumber implements ControlValueAccessor, Validator {
  @Input() label = '';
  @Input() placeholder = '';
  @Input() error = '';
  @Input() prefix = '';
  @Input() suffix = '';
  @Input() min: number | null = null;
  @Input() max: number | null = null;
  @Input() step = 1;
  @Input({ transform: booleanAttribute }) showStepButtons = true;
  @Input({ transform: booleanAttribute }) showDecreaseButton = true;
  @Input({ transform: booleanAttribute }) showIncreaseButton = true;
  @Input({ transform: booleanAttribute }) disabled = false;
  /** Marks the field as required - a value must be entered. Validated once touched. */
  @Input({ transform: booleanAttribute }) isRequired = false;
  @Input() requiredErrorMessage = 'Please enter a value';

  @Output() valueChange = new EventEmitter<number | null>();

  value: number | null = null;
  touched = false;

  private onChangeFn: (value: number | null) => void = () => {};
  private onTouchedFn: () => void = () => {};
  private onValidatorChangeFn: () => void = () => {};

  /** `error` (manual override) wins first; otherwise the built-in required check applies once touched. */
  get displayError(): string {
    if (this.error) {
      return this.error;
    }
    if (!this.touched) {
      return '';
    }
    if (this.isRequired && this.value === null) {
      return this.requiredErrorMessage;
    }
    return '';
  }

  onInput(event: Event): void {
    const rawValue = (event.target as HTMLInputElement).value;

    if (rawValue === '') {
      this.setValue(null);
      return;
    }

    const parsed = Number(rawValue);
    if (Number.isNaN(parsed)) {
      return;
    }

    this.setValue(parsed);
  }

  increment(): void {
    if (this.value === null) {
      this.setValue(this.min ?? 0);
      return;
    }
    this.setValue(this.value + this.step);
  }

  decrement(): void {
    if (this.value === null) {
      this.setValue(this.min ?? 0);
      return;
    }
    this.setValue(this.value - this.step);
  }

  canIncrement(): boolean {
    return this.max === null || this.value === null || this.value < this.max;
  }

  canDecrement(): boolean {
    return this.min === null || this.value === null || this.value > this.min;
  }

  onBlur(): void {
    this.touched = true;
    this.onTouchedFn();
  }

  writeValue(value: number | null): void {
    this.value = this.clamp(value);
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
    if (this.isRequired && control.value === null) {
      return { required: true };
    }
    return null;
  }

  registerOnValidatorChange(fn: () => void): void {
    this.onValidatorChangeFn = fn;
  }

  private setValue(value: number | null): void {
    this.value = this.clamp(value);
    this.valueChange.emit(this.value);
    this.onChangeFn(this.value);
  }

  private clamp(value: number | null): number | null {
    if (value === null || Number.isNaN(value)) {
      return null;
    }

    let next = value;
    if (this.min !== null) {
      next = Math.max(next, this.min);
    }
    if (this.max !== null) {
      next = Math.min(next, this.max);
    }
    return next;
  }
}
