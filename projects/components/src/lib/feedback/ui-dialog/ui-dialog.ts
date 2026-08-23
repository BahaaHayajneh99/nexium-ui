import { Component, EventEmitter, Input, Output, booleanAttribute } from '@angular/core';

@Component({
  selector: 'nx-dialog',
  standalone: true,
  imports: [],
  template: `
    @if (open) {
      <div class="nx-dialog-backdrop">
        <div class="nx-dialog" role="alertdialog" aria-modal="true" [attr.aria-label]="title">
          <h3 class="nx-dialog-title">{{ title }}</h3>
          <p class="nx-dialog-message">{{ message }}</p>
          <div class="nx-dialog-actions">
            <button type="button" class="nx-dialog-btn cancel" (click)="onCancel()">{{ cancelText }}</button>
            <button type="button" class="nx-dialog-btn confirm" (click)="onConfirm()">{{ confirmText }}</button>
          </div>
        </div>
      </div>
    }
  `,
  styles: `
    .nx-dialog-backdrop {
      position: fixed;
      inset: 0;
      background: rgba(0, 0, 0, .5);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 1000;
    }
    .nx-dialog {
      background: var(--shell-surface);
      border-radius: 8px;
      padding: 24px;
      width: 320px;
      box-shadow: 0 10px 20px rgba(0, 0, 0, .15);
    }
    .nx-dialog-title {
      margin-bottom: 8px;
      color: var(--shell-text);
    }
    .nx-dialog-message {
      color: var(--shell-text-secondary);
      margin-bottom: 16px;
    }
    .nx-dialog-actions {
      display: flex;
      justify-content: flex-end;
      gap: 8px;
    }
    .nx-dialog-btn {
      padding: 8px 16px;
      border-radius: 4px;
      border: none;
      cursor: pointer;
      font-size: 14px;
    }
    .nx-dialog-btn.cancel {
      background: var(--shell-surface-hover);
      color: var(--shell-text);
    }
    .nx-dialog-btn.confirm {
      background: var(--shell-primary);
      color: #ffffff;
    }
  `,
})
export class NxDialog {
  @Input({ transform: booleanAttribute }) open = false;
  @Input() title = 'Confirm';
  @Input() message = 'Are you sure?';
  @Input() confirmText = 'Confirm';
  @Input() cancelText = 'Cancel';

  @Output() confirm = new EventEmitter<void>();
  @Output() cancel = new EventEmitter<void>();

  onConfirm(): void {
    this.open = false;
    this.confirm.emit();
  }

  onCancel(): void {
    this.open = false;
    this.cancel.emit();
  }
}
