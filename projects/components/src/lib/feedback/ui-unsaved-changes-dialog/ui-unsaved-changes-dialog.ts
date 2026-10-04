import { Component, EventEmitter, HostListener, Input, Output, booleanAttribute } from '@angular/core';

/**
 * A three-way confirmation for leaving a form/editor with unsaved changes -
 * Save, Discard, or Cancel (stay). `nx-dialog` covers the general
 * confirm/cancel case; this covers the specific three-choice one that
 * comes up whenever navigation could lose in-progress work.
 */
@Component({
  selector: 'nx-unsaved-changes-dialog',
  standalone: true,
  imports: [],
  template: `
    @if (open) {
      <div class="nx-unsaved-dialog-backdrop">
        <div class="nx-unsaved-dialog" role="alertdialog" aria-modal="true" [attr.aria-label]="title">
          <h3 class="nx-unsaved-dialog-title">{{ title }}</h3>
          <p class="nx-unsaved-dialog-message">{{ message }}</p>
          <div class="nx-unsaved-dialog-actions">
            <button type="button" class="nx-unsaved-dialog-btn cancel" (click)="onCancel()">{{ cancelText }}</button>
            <button type="button" class="nx-unsaved-dialog-btn discard" (click)="onDiscard()">{{ discardText }}</button>
            <button type="button" class="nx-unsaved-dialog-btn save" (click)="onSave()">{{ saveText }}</button>
          </div>
        </div>
      </div>
    }
  `,
  styles: `
    .nx-unsaved-dialog-backdrop {
      position: fixed;
      inset: 0;
      background: rgba(0, 0, 0, .5);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 1000;
    }
    .nx-unsaved-dialog {
      background: var(--shell-surface);
      border-radius: var(--nx-radius-md, 8px);
      padding: 24px;
      width: 360px;
      max-width: calc(100vw - 32px);
      box-shadow: var(--nx-shadow-lg, 0 10px 20px rgba(0, 0, 0, .15));
      box-sizing: border-box;
    }
    .nx-unsaved-dialog-title {
      margin: 0 0 8px;
      color: var(--shell-text);
    }
    .nx-unsaved-dialog-message {
      margin: 0 0 20px;
      color: var(--shell-text-secondary);
    }
    .nx-unsaved-dialog-actions {
      display: flex;
      justify-content: flex-end;
      gap: 8px;
      flex-wrap: wrap;
    }
    .nx-unsaved-dialog-btn {
      padding: 8px 16px;
      border-radius: var(--nx-radius-sm, 4px);
      border: 1px solid transparent;
      cursor: pointer;
      font-size: 14px;
      font-weight: 500;
    }
    .nx-unsaved-dialog-btn.cancel {
      background: transparent;
      border-color: var(--shell-border);
      color: var(--shell-text);
    }
    .nx-unsaved-dialog-btn.discard {
      background: transparent;
      color: var(--danger-color, #e74c3c);
    }
    .nx-unsaved-dialog-btn.save {
      background: var(--shell-primary);
      color: #ffffff;
    }
  `,
})
export class NxUnsavedChangesDialog {
  @Input({ transform: booleanAttribute }) open = false;
  @Input() title = 'Unsaved changes';
  @Input() message = 'You have unsaved changes. Do you want to save them before leaving?';
  @Input() saveText = 'Save';
  @Input() discardText = "Don't save";
  @Input() cancelText = 'Cancel';

  @Output() save = new EventEmitter<void>();
  @Output() discard = new EventEmitter<void>();
  @Output() cancel = new EventEmitter<void>();
  @Output() openChange = new EventEmitter<boolean>();

  onSave(): void {
    this.close();
    this.save.emit();
  }

  onDiscard(): void {
    this.close();
    this.discard.emit();
  }

  onCancel(): void {
    this.close();
    this.cancel.emit();
  }

  @HostListener('document:keydown.escape')
  onEscape(): void {
    if (this.open) {
      this.onCancel();
    }
  }

  private close(): void {
    this.open = false;
    this.openChange.emit(false);
  }
}
