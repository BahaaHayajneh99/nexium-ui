import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
  ViewChild,
  booleanAttribute,
  forwardRef,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

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
  { label: 'Quote', command: 'formatBlock', arg: 'BLOCKQUOTE', icon: '“' },
  { label: 'Bullet List', command: 'insertUnorderedList', icon: '•' },
  { label: 'Numbered List', command: 'insertOrderedList', icon: '1.' },
  { label: 'Undo', command: 'undo', icon: '↶' },
  { label: 'Redo', command: 'redo', icon: '↷' },
  { label: 'Clear Formatting', command: 'removeFormat', icon: '✕' },
];

/**
 * A hand-rolled WYSIWYG editor built on `contenteditable` + `document.execCommand`.
 * `execCommand` is a legacy API with no standardized replacement yet fully
 * supported across browsers - it's what every dependency-free rich text editor
 * still uses today for basic formatting. This covers bold/italic/lists/headings/
 * links/undo-redo; it is not a structured-document editor (no custom schema,
 * no collaborative editing) - reach for a dedicated library if you need that.
 */
@Component({
  selector: 'nx-rich-text-editor',
  standalone: true,
  imports: [],
  templateUrl: './ui-rich-text-editor.html',
  styleUrl: './ui-rich-text-editor.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => NxRichTextEditor),
      multi: true,
    },
  ],
})
export class NxRichTextEditor implements AfterViewInit, OnChanges, ControlValueAccessor {
  @Input() value = '';
  @Input() placeholder = 'Write something...';
  @Input({ transform: booleanAttribute }) disabled = false;

  @Output() valueChange = new EventEmitter<string>();

  @ViewChild('editorRef', { static: true }) private editorRef!: ElementRef<HTMLDivElement>;

  readonly toolbar = TOOLBAR;

  private onChangeFn: (value: string) => void = () => {};
  private onTouchedFn: () => void = () => {};

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

  onInput(): void {
    this.syncValue();
  }

  onBlur(): void {
    this.onTouchedFn();
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

  private syncValue(): void {
    this.value = this.editorRef.nativeElement.innerHTML;
    this.valueChange.emit(this.value);
    this.onChangeFn(this.value);
  }
}
