import { Component, EventEmitter, Input, Output, booleanAttribute } from '@angular/core';

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
})
export class NxTextarea {
  @Input() label = '';
  @Input() placeholder = '';
  @Input() value = '';
  @Input() rows = 4;
  @Input({ transform: booleanAttribute }) disabled = false;

  @Output() valueChange = new EventEmitter<string>();

  onInput(event: Event): void {
    this.value = (event.target as HTMLTextAreaElement).value;
    this.valueChange.emit(this.value);
  }
}
