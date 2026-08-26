import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild,
  booleanAttribute,
  forwardRef,
  numberAttribute,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

export interface NxMentionSuggestion {
  id: string | number;
  label: string;
}

@Component({
  selector: 'nx-mention',
  standalone: true,
  imports: [],
  templateUrl: './ui-mention.html',
  styleUrl: './ui-mention.scss',
  host: {
    '(document:click)': 'onDocumentClick($event)',
  },
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => NxMention),
      multi: true,
    },
  ],
})
export class NxMention implements ControlValueAccessor {
  @Input() value = '';
  @Input() placeholder = '';
  @Input() suggestions: NxMentionSuggestion[] = [];
  @Input() trigger = '@';
  @Input({ transform: booleanAttribute }) disabled = false;
  @Input({ transform: numberAttribute }) rows = 3;

  @Output() valueChange = new EventEmitter<string>();
  @Output() mentioned = new EventEmitter<NxMentionSuggestion>();

  @ViewChild('textareaRef') private textareaRef!: ElementRef<HTMLTextAreaElement>;

  open = false;
  activeIndex = 0;
  private triggerIndex: number | null = null;
  private query = '';
  private onChangeFn: (value: string) => void = () => {};
  private onTouchedFn: () => void = () => {};

  constructor(private elementRef: ElementRef<HTMLElement>) {}

  get filteredSuggestions(): NxMentionSuggestion[] {
    const query = this.query.toLowerCase();
    return this.suggestions.filter((s) => s.label.toLowerCase().includes(query)).slice(0, 6);
  }

  onInput(event: Event): void {
    const textarea = event.target as HTMLTextAreaElement;
    this.value = textarea.value;
    this.valueChange.emit(this.value);
    this.onChangeFn(this.value);
    this.updateMentionContext(textarea.selectionStart);
  }

  onKeydown(event: KeyboardEvent): void {
    if (!this.open || this.filteredSuggestions.length === 0) {
      return;
    }

    if (event.key === 'ArrowDown') {
      event.preventDefault();
      this.activeIndex = (this.activeIndex + 1) % this.filteredSuggestions.length;
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      this.activeIndex = (this.activeIndex - 1 + this.filteredSuggestions.length) % this.filteredSuggestions.length;
    } else if (event.key === 'Enter' || event.key === 'Tab') {
      event.preventDefault();
      this.selectSuggestion(this.filteredSuggestions[this.activeIndex]);
    } else if (event.key === 'Escape') {
      this.open = false;
    }
  }

  selectSuggestion(suggestion: NxMentionSuggestion): void {
    if (this.triggerIndex === null) {
      return;
    }

    const textarea = this.textareaRef.nativeElement;
    const cursor = textarea.selectionStart;
    const before = this.value.slice(0, this.triggerIndex);
    const after = this.value.slice(cursor);
    const inserted = `${this.trigger}${suggestion.label} `;

    this.value = `${before}${inserted}${after}`;
    this.valueChange.emit(this.value);
    this.onChangeFn(this.value);
    this.mentioned.emit(suggestion);
    this.open = false;

    const nextCursor = before.length + inserted.length;
    queueMicrotask(() => {
      textarea.focus();
      textarea.setSelectionRange(nextCursor, nextCursor);
    });
  }

  onDocumentClick(event: MouseEvent): void {
    if (!this.elementRef.nativeElement.contains(event.target as Node)) {
      this.open = false;
    }
  }

  onBlur(): void {
    this.onTouchedFn();
  }

  writeValue(value: string): void {
    this.value = value ?? '';
  }

  registerOnChange(fn: (value: string) => void): void {
    this.onChangeFn = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouchedFn = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  private updateMentionContext(cursor: number): void {
    const uptoCursor = this.value.slice(0, cursor);
    const triggerPos = uptoCursor.lastIndexOf(this.trigger);

    if (triggerPos === -1 || /\s/.test(uptoCursor.slice(triggerPos + 1))) {
      this.open = false;
      this.triggerIndex = null;
      return;
    }

    this.triggerIndex = triggerPos;
    this.query = uptoCursor.slice(triggerPos + 1);
    this.activeIndex = 0;
    this.open = this.filteredSuggestions.length > 0;
  }
}
