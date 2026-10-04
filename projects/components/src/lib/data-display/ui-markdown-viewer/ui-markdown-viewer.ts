import { Component, Input, ViewEncapsulation, computed, signal } from '@angular/core';
import { NxProLocked } from '../../licensing/ui-pro-locked/ui-pro-locked';
import { nxProLicenseGranted } from '../../licensing/nx-license';

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

/** Converts a reasonable common subset of markdown (headings, bold/italic/code, links, lists, blockquotes, fenced code blocks) into HTML - not a full CommonMark implementation, but enough for READMEs, changelogs, and comment bodies. */
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
 * Renders markdown source as read-only, formatted HTML - headings, bold/italic/inline code,
 * links, bulleted/numbered lists, blockquotes, and fenced code blocks. The output is bound via
 * `[innerHTML]`, which Angular sanitizes automatically, so raw HTML embedded in the source is
 * stripped rather than executed.
 */
@Component({
  selector: 'nx-markdown-viewer',
  standalone: true,
  imports: [NxProLocked],
  templateUrl: './ui-markdown-viewer.html',
  styleUrl: './ui-markdown-viewer.scss',
  // The rendered markdown is plain HTML assigned via [innerHTML], not Angular-authored template
  // content, so it never gets the `_ngcontent-*` attribute emulated encapsulation relies on to
  // scope styles - encapsulation: None is what actually lets .nx-markdown-viewer's nested
  // h1/pre/blockquote/etc. rules reach it. The outer class name still keeps this from leaking
  // into the rest of the page.
  encapsulation: ViewEncapsulation.None,
})
export class NxMarkdownViewer {
  protected readonly licensed = nxProLicenseGranted();

  // Backed by a signal (not a plain field) so `renderedHtml` below - a `computed()` reading
  // `this.source` - actually re-runs when the parent rebinds new markdown, instead of permanently
  // caching whatever it first saw on initial render.
  private readonly sourceSignal = signal('');
  @Input()
  get source(): string {
    return this.sourceSignal();
  }
  set source(value: string) {
    this.sourceSignal.set(value);
  }

  readonly renderedHtml = computed(() => markdownToHtml(this.source));
}
