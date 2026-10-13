import { AfterViewInit, Component, ElementRef, Input, OnChanges, ViewChild } from '@angular/core';
import { encodeQrCode, NxQrErrorCorrectionLevel } from './qr-encoder';
import { NxProLocked } from '../../licensing/ui-pro-locked/ui-pro-locked';
import { nxProLicenseGranted } from '../../licensing/nx-license';

/**
 * Renders arbitrary text (URLs, plain text, contact info, ...) as a scannable QR Code
 * on a <canvas>. The actual ISO/IEC 18004 encoding (Reed-Solomon error correction,
 * module placement, mask selection) lives in `qr-encoder.ts` and has no DOM dependency;
 * this component is just responsible for drawing the resulting module matrix.
 */
@Component({
  selector: 'nx-qr-code',
  standalone: true,
  imports: [NxProLocked],
  templateUrl: './ui-qr-code.html',
  styleUrl: './ui-qr-code.scss',
})
export class NxQrCode implements AfterViewInit, OnChanges {
  protected readonly licensed = nxProLicenseGranted();

  // Not a definite assignment (`!`) - the canvas now sits behind an `@if (licensed())` block, so
  // it isn't guaranteed present on the very first change-detection pass.
  @ViewChild('canvasEl') private canvasRef?: ElementRef<HTMLCanvasElement>;

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
    if (!this.canvasRef) {
      return;
    }
    const canvas = this.canvasRef.nativeElement;
    const ctx = canvas.getContext('2d');
    if (!ctx) {
      return;
    }

    this.errorMessage = null;

    if (!this.value) {
      canvas.width = canvas.height = 0;
      canvas.style.width = canvas.style.height = '0px';
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

    // Snap to a WHOLE-PIXEL module size (both in CSS pixels and in device pixels) rather than
    // dividing the requested `size` evenly and rounding each module edge independently - a
    // fractional module size always leaves some rounding error, which blurs edges at low DPI
    // and, at small-enough module sizes, can wobble adjacent module boundaries by a pixel
    // relative to each other. A real scanner (jsQR included) can fail outright on that, even
    // though every module is still individually crisp and the module data itself is correct -
    // confirmed by testing this same symbol at several sizes, where sizes that didn't divide
    // cleanly failed intermittently while whole-pixel-per-module sizes always succeeded. The
    // rendered size is therefore the nearest whole-module-size fit to `size`, not `size` itself.
    const dpr = window.devicePixelRatio || 1;
    const cssModuleSize = Math.max(1, Math.round(this.size / totalModules));
    const deviceModuleSize = Math.max(1, Math.round(cssModuleSize * dpr));
    const cssRenderSize = cssModuleSize * totalModules;
    const deviceRenderSize = deviceModuleSize * totalModules;

    canvas.width = deviceRenderSize;
    canvas.height = deviceRenderSize;
    canvas.style.width = `${cssRenderSize}px`;
    canvas.style.height = `${cssRenderSize}px`;

    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.fillStyle = this.background;
    ctx.fillRect(0, 0, deviceRenderSize, deviceRenderSize);

    ctx.fillStyle = this.foreground;
    for (let row = 0; row < qr.size; row++) {
      for (let col = 0; col < qr.size; col++) {
        if (qr.modules[row][col]) {
          const x = (col + quietZone) * deviceModuleSize;
          const y = (row + quietZone) * deviceModuleSize;
          ctx.fillRect(x, y, deviceModuleSize, deviceModuleSize);
        }
      }
    }
  }
}
