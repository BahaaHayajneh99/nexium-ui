import { Component, Input, signal } from '@angular/core';
import { highlightTs } from '../../../shared/demo-section/ts-highlight';
import { highlightHtml } from '../../../shared/demo-section/code-highlight';

/**
 * A floating "View Source" toggle + slide-over panel, dropped into every showcase page so
 * visitors can see the exact TS/HTML that built what they're looking at - not just play with it.
 * The source strings are literal copies of the page's real files (same accepted convention as
 * every other demo page's `xCode`/`xTs` constants elsewhere in this app) kept in a small sibling
 * `.source.ts` file per page to avoid a component's source string trying to describe itself.
 */
@Component({
  selector: 'app-showcase-source-view',
  standalone: true,
  templateUrl: './showcase-source-view.html',
  styleUrl: './showcase-source-view.scss',
})
export class ShowcaseSourceView {
  @Input({ required: true }) tsSource = '';
  @Input({ required: true }) htmlSource = '';

  open = signal(false);
  activeTab = signal<'html' | 'ts'>('html');
  copied = signal(false);

  get highlightedHtml(): string {
    return highlightHtml(this.htmlSource);
  }

  get highlightedTs(): string {
    return highlightTs(this.tsSource);
  }

  toggle(): void {
    this.open.update((value) => !value);
  }

  close(): void {
    this.open.set(false);
  }

  setTab(tab: 'html' | 'ts'): void {
    this.activeTab.set(tab);
  }

  copy(): void {
    const text = this.activeTab() === 'html' ? this.htmlSource : this.tsSource;
    this.copied.set(true);
    setTimeout(() => this.copied.set(false), 2000);
    navigator.clipboard?.writeText(text).catch(() => {});
  }
}
