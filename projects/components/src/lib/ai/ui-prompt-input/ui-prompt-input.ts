import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { NxIcon } from '../../data-display/ui-icon';
import { NxProLocked } from '../../licensing/ui-pro-locked/ui-pro-locked';
import { nxProLicenseGranted } from '../../licensing/nx-license';

/** Growth ceiling (px) before the textarea stops growing and scrolls internally instead. */
const DEFAULT_MAX_HEIGHT = 200;

/**
 * A chat-style composer: an auto-growing textarea (grows with content up to `maxHeight`, then
 * scrolls internally), Enter submits, Shift+Enter inserts a newline. Optionally shows a live
 * character counter (`maxLength`) and a row of clickable quick-prompt chips (`suggestions`).
 */
@Component({
  selector: 'nx-prompt-input',
  standalone: true,
  imports: [NxIcon, NxProLocked],
  templateUrl: './ui-prompt-input.html',
  styleUrl: './ui-prompt-input.scss',
})
export class NxPromptInput {
  protected readonly licensed = nxProLicenseGranted();

  @Input() value = '';
  @Input() placeholder = 'Message...';
  /** When set, shows a live current/max character counter and blocks submit once over the limit. */
  @Input() maxLength?: number;
  /** Quick-prompt chips rendered above the composer; clicking one fills the textarea (doesn't auto-submit). */
  @Input() suggestions: string[] = [];
  /** Growth ceiling (px) for the auto-growing textarea before it starts scrolling internally. */
  @Input() maxHeight = DEFAULT_MAX_HEIGHT;

  @Output() valueChange = new EventEmitter<string>();
  @Output() submit = new EventEmitter<string>();

  @ViewChild('textareaRef') private textareaRef?: ElementRef<HTMLTextAreaElement>;

  get isOverLimit(): boolean {
    return this.maxLength != null && this.value.length > this.maxLength;
  }

  get isAtOrOverLimit(): boolean {
    return this.maxLength != null && this.value.length >= this.maxLength;
  }

  onInput(event: Event): void {
    const textarea = event.target as HTMLTextAreaElement;
    this.value = textarea.value;
    this.valueChange.emit(this.value);
    this.resize(textarea);
  }

  onKeydown(event: KeyboardEvent): void {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      this.trySubmit();
    }
  }

  useSuggestion(suggestion: string): void {
    this.value = suggestion;
    this.valueChange.emit(this.value);
    // The textarea's own (input) handler is what normally drives resize() - a
    // programmatic value change like this one never fires it, so resize manually
    // once the new value has actually reached the DOM.
    setTimeout(() => {
      if (this.textareaRef) {
        this.resize(this.textareaRef.nativeElement);
      }
    });
  }

  trySubmit(): void {
    if (this.isOverLimit) {
      return;
    }
    const trimmed = this.value.trim();
    if (!trimmed) {
      return;
    }
    this.submit.emit(trimmed);
    this.value = '';
    this.valueChange.emit('');
    if (this.textareaRef) {
      this.textareaRef.nativeElement.style.height = 'auto';
    }
  }

  private resize(textarea: HTMLTextAreaElement): void {
    textarea.style.height = 'auto';
    textarea.style.height = `${Math.min(textarea.scrollHeight, this.maxHeight)}px`;
  }
}
