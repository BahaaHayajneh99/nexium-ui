import { Component, EventEmitter, Input, Output, booleanAttribute, forwardRef } from '@angular/core';
import {
  AbstractControl,
  ControlValueAccessor,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  ValidationErrors,
  Validator,
} from '@angular/forms';
import { NxIcon } from '../../data-display/ui-icon';

export interface NxSegmentedOption {
  label: string;
  value: string;
  icon?: string;
  disabled?: boolean;
}

export type NxSegmentedSize = 'small' | 'medium' | 'large';

/**
 * A single-select row of connected segments - the same one-of-many choice
 * as `nx-radio-group`, rendered as a compact button strip (iOS-style
 * "segmented control") instead of a list of radio dots.
 */
@Component({
  selector: 'nx-segmented-control',
  standalone: true,
  imports: [NxIcon],
  templateUrl: './ui-segmented-control.html',
  styleUrl: './ui-segmented-control.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => NxSegmentedControl),
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => NxSegmentedControl),
      multi: true,
    },
  ],
})
export class NxSegmentedControl implements ControlValueAccessor, Validator {
  @Input() name = 'nx-segmented-control';
  @Input() options: NxSegmentedOption[] = [];
  @Input() value = '';
  @Input() size: NxSegmentedSize = 'medium';
  @Input({ transform: booleanAttribute }) disabled = false;
  @Input({ transform: booleanAttribute }) fullWidth = false;
  /** Marks the group as required - a value must be selected. Validated once touched. */
  @Input({ transform: booleanAttribute }) isRequired = false;
  @Input() requiredErrorMessage = 'Please select an option';

  @Output() valueChange = new EventEmitter<string>();

  touched = false;

  private onChangeFn: (value: string) => void = () => {};
  private onTouchedFn: () => void = () => {};
  private onValidatorChangeFn: () => void = () => {};

  get displayError(): string {
    if (this.touched && this.isRequired && !this.value) {
      return this.requiredErrorMessage;
    }
    return '';
  }

  /** The segment a keyboard user lands on when tabbing in - the selected one, else the first enabled one. */
  isTabStop(option: NxSegmentedOption, index: number): boolean {
    if (option.value === this.value) {
      return true;
    }
    if (this.value) {
      return false;
    }
    return index === this.options.findIndex((o) => !o.disabled);
  }

  select(option: NxSegmentedOption): void {
    this.touched = true;
    this.onTouchedFn();

    if (this.disabled || option.disabled || option.value === this.value) {
      return;
    }

    this.value = option.value;
    this.valueChange.emit(this.value);
    this.onChangeFn(this.value);
  }

  onKeydown(event: KeyboardEvent, index: number): void {
    const enabledIndexes = this.options
      .map((option, i) => ({ option, i }))
      .filter(({ option }) => !option.disabled);

    if (enabledIndexes.length === 0) {
      return;
    }

    const currentPos = enabledIndexes.findIndex(({ i }) => i === index);
    let nextPos: number;

    if (event.key === 'ArrowRight' || event.key === 'ArrowDown') {
      nextPos = (currentPos + 1) % enabledIndexes.length;
    } else if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') {
      nextPos = (currentPos - 1 + enabledIndexes.length) % enabledIndexes.length;
    } else if (event.key === 'Home') {
      nextPos = 0;
    } else if (event.key === 'End') {
      nextPos = enabledIndexes.length - 1;
    } else {
      return;
    }

    event.preventDefault();
    const target = enabledIndexes[nextPos].option;
    this.select(target);

    queueMicrotask(() => {
      document.getElementById(this.segmentId(target))?.focus();
    });
  }

  segmentId(option: NxSegmentedOption): string {
    return `${this.name}-${option.value}`;
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
    if (this.isRequired && !control.value) {
      return { required: true };
    }
    return null;
  }

  registerOnValidatorChange(fn: () => void): void {
    this.onValidatorChangeFn = fn;
  }
}
