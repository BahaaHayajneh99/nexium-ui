import { Component, EventEmitter, Input, Output, booleanAttribute } from '@angular/core';

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
            (change)="onChange(option.value)" />
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
})
export class NxRadioGroup {
  @Input() name = 'nx-radio-group';
  @Input() options: NxRadioOption[] = [];
  @Input() value = '';
  @Input({ transform: booleanAttribute }) disabled = false;
  @Input({ transform: booleanAttribute }) inline = false;

  @Output() valueChange = new EventEmitter<string>();

  onChange(value: string): void {
    this.value = value;
    this.valueChange.emit(value);
  }
}

