import { Component, Input, computed, signal } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { NxIcon } from '../ui-icon';
import { NxProLocked } from '../../licensing/ui-pro-locked/ui-pro-locked';
import { nxProLicenseGranted } from '../../licensing/nx-license';

/**
 * A PDF viewer toolbar (zoom, download, open-in-new-tab, fullscreen) wrapped around the
 * browser's own built-in PDF renderer - every evergreen browser already renders PDFs natively
 * inside an iframe, so this doesn't ship a PDF parsing/rendering engine of its own. In a browser
 * without native PDF support, the frame falls back to whatever that browser does with the URL
 * (usually a download prompt).
 */
@Component({
  selector: 'nx-pdf-viewer',
  standalone: true,
  imports: [NxIcon, NxProLocked],
  templateUrl: './ui-pdf-viewer.html',
  styleUrl: './ui-pdf-viewer.scss',
})
export class NxPdfViewer {
  protected readonly licensed = nxProLicenseGranted();

  // Backed by a signal (not a plain field) so `safeSrc` below - a `computed()` reading `this.src` -
  // actually re-runs when the parent rebinds a different document, instead of permanently caching
  // the first PDF it ever saw.
  private readonly srcSignal = signal<string | null>(null);
  @Input({ required: true })
  get src(): string {
    return this.srcSignal()!;
  }
  set src(value: string) {
    this.srcSignal.set(value);
  }
  @Input() title = 'Document';
  @Input() height = 560;

  zoom = signal(100);

  constructor(private sanitizer: DomSanitizer) {}

  readonly safeSrc = computed<SafeResourceUrl>(() => this.sanitizer.bypassSecurityTrustResourceUrl(this.src));

  zoomIn(): void {
    this.zoom.update((z) => Math.min(200, z + 10));
  }

  zoomOut(): void {
    this.zoom.update((z) => Math.max(50, z - 10));
  }

  resetZoom(): void {
    this.zoom.set(100);
  }

  download(): void {
    const link = document.createElement('a');
    link.href = this.src;
    link.download = this.title;
    link.click();
  }

  openInNewTab(): void {
    window.open(this.src, '_blank', 'noopener');
  }
}
