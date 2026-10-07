import { AfterViewInit, Component, ElementRef, Input, OnChanges, ViewChild } from '@angular/core';
import { encodeQrCode, NxQrErrorCorrectionLevel } from './qr-encoder';

/**
 * Renders arbitrary text (URLs, plain text, contact info, ...) as a scannable QR Code
 * on a <canvas>. The actual ISO/IEC 18004 encoding (Reed-Solomon error correction,
 * module placement, mask selection) lives in `qr-encoder.ts` and has no DOM dependency;
 * this component is just responsible for drawing the resulting module matrix.
 */
@Component({
  selector: 'nx-qr-code',
  standalone: true,
  imports: [],
  templateUrl: './ui-qr-code.html',
  styleUrl: './ui-qr-code.scss',
})
export class NxQrCode implements AfterViewInit, OnChanges {
  @ViewChild('canvasEl') private canvasRef!: ElementRef<HTMLCanvasElement>;

  /** The data to encode (text, a URL, etc). An empty value renders a blank canvas. */
  @Input() value = '';

  /** Rendered size in CSS pixels - the canvas is always square. */
  @Input() size = 200;

  /** Error correction level: higher levels tolerate more damage but hold less data per version. */
  @Input() errorCorrectionLevel: NxQrErrorCorrectionLevel = 'M';

  /** Color of the dark modules. */
  @Input() foreground = '#000000';

  /** Color of the light modules (including the quiet zone). */
  @Input() background = '#ffffff';

  /** Quiet-zone width, in modules, around the symbol. QR codes need this border to scan reliably. */
  @Input() margin = 4;

  /** Set once the view is ready, so input changes before that don't try to touch a missing canvas. */
  private viewReady = false;

  /** The matrix/version/mask actually used for the last successful render - handy for debugging. */
  errorMessage: string | null = null;

  ngAfterViewInit(): void {
    this.viewReady = true;
    this.render();
  }

  ngOnChanges(): void {
    if (this.viewReady) {
      this.render();
    }
  }

  private render(): void {
    const canvas = this.canvasRef.nativeElement;
    const ctx = canvas.getContext('2d');
    if (!ctx) {
      return;
    }

    const dpr = window.devicePixelRatio || 1;
    const renderSize = Math.max(1, this.size);
    canvas.width = renderSize * dpr;
    canvas.height = renderSize * dpr;
    canvas.style.width = `${renderSize}px`;
    canvas.style.height = `${renderSize}px`;

    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.scale(dpr, dpr);
    ctx.clearRect(0, 0, renderSize, renderSize);
    ctx.fillStyle = this.background;
    ctx.fillRect(0, 0, renderSize, renderSize);

    this.errorMessage = null;

    if (!this.value) {
      return;
    }

    let qr;
    try {
      qr = encodeQrCode(this.value, { errorCorrectionLevel: this.errorCorrectionLevel });
    } catch (error) {
      this.errorMessage = error instanceof Error ? error.message : 'Failed to encode QR code.';
      return;
    }

    const quietZone = Math.max(0, this.margin);
    const totalModules = qr.size + quietZone * 2;
    const moduleSize = renderSize / totalModules;

    ctx.fillStyle = this.foreground;
    for (let row = 0; row < qr.size; row++) {
      for (let col = 0; col < qr.size; col++) {
        if (qr.modules[row][col]) {
          const x = (col + quietZone) * moduleSize;
          const y = (row + quietZone) * moduleSize;
          // Rounding up avoids thin anti-aliased seams between adjacent modules.
          ctx.fillRect(x, y, Math.ceil(moduleSize), Math.ceil(moduleSize));
        }
      }
    }
  }
}
