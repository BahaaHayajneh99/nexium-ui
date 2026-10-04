import { Component, ElementRef, Input, OnChanges, OnDestroy, SimpleChanges, ViewChild } from '@angular/core';
import { NxProLocked } from '../../licensing/ui-pro-locked/ui-pro-locked';
import { nxProLicenseGranted } from '../../licensing/nx-license';

export interface NxChatStreamMessage {
  role: 'user' | 'assistant';
  content: string;
}

/** How often the reveal timer ticks while "typing" the in-progress message. */
const REVEAL_INTERVAL_MS = 20;
/** How many characters are revealed per tick. */
const REVEAL_CHARS_PER_TICK = 3;

/**
 * Renders a scrollable list of chat messages, visually distinguishing user messages (right-aligned
 * bubble) from assistant messages (left-aligned bubble). When `streaming` is true, the LAST message
 * in `messages` (assumed to be the assistant's in-progress reply) is revealed progressively, a few
 * characters at a time, rather than appearing all at once. The list auto-scrolls to the bottom
 * whenever a new message arrives or while the reveal animation is running.
 */
@Component({
  selector: 'nx-chat-stream',
  standalone: true,
  imports: [NxProLocked],
  templateUrl: './ui-chat-stream.html',
  styleUrl: './ui-chat-stream.scss',
})
export class NxChatStream implements OnChanges, OnDestroy {
  protected readonly licensed = nxProLicenseGranted();

  @Input() messages: NxChatStreamMessage[] = [];
  @Input() streaming = false;

  @ViewChild('scrollRef') private scrollRef?: ElementRef<HTMLDivElement>;

  protected revealedChars = 0;

  private intervalId?: ReturnType<typeof setInterval>;
  /** `role:content` of the last message this component has already reacted to - lets it tell a
   *  genuinely new last message apart from the same message re-arriving on an unrelated CD pass. */
  private lastSignature?: string;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['messages'] || changes['streaming']) {
      this.sync();
    }
  }

  ngOnDestroy(): void {
    this.clearTimer();
  }

  protected visibleContent(message: NxChatStreamMessage, index: number): string {
    const isLast = index === this.messages.length - 1;
    if (isLast && this.streaming && message.role === 'assistant') {
      return message.content.slice(0, this.revealedChars);
    }
    return message.content;
  }

  private sync(): void {
    const last = this.messages[this.messages.length - 1];
    const signature = last ? `${last.role}:${last.content}` : undefined;

    if (!this.streaming || !last || last.role !== 'assistant') {
      // Nothing to animate right now - clear any running timer and show the last
      // message (if any) fully revealed, instantly, instead of mid-animation.
      this.clearTimer();
      this.revealedChars = last ? last.content.length : 0;
      this.lastSignature = signature;
      this.scrollToBottom();
      return;
    }

    if (signature !== this.lastSignature) {
      // A genuinely new last message arrived - (re)start the reveal from scratch.
      this.lastSignature = signature;
      this.revealedChars = 0;
      this.startTimer(last);
    }
    // Same last message, still streaming - leave any in-flight animation running as-is.

    this.scrollToBottom();
  }

  private startTimer(message: NxChatStreamMessage): void {
    this.clearTimer();
    this.intervalId = setInterval(() => {
      this.revealedChars = Math.min(this.revealedChars + REVEAL_CHARS_PER_TICK, message.content.length);
      this.scrollToBottom();
      if (this.revealedChars >= message.content.length) {
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

  private scrollToBottom(): void {
    setTimeout(() => {
      const el = this.scrollRef?.nativeElement;
      if (el) {
        el.scrollTop = el.scrollHeight;
      }
    }, 0);
  }
}
