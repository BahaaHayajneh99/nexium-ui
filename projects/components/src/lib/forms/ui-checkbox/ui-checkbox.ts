import { Component, EventEmitter, Input, Output, booleanAttribute } from '@angular/core';
import { NgClass } from '@angular/common';

@Component({
  selector: 'nx-checkbox',
  standalone: true,
  imports: [NgClass],
  template: `
    <label class="nx-checkbox" [ngClass]="variant" [class.disabled]="disabled" [class.invalid]="invalid">
      <input
        type="checkbox"
        class="nx-checkbox-input"
        [checked]="checked"
        [disabled]="disabled"
        [attr.aria-invalid]="invalid ? true : null"
        (change)="onChange($event)" />
      <span class="nx-checkbox-box"></span>
      @if (label) {
        <span class="nx-checkbox-label">{{ label }}</span>
      }
    </label>
  `,
  styles: `
    .nx-checkbox {
      position: relative;
      display: inline-flex;
      align-items: center;
      gap: 8px;
      cursor: pointer;
      font-size: 14px;
      color: var(--shell-text);
    }
    .nx-checkbox.disabled { opacity: .6; cursor: not-allowed; }
    .nx-checkbox-input {
      position: absolute;
      width: 18px;
      height: 18px;
      margin: 0;
      opacity: 0;
      cursor: inherit;
    }
    .nx-checkbox-box {
      position: relative;
      flex-shrink: 0;
      width: 18px;
      height: 18px;
      border: 1px solid var(--shell-border);
      border-radius: 4px;
      background-color: var(--shell-surface);
      transition: all .15s ease;
    }
    .nx-checkbox-input:checked + .nx-checkbox-box {
      background-color: var(--shell-primary);
      border-color: var(--shell-primary);
    }
    .nx-checkbox-input:checked + .nx-checkbox-box::after {
      content: '';
      position: absolute;
      left: 5px;
      top: 1px;
      width: 5px;
      height: 10px;
      border: solid #ffffff;
      border-width: 0 2px 2px 0;
      transform: rotate(45deg);
    }
    .nx-checkbox-input:focus-visible + .nx-checkbox-box {
      outline: 2px solid #5dade2;
      outline-offset: 2px;
    }
    .nx-checkbox.filled .nx-checkbox-box { background-color: var(--shell-surface-hover); border-color: transparent; }
    .nx-checkbox.filled .nx-checkbox-input:checked + .nx-checkbox-box { background-color: var(--shell-primary); }
    .nx-checkbox.invalid .nx-checkbox-box { border-color: #e74c3c; }
    .nx-checkbox.invalid .nx-checkbox-label { color: #e74c3c; }
  `,
})
export class NxCheckbox {
  @Input({ transform: booleanAttribute }) checked = false;
  @Input({ transform: booleanAttribute }) disabled = false;
  @Input({ transform: booleanAttribute }) invalid = false;
  @Input() variant: 'outlined' | 'filled' = 'outlined';
  @Input() label = '';

  @Output() checkedChange = new EventEmitter<boolean>();

  onChange(event: Event): void {
    this.checked = (event.target as HTMLInputElement).checked;
    this.checkedChange.emit(this.checked);
  }
}


