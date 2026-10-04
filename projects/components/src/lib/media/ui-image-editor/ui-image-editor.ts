import { Component, ElementRef, EventEmitter, Input, OnDestroy, Output, ViewChild, computed, signal } from '@angular/core';
import { NxIcon } from '../../data-display/ui-icon';
import { NxProLocked } from '../../licensing/ui-pro-locked/ui-pro-locked';
import { nxProLicenseGranted } from '../../licensing/nx-license';

export type NxImageEditorTool = 'crop' | 'resize' | 'rotate' | 'flip' | 'adjust' | 'filters' | 'draw' | 'text' | 'shapes';

type NxShapeType = 'rectangle' | 'ellipse';

interface NxCropFraction {
  x: number;
  y: number;
  w: number;
  h: number;
}

interface NxCropRectPx {
  left: number;
  top: number;
  width: number;
  height: number;
}

type NxCropHandle = 'nw' | 'n' | 'ne' | 'e' | 'se' | 's' | 'sw' | 'w';

interface NxCropDragState {
  mode: 'move' | 'resize';
  handle?: NxCropHandle;
  startX: number;
  startY: number;
  startRect: NxCropRectPx;
}

interface NxBasePoint {
  x: number;
  y: number;
}

interface NxTextEditorState {
  displayX: number;
  displayY: number;
  baseX: number;
  baseY: number;
  value: string;
}

const MAX_DISPLAY_WIDTH = 520;
const MIN_CROP_PX = 16;
const UNDO_LIMIT = 50;

function clampByte(value: number): number {
  return value < 0 ? 0 : value > 255 ? 255 : value;
}

/** Standard brightness (per-channel add) + contrast (`factor * (v - 128) + 128`) pixel formula, applied in-place. */
function applyBrightnessContrast(data: Uint8ClampedArray, brightness: number, contrast: number): void {
  const c = contrast * 2.55;
  const factor = (259 * (c + 255)) / (255 * (259 - c));
  for (let i = 0; i < data.length; i += 4) {
    data[i] = clampByte(factor * (data[i] - 128) + 128 + brightness);
    data[i + 1] = clampByte(factor * (data[i + 1] - 128) + 128 + brightness);
    data[i + 2] = clampByte(factor * (data[i + 2] - 128) + 128 + brightness);
  }
}

/**
 * A big-step-up PRO image editor built around two canvases: an in-memory "base" canvas that
 * always holds the real, full-resolution, committed bitmap (every tool mutates this one), and a
 * visible "display" canvas that is just a scaled-down redraw of the base, used purely for showing
 * the user what they're doing and for mapping their pointer/mouse interactions back into
 * base-pixel coordinates. Because every tool ultimately writes into the base canvas, `save()`
 * (and the undo/redo history) always has a real, exportable bitmap to work with.
 *
 * Crop reuses `NxImageCropper`'s fraction-based draggable/resizable rectangle approach. Draw
 * reuses `NxSignaturePad`'s pointer-capture stroke technique, but strokes land directly on the
 * base canvas instead of a separate overlay. Undo/redo snapshots the base canvas as PNG data URLs
 * (same simpler-but-heavier approach `NxSpreadsheet` documents for its own undo stack).
 */
@Component({
  selector: 'nx-image-editor',
  standalone: true,
  imports: [NxIcon, NxProLocked],
  templateUrl: './ui-image-editor.html',
  styleUrl: './ui-image-editor.scss',
})
export class NxImageEditor implements OnDestroy {
  protected readonly licensed = nxProLicenseGranted();

  @ViewChild('displayCanvas') private canvasRef?: ElementRef<HTMLCanvasElement>;
  @ViewChild('textInputEl') private textInputRef?: ElementRef<HTMLInputElement>;

  private readonly _src = signal('');
  @Input()
  get src(): string {
    return this._src();
  }
  set src(value: string) {
    const next = value ?? '';
    this._src.set(next);
    this.loadImage(next);
  }

  @Output() saved = new EventEmitter<string>();

  readonly handles: NxCropHandle[] = ['nw', 'n', 'ne', 'e', 'se', 's', 'sw', 'w'];

  private readonly baseCanvas = document.createElement('canvas');
  private readonly baseCtx = this.baseCanvas.getContext('2d')!;
  private readonly previewCanvas = document.createElement('canvas');

  readonly hasImage = signal(false);
  readonly activeTool = signal<NxImageEditorTool>('crop');
  readonly baseDims = signal({ w: 0, h: 0 });

  readonly displaySize = computed(() => {
    const d = this.baseDims();
    if (d.w <= 0 || d.h <= 0) {
      return { w: 0, h: 0 };
    }
    const scale = Math.min(1, MAX_DISPLAY_WIDTH / d.w);
    return { w: Math.max(1, Math.round(d.w * scale)), h: Math.max(1, Math.round(d.h * scale)) };
  });

  // --- Crop ---
  readonly cropFraction = signal<NxCropFraction>({ x: 0.1, y: 0.1, w: 0.8, h: 0.8 });
  readonly cropPx = computed<NxCropRectPx>(() => {
    const d = this.displaySize();
    const c = this.cropFraction();
    return { left: c.x * d.w, top: c.y * d.h, width: c.w * d.w, height: c.h * d.h };
  });
  private cropDragState: NxCropDragState | null = null;

  // --- Resize ---
  readonly resizeWidth = signal(0);
  readonly resizeHeight = signal(0);
  readonly aspectLocked = signal(true);
  private resizeAspect = 1;

  // --- Brightness / contrast ---
  readonly brightness = signal(0);
  readonly contrast = signal(0);
  private previewScheduled = false;

  // --- Draw & shapes shared style ---
  readonly strokeColor = signal('#e74c3c');
  readonly strokeWidth = signal(4);
  readonly shapeType = signal<NxShapeType>('rectangle');

  // --- Text ---
  readonly textColor = signal('#ffffff');
  readonly textFontSize = signal(28);
  readonly textEditor = signal<NxTextEditorState | null>(null);

  private undoStack: string[] = [];
  private redoStack: string[] = [];

  private gesture: 'draw' | 'shape' | null = null;
  private lastDrawPoint: NxBasePoint | null = null;
  private shapeStart: NxBasePoint | null = null;

  ngOnDestroy(): void {
    this.gesture = null;
    if (this.cropDragState) {
      this.onCropPointerUp();
    }
  }

  // ---------------------------------------------------------------------
  // Loading
  // ---------------------------------------------------------------------

  private loadImage(src: string): void {
    if (!src) {
      this.hasImage.set(false);
      this.baseDims.set({ w: 0, h: 0 });
      return;
    }
    const img = new Image();
    img.onload = () => {
      this.baseCanvas.width = img.naturalWidth;
      this.baseCanvas.height = img.naturalHeight;
      this.baseCtx.clearRect(0, 0, img.naturalWidth, img.naturalHeight);
      this.baseCtx.drawImage(img, 0, 0);
      this.undoStack = [];
      this.redoStack = [];
      this.brightness.set(0);
      this.contrast.set(0);
      this.textEditor.set(null);
      this.hasImage.set(true);
      this.syncBaseDims();
      this.resetCropBox();
      this.redrawDisplay();
    };
    img.onerror = () => {
      this.hasImage.set(false);
    };
    img.src = src;
  }

  private syncBaseDims(): void {
    this.baseDims.set({ w: this.baseCanvas.width, h: this.baseCanvas.height });
  }

  reset(): void {
    this.loadImage(this._src());
  }

  // ---------------------------------------------------------------------
  // Display redraw + coordinate mapping
  // ---------------------------------------------------------------------

  private redrawDisplay(source?: HTMLCanvasElement): void {
    const canvas = this.canvasRef?.nativeElement;
    if (!canvas) {
      return;
    }
    const size = this.displaySize();
    const dpr = window.devicePixelRatio || 1;
    const wantW = Math.max(1, Math.round(size.w * dpr));
    const wantH = Math.max(1, Math.round(size.h * dpr));
    if (canvas.width !== wantW) canvas.width = wantW;
    if (canvas.height !== wantH) canvas.height = wantH;
    const ctx = canvas.getContext('2d');
    if (!ctx) {
      return;
    }
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const src = source ?? this.baseCanvas;
    if (src.width > 0 && src.height > 0) {
      ctx.drawImage(src, 0, 0, canvas.width, canvas.height);
    }
  }

  private toBasePoint(event: MouseEvent): NxBasePoint {
    const canvas = this.canvasRef?.nativeElement;
    if (!canvas) {
      return { x: 0, y: 0 };
    }
    const rect = canvas.getBoundingClientRect();
    const scaleX = rect.width > 0 ? this.baseCanvas.width / rect.width : 1;
    const scaleY = rect.height > 0 ? this.baseCanvas.height / rect.height : 1;
    return { x: (event.clientX - rect.left) * scaleX, y: (event.clientY - rect.top) * scaleY };
  }

  // ---------------------------------------------------------------------
  // Tool selection
  // ---------------------------------------------------------------------

  selectTool(tool: NxImageEditorTool): void {
    this.activeTool.set(tool);
    if (tool === 'crop') {
      this.resetCropBox();
    } else if (tool === 'resize') {
      this.resizeAspect = this.baseCanvas.height > 0 ? this.baseCanvas.width / this.baseCanvas.height : 1;
      this.resizeWidth.set(this.baseCanvas.width);
      this.resizeHeight.set(this.baseCanvas.height);
    }
    this.commitTextIfPending();
    this.redrawDisplay();
  }

  // ---------------------------------------------------------------------
  // Undo / redo
  // ---------------------------------------------------------------------

  private pushUndo(): void {
    if (!this.hasImage()) {
      return;
    }
    this.undoStack.push(this.baseCanvas.toDataURL('image/png'));
    if (this.undoStack.length > UNDO_LIMIT) {
      this.undoStack.shift();
    }
    this.redoStack = [];
  }

  canUndo(): boolean {
    return this.undoStack.length > 0;
  }

  canRedo(): boolean {
    return this.redoStack.length > 0;
  }

  undo(): void {
    if (this.undoStack.length === 0) {
      return;
    }
    this.redoStack.push(this.baseCanvas.toDataURL('image/png'));
    const snapshot = this.undoStack.pop()!;
    this.restoreSnapshot(snapshot);
  }

  redo(): void {
    if (this.redoStack.length === 0) {
      return;
    }
    this.undoStack.push(this.baseCanvas.toDataURL('image/png'));
    const snapshot = this.redoStack.pop()!;
    this.restoreSnapshot(snapshot);
  }

  private restoreSnapshot(dataUrl: string): void {
    const img = new Image();
    img.onload = () => {
      this.baseCanvas.width = img.naturalWidth;
      this.baseCanvas.height = img.naturalHeight;
      this.baseCtx.clearRect(0, 0, img.naturalWidth, img.naturalHeight);
      this.baseCtx.drawImage(img, 0, 0);
      this.syncBaseDims();
      this.resetCropBox();
      this.redrawDisplay();
    };
    img.src = dataUrl;
  }

  // ---------------------------------------------------------------------
  // Save / export
  // ---------------------------------------------------------------------

  save(): void {
    if (!this.hasImage()) {
      return;
    }
    this.saved.emit(this.baseCanvas.toDataURL('image/png'));
  }

  // ---------------------------------------------------------------------
  // Crop
  // ---------------------------------------------------------------------

  private resetCropBox(): void {
    this.cropFraction.set({ x: 0.1, y: 0.1, w: 0.8, h: 0.8 });
  }

  onCropBodyDown(event: MouseEvent): void {
    event.preventDefault();
    event.stopPropagation();
    this.beginCropDrag({ mode: 'move', startX: event.clientX, startY: event.clientY, startRect: { ...this.cropPx() } });
  }

  onCropHandleDown(event: MouseEvent, handle: NxCropHandle): void {
    event.preventDefault();
    event.stopPropagation();
    this.beginCropDrag({ mode: 'resize', handle, startX: event.clientX, startY: event.clientY, startRect: { ...this.cropPx() } });
  }

  private beginCropDrag(state: NxCropDragState): void {
    this.cropDragState = state;
    window.addEventListener('mousemove', this.onCropPointerMove);
    window.addEventListener('mouseup', this.onCropPointerUp);
  }

  private readonly onCropPointerMove = (event: MouseEvent): void => {
    const state = this.cropDragState;
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
      rect = this.resizeCropRect(state.handle, rect, dx, dy);
    }

    rect.width = Math.max(MIN_CROP_PX, Math.min(rect.width, d.w));
    rect.height = Math.max(MIN_CROP_PX, Math.min(rect.height, d.h));
    rect.left = Math.max(0, Math.min(rect.left, d.w - rect.width));
    rect.top = Math.max(0, Math.min(rect.top, d.h - rect.height));

    if (d.w > 0 && d.h > 0) {
      this.cropFraction.set({ x: rect.left / d.w, y: rect.top / d.h, w: rect.width / d.w, h: rect.height / d.h });
    }
  };

  private readonly onCropPointerUp = (): void => {
    this.cropDragState = null;
    window.removeEventListener('mousemove', this.onCropPointerMove);
    window.removeEventListener('mouseup', this.onCropPointerUp);
  };

  private resizeCropRect(handle: NxCropHandle, rect: NxCropRectPx, dx: number, dy: number): NxCropRectPx {
    const r = { ...rect };
    if (handle.includes('e')) r.width += dx;
    if (handle.includes('s')) r.height += dy;
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

  applyCrop(): void {
    if (!this.hasImage()) {
      return;
    }
    const c = this.cropFraction();
    const bw = this.baseCanvas.width;
    const bh = this.baseCanvas.height;
    const sx = Math.max(0, Math.round(c.x * bw));
    const sy = Math.max(0, Math.round(c.y * bh));
    const sw = Math.max(1, Math.min(bw - sx, Math.round(c.w * bw)));
    const sh = Math.max(1, Math.min(bh - sy, Math.round(c.h * bh)));
    const imageData = this.baseCtx.getImageData(sx, sy, sw, sh);

    this.pushUndo();
    this.baseCanvas.width = sw;
    this.baseCanvas.height = sh;
    this.baseCtx.putImageData(imageData, 0, 0);
    this.syncBaseDims();
    this.resetCropBox();
    this.redrawDisplay();
  }

  // ---------------------------------------------------------------------
  // Rotate
  // ---------------------------------------------------------------------

  rotateLeft(): void {
    this.rotateBy(-90);
  }

  rotateRight(): void {
    this.rotateBy(90);
  }

  private rotateBy(deg: number): void {
    if (!this.hasImage()) {
      return;
    }
    this.pushUndo();
    const bw = this.baseCanvas.width;
    const bh = this.baseCanvas.height;
    const tmp = document.createElement('canvas');
    tmp.width = bh;
    tmp.height = bw;
    const tctx = tmp.getContext('2d');
    if (!tctx) {
      return;
    }
    tctx.translate(tmp.width / 2, tmp.height / 2);
    tctx.rotate((deg * Math.PI) / 180);
    tctx.drawImage(this.baseCanvas, -bw / 2, -bh / 2);

    this.baseCanvas.width = tmp.width;
    this.baseCanvas.height = tmp.height;
    this.baseCtx.clearRect(0, 0, tmp.width, tmp.height);
    this.baseCtx.drawImage(tmp, 0, 0);
    this.syncBaseDims();
    this.resetCropBox();
    this.redrawDisplay();
  }

  // ---------------------------------------------------------------------
  // Flip
  // ---------------------------------------------------------------------

  flipHorizontal(): void {
    this.flip('h');
  }

  flipVertical(): void {
    this.flip('v');
  }

  private flip(axis: 'h' | 'v'): void {
    if (!this.hasImage()) {
      return;
    }
    this.pushUndo();
    const bw = this.baseCanvas.width;
    const bh = this.baseCanvas.height;
    const tmp = document.createElement('canvas');
    tmp.width = bw;
    tmp.height = bh;
    tmp.getContext('2d')!.drawImage(this.baseCanvas, 0, 0);

    this.baseCtx.setTransform(1, 0, 0, 1, 0, 0);
    this.baseCtx.clearRect(0, 0, bw, bh);
    if (axis === 'h') {
      this.baseCtx.translate(bw, 0);
      this.baseCtx.scale(-1, 1);
    } else {
      this.baseCtx.translate(0, bh);
      this.baseCtx.scale(1, -1);
    }
    this.baseCtx.drawImage(tmp, 0, 0);
    this.baseCtx.setTransform(1, 0, 0, 1, 0, 0);
    this.redrawDisplay();
  }

  // ---------------------------------------------------------------------
  // Resize
  // ---------------------------------------------------------------------

  onResizeWidthChange(value: string): void {
    const w = Math.max(1, Math.round(Number(value) || 0));
    this.resizeWidth.set(w);
    if (this.aspectLocked()) {
      this.resizeHeight.set(Math.max(1, Math.round(w / this.resizeAspect)));
    }
  }

  onResizeHeightChange(value: string): void {
    const h = Math.max(1, Math.round(Number(value) || 0));
    this.resizeHeight.set(h);
    if (this.aspectLocked()) {
      this.resizeWidth.set(Math.max(1, Math.round(h * this.resizeAspect)));
    }
  }

  toggleAspectLock(locked: boolean): void {
    this.aspectLocked.set(locked);
    if (locked && this.resizeHeight() > 0) {
      this.resizeAspect = this.resizeWidth() / this.resizeHeight();
    }
  }

  applyResize(): void {
    if (!this.hasImage()) {
      return;
    }
    const w = Math.max(1, this.resizeWidth());
    const h = Math.max(1, this.resizeHeight());
    const tmp = document.createElement('canvas');
    tmp.width = this.baseCanvas.width;
    tmp.height = this.baseCanvas.height;
    tmp.getContext('2d')!.drawImage(this.baseCanvas, 0, 0);

    this.pushUndo();
    this.baseCanvas.width = w;
    this.baseCanvas.height = h;
    this.baseCtx.clearRect(0, 0, w, h);
    this.baseCtx.drawImage(tmp, 0, 0, tmp.width, tmp.height, 0, 0, w, h);
    this.syncBaseDims();
    this.resetCropBox();
    this.redrawDisplay();
  }

  // ---------------------------------------------------------------------
  // Brightness / contrast (live preview via rAF-coalesced ImageData pass, baked on Apply)
  // ---------------------------------------------------------------------

  onBrightnessChange(value: string): void {
    this.brightness.set(Number(value) || 0);
    this.scheduleAdjustPreview();
  }

  onContrastChange(value: string): void {
    this.contrast.set(Number(value) || 0);
    this.scheduleAdjustPreview();
  }

  private scheduleAdjustPreview(): void {
    if (this.previewScheduled) {
      return;
    }
    this.previewScheduled = true;
    requestAnimationFrame(() => {
      this.previewScheduled = false;
      this.renderAdjustPreview();
    });
  }

  private renderAdjustPreview(): void {
    if (!this.hasImage()) {
      return;
    }
    const b = this.brightness();
    const c = this.contrast();
    if (b === 0 && c === 0) {
      this.redrawDisplay();
      return;
    }
    const bw = this.baseCanvas.width;
    const bh = this.baseCanvas.height;
    this.previewCanvas.width = bw;
    this.previewCanvas.height = bh;
    const pctx = this.previewCanvas.getContext('2d')!;
    pctx.drawImage(this.baseCanvas, 0, 0);
    const imageData = pctx.getImageData(0, 0, bw, bh);
    applyBrightnessContrast(imageData.data, b, c);
    pctx.putImageData(imageData, 0, 0);
    this.redrawDisplay(this.previewCanvas);
  }

  applyAdjust(): void {
    if (!this.hasImage() || (this.brightness() === 0 && this.contrast() === 0)) {
      return;
    }
    this.pushUndo();
    const bw = this.baseCanvas.width;
    const bh = this.baseCanvas.height;
    const imageData = this.baseCtx.getImageData(0, 0, bw, bh);
    applyBrightnessContrast(imageData.data, this.brightness(), this.contrast());
    this.baseCtx.putImageData(imageData, 0, 0);
    this.brightness.set(0);
    this.contrast.set(0);
    this.redrawDisplay();
  }

  // ---------------------------------------------------------------------
  // Filters (one-click, baked immediately)
  // ---------------------------------------------------------------------

  applyFilter(name: 'grayscale' | 'sepia' | 'invert'): void {
    if (!this.hasImage()) {
      return;
    }
    this.pushUndo();
    const bw = this.baseCanvas.width;
    const bh = this.baseCanvas.height;
    const imageData = this.baseCtx.getImageData(0, 0, bw, bh);
    const d = imageData.data;
    for (let i = 0; i < d.length; i += 4) {
      const r = d[i];
      const g = d[i + 1];
      const b = d[i + 2];
      if (name === 'grayscale') {
        const gray = 0.299 * r + 0.587 * g + 0.114 * b;
        d[i] = gray;
        d[i + 1] = gray;
        d[i + 2] = gray;
      } else if (name === 'sepia') {
        d[i] = clampByte(0.393 * r + 0.769 * g + 0.189 * b);
        d[i + 1] = clampByte(0.349 * r + 0.686 * g + 0.168 * b);
        d[i + 2] = clampByte(0.272 * r + 0.534 * g + 0.131 * b);
      } else {
        d[i] = 255 - r;
        d[i + 1] = 255 - g;
        d[i + 2] = 255 - b;
      }
    }
    this.baseCtx.putImageData(imageData, 0, 0);
    this.redrawDisplay();
  }

  // ---------------------------------------------------------------------
  // Canvas pointer routing (Draw / Shapes / Text)
  // ---------------------------------------------------------------------

  onCanvasPointerDown(event: PointerEvent): void {
    if (!this.hasImage()) {
      return;
    }
    const tool = this.activeTool();
    if (tool === 'draw') {
      this.beginDraw(event);
    } else if (tool === 'shapes') {
      this.beginShape(event);
    } else if (tool === 'text') {
      this.beginTextPlacement(event);
    }
  }

  onCanvasPointerMove(event: PointerEvent): void {
    if (this.gesture === 'draw') {
      this.continueDraw(event);
    } else if (this.gesture === 'shape') {
      this.continueShape(event);
    }
  }

  onCanvasPointerUp(event: PointerEvent): void {
    if (this.gesture === 'draw') {
      this.endDraw();
    } else if (this.gesture === 'shape') {
      this.endShape(event);
    }
    this.gesture = null;
  }

  // --- Draw ---

  private beginDraw(event: PointerEvent): void {
    this.canvasRef?.nativeElement.setPointerCapture(event.pointerId);
    this.pushUndo();
    this.gesture = 'draw';
    const p = this.toBasePoint(event);
    this.lastDrawPoint = p;
    this.baseCtx.fillStyle = this.strokeColor();
    this.baseCtx.beginPath();
    this.baseCtx.arc(p.x, p.y, this.strokeWidth() / 2, 0, Math.PI * 2);
    this.baseCtx.fill();
    this.redrawDisplay();
  }

  private continueDraw(event: PointerEvent): void {
    const p = this.toBasePoint(event);
    const last = this.lastDrawPoint;
    if (last) {
      this.baseCtx.strokeStyle = this.strokeColor();
      this.baseCtx.lineWidth = this.strokeWidth();
      this.baseCtx.lineCap = 'round';
      this.baseCtx.lineJoin = 'round';
      this.baseCtx.beginPath();
      this.baseCtx.moveTo(last.x, last.y);
      this.baseCtx.lineTo(p.x, p.y);
      this.baseCtx.stroke();
    }
    this.lastDrawPoint = p;
    this.redrawDisplay();
  }

  private endDraw(): void {
    this.lastDrawPoint = null;
  }

  // --- Shapes ---

  private beginShape(event: PointerEvent): void {
    this.canvasRef?.nativeElement.setPointerCapture(event.pointerId);
    this.pushUndo();
    this.gesture = 'shape';
    this.shapeStart = this.toBasePoint(event);
  }

  private continueShape(event: PointerEvent): void {
    if (!this.shapeStart) {
      return;
    }
    const cur = this.toBasePoint(event);
    this.renderShapePreview(this.shapeStart, cur);
  }

  private endShape(event: PointerEvent): void {
    const start = this.shapeStart;
    this.shapeStart = null;
    if (!start) {
      return;
    }
    const cur = this.toBasePoint(event);
    const x = Math.min(start.x, cur.x);
    const y = Math.min(start.y, cur.y);
    const w = Math.abs(cur.x - start.x);
    const h = Math.abs(cur.y - start.y);

    this.baseCtx.strokeStyle = this.strokeColor();
    this.baseCtx.lineWidth = this.strokeWidth();
    if (this.shapeType() === 'rectangle') {
      this.baseCtx.strokeRect(x, y, w, h);
    } else {
      this.baseCtx.beginPath();
      this.baseCtx.ellipse(x + w / 2, y + h / 2, Math.max(w / 2, 0.1), Math.max(h / 2, 0.1), 0, 0, Math.PI * 2);
      this.baseCtx.stroke();
    }
    this.redrawDisplay();
  }

  private renderShapePreview(start: NxBasePoint, cur: NxBasePoint): void {
    this.redrawDisplay();
    const canvas = this.canvasRef?.nativeElement;
    if (!canvas) {
      return;
    }
    const ctx = canvas.getContext('2d');
    if (!ctx) {
      return;
    }
    const scale = this.baseCanvas.width > 0 ? canvas.width / this.baseCanvas.width : 1;
    const x = Math.min(start.x, cur.x) * scale;
    const y = Math.min(start.y, cur.y) * scale;
    const w = Math.abs(cur.x - start.x) * scale;
    const h = Math.abs(cur.y - start.y) * scale;

    ctx.strokeStyle = this.strokeColor();
    ctx.lineWidth = Math.max(1, this.strokeWidth() * scale);
    if (this.shapeType() === 'rectangle') {
      ctx.strokeRect(x, y, w, h);
    } else {
      ctx.beginPath();
      ctx.ellipse(x + w / 2, y + h / 2, Math.max(w / 2, 0.1), Math.max(h / 2, 0.1), 0, 0, Math.PI * 2);
      ctx.stroke();
    }
  }

  // --- Text ---

  private beginTextPlacement(event: PointerEvent): void {
    this.commitTextIfPending();
    const canvas = this.canvasRef?.nativeElement;
    if (!canvas) {
      return;
    }
    const rect = canvas.getBoundingClientRect();
    const displayX = event.clientX - rect.left;
    const displayY = event.clientY - rect.top;
    const basePoint = this.toBasePoint(event);
    this.textEditor.set({ displayX, displayY, baseX: basePoint.x, baseY: basePoint.y, value: '' });
    setTimeout(() => this.textInputRef?.nativeElement.focus(), 0);
  }

  onTextEditorInput(value: string): void {
    const te = this.textEditor();
    if (te) {
      this.textEditor.set({ ...te, value });
    }
  }

  onTextEditorKeydown(event: KeyboardEvent): void {
    if (event.key === 'Enter') {
      event.preventDefault();
      this.commitTextIfPending();
    } else if (event.key === 'Escape') {
      event.preventDefault();
      this.textEditor.set(null);
    }
  }

  // --- Simple style setters exposed to the template (keeps signal mutation out of bindings) ---

  setStrokeColor(value: string): void {
    this.strokeColor.set(value);
  }

  setStrokeWidth(value: string): void {
    this.strokeWidth.set(Math.max(1, Number(value) || 1));
  }

  setShapeType(type: NxShapeType): void {
    this.shapeType.set(type);
  }

  setTextColor(value: string): void {
    this.textColor.set(value);
  }

  setTextFontSize(value: string): void {
    this.textFontSize.set(Math.max(1, Number(value) || 1));
  }

  commitTextIfPending(): void {
    const te = this.textEditor();
    if (!te) {
      return;
    }
    this.textEditor.set(null);
    if (!te.value.trim()) {
      return;
    }
    this.pushUndo();
    this.baseCtx.font = `${this.textFontSize()}px sans-serif`;
    this.baseCtx.fillStyle = this.textColor();
    this.baseCtx.textBaseline = 'middle';
    this.baseCtx.fillText(te.value, te.baseX, te.baseY);
    this.redrawDisplay();
  }
}
