import { Component, EventEmitter, Input, OnDestroy, Output, ViewEncapsulation, computed, signal } from '@angular/core';
import { NxIcon } from '../../data-display/ui-icon';

/** How often the reveal timer ticks while `streaming` is true. */
const REVEAL_INTERVAL_MS = 20;
/** How many characters are revealed per tick. */
const REVEAL_CHARS_PER_TICK = 3;

function escapeHtml(value: string): string {
  return value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function renderInline(text: string): string {
  let html = escapeHtml(text);
  html = html.replace(/`([^`]+)`/g, '<code>$1</code>');
  html = html.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
  html = html.replace(/\*([^*]+)\*/g, '<em>$1</em>');
  return html;
}

/**
 * Converts a small, practical subset of markdown (headings, bold/italic, inline code, and fenced
 * code blocks) into HTML - not a full CommonMark implementation, just enough for a single AI
 * response body. Adapted from `NxMarkdownViewer`'s helpers of the same name/shape.
 */
function markdownToHtml(source: string): string {
  const lines = source.split('\n');
  const parts: string[] = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];

    if (/^```/.test(line)) {
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
      const level = heading[1].length;
      parts.push(`<h${level}>${renderInline(heading[2])}</h${level}>`);
      i += 1;
      continue;
    }

    if (line.trim() !== '') {
      parts.push(`<p>${renderInline(line)}</p>`);
    }
    i += 1;
  }
  return parts.join('\n');
}

/**
 * Renders a SINGLE AI response as a one-off result card - not a whole conversation (use
 * `NxChatStream`/`NxAiChat` for that). Good for contexts like "regenerate this field's content
 * with AI". Renders `content` as a small markdown subset and, with `streaming` set, progressively
 * reveals it a few characters at a time using the same technique as `NxChatStream`.
 */
@Component({
  selector: 'nx-ai-response-viewer',
  standalone: true,
  imports: [NxIcon],
  templateUrl: './ui-ai-response-viewer.html',
  styleUrl: './ui-ai-response-viewer.scss',
  // The rendered content is assigned via [innerHTML] as plain HTML, not Angular-authored template
  // content, so it never receives the `_ngcontent-*` attribute emulated encapsulation relies on to
  // scope styles - encapsulation: None is what actually lets .nx-ai-response-viewer's nested
  // h1/pre/code rules reach it (see NxMarkdownViewer for the same fix applied for the same reason).
  encapsulation: ViewEncapsulation.None,
})
export class NxAiResponseViewer implements OnDestroy {
  private readonly contentSignal = signal('');
  @Input()
  get content(): string {
    return this.contentSignal();
  }
  set content(value: string) {
    this.contentSignal.set(value ?? '');
    this.sync();
  }

  private readonly streamingSignal = signal(false);
  @Input()
  get streaming(): boolean {
    return this.streamingSignal();
  }
  set streaming(value: boolean) {
    this.streamingSignal.set(!!value);
    this.sync();
  }

  @Output() regenerate = new EventEmitter<void>();
  @Output() feedback = new EventEmitter<'up' | 'down'>();

  protected readonly revealedChars = signal(0);
  protected readonly copied = signal(false);
  protected readonly feedbackState = signal<'up' | 'down' | null>(null);

  private lastContent: string | undefined;
  private intervalId?: ReturnType<typeof setInterval>;

  readonly renderedHtml = computed(() => {
    const content = this.contentSignal();
    const visible = this.streamingSignal() ? content.slice(0, this.revealedChars()) : content;
    return markdownToHtml(visible);
  });

  ngOnDestroy(): void {
    this.clearTimer();
  }

  protected copy(): void {
    const text = this.contentSignal();
    this.copied.set(true);
    setTimeout(() => this.copied.set(false), 2000);
    navigator.clipboard.writeText(text).catch(() => this.copyWithFallback(text));
  }

  protected onRegenerate(): void {
    this.regenerate.emit();
  }

  protected toggleFeedback(value: 'up' | 'down'): void {
    const next = this.feedbackState() === value ? null : value;
    this.feedbackState.set(next);
    if (next) {
      this.feedback.emit(next);
    }
  }

  private sync(): void {
    const content = this.contentSignal();
    if (content === this.lastContent && this.streamingSignal()) {
      // Same content, still streaming - leave any in-flight animation running as-is.
      return;
    }
    this.lastContent = content;

    if (!this.streamingSignal()) {
      this.clearTimer();
      this.revealedChars.set(content.length);
      return;
    }

    this.revealedChars.set(0);
    this.startTimer(content);
  }

  private startTimer(content: string): void {
    this.clearTimer();
    this.intervalId = setInterval(() => {
      this.revealedChars.update((chars) => Math.min(chars + REVEAL_CHARS_PER_TICK, content.length));
      if (this.revealedChars() >= content.length) {
        this.clearTimer();
      }
    }, REVEAL_INTERVAL_MS);
  }

  private clearTimer(): void {
    if (this.intervalId !== undefined) {
      clearInterval(this.intervalId);
      this.intervalId = undefined;
    }
  }

  private copyWithFallback(text: string): void {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.style.position = 'fixed';
    textarea.style.opacity = '0';
    document.body.appendChild(textarea);
    textarea.focus();
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);
  }
}
