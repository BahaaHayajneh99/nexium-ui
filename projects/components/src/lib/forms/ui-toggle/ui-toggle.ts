import { Component, EventEmitter, Input, Output, booleanAttribute } from '@angular/core';

@Component({
  selector: 'nx-toggle',
  standalone: true,
  imports: [],
  template: `
    <button
      type="button"
      class="nx-toggle"
      [class.active]="pressed"
      [disabled]="disabled"
      (click)="toggle()">
      <ng-content></ng-content>
    </button>
  `,
  styles: `
    .nx-toggle {
      padding: 8px 16px;
      border: 1px solid var(--shell-border);
      border-radius: 4px;
      background-color: var(--shell-surface);
      color: var(--shell-text);
      font-size: 14px;
      cursor: pointer;
      transition: background-color .2s ease, color .2s ease, border-color .2s ease;
    }
    .nx-toggle:hover:not(:disabled) { background-color: var(--shell-surface-hover); }
    .nx-toggle.active {
      background-color: var(--shell-primary);
      border-color: var(--shell-primary);
      color: #ffffff;
    }
    .nx-toggle:disabled { opacity: .6; cursor: not-allowed; }
  `,
})
export class UiToggle {
  @Input({ transform: booleanAttribute }) pressed = false;
  @Input({ transform: booleanAttribute }) disabled = false;

  @Output() pressedChange = new EventEmitter<boolean>();

  toggle(): void {
    if (this.disabled) {
      return;
    }
    this.pressed = !this.pressed;
    this.pressedChange.emit(this.pressed);
  }
}
