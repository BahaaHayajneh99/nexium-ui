import { Component, EventEmitter, Input, Output, booleanAttribute } from '@angular/core';

export interface NxSelectOption {
  label: string;
  value: string;
}

@Component({
  selector: 'nx-select',
  standalone: true,
  imports: [],
  template: `
    <div class="nx-select-wrapper">
      @if (label) {
        <label class="nx-select-label">{{ label }}</label>
      }
      <select class="nx-select" [disabled]="disabled" [value]="value" (change)="onChange($event)">
        @if (placeholder) {
          <option value="" disabled selected>{{ placeholder }}</option>
        }
        @for (option of options; track option.value) {
          <option [value]="option.value">{{ option.label }}</option>
        }
      </select>
    </div>
  `,
  styles: `
    .nx-select-wrapper { display: flex; flex-direction: column; gap: 4px; }
    .nx-select-label { font-size: 14px; font-weight: 600; color: var(--shell-text); }
    .nx-select {
      padding: 8px 12px;
      border: 1px solid var(--shell-border);
      border-radius: 4px;
      font-size: 14px;
      background-color: var(--shell-surface);
      color: var(--shell-text);
      outline: none;
    }
    .nx-select:focus { border-color: var(--shell-primary); }
    .nx-select:disabled { background-color: var(--shell-surface-hover); color: var(--shell-text-muted); cursor: not-allowed; }
    .nx-select option {
      background-color: var(--shell-surface);
      color: var(--shell-text);
    }
    .nx-select option:disabled { color: var(--shell-text-muted); }
  `,
})
export class NxSelect {
  @Input() label = '';
  @Input() placeholder = '';
  @Input() options: NxSelectOption[] = [];
  @Input() value = '';
  @Input({ transform: booleanAttribute }) disabled = false;

  @Output() valueChange = new EventEmitter<string>();

  onChange(event: Event): void {
    this.value = (event.target as HTMLSelectElement).value;
    this.valueChange.emit(this.value);
  }
}
