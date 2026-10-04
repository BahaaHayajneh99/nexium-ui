import { Component, Input, computed, signal } from '@angular/core';

const DEFAULT_CHARS_PER_TOKEN = 4;

/**
 * Estimates how many LLM tokens a piece of text will cost using a simple characters-per-token
 * ratio (`charsPerToken`, default 4 - a widely cited rough average for English text). This is
 * NOT a real model tokenizer: actual tokenizers split on sub-word pieces/byte-pair-encodings
 * that vary model to model, so the exact token count for the same text can differ noticeably
 * (often by a meaningful margin either way) from this estimate. Use this for a quick,
 * dependency-free ballpark figure, not for anything that needs to match a specific model's
 * billed token count exactly.
 */
@Component({
  selector: 'nx-token-counter',
  standalone: true,
  imports: [],
  templateUrl: './ui-token-counter.html',
  styleUrl: './ui-token-counter.scss',
})
export class NxTokenCounter {
  // Backed by signals (not plain fields) so the computed()s below actually re-run when the
  // parent rebinds new text/limit/ratio, instead of permanently caching whatever they first saw.
  private readonly textSignal = signal('');
  @Input()
  get text(): string {
    return this.textSignal();
  }
  set text(value: string) {
    this.textSignal.set(value ?? '');
  }

  private readonly charsPerTokenSignal = signal(DEFAULT_CHARS_PER_TOKEN);
  @Input()
  get charsPerToken(): number {
    return this.charsPerTokenSignal();
  }
  set charsPerToken(value: number) {
    this.charsPerTokenSignal.set(value > 0 ? value : DEFAULT_CHARS_PER_TOKEN);
  }

  private readonly limitSignal = signal<number | undefined>(undefined);
  @Input()
  get limit(): number | undefined {
    return this.limitSignal();
  }
  set limit(value: number | undefined) {
    this.limitSignal.set(value);
  }

  readonly estimatedTokens = computed(() => {
    const text = this.textSignal();
    if (!text) {
      return 0;
    }
    const ratio = this.charsPerTokenSignal();
    return Math.ceil(text.length / (ratio > 0 ? ratio : DEFAULT_CHARS_PER_TOKEN));
  });

  /** Fill percentage for the progress bar, clamped to 0-100. Only meaningful when `limit` is set. */
  readonly percent = computed(() => {
    const limit = this.limitSignal();
    if (!limit || limit <= 0) {
      return 0;
    }
    return Math.min(100, Math.max(0, (this.estimatedTokens() / limit) * 100));
  });

  readonly barState = computed<'normal' | 'warning' | 'danger'>(() => {
    const limit = this.limitSignal();
    if (!limit || limit <= 0) {
      return 'normal';
    }
    const ratio = this.estimatedTokens() / limit;
    if (ratio >= 1) {
      return 'danger';
    }
    if (ratio >= 0.8) {
      return 'warning';
    }
    return 'normal';
  });
}
