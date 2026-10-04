import { Component, ElementRef, EventEmitter, Input, Output, ViewChild, computed, signal } from '@angular/core';

/**
 * A free-text chip input: type and press Enter (or comma) to commit the current text as a
 * removable tag, Backspace on an empty input drops the last tag, and an optional `suggestions`
 * list shows a filtered, click-to-commit dropdown as the user types. Duplicate tags (case-
 * insensitive) are silently ignored rather than added twice.
 *
 * `value` and `suggestions` are both signal-backed `@Input` accessor pairs (not plain fields) so
 * `filteredSuggestions` below - a `computed()` reading both - actually re-runs when a parent
 * rebinds either one, rather than freezing on whatever it first saw.
 */
@Component({
  selector: 'nx-tag-input',
  standalone: true,
  imports: [],
  templateUrl: './ui-tag-input.html',
  styleUrl: './ui-tag-input.scss',
})
export class NxTagInput {
  @ViewChild('inputEl') private inputRef?: ElementRef<HTMLInputElement>;

  private readonly valueSignal = signal<string[]>([]);
  @Input()
  get value(): string[] {
    return this.valueSignal();
  }
  set value(v: string[]) {
    this.valueSignal.set(v ?? []);
  }

  private readonly suggestionsSignal = signal<string[]>([]);
  @Input()
  get suggestions(): string[] {
    return this.suggestionsSignal();
  }
  set suggestions(v: string[]) {
    this.suggestionsSignal.set(v ?? []);
  }

  @Input() placeholder = 'Add a tag...';

  @Output() valueChange = new EventEmitter<string[]>();

  readonly draft = signal('');
  readonly showSuggestions = signal(false);

  readonly filteredSuggestions = computed(() => {
    const existing = new Set(this.valueSignal().map((v) => v.toLowerCase()));
    const pool = this.suggestionsSignal().filter((s) => !existing.has(s.toLowerCase()));
    const q = this.draft().trim().toLowerCase();
    const matches = q ? pool.filter((s) => s.toLowerCase().includes(q)) : pool;
    return matches.slice(0, 8);
  });

  focusInput(): void {
    this.inputRef?.nativeElement.focus();
  }

  onInputChange(event: Event): void {
    this.draft.set((event.target as HTMLInputElement).value);
    this.showSuggestions.set(true);
  }

  onFocus(): void {
    this.showSuggestions.set(true);
  }

  onBlur(): void {
    // Slight delay so a suggestion's (click) still registers before the dropdown is hidden.
    setTimeout(() => this.showSuggestions.set(false), 150);
  }

  onKeyDown(event: KeyboardEvent): void {
    if (event.key === 'Enter' || event.key === ',') {
      event.preventDefault();
      this.commitDraft();
      return;
    }
    if (event.key === 'Backspace' && this.draft() === '' && this.valueSignal().length > 0) {
      event.preventDefault();
      this.removeTag(this.valueSignal().length - 1);
      return;
    }
    if (event.key === 'Escape') {
      this.showSuggestions.set(false);
    }
  }

  selectSuggestion(suggestion: string): void {
    this.addTag(suggestion);
    this.focusInput();
  }

  removeTag(index: number): void {
    const next = this.valueSignal().filter((_, i) => i !== index);
    this.commitValue(next);
  }

  private commitDraft(): void {
    const raw = this.draft().replace(/,$/, '').trim();
    this.draft.set('');
    if (raw) {
      this.addTag(raw);
    }
  }

  private addTag(tag: string): void {
    const trimmed = tag.trim();
    if (!trimmed) {
      return;
    }
    const exists = this.valueSignal().some((v) => v.toLowerCase() === trimmed.toLowerCase());
    this.draft.set('');
    this.showSuggestions.set(false);
    if (exists) {
      return;
    }
    this.commitValue([...this.valueSignal(), trimmed]);
  }

  private commitValue(next: string[]): void {
    this.valueSignal.set(next);
    this.valueChange.emit(next);
  }
}
