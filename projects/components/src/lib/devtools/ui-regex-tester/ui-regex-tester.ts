import { Component, inject, signal } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { NxProLocked } from '../../licensing/ui-pro-locked/ui-pro-locked';
import { nxProLicenseGranted } from '../../licensing/nx-license';

function escapeHtml(text: string): string {
  return text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

/** A regex playground: pattern + flags + test string, with matches highlighted and capture groups listed. */
@Component({
  selector: 'nx-regex-tester',
  standalone: true,
  imports: [NxProLocked],
  templateUrl: './ui-regex-tester.html',
  styleUrl: './ui-regex-tester.scss',
})
export class NxRegexTester {
  protected readonly licensed = nxProLicenseGranted();
  pattern = signal('');
  flags = signal('g');
  testString = signal('');

  private sanitizer = inject(DomSanitizer);

  get error(): string | null {
    if (!this.pattern()) {
      return null;
    }
    try {
      new RegExp(this.pattern(), this.flags());
      return null;
    } catch (err) {
      return err instanceof Error ? err.message : 'Invalid regular expression';
    }
  }

  get matches(): RegExpMatchArray[] {
    if (!this.pattern() || !this.testString() || this.error) {
      return [];
    }
    const globalFlags = this.flags().includes('g') ? this.flags() : `${this.flags()}g`;
    try {
      return Array.from(this.testString().matchAll(new RegExp(this.pattern(), globalFlags)));
    } catch {
      return [];
    }
  }

  get highlightedText(): SafeHtml {
    const text = this.testString();
    const matches = this.matches;
    if (!matches.length) {
      return this.sanitizer.bypassSecurityTrustHtml(escapeHtml(text));
    }

    let result = '';
    let cursor = 0;
    for (const match of matches) {
      const index = match.index ?? 0;
      result += escapeHtml(text.slice(cursor, index));
      result += `<mark class="nx-regex-tester-match">${escapeHtml(match[0])}</mark>`;
      cursor = index + match[0].length;
    }
    result += escapeHtml(text.slice(cursor));
    return this.sanitizer.bypassSecurityTrustHtml(result);
  }
}
