import { Component, Input } from '@angular/core';

/** Renders a key combo as styled <kbd> chips - pass either a "Ctrl+K" string or a ['Ctrl', 'K'] array. */
@Component({
  selector: 'nx-keyboard-shortcut',
  standalone: true,
  imports: [],
  template: `
    <span class="nx-keyboard-shortcut">
      @for (key of keyList; track $index; let last = $last) {
        <kbd class="nx-keyboard-shortcut-key">{{ key }}</kbd>
        @if (!last) {
          <span class="nx-keyboard-shortcut-plus">+</span>
        }
      }
    </span>
  `,
  styles: `
    .nx-keyboard-shortcut {
      display: inline-flex;
      align-items: center;
      gap: 4px;
    }
    .nx-keyboard-shortcut-key {
      display: inline-block;
      padding: 2px 8px;
      border: 1px solid var(--shell-border);
      border-bottom-width: 2px;
      border-radius: var(--nx-radius-sm, 4px);
      background-color: var(--shell-surface);
      color: var(--shell-text);
      font-family: "JetBrains Mono", monospace;
      font-size: 12px;
      line-height: 1.6;
    }
    .nx-keyboard-shortcut-plus {
      color: var(--shell-text-secondary);
      font-size: 12px;
    }
  `,
})
export class NxKeyboardShortcut {
  @Input() keys: string[] | string = [];

  get keyList(): string[] {
    return Array.isArray(this.keys) ? this.keys : this.keys.split('+').map((k) => k.trim());
  }
}
