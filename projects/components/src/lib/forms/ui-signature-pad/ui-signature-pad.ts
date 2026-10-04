import { AfterViewInit, Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { NxProLocked } from '../../licensing/ui-pro-locked/ui-pro-locked';
import { nxProLicenseGranted } from '../../licensing/nx-license';

interface NxSignaturePoint {
  x: number;
  y: number;
}

// Design-space (CSS pixel) canvas size. Pointer coordinates and all drawing happen in this fixed
// logical space; a devicePixelRatio-scaled backing store keeps strokes crisp on hi-DPI screens,
// and mapping pointer events through the canvas's actual rendered size (not this constant) keeps
// coordinates correct even if CSS scales the element down responsively.
const LOGICAL_WIDTH = 480;
const LOGICAL_HEIGHT = 200;

/**
 * A canvas the user signs with mouse, touch, or pen (unified via Pointer Events). Each stroke is
 * tracked as its own point array so Undo can drop just the last stroke and replay the rest from a
 * cleared canvas. `getDataUrl()` and `signatureChange` both export a PNG data URL on demand.
 */
@Component({
  selector: 'nx-signature-pad',
  standalone: true,
  imports: [NxProLocked],
  templateUrl: './ui-signature-pad.html',
  styleUrl: './ui-signature-pad.scss',
})
export class NxSignaturePad implements AfterViewInit {
  protected readonly licensed = nxProLicenseGranted();

  @ViewChild('canvasEl') private canvasRef!: ElementRef<HTMLCanvasElement>;

  @Input() strokeColor = '#000000';
  @Input() strokeWidth = 2;
  @Input() backgroundColor = '#ffffff';

  @Output() signatureChange = new EventEmitter<string>();

  private ctx: CanvasRenderingContext2D | null = null;
  private strokes: NxSignaturePoint[][] = [];
  private currentStroke: NxSignaturePoint[] = [];
  private drawing = false;

  get hasContent(): boolean {
    return this.strokes.length > 0;
  }

  ngAfterViewInit(): void {
    const canvas = this.canvasRef.nativeElement;
    const dpr = window.devicePixelRatio || 1;
    canvas.width = LOGICAL_WIDTH * dpr;
    canvas.height = LOGICAL_HEIGHT * dpr;
    canvas.style.width = `${LOGICAL_WIDTH}px`;
    canvas.style.height = `${LOGICAL_HEIGHT}px`;
    this.ctx = canvas.getContext('2d');
    this.ctx?.scale(dpr, dpr);
    this.redraw();
  }

  onPointerDown(event: PointerEvent): void {
    event.preventDefault();
    this.canvasRef.nativeElement.setPointerCapture(event.pointerId);
    this.drawing = true;
    this.currentStroke = [this.toLocalPoint(event)];
    this.redraw();
  }

  onPointerMove(event: PointerEvent): void {
    if (!this.drawing) {
      return;
    }
    this.currentStroke.push(this.toLocalPoint(event));
    this.redraw();
  }

  onPointerUp(event: PointerEvent): void {
    if (!this.drawing) {
      return;
    }
    this.drawing = false;
    if (this.currentStroke.length > 0) {
      this.strokes = [...this.strokes, this.currentStroke];
    }
    this.currentStroke = [];
    this.redraw();
    this.emitChange();
  }

  clear(): void {
    this.strokes = [];
    this.currentStroke = [];
    this.drawing = false;
    this.redraw();
    this.emitChange();
  }

  undo(): void {
    if (this.strokes.length === 0) {
      return;
    }
    this.strokes = this.strokes.slice(0, -1);
    this.redraw();
    this.emitChange();
  }

  /** Returns the current signature as a `data:image/png;base64,...` string. */
  getDataUrl(): string {
    return this.canvasRef.nativeElement.toDataURL('image/png');
  }

  private emitChange(): void {
    this.signatureChange.emit(this.getDataUrl());
  }

  private toLocalPoint(event: PointerEvent): NxSignaturePoint {
    const rect = this.canvasRef.nativeElement.getBoundingClientRect();
    const scaleX = rect.width > 0 ? LOGICAL_WIDTH / rect.width : 1;
    const scaleY = rect.height > 0 ? LOGICAL_HEIGHT / rect.height : 1;
    return { x: (event.clientX - rect.left) * scaleX, y: (event.clientY - rect.top) * scaleY };
  }

  private redraw(): void {
    const ctx = this.ctx;
    if (!ctx) {
      return;
    }
    ctx.clearRect(0, 0, LOGICAL_WIDTH, LOGICAL_HEIGHT);
    ctx.fillStyle = this.backgroundColor;
    ctx.fillRect(0, 0, LOGICAL_WIDTH, LOGICAL_HEIGHT);
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    for (const stroke of this.strokes) {
      this.drawStroke(stroke);
    }
    if (this.currentStroke.length > 0) {
      this.drawStroke(this.currentStroke);
    }
  }

  private drawStroke(points: NxSignaturePoint[]): void {
    const ctx = this.ctx;
    if (!ctx || points.length === 0) {
      return;
    }
    if (points.length === 1) {
      ctx.beginPath();
      ctx.arc(points[0].x, points[0].y, this.strokeWidth / 2, 0, Math.PI * 2);
      ctx.fillStyle = this.strokeColor;
      ctx.fill();
      return;
    }
    ctx.strokeStyle = this.strokeColor;
    ctx.lineWidth = this.strokeWidth;
    ctx.beginPath();
    ctx.moveTo(points[0].x, points[0].y);
    for (let i = 1; i < points.length; i++) {
      ctx.lineTo(points[i].x, points[i].y);
    }
    ctx.stroke();
  }
}
