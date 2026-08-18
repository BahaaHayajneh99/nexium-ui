import { Component, Input } from '@angular/core';
import { highlightHtml } from './code-highlight';
import { highlightTs } from './ts-highlight';
import { NgClass } from '@angular/common';

/**
 * Shared "code + live preview" block used by every component demo page,
 * replacing the previously hand-written `main-section` markup that was
 * duplicated (with manually escaped/colored HTML) across each demo file.
 */
@Component({
  selector: 'app-demo-section',
  standalone: true,
  templateUrl: './demo-section.html',
  imports: [NgClass],
})
export class DemoSection {
  @Input({ required: true }) header = '';
  @Input() description = '';
  @Input({ required: true }) code = '';
  @Input() tsCode = '';
  @Input() hasSampleClass = true;
  /** Language of the primary `code` block when there's no separate `tsCode` tab - use 'ts' for plain TypeScript snippets so they get TS coloring instead of HTML coloring. */
  @Input() codeLang: 'html' | 'ts' = 'html';

  activeTab: 'html' | 'ts' = 'html';
  copied = false;

  get highlightedCode(): string {
    return this.codeLang === 'ts' ? highlightTs(this.code) : highlightHtml(this.code);
  }

  get highlightedTsCode(): string {
    return highlightTs(this.wrapComponent + this.tsCode + '\n}');
  }

  selectTab(tab: 'html' | 'ts'): void {
    this.activeTab = tab;
  }

  copyCode(): void {
    const text = this.activeTab === 'ts' && this.tsCode
      ? this.wrapComponent + this.tsCode + '\n}'
      : this.code;

    // Show feedback immediately; clipboard write timing (focus/permission prompts)
    // shouldn't gate the UI state or the label lags a click behind.
    this.copied = true;
    setTimeout(() => (this.copied = false), 2000);

    navigator.clipboard.writeText(text).catch(() => this.copyWithFallback(text));
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

  // Wraps a TS snippet body in the DemoSection component shell so the "TS" tab
  // reads as a complete, self-contained class rather than a bare fragment.
  private wrapComponent =
    `@Component({
  selector: 'app-demo-section',
  standalone: true,
  templateUrl: './demo-section.html',
  imports: [],
})
export class DemoSection {`+'\n';

}
