import { Component, ElementRef, EventEmitter, Input, Output, ViewChild, computed, signal } from '@angular/core';
import { NxIcon } from '../../data-display/ui-icon';
import { NxProLocked } from '../../licensing/ui-pro-locked/ui-pro-locked';
import { nxProLicenseGranted } from '../../licensing/nx-license';

interface NxCropRectPx {
  left: number;
  top: number;
  width: number;
  height: number;
}

interface NxCropFraction {
  x: number;
  y: number;
  w: number;
  h: number;
}

type NxCropHandle = 'nw' | 'n' | 'ne' | 'e' | 'se' | 's' | 'sw' | 'w';

interface NxCropDragState {
  mode: 'move' | 'resize';
  handle?: NxCropHandle;
  startX: number;
  startY: number;
  startRect: NxCropRectPx;
}

const MAX_DISPLAY_WIDTH = 440;
const MIN_CROP_PX = 24;

/**
 * Draggable/resizable crop rectangle over an image, with rotate/zoom/reset in the toolbar and a
 * Crop button that extracts the selected region (via an offscreen canvas) as a PNG data URL.
 *
 * Rotation is "baked" into the working image immediately (redrawn onto a canvas and re-assigned
 * as the display source) rather than applied as a CSS transform - this keeps the crop rectangle's
 * coordinate space always axis-aligned with the pixels it will eventually crop, with no rotation
 * math needed at crop time. Zoom is a pure view aid: the crop rectangle is stored as fractions
 * (0-1) of the displayed image, which are invariant to the uniform scale zoom applies.
 */
@Component({
  selector: 'nx-image-cropper',
  standalone: true,
  imports: [NxIcon, NxProLocked],
  templateUrl: './ui-image-cropper.html',
  styleUrl: './ui-image-cropper.scss',
})
export class NxImageCropper {
  protected readonly licensed = nxProLicenseGranted();

  @ViewChild('imgEl') private imgRef?: ElementRef<HTMLImageElement>;

  private _src = '';
  @Input()
  get src(): string {
    return this._src;
  }
  set src(value: string) {
    this._src = value ?? '';
    this.applyReset();
  }

  /** Locks the crop rectangle's width:height ratio while resizing, e.g. `1` for a square avatar. */
  @Input() aspectRatio?: number;

  @Output() cropped = new EventEmitter<string>();

  readonly handles: NxCropHandle[] = ['nw', 'n', 'ne', 'e', 'se', 's', 'sw', 'w'];

  readonly workingSrc = signal('');
  readonly rotation = signal(0);
  readonly zoom = signal(1);
  readonly naturalSize = signal({ w: 0, h: 0 });
  readonly baseScale = signal(1);
  readonly cropFraction = signal<NxCropFraction>({ x: 0.1, y: 0.1, w: 0.8, h: 0.8 });

  readonly displaySize = computed(() => {
    const n = this.naturalSize();
    const scale = this.baseScale() * this.zoom();
    return { w: n.w * scale, h: n.h * scale };
  });

  readonly cropPx = computed<NxCropRectPx>(() => {
    const d = this.displaySize();
    const c = this.cropFraction();
    return { left: c.x * d.w, top: c.y * d.h, width: c.w * d.w, height: c.h * d.h };
  });

  readonly zoomLabel = computed(() => `${Math.round(this.zoom() * 100)}%`);

  private dragState: NxCropDragState | null = null;

  private applyReset(): void {
    this.rotation.set(0);
    this.zoom.set(1);
    this.workingSrc.set(this._src);
    this.resetCropBox();
  }

  private resetCropBox(): void {
    const d = this.displaySize();
    if (d.w <= 0 || d.h <= 0) {
      return;
    }
    const ratio = this.aspectRatio;
    if (ratio) {
      let w = d.w * 0.8;
      let h = w / ratio;
      if (h > d.h * 0.8) {
        h = d.h * 0.8;
        w = h * ratio;
      }
      const fracW = w / d.w;
      const fracH = h / d.h;
      this.cropFraction.set({ x: (1 - fracW) / 2, y: (1 - fracH) / 2, w: fracW, h: fracH });
    } else {
      this.cropFraction.set({ x: 0.1, y: 0.1, w: 0.8, h: 0.8 });
    }
  }

  onImgLoad(): void {
    const img = this.imgRef?.nativeElement;
    if (!img) {
      return;
    }
    this.naturalSize.set({ w: img.naturalWidth, h: img.naturalHeight });
    this.baseScale.set(img.naturalWidth > 0 ? Math.min(1, MAX_DISPLAY_WIDTH / img.naturalWidth) : 1);
    this.resetCropBox();
  }

  rotate(): void {
    const img = this.imgRef?.nativeElement;
    if (!img || !img.complete || !img.naturalWidth) {
      return;
    }
    const nw = img.naturalWidth;
    const nh = img.naturalHeight;
    const canvas = document.createElement('canvas');
    canvas.width = nh;
    canvas.height = nw;
    const ctx = canvas.getContext('2d');
    if (!ctx) {
      return;
    }
    ctx.translate(nh / 2, nw / 2);
    ctx.rotate(Math.PI / 2);
    ctx.drawImage(img, -nw / 2, -nh / 2);
    this.workingSrc.set(canvas.toDataURL('image/png'));
    this.rotation.update((r) => (r + 90) % 360);
  }

  zoomIn(): void {
    this.zoom.update((z) => Math.round(Math.min(3, z + 0.1) * 100) / 100);
  }

  zoomOut(): void {
    this.zoom.update((z) => Math.round(Math.max(0.3, z - 0.1) * 100) / 100);
  }

  reset(): void {
    this.applyReset();
  }

  onBodyDown(event: MouseEvent): void {
    event.preventDefault();
    event.stopPropagation();
    this.beginDrag({ mode: 'move', startX: event.clientX, startY: event.clientY, startRect: { ...this.cropPx() } });
  }

  onHandleDown(event: MouseEvent, handle: NxCropHandle): void {
    event.preventDefault();
    event.stopPropagation();
    this.beginDrag({ mode: 'resize', handle, startX: event.clientX, startY: event.clientY, startRect: { ...this.cropPx() } });
  }

  private beginDrag(state: NxCropDragState): void {
    this.dragState = state;
    window.addEventListener('mousemove', this.onPointerMove);
    window.addEventListener('mouseup', this.onPointerUp);
  }

  private readonly onPointerMove = (event: MouseEvent): void => {
    const state = this.dragState;
    if (!state) {
      return;
    }
    const dx = event.clientX - state.startX;
    const dy = event.clientY - state.startY;
    const d = this.displaySize();

    let rect: NxCropRectPx = { ...state.startRect };
    if (state.mode === 'move') {
      rect.left += dx;
      rect.top += dy;
    } else if (state.handle) {
      rect = this.resizeRect(state.handle, rect, dx, dy);
      rect = this.applyAspect(state.handle, rect, state.startRect);
    }

    rect.width = Math.max(MIN_CROP_PX, Math.min(rect.width, d.w));
    rect.height = Math.max(MIN_CROP_PX, Math.min(rect.height, d.h));
    rect.left = Math.max(0, Math.min(rect.left, d.w - rect.width));
    rect.top = Math.max(0, Math.min(rect.top, d.h - rect.height));

    if (d.w > 0 && d.h > 0) {
      this.cropFraction.set({ x: rect.left / d.w, y: rect.top / d.h, w: rect.width / d.w, h: rect.height / d.h });
    }
  };

  private readonly onPointerUp = (): void => {
    this.dragState = null;
    window.removeEventListener('mousemove', this.onPointerMove);
    window.removeEventListener('mouseup', this.onPointerUp);
  };

  private resizeRect(handle: NxCropHandle, rect: NxCropRectPx, dx: number, dy: number): NxCropRectPx {
    const r = { ...rect };
    if (handle.includes('e')) {
      r.width += dx;
    }
    if (handle.includes('s')) {
      r.height += dy;
    }
    if (handle.includes('w')) {
      r.width -= dx;
      r.left += dx;
    }
    if (handle.includes('n')) {
      r.height -= dy;
      r.top += dy;
    }
    return r;
  }

  private applyAspect(handle: NxCropHandle, rect: NxCropRectPx, startRect: NxCropRectPx): NxCropRectPx {
    const ratio = this.aspectRatio;
    if (!ratio) {
      return rect;
    }
    const r = { ...rect };
    if (handle === 'n' || handle === 's') {
      const newWidth = r.height * ratio;
      const cx = startRect.left + startRect.width / 2;
      r.width = newWidth;
      r.left = cx - newWidth / 2;
    } else if (handle === 'e' || handle === 'w') {
      const newHeight = r.width / ratio;
      const cy = startRect.top + startRect.height / 2;
      r.height = newHeight;
      r.top = cy - newHeight / 2;
    } else {
      const newHeight = r.width / ratio;
      if (handle.includes('n')) {
        r.top = startRect.top + startRect.height - newHeight;
      }
      r.height = newHeight;
    }
    return r;
  }

  crop(): void {
    const img = this.imgRef?.nativeElement;
    if (!img || !img.naturalWidth) {
      return;
    }
    const nw = img.naturalWidth;
    const nh = img.naturalHeight;
    const c = this.cropFraction();
    const sx = Math.round(c.x * nw);
    const sy = Math.round(c.y * nh);
    const sw = Math.max(1, Math.round(c.w * nw));
    const sh = Math.max(1, Math.round(c.h * nh));

    const canvas = document.createElement('canvas');
    canvas.width = sw;
    canvas.height = sh;
    const ctx = canvas.getContext('2d');
    if (!ctx) {
      return;
    }
    ctx.drawImage(img, sx, sy, sw, sh, 0, 0, sw, sh);
    this.cropped.emit(canvas.toDataURL('image/png'));
  }
}
