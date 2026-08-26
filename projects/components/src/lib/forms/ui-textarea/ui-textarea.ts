import { Component, EventEmitter, Input, Output, booleanAttribute, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'nx-textarea',
  standalone: true,
  imports: [],
  template: `
    <div class="nx-textarea-wrapper">
      @if (label) {
        <label class="nx-textarea-label">{{ label }}</label>
      }
      <textarea
        class="nx-textarea"
        [rows]="rows"
        [placeholder]="placeholder"
        [disabled]="disabled"
        [value]="value"
        (input)="onInput($event)"
        (blur)="onBlur()"
      ></textarea>
    </div>
  `,
  styles: `
    .nx-textarea-wrapper { display: flex; flex-direction: column; gap: 4px; }
    .nx-textarea-label { font-size: 14px; font-weight: 600; color: var(--shell-text); }
    .nx-textarea {
      padding: 8px 12px;
      border: 1px solid var(--shell-border);
      border-radius: 4px;
      background-color: var(--shell-surface);
      color: var(--shell-text);
      font-size: 14px;
      font-family: inherit;
      outline: none;
      resize: vertical;
      transition: border-color .2s ease;
    }
    .nx-textarea:focus { border-color: var(--shell-primary); }
    .nx-textarea:disabled { background-color: var(--shell-surface-hover); color: var(--shell-text-muted); cursor: not-allowed; }
  `,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => NxTextarea),
      multi: true,
    },
  ],
})
export class NxTextarea implements ControlValueAccessor {
  @Input() label = '';
  @Input() placeholder = '';
  @Input() value = '';
  @Input() rows = 4;
  @Input({ transform: booleanAttribute }) disabled = false;

  @Output() valueChange = new EventEmitter<string>();

  private onChangeFn: (value: string) => void = () => {};
  private onTouchedFn: () => void = () => {};

  onInput(event: Event): void {
    this.value = (event.target as HTMLTextAreaElement).value;
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
