import { Component, ElementRef, EventEmitter, Input, Output, ViewChild, computed, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { NxIcon } from '../../data-display/ui-icon';
import { NxProLocked } from '../../licensing/ui-pro-locked/ui-pro-locked';
import { nxProLicenseGranted } from '../../licensing/nx-license';

// Escapes raw markdown source BEFORE the renderer below re-introduces its own, limited set of
// HTML tags - so typing `<script>` (or any other literal tag) into the textarea renders as
// inert text, never as markup the browser executes. Every function below builds its output from
// already-escaped text, never from an un-escaped pass-through of the source.
function escapeHtml(value: string): string {
  return value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function renderInline(text: string): string {
  let html = escapeHtml(text);
  html = html.replace(/`([^`]+)`/g, '<code>$1</code>');
  html = html.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
  html = html.replace(/\*([^*]+)\*/g, '<em>$1</em>');
  html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>');
  return html;
}

/** Converts a reasonable common subset of markdown (headings, bold/italic/code, links, lists, blockquotes, fenced code blocks) into HTML - not a full CommonMark implementation, but enough for live-preview editing. */
function markdownToHtml(source: string): string {
  const lines = source.split('\n');
  const parts: string[] = [];
  let listType: 'ul' | 'ol' | null = null;
  let i = 0;

  const closeList = () => {
    if (listType) {
      parts.push(`</${listType}>`);
      listType = null;
    }
  };

  while (i < lines.length) {
    const line = lines[i];

    if (/^```/.test(line)) {
      closeList();
      const codeLines: string[] = [];
      i += 1;
      while (i < lines.length && !/^```/.test(lines[i])) {
        codeLines.push(lines[i]);
        i += 1;
      }
      i += 1;
      parts.push(`<pre><code>${escapeHtml(codeLines.join('\n'))}</code></pre>`);
      continue;
    }

    const heading = line.match(/^(#{1,3})\s+(.*)$/);
    if (heading) {
      closeList();
      const level = heading[1].length;
      parts.push(`<h${level}>${renderInline(heading[2])}</h${level}>`);
      i += 1;
      continue;
    }

    const quote = line.match(/^>\s?(.*)$/);
    if (quote) {
      closeList();
      parts.push(`<blockquote>${renderInline(quote[1])}</blockquote>`);
      i += 1;
      continue;
    }

    const bullet = line.match(/^[-*]\s+(.*)$/);
    if (bullet) {
      if (listType !== 'ul') {
        closeList();
        parts.push('<ul>');
        listType = 'ul';
      }
      parts.push(`<li>${renderInline(bullet[1])}</li>`);
      i += 1;
      continue;
    }

    const numbered = line.match(/^\d+\.\s+(.*)$/);
    if (numbered) {
      if (listType !== 'ol') {
        closeList();
        parts.push('<ol>');
        listType = 'ol';
      }
      parts.push(`<li>${renderInline(numbered[1])}</li>`);
      i += 1;
      continue;
    }

    closeList();
    if (line.trim() !== '') {
      parts.push(`<p>${renderInline(line)}</p>`);
    }
    i += 1;
  }
  closeList();
  return parts.join('\n');
}

/**
 * A split-pane markdown editor: a formatting toolbar (bold, italic, link, bulleted list, inline
 * code) above a raw-text `<textarea>` on the left and a live-rendered HTML preview on the right.
 * Toolbar buttons wrap the current textarea selection (or insert a snippet at the cursor when
 * nothing is selected). The preview is produced by a small hand-rolled markdown renderer - no
 * external markdown library - and the resulting HTML is only trusted via
 * `DomSanitizer.bypassSecurityTrustHtml` after that renderer has escaped the raw source, so a
 * literal `<script>` typed into the textarea can never execute.
 */
@Component({
  selector: 'nx-markdown-editor',
  standalone: true,
  imports: [FormsModule, NxIcon, NxProLocked],
  templateUrl: './ui-markdown-editor.html',
  styleUrl: './ui-markdown-editor.scss',
})
export class NxMarkdownEditor {
  protected readonly licensed = nxProLicenseGranted();

  // Backed by a signal (not a plain field) so `renderedHtml` below - a `computed()` reading this
  // value - re-renders whenever the parent rebinds new markdown, not just on the first pass.
  private readonly valueSignal = signal('');
  @Input()
  get value(): string {
    return this.valueSignal();
  }
  set value(value: string) {
    this.valueSignal.set(value ?? '');
  }

  @Output() valueChange = new EventEmitter<string>();

  @ViewChild('textareaRef') private textareaRef?: ElementRef<HTMLTextAreaElement>;

  readonly renderedHtml = computed<SafeHtml>(() =>
    this.sanitizer.bypassSecurityTrustHtml(markdownToHtml(this.valueSignal())),
  );

  constructor(private readonly sanitizer: DomSanitizer) {}

  onInput(raw: string): void {
    this.valueSignal.set(raw);
    this.valueChange.emit(raw);
  }

  applyBold(): void {
    this.wrapSelection('**');
  }

  applyItalic(): void {
    this.wrapSelection('*');
  }

  applyCode(): void {
    this.wrapSelection('`');
  }

  applyLink(): void {
    const textarea = this.textareaRef?.nativeElement;
    if (!textarea) return;

    const start = textarea.selectionStart ?? 0;
    const end = textarea.selectionEnd ?? 0;
    const current = this.valueSignal();
    const label = current.slice(start, end) || 'link text';
    const snippet = `[${label}](https://)`;
    const next = current.slice(0, start) + snippet + current.slice(end);
    this.commit(next);

    const urlStart = start + label.length + 3; // past "[label]("
    const urlEnd = urlStart + 'https://'.length;
    this.focusAndSelect(textarea, urlStart, urlEnd);
  }

  applyList(): void {
    const textarea = this.textareaRef?.nativeElement;
    if (!textarea) return;

    const start = textarea.selectionStart ?? 0;
    const end = textarea.selectionEnd ?? 0;
    const current = this.valueSignal();

    const lineStart = current.lastIndexOf('\n', start - 1) + 1;
    const nextBreak = current.indexOf('\n', end);
    const lineEnd = nextBreak === -1 ? current.length : nextBreak;

    const block = current.slice(lineStart, lineEnd);
    const prefixed = block
      .split('\n')
      .map((line) => (/^[-*]\s/.test(line) ? line : `- ${line}`))
      .join('\n');

    const next = current.slice(0, lineStart) + prefixed + current.slice(lineEnd);
    this.commit(next);
    this.focusAndSelect(textarea, lineStart, lineStart + prefixed.length);
  }

  private wrapSelection(marker: string): void {
    const textarea = this.textareaRef?.nativeElement;
    if (!textarea) return;

    const start = textarea.selectionStart ?? 0;
    const end = textarea.selectionEnd ?? 0;
    const current = this.valueSignal();
    const selected = current.slice(start, end);
    const next = current.slice(0, start) + marker + selected + marker + current.slice(end);
    this.commit(next);

    const selectionStart = start + marker.length;
    this.focusAndSelect(textarea, selectionStart, selectionStart + selected.length);
  }

  private commit(next: string): void {
    this.valueSignal.set(next);
    this.valueChange.emit(next);
  }

  private focusAndSelect(textarea: HTMLTextAreaElement, start: number, end: number): void {
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start, end);
    });
  }
}
