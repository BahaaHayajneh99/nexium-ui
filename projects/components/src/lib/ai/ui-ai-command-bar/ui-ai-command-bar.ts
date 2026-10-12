import {
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
  ViewChild,
  booleanAttribute,
  signal,
} from '@angular/core';
import { NxIcon } from '../../data-display/ui-icon';
import { NxProLocked } from '../../licensing/ui-pro-locked/ui-pro-locked';
import { nxProLicenseGranted } from '../../licensing/nx-license';

export interface NxAiCommandBarCommand {
  label: string;
  icon?: string;
  action: string;
}

type NxAiCommandBarMode = 'idle' | 'commands' | 'typing';

/**
 * A Spotlight/Cmd-K style natural-language command bar: a global keyboard shortcut
 * (Cmd/Ctrl+K) opens a centered overlay with a prominent text input. While the input is
 * empty it shows clickable prompt `suggestions` and recent-query `history`; typing `/`
 * switches it into a quick-pick list of `commands` instead. Submitting a free-text query
 * emits `submit` with the typed string - this component never calls an LLM itself, it's
 * purely presentational. The host is expected to kick off its own request and stream the
 * reply back in character-by-character via the `streamingText` input, which this
 * component renders with a typing cursor and auto-scrolls, alongside an `isLoading`
 * "thinking" indicator and a `cancel`-emitting Stop button.
 */
@Component({
  selector: 'nx-ai-command-bar',
  standalone: true,
  imports: [NxIcon, NxProLocked],
  templateUrl: './ui-ai-command-bar.html',
  styleUrl: './ui-ai-command-bar.scss',
})
export class NxAiCommandBar implements OnChanges {
  protected readonly licensed = nxProLicenseGranted();

  @Input({ transform: booleanAttribute }) open = false;
  @Output() openChange = new EventEmitter<boolean>();

  @Input() placeholder = 'Ask Nexium...';
  /** Clickable free-text prompt chips shown while the input is empty. */
  @Input() suggestions: string[] = [];
  /** Recent queries shown under Suggestions while the input is empty; clicking one re-runs it. */
  @Input() history: string[] = [];
  /** Quick-pick actions shown when the query starts with "/", filtered by the text after it. */
  @Input() commands: NxAiCommandBarCommand[] = [];

  /** The host appends to this incrementally (chunk-by-chunk) to drive the streaming reveal. */
  @Input() streamingText = '';
  /** Shows the "thinking" indicator; keep this true for the whole request, including while streamingText is arriving, so the Stop button stays visible until the reply is fully done. */
  @Input() isLoading = false;

  /** Emits the user's typed (or clicked suggestion/history) query - the host runs its own request and feeds the reply back in via `streamingText`. */
  @Output() submit = new EventEmitter<string>();
  /** Emitted when Stop is clicked, or Escape is pressed while a request is in flight. */
  @Output() cancel = new EventEmitter<void>();
  /** Emits a selected command's `action` string - kept separate from `submit` since it's not a free-text query. */
  @Output() commandSelected = new EventEmitter<string>();

  @ViewChild('inputRef') private inputRef?: ElementRef<HTMLInputElement>;
  @ViewChild('responseScrollRef') private responseScrollRef?: ElementRef<HTMLDivElement>;

  protected query = '';
  protected activeIndex = 0;

  /** The query currently being answered (set on submit, cleared once the user edits the input again), or `null` while browsing suggestions/history/commands. */
  protected readonly activeQuery = signal<string | null>(null);

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['streamingText']) {
      this.scrollResponseToBottom();
    }
  }

  protected get mode(): NxAiCommandBarMode {
    if (this.query.startsWith('/')) return 'commands';
    if (!this.query.trim()) return 'idle';
    return 'typing';
  }

  protected get filteredCommands(): NxAiCommandBarCommand[] {
    const term = this.query.slice(1).toLowerCase().trim();
    if (!term) return this.commands;
    return this.commands.filter((c) => c.label.toLowerCase().includes(term));
  }

  private get navigableCount(): number {
    if (this.mode === 'commands') return this.filteredCommands.length;
    if (this.mode === 'idle') return this.suggestions.length + this.history.length;
    return 0;
  }

  protected isSuggestionActive(index: number): boolean {
    return this.mode === 'idle' && this.activeIndex === index;
  }

  protected isHistoryActive(index: number): boolean {
    return this.mode === 'idle' && this.activeIndex === this.suggestions.length + index;
  }

  protected onQueryChange(event: Event): void {
    this.query = (event.target as HTMLInputElement).value;
    this.activeIndex = 0;
    // Editing the input always starts a fresh look-up - any previously shown response
    // belongs to the query that's no longer in the box.
    this.activeQuery.set(null);
  }

  @HostListener('document:keydown', ['$event'])
  protected onKeydown(event: KeyboardEvent): void {
    const isOpenShortcut = event.key.toLowerCase() === 'k' && (event.metaKey || event.ctrlKey);
    if (isOpenShortcut) {
      event.preventDefault();
      this.open ? this.close() : this.show();
      return;
    }

    if (!this.open) {
      return;
    }

    if (event.key === 'Escape') {
      event.preventDefault();
      this.onEscape();
    } else if (event.key === 'ArrowDown') {
      event.preventDefault();
      const max = Math.max(this.navigableCount - 1, 0);
      this.activeIndex = Math.min(this.activeIndex + 1, max);
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      this.activeIndex = Math.max(this.activeIndex - 1, 0);
    } else if (event.key === 'Enter') {
      event.preventDefault();
      this.onEnter();
    }
  }

  private onEnter(): void {
    if (this.mode === 'commands') {
      const command = this.filteredCommands[this.activeIndex];
      if (command) {
        this.selectCommand(command);
      }
      return;
    }

    if (this.mode === 'idle') {
      const suggestionCount = this.suggestions.length;
      if (this.activeIndex < suggestionCount) {
        const suggestion = this.suggestions[this.activeIndex];
        if (suggestion) this.useSuggestion(suggestion);
      } else {
        const entry = this.history[this.activeIndex - suggestionCount];
        if (entry) this.useHistory(entry);
      }
      return;
    }

    this.trySubmit();
  }

  private onEscape(): void {
    if (this.isLoading) {
      this.onCancel();
      return;
    }
    if (this.activeQuery() !== null) {
      this.activeQuery.set(null);
      return;
    }
    if (this.query) {
      this.query = '';
      this.activeIndex = 0;
      return;
    }
    this.close();
  }

  protected trySubmit(): void {
    const trimmed = this.query.trim();
    if (!trimmed) return;

    this.activeQuery.set(trimmed);
    this.query = '';
    this.activeIndex = 0;
    this.submit.emit(trimmed);
  }

  protected useSuggestion(suggestion: string): void {
    this.query = suggestion;
    this.trySubmit();
  }

  protected useHistory(entry: string): void {
    this.query = entry;
    this.trySubmit();
  }

  protected selectCommand(command: NxAiCommandBarCommand): void {
    this.commandSelected.emit(command.action);
    this.query = '';
    this.activeIndex = 0;
  }

  protected onCancel(): void {
    this.cancel.emit();
  }

  protected onBackdropClick(): void {
    this.close();
  }

  show(): void {
    this.open = true;
    this.openChange.emit(true);
    this.query = '';
    this.activeIndex = 0;
    this.activeQuery.set(null);
    setTimeout(() => this.inputRef?.nativeElement.focus());
  }

  close(): void {
    this.open = false;
    this.openChange.emit(false);
  }

  private scrollResponseToBottom(): void {
    setTimeout(() => {
      const el = this.responseScrollRef?.nativeElement;
      if (el) {
        el.scrollTop = el.scrollHeight;
      }
    });
  }
}
