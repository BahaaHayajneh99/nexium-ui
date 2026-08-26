import { Component, EventEmitter, Input, Output, booleanAttribute, forwardRef } from '@angular/core';
import { NgClass } from '@angular/common';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'nx-input',
  standalone: true,
  imports: [NgClass],
  template: `
    <div class="nx-input-wrapper">
      @if (label) {
        <label class="nx-input-label">{{ label }}</label>
      }
      <input
        class="nx-input"
        [ngClass]="{ error: !!error }"
        [type]="type"
        [placeholder]="placeholder"
        [disabled]="disabled"
        [value]="value"
        (input)="onInput($event)"
        (blur)="onBlur()" />
      @if (error) {
        <span class="nx-input-error">{{ error }}</span>
      }
    </div>
  `,
  styles: `
    .nx-input-wrapper { display: flex; flex-direction: column; gap: 4px; }
    .nx-input-label { font-size: 14px; font-weight: 600; color: var(--shell-text); }
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
  ],
})
export class NxInput implements ControlValueAccessor {
  @Input() label = '';
  @Input() type: 'text' | 'email' | 'password' | 'number' = 'text';
  @Input() placeholder = '';
  @Input() error = '';
  @Input() value = '';
  @Input({ transform: booleanAttribute }) disabled = false;

  @Output() valueChange = new EventEmitter<string>();

  private onChangeFn: (value: string) => void = () => {};
  private onTouchedFn: () => void = () => {};

  onInput(event: Event): void {
    this.value = (event.target as HTMLInputElement).value;
    this.valueChange.emit(this.value);
    this.onChangeFn(this.value);
  }

  onBlur(): void {
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
}
