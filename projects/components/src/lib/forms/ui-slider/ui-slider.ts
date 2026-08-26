import { Component, EventEmitter, Input, Output, booleanAttribute, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'nx-slider',
  standalone: true,
  imports: [],
  template: `
    <div class="nx-slider-wrapper">
      @if (label) {
        <label class="nx-slider-label">{{ label }} <span>{{ value }}</span></label>
      }
      <input
        type="range"
        class="nx-slider"
        [min]="min"
        [max]="max"
        [step]="step"
        [disabled]="disabled"
        [value]="value"
        (input)="onInput($event)"
        (blur)="onBlur()" />
    </div>
  `,
  styles: `
    .nx-slider-wrapper { display: flex; flex-direction: column; gap: 4px; }
    .nx-slider-label {
      display: flex;
      justify-content: space-between;
      font-size: 14px;
      font-weight: 600;
      color: var(--shell-text);
    }
    .nx-slider { width: 100%; accent-color: var(--shell-primary); cursor: pointer; }
    .nx-slider:disabled { cursor: not-allowed; opacity: .6; }
  `,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => NxSlider),
      multi: true,
    },
  ],
})
export class NxSlider implements ControlValueAccessor {
  @Input() label = '';
  @Input() min = 0;
  @Input() max = 100;
  @Input() step = 1;
  @Input() value = 0;
  @Input({ transform: booleanAttribute }) disabled = false;

  @Output() valueChange = new EventEmitter<number>();

  private onChangeFn: (value: number) => void = () => {};
  private onTouchedFn: () => void = () => {};

  onInput(event: Event): void {
    this.value = Number((event.target as HTMLInputElement).value);
    this.valueChange.emit(this.value);
    this.onChangeFn(this.value);
  }

  onBlur(): void {
    this.onTouchedFn();
  }

  writeValue(value: number): void {
    this.value = value ?? 0;
  }

  registerOnChange(fn: (value: number) => void): void {
    this.onChangeFn = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouchedFn = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }
}
