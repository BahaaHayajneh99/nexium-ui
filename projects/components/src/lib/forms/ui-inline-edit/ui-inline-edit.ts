import { Component, ElementRef, EventEmitter, Input, Output, ViewChild, booleanAttribute, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NxIcon } from '../../data-display/ui-icon';
import { NxNumber } from '../ui-number';
import { NxSelect, NxSelectOption } from '../ui-select';
import { NxProLocked } from '../../licensing/ui-pro-locked/ui-pro-locked';
import { nxProLicenseGranted } from '../../licensing/nx-license';

export type NxInlineEditType = 'text' | 'number' | 'textarea' | 'select';

/**
 * A generic click-to-edit-in-place wrapper. By default it renders `value` as plain display
 * text; clicking it (or the pencil icon that appears on hover) swaps to an editable control
 * inline. Enter (for `text`/`number`) or blurring the editor confirms the change, Escape or
 * the cancel button discards it. `type` picks which control renders while editing - `'number'`
 * and `'select'` reuse `nx-number`/`nx-select` so validation/formatting stay consistent with the
 * rest of the form library.
 */
@Component({
  selector: 'nx-inline-edit',
  standalone: true,
  imports: [FormsModule, NxIcon, NxNumber, NxSelect, NxProLocked],
  templateUrl: './ui-inline-edit.html',
  styleUrl: './ui-inline-edit.scss',
})
export class NxInlineEdit {
  protected readonly licensed = nxProLicenseGranted();

  @Input() value: string | number | null = '';
  @Input() type: NxInlineEditType = 'text';
  @Input() options: NxSelectOption[] = [];
  @Input() placeholder = '';
  @Input({ transform: booleanAttribute }) disabled = false;

  @Output() valueChange = new EventEmitter<string | number | null>();
  @Output() save = new EventEmitter<string | number | null>();
  @Output() cancel = new EventEmitter<void>();

  @ViewChild('editorWrap') private editorWrapRef?: ElementRef<HTMLElement>;

  readonly editing = signal(false);
  private readonly draft = signal<string | number | null>('');

  get displayValue(): string {
    if (this.value === null || this.value === undefined || this.value === '') {
      return '';
    }
    if (this.type === 'select') {
      const match = this.options.find((option) => option.value === this.value);
      return match ? match.label : String(this.value);
    }
    return String(this.value);
  }

  get textDraft(): string {
    const current = this.draft();
    return current === null ? '' : String(current);
  }

  get numberDraft(): number | null {
    const current = this.draft();
    if (current === null || current === '') return null;
    const parsed = typeof current === 'number' ? current : Number(current);
    return Number.isNaN(parsed) ? null : parsed;
  }

  get selectDraft(): string {
    const current = this.draft();
    return current === null ? '' : String(current);
  }

  startEdit(): void {
    if (this.disabled || this.editing()) return;
    this.draft.set(this.value);
    this.editing.set(true);

    // Focus whichever native control rendered for `type` once it's in the DOM - nx-number/
    // nx-select render a real <input>/<select> into light DOM (no shadow root), so a plain
    // query from the wrapping element reaches into them too.
    setTimeout(() => {
      this.editorWrapRef?.nativeElement.querySelector<HTMLElement>('input, textarea, select')?.focus();
    });
  }

  setTextDraft(raw: string): void {
    this.draft.set(raw);
  }

  setNumberDraft(raw: number | null): void {
    this.draft.set(raw);
  }

  setSelectDraft(raw: string): void {
    this.draft.set(raw);
  }

  confirmSave(): void {
    if (!this.editing()) return;
    const next = this.draft();
    this.value = next;
    this.editing.set(false);
    this.valueChange.emit(next);
    this.save.emit(next);
  }

  cancelEdit(): void {
    if (!this.editing()) return;
    this.editing.set(false);
    this.cancel.emit();
  }

  /**
   * `focusout` (not `blur` - it doesn't bubble) from anywhere inside the editor control.
   * Deferred so a click on the Save/Cancel button (which also moves focus away from the
   * editor) gets to run its own handler first instead of racing this one.
   */
  onEditorBlur(event: FocusEvent): void {
    const root = event.currentTarget as HTMLElement;
    const next = event.relatedTarget as Node | null;
    if (next && root.contains(next)) {
      // Focus moved to another element still inside this same editor - not a real blur.
      return;
    }

    setTimeout(() => {
      if (this.editing()) {
        this.confirmSave();
      }
    }, 150);
  }
}
