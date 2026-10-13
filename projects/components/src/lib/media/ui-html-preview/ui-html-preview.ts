import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnChanges,
  OnDestroy,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { NxProLocked } from '../../licensing/ui-pro-locked/ui-pro-locked';
import { nxProLicenseGranted } from '../../licensing/nx-license';

/**
 * Minimal default stylesheet injected into the preview document so plain-text /
 * unstyled HTML doesn't render in the browser's ugly default serif font. Set
 * `baseStyles` to `null`/`''` to render with no injected styles at all.
 */
const DEFAULT_BASE_STYLES = `
  body {
    margin: 0;
    padding: 12px;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
    font-size: 14px;
    line-height: 1.5;
    color: #1a1a1a;
    background-color: #ffffff;
  }
  img, video { max-width: 100%; }
  table { border-collapse: collapse; }
`;

/**
 * Renders an arbitrary raw HTML string in an isolated, sandboxed <iframe> - the
 * preview side of a "write HTML, see it rendered" tool (email template builder,
 * rich-text/markdown editor, etc.) where `html` may come from untrusted or
 * semi-trusted input.
 *
 * SECURITY MODEL - read this before changing `sandbox` or `srcdoc` handling.
 * ---------------------------------------------------------------------------
 * The isolation boundary here is the iframe's `sandbox` attribute, NOT Angular's
 * DomSanitizer. `srcdoc` is wired through `DomSanitizer.bypassSecurityTrustHtml()`
 * deliberately: Angular registers `iframe.srcdoc` under `SecurityContext.HTML`, so
 * an un-bypassed `[srcdoc]` binding would silently run the HTML sanitizer and strip
 * <script> tags / event-handler attributes before the string ever reaches the
 * iframe - quietly breaking `allowScripts` and giving a false sense of safety
 * (sanitizing a string for *innerHTML on the host page* says nothing about what's
 * safe inside an *isolated, sandboxed* document anyway). The actual guarantee
 * comes entirely from the sandbox value computed in `sandboxValue`:
 *
 * - `allowScripts = false` (default): sandbox="allow-same-origin" only. No
 *   script execution happens in the frame at all, so granting the same-origin
 *   privilege is harmless (there's no code running in there to abuse it) - it's
 *   only present so the host can read `contentDocument` for auto-resize.
 * - `allowScripts = true` (explicit opt-in): sandbox="allow-scripts" only. We
 *   deliberately do NOT also add "allow-same-origin". For a `srcdoc` document,
 *   `allow-same-origin` grants the frame the EMBEDDING page's own origin (not a
 *   neutral one) - combined with `allow-scripts`, script inside the frame could
 *   reach back into the parent document, rewrite the `sandbox` attribute on its
 *   own <iframe> element, and reload itself with the sandbox removed entirely,
 *   fully escaping it. This is the classic, documented "don't combine
 *   allow-scripts with allow-same-origin for untrusted content" pitfall. Running
 *   scripts in a unique-opaque-origin frame (no allow-same-origin) avoids that
 *   escape route, at the cost of: auto-resize not working in this mode (reading
 *   `contentDocument` is cross-origin and blocked) and the frame having no
 *   cookies/storage/same-origin network access. That's an acceptable tradeoff for
 *   a rarely-used, explicit opt-in - callers who truly need scripts AND DOM
 *   access back into the host page should not be rendering untrusted HTML here.
 */
@Component({
  selector: 'nx-html-preview',
  standalone: true,
  imports: [NxProLocked],
  templateUrl: './ui-html-preview.html',
  styleUrl: './ui-html-preview.scss',
})
export class NxHtmlPreview implements OnChanges, AfterViewInit, OnDestroy {
  protected readonly licensed = nxProLicenseGranted();

  /** Raw HTML source to render. Empty/undefined shows a blank placeholder state. */
  @Input() html = '';

  /** Fixed preview height (number = px, or any CSS length string). Ignored while an auto-measured height is available. */
  @Input() height: string | number = 300;

  /**
   * Opt-in to letting the previewed document run <script> tags. Defaults to false
   * (safe, non-executing preview). See the class doc comment above for exactly
   * what sandbox permissions this does (and deliberately does not) grant.
   */
  @Input() allowScripts = false;

  /**
   * Minimal stylesheet injected into the preview document's <head> (e.g. so plain
   * text doesn't render in the browser's default serif font). Pass `null` or `''`
   * to inject nothing. Ignored when `html` is already a full document that has no
   * <head> to inject into... it's still injected when a <head> tag is found.
   */
  @Input() baseStyles: string | null = DEFAULT_BASE_STYLES;

  /**
   * Nice-to-have: resize the frame to fit its rendered content instead of using
   * the fixed `height`. Only works when `allowScripts` is false (see security
   * note above) - silently falls back to `height` otherwise.
   */
  @Input() autoResize = false;

  @ViewChild('frame') private frameRef?: ElementRef<HTMLIFrameElement>;

  protected safeSrcdoc: SafeHtml;
  protected measuredHeight: number | null = null;

  private resizeObserver?: ResizeObserver;

  constructor(private readonly sanitizer: DomSanitizer) {
    this.safeSrcdoc = this.buildSafeSrcdoc();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['html'] || changes['baseStyles']) {
      this.safeSrcdoc = this.buildSafeSrcdoc();
      this.measuredHeight = null;
    }
    if (changes['autoResize'] && !this.autoResize) {
      this.measuredHeight = null;
      this.disconnectObserver();
    }
    if (changes['allowScripts']) {
      this.applySandboxAttribute();
    }
  }

  ngAfterViewInit(): void {
    // Angular's compiler hard-fails (NG0910) on `[attr.sandbox]`/`[sandbox]` template
    // bindings on <iframe> - "sandbox can be set as a static attribute only" - so the
    // dynamic part of this (allowScripts toggling the value) has to be done by setting
    // the attribute directly on the native element instead of through template binding.
    this.applySandboxAttribute();
  }

  ngOnDestroy(): void {
    this.disconnectObserver();
  }

  private applySandboxAttribute(): void {
    this.frameRef?.nativeElement.setAttribute('sandbox', this.sandboxValue);
  }

  protected get hostHeight(): string {
    if (this.autoResize && this.measuredHeight != null) {
      return `${this.measuredHeight}px`;
    }
    return typeof this.height === 'number' ? `${this.height}px` : this.height;
  }

  /** Never combine 'allow-scripts' with 'allow-same-origin' here - see class doc comment. */
  protected get sandboxValue(): string {
    return this.allowScripts ? 'allow-scripts' : 'allow-same-origin';
  }

  protected onFrameLoad(): void {
    this.disconnectObserver();

    if (!this.autoResize || this.allowScripts) {
      // Auto-resize needs `contentDocument` access, which requires allow-same-origin -
      // unavailable by design whenever scripts are allowed (see class doc comment).
      return;
    }

    const frame = this.frameRef?.nativeElement;
    if (!frame) return;

    try {
      const body = frame.contentDocument?.body;
      if (!body) return;

      const measure = () => {
        this.measuredHeight = Math.ceil(body.scrollHeight);
      };
      measure();

      // Cast to `any`: this lib's TS target doesn't declare `ResizeObserver` on `Window`,
      // even though it's broadly supported at runtime.
      const ResizeObserverCtor = (frame.contentWindow as any)?.ResizeObserver ?? (window as any).ResizeObserver;
      if (ResizeObserverCtor) {
        const observer = new ResizeObserverCtor(() => measure());
        observer.observe(body);
        this.resizeObserver = observer;
      }
    } catch {
      // Inaccessible for some other reason (older browser quirk, etc.) - fall back to `height`.
    }
  }

  private disconnectObserver(): void {
    this.resizeObserver?.disconnect();
    this.resizeObserver = undefined;
  }

  private buildSafeSrcdoc(): SafeHtml {
    const doc = this.buildDocument(this.html ?? '');
    // Deliberately bypasses Angular's sanitizer - see class doc comment: the sandbox
    // attribute is the real security boundary here, not this.
    return this.sanitizer.bypassSecurityTrustHtml(doc);
  }

  private buildDocument(rawHtml: string): string {
    const trimmed = rawHtml.trim();
    const styleBlock = this.baseStyles ? `<style>${this.baseStyles}</style>` : '';

    if (!trimmed) {
      return (
        `<!doctype html><html><head><meta charset="utf-8">${styleBlock}</head>` +
        `<body><div style="display:flex;align-items:center;justify-content:center;` +
        `min-height:80px;height:100%;color:#9ca3af;font:13px -apple-system,sans-serif;">` +
        `No HTML to preview</div></body></html>`
      );
    }

    // If the caller already handed us a full document (common for exported email-template
    // HTML), don't wrap it in a second <html>/<body> - just inject the style block into its
    // existing <head> when there is one, and otherwise leave it untouched.
    if (/<html[\s>]/i.test(trimmed)) {
      if (styleBlock && /<head[\s>]/i.test(trimmed)) {
        return trimmed.replace(/<head(\s[^>]*)?>/i, (match) => `${match}${styleBlock}`);
      }
      return trimmed;
    }

    return `<!doctype html><html><head><meta charset="utf-8">${styleBlock}</head><body>${rawHtml}</body></html>`;
  }
}
