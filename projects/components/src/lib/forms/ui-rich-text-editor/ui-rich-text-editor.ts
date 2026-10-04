import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild,
  ViewEncapsulation,
  booleanAttribute,
  forwardRef,
  signal,
} from '@angular/core';
import { AbstractControl, ControlValueAccessor, NG_VALIDATORS, NG_VALUE_ACCESSOR, ValidationErrors, Validator } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { NxProLocked } from '../../licensing/ui-pro-locked/ui-pro-locked';
import { nxProLicenseGranted } from '../../licensing/nx-license';

interface ToolbarButton {
  label: string;
  command: string;
  arg?: string;
  icon: string;
}

const TOOLBAR: ToolbarButton[] = [
  { label: 'Bold', command: 'bold', icon: 'B' },
  { label: 'Italic', command: 'italic', icon: 'I' },
  { label: 'Underline', command: 'underline', icon: 'U' },
  { label: 'Strikethrough', command: 'strikeThrough', icon: 'S' },
  { label: 'Heading', command: 'formatBlock', arg: 'H2', icon: 'H' },
  { label: 'Quote', command: 'formatBlock', arg: 'BLOCKQUOTE', icon: '"' },
  { label: 'Bullet List', command: 'insertUnorderedList', icon: '•' },
  { label: 'Numbered List', command: 'insertOrderedList', icon: '1.' },
  { label: 'Code Block', command: 'codeBlock', icon: '</>' },
  { label: 'Table', command: 'table', icon: '▦' },
  { label: 'Image', command: 'image', icon: '🖼' },
  { label: 'Emoji', command: 'emoji', icon: '🙂' },
  { label: 'Undo', command: 'undo', icon: '↶' },
  { label: 'Redo', command: 'redo', icon: '↷' },
  { label: 'Clear Formatting', command: 'removeFormat', icon: '✕' },
];

interface NxSlashCommand {
  id: string;
  label: string;
  icon: string;
}

const SLASH_COMMANDS: NxSlashCommand[] = [
  { id: 'h1', label: 'Heading 1', icon: 'H1' },
  { id: 'h2', label: 'Heading 2', icon: 'H2' },
  { id: 'bullet', label: 'Bullet list', icon: '•' },
  { id: 'numbered', label: 'Numbered list', icon: '1.' },
  { id: 'quote', label: 'Quote', icon: '"' },
  { id: 'code', label: 'Code block', icon: '</>' },
  { id: 'table', label: 'Table', icon: '▦' },
  { id: 'image', label: 'Image', icon: '🖼' },
];

const EMOJI_LIST = ['😀', '😂', '😍', '👍', '🎉', '🔥', '❤️', '😅', '🙌', '✅', '⚠️', '💡', '🚀', '📌', '😢', '🤔', '👀', '✨'];

const MARKDOWN_SHORTCUTS: { pattern: RegExp; tag?: string; action?: 'bullet' | 'numbered' }[] = [
  { pattern: /^#\s$/, tag: 'H1' },
  { pattern: /^##\s$/, tag: 'H2' },
  { pattern: /^###\s$/, tag: 'H3' },
  { pattern: /^>\s$/, tag: 'BLOCKQUOTE' },
  { pattern: /^[-*]\s$/, action: 'bullet' },
  { pattern: /^1\.\s$/, action: 'numbered' },
];

/**
 * A hand-rolled WYSIWYG editor built on `contenteditable` + `document.execCommand`, extended
 * with slash commands (`/`), @-mentions, an emoji picker, tables, image upload (picker or
 * drag-drop), code blocks, a handful of live markdown shortcuts (`# `, `- `, `> `, ...), optional
 * autosave, and a word/character count. `execCommand` is legacy with no fully standardized
 * replacement yet - this is not a structured-document editor (no custom schema, no real-time
 * collaboration); the value model is a plain HTML string via `ControlValueAccessor`, so wiring a
 * collaborative backend later just means replacing how `value`/`valueChange` are sourced.
 */
@Component({
  selector: 'nx-rich-text-editor',
  standalone: true,
  imports: [DatePipe, NxProLocked],
  templateUrl: './ui-rich-text-editor.html',
  styleUrl: './ui-rich-text-editor.scss',
  // The editable content (mentions, code blocks, tables, images) is inserted via execCommand/
  // innerHTML, not Angular-authored template content, so it never gets the `_ngcontent-*`
  // attribute emulated encapsulation relies on to scope styles - encapsulation: None is what
  // actually lets this stylesheet's nested rules for that dynamic content reach it. The outer
  // `.nx-rte-*` class names still keep this from leaking into the rest of the page.
  encapsulation: ViewEncapsulation.None,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => NxRichTextEditor),
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => NxRichTextEditor),
      multi: true,
    },
  ],
})
export class NxRichTextEditor implements AfterViewInit, OnChanges, OnInit, OnDestroy, ControlValueAccessor, Validator {
  protected readonly licensed = nxProLicenseGranted();

  @Input() value = '';
  @Input() placeholder = 'Write something, or type / for commands...';
  @Input({ transform: booleanAttribute }) disabled = false;
  /** Marks the field as required - some non-empty text content must be entered. Validated once touched. */
  @Input({ transform: booleanAttribute }) isRequired = false;
  @Input() requiredErrorMessage = 'This field is required';
  /** Names offered by the `@` mention menu. */
  @Input() mentionUsers: string[] = [];
  /** Restrict the toolbar to these command ids (see the full catalog in `toolbar`). Omit for all. */
  @Input() toolbarItems?: string[];
  /** Milliseconds between autosave emissions; `0` (default) disables autosave entirely. */
  @Input() autosaveInterval = 0;

  @Output() valueChange = new EventEmitter<string>();
  /** Emitted every `autosaveInterval` ms while there are unsaved changes. */
  @Output() autosave = new EventEmitter<string>();

  // `static: false` (the default) is required here, not `static: true` - both targets live
  // inside the `@if (licensed())` block in the template, so Angular can only resolve them once
  // that conditional view is created, which happens by `ngAfterViewInit` either way.
  @ViewChild('editorRef') private editorRef!: ElementRef<HTMLDivElement>;
  @ViewChild('fileInputRef') private fileInputRef!: ElementRef<HTMLInputElement>;

  readonly fullToolbar = TOOLBAR;
  readonly emojiList = EMOJI_LIST;

  touched = false;
  lastSavedAt = signal<Date | null>(null);

  slashMenuOpen = signal(false);
  slashQuery = signal('');
  mentionMenuOpen = signal(false);
  mentionQuery = signal('');
  emojiMenuOpen = signal(false);
  popupPos = signal<{ x: number; y: number }>({ x: 0, y: 0 });

  private onChangeFn: (value: string) => void = () => {};
  private onTouchedFn: () => void = () => {};
  private onValidatorChangeFn: () => void = () => {};
  private autosaveTimer?: ReturnType<typeof setInterval>;
  private dirtySinceSave = false;

  get toolbar(): ToolbarButton[] {
    if (!this.toolbarItems?.length) {
      return this.fullToolbar;
    }
    return this.fullToolbar.filter((b) => this.toolbarItems!.includes(b.command));
  }

  get filteredSlashCommands(): NxSlashCommand[] {
    const q = this.slashQuery().toLowerCase();
    return SLASH_COMMANDS.filter((c) => c.label.toLowerCase().includes(q));
  }

  get filteredMentions(): string[] {
    const q = this.mentionQuery().toLowerCase();
    return this.mentionUsers.filter((name) => name.toLowerCase().includes(q));
  }

  private get plainText(): string {
    return (this.value ?? '').replace(/<[^>]*>/g, '').trim();
  }

  get wordCount(): number {
    return this.plainText ? this.plainText.split(/\s+/).filter(Boolean).length : 0;
  }

  get charCount(): number {
    return this.plainText.length;
  }

  get displayError(): string {
    if (!this.touched) {
      return '';
    }
    if (this.isRequired && !this.plainText) {
      return this.requiredErrorMessage;
    }
    return '';
  }

  ngOnInit(): void {
    if (this.autosaveInterval > 0) {
      this.autosaveTimer = setInterval(() => {
        if (this.dirtySinceSave) {
          this.autosave.emit(this.value);
          this.lastSavedAt.set(new Date());
          this.dirtySinceSave = false;
        }
      }, this.autosaveInterval);
    }
  }

  ngOnDestroy(): void {
    if (this.autosaveTimer) {
      clearInterval(this.autosaveTimer);
    }
  }

  ngAfterViewInit(): void {
    this.editorRef.nativeElement.innerHTML = this.value;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (!changes['value'] || !this.editorRef) {
      return;
    }

    const incoming = changes['value'].currentValue as string;
    if (incoming !== this.editorRef.nativeElement.innerHTML) {
      this.editorRef.nativeElement.innerHTML = incoming;
    }
  }

  runCommand(button: ToolbarButton): void {
    if (this.disabled) {
      return;
    }

    switch (button.command) {
      case 'codeBlock':
        return this.insertCodeBlock();
      case 'table':
        return this.insertTable();
      case 'image':
        return this.triggerImagePicker();
      case 'emoji':
        return this.toggleEmojiPicker();
    }

    this.editorRef.nativeElement.focus();
    document.execCommand(button.command, false, button.arg);
    this.syncValue();
  }

  insertLink(): void {
    if (this.disabled) {
      return;
    }

    const url = window.prompt('Link URL');
    if (!url) {
      return;
    }

    this.editorRef.nativeElement.focus();
    document.execCommand('createLink', false, url);
    this.syncValue();
  }

  insertCodeBlock(): void {
    this.editorRef.nativeElement.focus();
    document.execCommand('insertHTML', false, '<pre class="nx-rte-code"><code>your code</code></pre><p><br></p>');
    this.syncValue();
  }

  insertTable(rows = 3, cols = 3): void {
    this.editorRef.nativeElement.focus();
    let html = '<table class="nx-rte-table"><tbody>';
    for (let r = 0; r < rows; r++) {
      html += '<tr>';
      for (let c = 0; c < cols; c++) {
        html += '<td>&nbsp;</td>';
      }
      html += '</tr>';
    }
    html += '</tbody></table><p><br></p>';
    document.execCommand('insertHTML', false, html);
    this.syncValue();
  }

  triggerImagePicker(): void {
    this.fileInputRef.nativeElement.click();
  }

  onImageSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    if (file) {
      this.insertImageFile(file);
    }
    input.value = '';
  }

  onDrop(event: DragEvent): void {
    event.preventDefault();
    const file = event.dataTransfer?.files?.[0];
    if (file && file.type.startsWith('image/')) {
      this.insertImageFile(file);
    }
  }

  onDragOver(event: DragEvent): void {
    event.preventDefault();
  }

  toggleEmojiPicker(): void {
    this.closePopups();
    this.emojiMenuOpen.update((v) => !v);
  }

  insertEmoji(emoji: string): void {
    this.editorRef.nativeElement.focus();
    document.execCommand('insertText', false, emoji);
    this.emojiMenuOpen.set(false);
    this.syncValue();
  }

  runSlashCommand(cmd: NxSlashCommand): void {
    this.deleteTriggerText(this.slashQuery().length + 1);
    this.editorRef.nativeElement.focus();
    switch (cmd.id) {
      case 'h1':
        document.execCommand('formatBlock', false, 'H1');
        break;
      case 'h2':
        document.execCommand('formatBlock', false, 'H2');
        break;
      case 'bullet':
        document.execCommand('insertUnorderedList');
        break;
      case 'numbered':
        document.execCommand('insertOrderedList');
        break;
      case 'quote':
        document.execCommand('formatBlock', false, 'BLOCKQUOTE');
        break;
      case 'code':
        this.insertCodeBlock();
        return;
      case 'table':
        this.insertTable();
        return;
      case 'image':
        this.triggerImagePicker();
        break;
    }
    this.slashMenuOpen.set(false);
    this.syncValue();
  }

  insertMention(name: string): void {
    this.deleteTriggerText(this.mentionQuery().length + 1);
    this.editorRef.nativeElement.focus();
    document.execCommand('insertHTML', false, `<span class="nx-rte-mention" contenteditable="false">@${name}</span>&nbsp;`);
    this.mentionMenuOpen.set(false);
    this.syncValue();
  }

  onInput(): void {
    this.syncValue();
    this.checkTriggers();
    this.tryMarkdownShortcut();
  }

  onKeydown(event: KeyboardEvent): void {
    if (event.key === 'Escape') {
      this.closePopups();
      return;
    }
    if (event.key === 'Enter' && this.slashMenuOpen() && this.filteredSlashCommands.length) {
      event.preventDefault();
      this.runSlashCommand(this.filteredSlashCommands[0]);
      return;
    }
    if (event.key === 'Enter' && this.mentionMenuOpen() && this.filteredMentions.length) {
      event.preventDefault();
      this.insertMention(this.filteredMentions[0]);
    }
  }

  onBlur(): void {
    this.touched = true;
    this.onTouchedFn();
  }

  closePopups(): void {
    this.slashMenuOpen.set(false);
    this.mentionMenuOpen.set(false);
    this.emojiMenuOpen.set(false);
  }

  writeValue(value: string): void {
    this.value = value ?? '';
    if (this.editorRef && this.value !== this.editorRef.nativeElement.innerHTML) {
      this.editorRef.nativeElement.innerHTML = this.value;
    }
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

  validate(control: AbstractControl): ValidationErrors | null {
    const plain = ((control.value as string) ?? '').replace(/<[^>]*>/g, '').trim();
    if (this.isRequired && !plain) {
      return { required: true };
    }
    return null;
  }

  registerOnValidatorChange(fn: () => void): void {
    this.onValidatorChangeFn = fn;
  }

  private syncValue(): void {
    this.value = this.editorRef.nativeElement.innerHTML;
    this.valueChange.emit(this.value);
    this.onChangeFn(this.value);
    this.dirtySinceSave = true;
  }

  private checkTriggers(): void {
    const before = this.getTextBeforeCaret();
    const slashMatch = before.match(/(?:^|\s)\/(\w*)$/);
    const mentionMatch = before.match(/(?:^|\s)@(\w*)$/);

    if (slashMatch) {
      this.slashQuery.set(slashMatch[1]);
      this.mentionMenuOpen.set(false);
      this.slashMenuOpen.set(true);
      this.updatePopupPosition();
    } else {
      this.slashMenuOpen.set(false);
    }

    if (mentionMatch && this.mentionUsers.length) {
      this.mentionQuery.set(mentionMatch[1]);
      this.slashMenuOpen.set(false);
      this.mentionMenuOpen.set(true);
      this.updatePopupPosition();
    } else if (!slashMatch) {
      this.mentionMenuOpen.set(false);
    }
  }

  private tryMarkdownShortcut(): void {
    const before = this.getTextBeforeCaret(6);
    for (const shortcut of MARKDOWN_SHORTCUTS) {
      if (!shortcut.pattern.test(before)) {
        continue;
      }
      const match = before.match(shortcut.pattern)!;
      this.deleteTriggerText(match[0].length);
      this.editorRef.nativeElement.focus();
      if (shortcut.tag) {
        document.execCommand('formatBlock', false, shortcut.tag);
      } else if (shortcut.action === 'bullet') {
        document.execCommand('insertUnorderedList');
      } else if (shortcut.action === 'numbered') {
        document.execCommand('insertOrderedList');
      }
      this.syncValue();
      return;
    }
  }

  private getTextBeforeCaret(maxLen = 30): string {
    const sel = window.getSelection();
    if (!sel || sel.rangeCount === 0 || !sel.isCollapsed) {
      return '';
    }
    const range = sel.getRangeAt(0);
    const node = range.startContainer;
    if (node.nodeType !== Node.TEXT_NODE) {
      return '';
    }
    const text = node.textContent ?? '';
    return text.slice(Math.max(0, range.startOffset - maxLen), range.startOffset);
  }

  private deleteTriggerText(count: number): void {
    this.editorRef.nativeElement.focus();
    for (let i = 0; i < count; i++) {
      document.execCommand('delete', false);
    }
  }

  private insertImageFile(file: File): void {
    const reader = new FileReader();
    reader.onload = () => {
      this.editorRef.nativeElement.focus();
      document.execCommand('insertHTML', false, `<img src="${reader.result}" alt="${file.name}" class="nx-rte-image" />`);
      this.syncValue();
    };
    reader.readAsDataURL(file);
  }

  private updatePopupPosition(): void {
    const sel = window.getSelection();
    if (!sel || sel.rangeCount === 0) {
      return;
    }
    const range = sel.getRangeAt(0).cloneRange();
    range.collapse(true);
    const rect = range.getClientRects()[0];
    if (rect) {
      this.popupPos.set({ x: rect.left, y: rect.bottom + 4 });
    }
  }
}
