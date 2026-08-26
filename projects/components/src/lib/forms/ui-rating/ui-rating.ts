import { Component, EventEmitter, Input, Output, booleanAttribute, forwardRef, numberAttribute } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'nx-rating',
  standalone: true,
  imports: [],
  templateUrl: './ui-rating.html',
  styleUrl: './ui-rating.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => NxRating),
      multi: true,
    },
  ],
})
export class NxRating implements ControlValueAccessor {
  @Input({ transform: numberAttribute }) value = 0;
  @Input({ transform: numberAttribute }) max = 5;
  @Input({ transform: booleanAttribute }) readonly = false;
  @Input({ transform: booleanAttribute }) disabled = false;
  /** Clicking the currently-selected star resets the rating to 0. */
  @Input({ transform: booleanAttribute }) allowClear = true;

  @Output() valueChange = new EventEmitter<number>();

  hovered: number | null = null;

  private onChangeFn: (value: number) => void = () => {};
  private onTouchedFn: () => void = () => {};

  get stars(): number[] {
    return Array.from({ length: this.max }, (_, i) => i + 1);
  }

  get displayValue(): number {
    return this.hovered ?? this.value;
  }

  onEnter(star: number): void {
    if (!this.readonly && !this.disabled) {
      this.hovered = star;
    }
  }

  onLeave(): void {
    this.hovered = null;
  }

  onSelect(star: number): void {
    if (this.readonly || this.disabled) {
      return;
    }

    const next = this.allowClear && this.value === star ? 0 : star;
    this.value = next;
    this.valueChange.emit(next);
    this.onChangeFn(next);
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
