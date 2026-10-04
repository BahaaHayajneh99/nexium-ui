import { Component, Input, computed, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NxIcon } from '../ui-icon';
import { NxProLocked } from '../../licensing/ui-pro-locked/ui-pro-locked';
import { nxProLicenseGranted } from '../../licensing/nx-license';

interface NxTextSegment {
  text: string;
  match: boolean;
  /** This match's 0-based occurrence number within its line (only set when `match` is true). */
  occurrenceInLine?: number;
}

function escapeRegExp(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

/** A plain-text viewer: line numbers, word-wrap toggle, find-in-page with match navigation, copy, and download. */
@Component({
  selector: 'nx-text-viewer',
  standalone: true,
  imports: [FormsModule, NxIcon, NxProLocked],
  templateUrl: './ui-text-viewer.html',
  styleUrl: './ui-text-viewer.scss',
})
export class NxTextViewer {
  protected readonly licensed = nxProLicenseGranted();

  // Backed by a signal (not a plain field) so `lines`/`totalMatches` below - both `computed()`s
  // reading `this.content` - actually re-run when the parent rebinds a different file's content,
  // instead of permanently caching whatever they first saw on initial render.
  private readonly contentSignal = signal('');
  @Input()
  get content(): string {
    return this.contentSignal();
  }
  set content(value: string) {
    this.contentSignal.set(value);
  }
  @Input() filename = 'file.txt';
  @Input() showLineNumbers = true;

  wordWrap = signal(true);
  searchQuery = signal('');
  activeMatch = signal(0);
  copied = signal(false);

  readonly lines = computed(() => this.content.split('\n'));

  readonly totalMatches = computed(() => {
    const q = this.searchQuery().trim();
    if (!q) return 0;
    const regex = new RegExp(escapeRegExp(q), 'gi');
    return (this.content.match(regex) || []).length;
  });

  lineSegments(line: string): NxTextSegment[] {
    const q = this.searchQuery().trim();
    if (!q) return [{ text: line, match: false }];

    const regex = new RegExp(escapeRegExp(q), 'gi');
    const segments: NxTextSegment[] = [];
    let lastIndex = 0;
    let occurrence = 0;
    let match: RegExpExecArray | null;
    while ((match = regex.exec(line))) {
      if (match.index > lastIndex) {
        segments.push({ text: line.slice(lastIndex, match.index), match: false });
      }
      segments.push({ text: match[0], match: true, occurrenceInLine: occurrence });
      occurrence += 1;
      lastIndex = match.index + match[0].length;
    }
    if (lastIndex < line.length) {
      segments.push({ text: line.slice(lastIndex), match: false });
    }
    return segments;
  }

  onSearchChange(value: string): void {
    this.searchQuery.set(value);
    this.activeMatch.set(0);
  }

  nextMatch(): void {
    const total = this.totalMatches();
    if (!total) return;
    this.activeMatch.update((i) => (i + 1) % total);
    this.scrollToActiveMatch();
  }

  prevMatch(): void {
    const total = this.totalMatches();
    if (!total) return;
    this.activeMatch.update((i) => (i - 1 + total) % total);
    this.scrollToActiveMatch();
  }

  private scrollToActiveMatch(): void {
    queueMicrotask(() => {
      const marks = document.querySelectorAll('.nx-text-viewer-match');
      marks[this.activeMatch()]?.scrollIntoView({ block: 'center' });
    });
  }

  isActiveMatch(lineIndex: number, segment: NxTextSegment): boolean {
    if (segment.occurrenceInLine === undefined) return false;
    return this.globalMatchIndex(lineIndex, segment.occurrenceInLine) === this.activeMatch();
  }

  private globalMatchIndex(targetLine: number, matchOccurrenceInLine: number): number {
    let count = 0;
    for (let i = 0; i < targetLine; i++) {
      count += this.lineSegments(this.lines()[i]).filter((s) => s.match).length;
    }
    return count + matchOccurrenceInLine;
  }

  toggleWordWrap(): void {
    this.wordWrap.update((v) => !v);
  }

  copy(): void {
    navigator.clipboard?.writeText(this.content).catch(() => {});
    this.copied.set(true);
    setTimeout(() => this.copied.set(false), 1500);
  }

  download(): void {
    const blob = new Blob([this.content], { type: 'text/plain;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = this.filename;
    link.click();
    URL.revokeObjectURL(url);
  }
}
