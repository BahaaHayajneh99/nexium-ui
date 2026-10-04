import { Component, Input, computed, signal } from '@angular/core';
import { NxProLocked } from '../../licensing/ui-pro-locked/ui-pro-locked';
import { nxProLicenseGranted } from '../../licensing/nx-license';

const AVERAGE_WORDS_PER_MINUTE = 200;

/** Live word/character/sentence/paragraph counts and an estimated reading time for a block of text. */
@Component({
  selector: 'nx-text-statistics',
  standalone: true,
  imports: [NxProLocked],
  templateUrl: './ui-text-statistics.html',
  styleUrl: './ui-text-statistics.scss',
})
export class NxTextStatistics {
  protected readonly licensed = nxProLicenseGranted();

  private readonly textSignal = signal('');

  @Input() set text(value: string) {
    this.textSignal.set(value ?? '');
  }
  get text(): string {
    return this.textSignal();
  }

  readonly words = computed(() => {
    const trimmed = this.textSignal().trim();
    return trimmed ? trimmed.split(/\s+/).length : 0;
  });

  readonly characters = computed(() => this.textSignal().length);

  readonly charactersNoSpaces = computed(() => this.textSignal().replace(/\s/g, '').length);

  readonly sentences = computed(() => {
    const matches = this.textSignal().match(/[^.!?]+[.!?]+/g);
    return matches ? matches.length : this.textSignal().trim() ? 1 : 0;
  });

  readonly paragraphs = computed(() => {
    const trimmed = this.textSignal().trim();
    if (!trimmed) return 0;
    return trimmed.split(/\n\s*\n/).filter((p) => p.trim()).length;
  });

  readonly lines = computed(() => {
    const trimmed = this.textSignal();
    return trimmed ? trimmed.split('\n').length : 0;
  });

  readonly readingTimeLabel = computed(() => {
    const minutes = Math.max(1, Math.ceil(this.words() / AVERAGE_WORDS_PER_MINUTE));
    return minutes === 1 ? '1 min read' : `${minutes} min read`;
  });
}
