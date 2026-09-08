import { Component, EventEmitter, Input, Output, booleanAttribute, forwardRef } from '@angular/core';
import { AbstractControl, ControlValueAccessor, NG_VALIDATORS, NG_VALUE_ACCESSOR, ValidationErrors, Validator } from '@angular/forms';

@Component({
  selector: 'nx-toggle',
  standalone: true,
  imports: [],
  template: `
    <button
      type="button"
      class="nx-toggle"
      [class.active]="pressed"
      [disabled]="disabled"
      [attr.aria-required]="isRequired ? true : null"
      [attr.aria-invalid]="!!displayError ? true : null"
      (click)="toggle()"
      (blur)="onBlur()">
      <ng-content></ng-content>
    </button>
    @if (displayError) {
      <span class="nx-toggle-error">{{ displayError }}</span>
    }
  `,
  styles: `
    .nx-toggle {
      padding: 8px 16px;
      border: 1px solid var(--shell-border);
      border-radius: 4px;
      background-color: var(--shell-surface);
      color: var(--shell-text);
      font-size: 14px;
      cursor: pointer;
      transition: background-color .2s ease, color .2s ease, border-color .2s ease;
    }
    .nx-toggle:hover:not(:disabled) { background-color: var(--shell-surface-hover); }
    .nx-toggle.active {
      background-color: var(--shell-primary);
      border-color: var(--shell-primary);
      color: #ffffff;
    }
    .nx-toggle:disabled { opacity: .6; cursor: not-allowed; }
    .nx-toggle-error { display: block; font-size: 12px; color: #e74c3c; margin-top: 4px; }
  `,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => NxToggle),
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => NxToggle),
      multi: true,
    },
  ],
})
export class NxToggle implements ControlValueAccessor, Validator {
  @Input({ transform: booleanAttribute }) pressed = false;
  @Input({ transform: booleanAttribute }) disabled = false;
  /** Marks the toggle as required - must be pressed/active. Validated once touched. */
  @Input({ transform: booleanAttribute }) isRequired = false;
  @Input() requiredErrorMessage = 'This field is required';

  @Output() pressedChange = new EventEmitter<boolean>();

  touched = false;

  private onChangeFn: (value: boolean) => void = () => {};
  private onTouchedFn: () => void = () => {};
  private onValidatorChangeFn: () => void = () => {};

  get displayError(): string {
    if (this.touched && this.isRequired && !this.pressed) {
      return this.requiredErrorMessage;
    }
    return '';
  }

  toggle(): void {
    if (this.disabled) {
      return;
    }
    this.pressed = !this.pressed;
    this.pressedChange.emit(this.pressed);
    this.onChangeFn(this.pressed);
  }

  onBlur(): void {
    this.touched = true;
    this.onTouchedFn();
  }

  writeValue(value: boolean): void {
    this.pressed = !!value;
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
