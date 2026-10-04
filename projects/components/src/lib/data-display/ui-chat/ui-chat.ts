import { Component, EventEmitter, Input, Output, booleanAttribute, inject, signal } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { NxIcon } from '../ui-icon';
import { NxProLocked } from '../../licensing/ui-pro-locked/ui-pro-locked';
import { nxProLicenseGranted } from '../../licensing/nx-license';

export interface NxChatMessage {
  id: string | number;
  role: 'user' | 'assistant';
  content: string;
  timestamp?: Date | string;
}

function escapeHtml(text: string): string {
  return text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

/** A minimal Markdown-to-HTML renderer covering fenced/inline code and bold/italic - not a full CommonMark parser. */
export function nxRenderChatMarkdown(source: string): string {
  const escaped = escapeHtml(source);
  const withCodeBlocks = escaped.replace(/```(\w+)?\n([\s\S]*?)```/g, (_match, lang: string | undefined, code: string) => {
    const language = lang ? ` data-lang="${lang}"` : '';
    return `<pre class="nx-chat-code-block"${language}><code>${code}</code></pre>`;
  });
  const withInlineCode = withCodeBlocks.replace(/`([^`]+)`/g, '<code class="nx-chat-inline-code">$1</code>');
  const withBold = withInlineCode.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
  const withItalic = withBold.replace(/\*([^*]+)\*/g, '<em>$1</em>');
  return withItalic
    .split(/\n{2,}/)
    .map((paragraph) => `<p>${paragraph.replace(/\n/g, '<br>')}</p>`)
    .join('');
}

/** A complete chat UI: message list with markdown/code rendering, per-message copy, regenerate, and a composer. */
@Component({
  selector: 'nx-chat',
  standalone: true,
  imports: [NxIcon, NxProLocked],
  templateUrl: './ui-chat.html',
  styleUrl: './ui-chat.scss',
})
export class NxChat {
  protected readonly licensed = nxProLicenseGranted();

  @Input() messages: NxChatMessage[] = [];
  @Input({ transform: booleanAttribute }) typing = false;
  @Input({ transform: booleanAttribute }) disabled = false;
  @Input() placeholder = 'Send a message...';

  @Output() messageSend = new EventEmitter<string>();
  @Output() regenerate = new EventEmitter<NxChatMessage>();

  draft = signal('');
  copiedId = signal<string | number | null>(null);

  private sanitizer = inject(DomSanitizer);

  renderContent(content: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(nxRenderChatMarkdown(content));
  }

  send(): void {
    const text = this.draft().trim();
    if (!text || this.disabled) {
      return;
    }
    this.messageSend.emit(text);
    this.draft.set('');
  }

  onEnterKey(event: Event): void {
    const keyboardEvent = event as KeyboardEvent;
    if (keyboardEvent.shiftKey) {
      return;
    }
    keyboardEvent.preventDefault();
    this.send();
  }

  copyMessage(message: NxChatMessage): void {
    navigator.clipboard?.writeText(message.content);
    this.copiedId.set(message.id);
    setTimeout(() => this.copiedId.set(null), 1500);
  }
}
