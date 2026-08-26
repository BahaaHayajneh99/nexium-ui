import { Component, EventEmitter, Input, Output, booleanAttribute, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

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
            (change)="onChange(option.value)"
            (blur)="onBlur()" />
          <span>{{ option.label }}</span>
        </label>
      }
    </div>
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
  `,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => NxRadioGroup),
      multi: true,
    },
  ],
})
export class NxRadioGroup implements ControlValueAccessor {
  @Input() name = 'nx-radio-group';
  @Input() options: NxRadioOption[] = [];
  @Input() value = '';
  @Input({ transform: booleanAttribute }) disabled = false;
  @Input({ transform: booleanAttribute }) inline = false;

  @Output() valueChange = new EventEmitter<string>();

  private onChangeFn: (value: string) => void = () => {};
  private onTouchedFn: () => void = () => {};

  onChange(value: string): void {
    this.value = value;
    this.valueChange.emit(value);
    this.onChangeFn(value);
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
