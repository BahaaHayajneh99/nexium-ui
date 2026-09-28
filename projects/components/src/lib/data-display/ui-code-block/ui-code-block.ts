import { Component, Input, signal } from '@angular/core';

/** A monospace code box with a language label and a copy button. Plain formatting only - bring your own syntax highlighter for coloring. */
@Component({
  selector: 'nx-code-block',
  standalone: true,
  imports: [],
  templateUrl: './ui-code-block.html',
  styleUrl: './ui-code-block.scss',
})
export class NxCodeBlock {
  @Input() code = '';
  @Input() language = '';
  @Input() showLineNumbers = false;

  // A signal, not a plain property: the revert happens inside a setTimeout,
  // outside any Angular-dispatched event.
  copied = signal(false);

  get lines(): string[] {
    return this.code.split('\n');
  }

  /** The code, prefixed with padded line numbers when showLineNumbers is set - computed as one string so <pre>'s whitespace stays exact. */
  get displayCode(): string {
    if (!this.showLineNumbers) {
      return this.code;
    }
    const lines = this.lines;
    const width = String(lines.length).length;
    return lines.map((line, i) => `${String(i + 1).padStart(width, ' ')}  ${line}`).join('\n');
  }

  copy(): void {
    this.copied.set(true);
    setTimeout(() => this.copied.set(false), 2000);
    navigator.clipboard?.writeText(this.code).catch(() => {});
  }
}
