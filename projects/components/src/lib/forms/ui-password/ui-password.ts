import { Component, EventEmitter, Input, Output, booleanAttribute, forwardRef, numberAttribute } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

type NxPasswordStrength = 'Weak' | 'Fair' | 'Good' | 'Strong';

interface NxPasswordRequirement {
  label: string;
  met: boolean;
}

@Component({
  selector: 'nx-password',
  standalone: true,
  template: `
    <div class="nx-password-wrapper">
      @if (label) {
        <label class="nx-password-label">{{ label }}</label>
      }

      <div class="nx-password-field">
        <input
          class="nx-password-input"
          [type]="visible ? 'text' : 'password'"
          [value]="value"
          [placeholder]="placeholder"
          [disabled]="disabled"
          [class.invalid]="showValidationState && !isValid"
          (input)="onInput($event)"
          (blur)="onBlur()" />

        @if (showToggle) {
          <button
            type="button"
            class="nx-password-toggle"
            [disabled]="disabled"
            (click)="toggleVisibility()"
            [attr.aria-label]="visible ? 'Hide password' : 'Show password'"
            title="Toggle password visibility">
            <svg class="nx-eye-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              @if (visible) {
                <!-- Eye Open Icon -->
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                <circle cx="12" cy="12" r="3"></circle>
              } @else {
                <!-- Eye Closed Icon -->
                <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
                <line x1="1" y1="1" x2="23" y2="23"></line>
              }
            </svg>
          </button>
        }
      </div>

      @if (showStrength && value) {
        <div class="nx-password-strength">
          <span class="nx-password-strength-label">Strength:</span>
          <span class="nx-password-strength-badge"
            [class.weak]="strength === 'Weak'"
            [class.fair]="strength === 'Fair'"
            [class.good]="strength === 'Good'"
            [class.strong]="strength === 'Strong'">
            {{ strength }}
          </span>
        </div>
      }

      @if (showRequirements && requirements.length) {
        <div class="nx-password-requirements">
          @for (requirement of requirements; track requirement.label) {
            <div class="nx-password-requirement" [class.met]="requirement.met">
              <span class="nx-password-requirement-check">{{ requirement.met ? '✓' : '○' }}</span>
              <span>{{ requirement.label }}</span>
            </div>
          }
        </div>
      }

      @if (error) {
        <span class="nx-password-error">{{ error }}</span>
      }
    </div>
  `,
  styles: `
    .nx-password-wrapper {
      width: 100%;
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }

    .nx-password-label {
      font-size: 0.875rem;
      font-weight: 600;
      color: var(--shell-text);
    }

    .nx-password-field {
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }

    .nx-password-input {
      flex: 1;
      width: 100%;
      border: 1px solid var(--shell-border);
      border-radius: 6px;
      background: var(--shell-surface);
      color: var(--shell-text);
      font-size: 0.95rem;
      padding: 0.65rem 0.85rem;
      outline: none;
      transition: border-color .2s ease;
    }

    .nx-password-input:focus {
      border-color: var(--shell-primary);
    }

    .nx-password-input.invalid {
      border-color: #d32f2f;
    }

    .nx-password-input:disabled {
      cursor: not-allowed;
      background: var(--shell-surface-hover);
      color: var(--shell-text-muted);
    }

    .nx-password-toggle {
      border: none;
      background: transparent;
      color: var(--shell-text-secondary);
      border-radius: 4px;
      cursor: pointer;
      padding: 0.5rem;
      display: flex;
      align-items: center;
      justify-content: center;
      line-height: 1;
      transition: background-color 0.2s ease, color 0.2s ease;
    }

    .nx-password-toggle:hover:not(:disabled) {
      background-color: var(--shell-surface-hover);
      color: var(--shell-text);
    }

    .nx-password-toggle:focus {
      outline: 2px solid var(--shell-primary);
      outline-offset: 2px;
    }

    .nx-password-toggle:disabled {
      cursor: not-allowed;
      opacity: 0.5;
    }

    .nx-eye-icon {
      width: 1.25rem;
      height: 1.25rem;
      stroke: currentColor;
    }

    .nx-password-strength {
      display: flex;
      align-items: center;
      gap: 0.4rem;
      font-size: 0.85rem;
    }

    .nx-password-strength-label {
      color: var(--shell-text-secondary);
      font-weight: 600;
    }

    .nx-password-strength-badge {
      font-weight: 600;
      border-radius: 999px;
      padding: 0.2rem 0.6rem;
    }

    .nx-password-strength-badge.weak {
      background: #ffebee;
      color: #b71c1c;
    }

    .nx-password-strength-badge.fair {
      background: #fff8e1;
      color: #e65100;
    }

    .nx-password-strength-badge.good {
      background: #e8f5e9;
      color: #1b5e20;
    }

    .nx-password-strength-badge.strong {
      background: #e3f2fd;
      color: #0d47a1;
    }

    .nx-password-requirements {
      display: flex;
      flex-direction: column;
      gap: 0.35rem;
      padding: 0.65rem;
      border: 1px solid var(--shell-border);
      border-radius: 6px;
      background: var(--shell-surface-hover);
    }

    .nx-password-requirement {
      display: flex;
      align-items: center;
      gap: 0.4rem;
      color: var(--shell-text-secondary);
      font-size: 0.85rem;
    }

    .nx-password-requirement.met {
      color: #1b5e20;
    }

    .nx-password-requirement-check {
      font-weight: 700;
      width: 1rem;
      text-align: center;
    }

    .nx-password-error {
      font-size: 0.8rem;
      color: #d32f2f;
    }
  `,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => NxPassword),
      multi: true,
    },
  ],
})
export class NxPassword implements ControlValueAccessor {
  @Input() label = '';
  @Input() placeholder = '';
  @Input() error = '';
  @Input({ transform: numberAttribute }) minLength = 8;
  @Input({ transform: booleanAttribute }) requireUppercase = true;
  @Input({ transform: booleanAttribute }) requireLowercase = true;
  @Input({ transform: booleanAttribute }) requireDigit = true;
  @Input({ transform: booleanAttribute }) requireSpecial = true;
  @Input() specialChars = '!@#$%^&*()_+-=[]{}|;:,.<>?';
  @Input({ transform: booleanAttribute }) showToggle = true;
  @Input({ transform: booleanAttribute }) showStrength = true;
  @Input({ transform: booleanAttribute }) showRequirements = true;
  @Input({ transform: booleanAttribute }) showValidationState = false;
  @Input({ transform: booleanAttribute }) disabled = false;

  @Output() valueChange = new EventEmitter<string>();
  @Output() validChange = new EventEmitter<boolean>();
  @Output() strengthChange = new EventEmitter<NxPasswordStrength>();

  value = '';
  visible = false;

  private onChangeFn: (value: string) => void = () => {};
  private onTouchedFn: () => void = () => {};

  get requirements(): NxPasswordRequirement[] {
    const checks: NxPasswordRequirement[] = [];

    checks.push({
      label: `At least ${this.minLength} characters`,
      met: this.value.length >= this.minLength,
    });

    if (this.requireUppercase) {
      checks.push({
        label: 'Contains uppercase letter',
        met: /[A-Z]/.test(this.value),
      });
    }

    if (this.requireLowercase) {
      checks.push({
        label: 'Contains lowercase letter',
        met: /[a-z]/.test(this.value),
      });
    }

    if (this.requireDigit) {
      checks.push({
        label: 'Contains number',
        met: /\d/.test(this.value),
      });
    }

    if (this.requireSpecial) {
      checks.push({
        label: 'Contains special character',
        met: this.hasSpecialCharacter(this.value),
      });
    }

    return checks;
  }

  get isValid(): boolean {
    return this.requirements.every(requirement => requirement.met);
  }

  get strength(): NxPasswordStrength {
    const rules = this.requirements;
    const metCount = rules.filter(rule => rule.met).length;

    if (metCount <= 1) {
      return 'Weak';
    }
    if (metCount <= 3) {
      return 'Fair';
    }
    if (metCount < rules.length) {
      return 'Good';
    }
    return 'Strong';
  }

  onInput(event: Event): void {
    this.value = (event.target as HTMLInputElement).value ?? '';
    this.valueChange.emit(this.value);
    this.validChange.emit(this.isValid);
    this.strengthChange.emit(this.strength);
    this.onChangeFn(this.value);
  }

  onBlur(): void {
    this.onTouchedFn();
  }

  toggleVisibility(): void {
    this.visible = !this.visible;
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

  private hasSpecialCharacter(value: string): boolean {
    if (!this.specialChars) {
      return false;
    }

    return value.split('').some(char => this.specialChars.includes(char));
  }
}
