import { Component, EventEmitter, Input, Output, SimpleChanges, booleanAttribute, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

export type NxMaskType = 'custom' | 'phone' | 'ssn' | 'credit-card' | 'zip' | 'date' | 'time';

const NX_MASK_PRESETS: Record<Exclude<NxMaskType, 'custom'>, string> = {
  phone: '(999) 999-9999',
  ssn: '999-99-9999',
  'credit-card': '9999 9999 9999 9999',
  zip: '99999',
  date: '99/99/9999',
  time: '99:99',
};

@Component({
  selector: 'nx-mask',
  standalone: true,
  template: `
    <div class="nx-mask-wrapper">
      @if (label) {
        <label class="nx-mask-label">{{ label }}</label>
      }

      <input
        class="nx-mask-input"
        [value]="value"
        [placeholder]="placeholder"
        [disabled]="disabled"
        [attr.maxlength]="resolvedMask ? resolvedMask.length : null"
        [attr.inputmode]="inputMode"
        [class.error]="!!error"
        (input)="onInput($event)"
        (blur)="onBlur()" />

      @if (error) {
        <span class="nx-mask-error">{{ error }}</span>
      }
    </div>
  `,
  styles: `
    .nx-mask-wrapper {
      display: flex;
      flex-direction: column;
      gap: 4px;
      width: 100%;
    }

    .nx-mask-label {
      font-size: 14px;
      font-weight: 600;
      color: var(--shell-text);
    }

    .nx-mask-input {
      width: 100%;
      padding: 8px 12px;
      border: 1px solid var(--shell-border);
      border-radius: 4px;
      background-color: var(--shell-surface);
      color: var(--shell-text);
      font-size: 14px;
      outline: none;
      transition: border-color .2s ease;
      font-family: 'Monaco', 'Menlo', monospace;
    }

    .nx-mask-input:focus {
      border-color: var(--shell-primary);
    }

    .nx-mask-input.error {
      border-color: #e74c3c;
    }

    .nx-mask-input:disabled {
      background-color: var(--shell-surface-hover);
      color: var(--shell-text-muted);
      cursor: not-allowed;
    }

    .nx-mask-error {
      font-size: 12px;
      color: #e74c3c;
    }
  `,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => NxMask),
      multi: true,
    },
  ],
})
export class NxMask implements ControlValueAccessor {
  @Input() label = '';
  @Input() placeholder = '';
  @Input() error = '';
  @Input() type: NxMaskType = 'custom';
  @Input() mask = '';
  @Input({ transform: booleanAttribute }) disabled = false;

  @Output() valueChange = new EventEmitter<string>();
  @Output() rawValueChange = new EventEmitter<string>();

  value = '';
  rawValue = '';

  private onChangeFn: (value: string) => void = () => {};
  private onTouchedFn: () => void = () => {};

  ngOnChanges(changes: SimpleChanges): void {
    if (!changes['mask'] && !changes['type']) {
      return;
    }

    if (!this.value && !this.rawValue) {
      return;
    }

    const { formatted, raw } = this.applyMask(this.rawValue || this.value);
    this.value = formatted;
    this.rawValue = raw;
    this.onChangeFn(formatted);
    this.valueChange.emit(formatted);
    this.rawValueChange.emit(raw);
  }

  get resolvedMask(): string {
    if (this.type === 'custom') {
      return this.normalizeCustomMask(this.mask);
    }
    return NX_MASK_PRESETS[this.type] ?? this.mask;
  }

  get inputMode(): 'numeric' | 'text' {
    if (!this.resolvedMask) {
      return 'text';
    }
    return /[A*]/.test(this.resolvedMask) ? 'text' : 'numeric';
  }

  onInput(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    const nextInput = inputElement.value ?? '';
    const { formatted, raw } = this.applyMask(nextInput);

    this.value = formatted;
    this.rawValue = raw;

    inputElement.value = formatted;
    this.valueChange.emit(formatted);
    this.rawValueChange.emit(raw);
    this.onChangeFn(formatted);
  }

  onBlur(): void {
    this.onTouchedFn();
  }

  writeValue(value: string): void {
    const nextValue = value ?? '';
    const { formatted, raw } = this.applyMask(nextValue);
    this.value = formatted;
    this.rawValue = raw;
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

  private applyMask(input: string): { formatted: string; raw: string } {
    const pattern = this.resolvedMask;
    if (!pattern) {
      return { formatted: input, raw: input };
    }

    const candidates = input.split('').filter(char => /[A-Za-z0-9]/.test(char));
    let candidateIndex = 0;
    let formatted = '';
    let raw = '';

    for (const maskChar of pattern) {
      const matcher = this.getMatcher(maskChar);

      if (!matcher) {
        formatted += maskChar;
        continue;
      }

      let matchedChar = '';
      while (candidateIndex < candidates.length) {
        const candidate = candidates[candidateIndex++];
        if (matcher.test(candidate)) {
          matchedChar = candidate;
          break;
        }
      }

      if (!matchedChar) {
        break;
      }

      formatted += matchedChar;
      raw += matchedChar;
    }

    return { formatted, raw };
  }

  private getMatcher(maskChar: string): RegExp | null {
    if (maskChar === '9') {
      return /\d/;
    }
    if (maskChar === '#') {
      return /\d/;
    }
    if (maskChar === 'A') {
      return /[A-Za-z]/;
    }
    if (maskChar === '*') {
      return /[A-Za-z0-9]/;
    }
    return null;
  }

  private normalizeCustomMask(mask: string): string {
    const expanded = this.expandTokenQuantifiers(mask);
    return expanded.replace(/\d/g, '9');
  }

  private expandTokenQuantifiers(mask: string): string {
    return mask.replace(/([9A*#])\{(\d{1,3})\}/g, (_match, token: string, countRaw: string) => {
      const parsedCount = Number(countRaw);
      const count = Number.isFinite(parsedCount) ? Math.min(Math.max(parsedCount, 1), 200) : 1;
      return token.repeat(count);
    });
  }
}
