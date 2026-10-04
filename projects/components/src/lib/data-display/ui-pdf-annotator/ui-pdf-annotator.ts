import { Component, ElementRef, EventEmitter, Input, Output, ViewChild, computed, signal } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { NxIcon } from '../ui-icon';
import { NxProLocked } from '../../licensing/ui-pro-locked/ui-pro-locked';
import { nxProLicenseGranted } from '../../licensing/nx-license';

export type NxAnnotationTool = 'highlight' | 'draw' | 'text' | 'rectangle';

export interface NxAnnotationPoint {
  x: number;
  y: number;
}

export interface NxPdfAnnotation {
  id: string;
  tool: NxAnnotationTool;
  /** 1-based page number. This demo/overlay is single-page-aware only - a real multi-page consumer would set this per page. */
  page: number;
  /** Normalized 0-1 coordinates relative to the viewport (NOT PDF content-space points), so annotations stay put regardless of zoom or container size. */
  points?: NxAnnotationPoint[];
  text?: string;
  color: string;
}

interface NxToolDef {
  tool: NxAnnotationTool;
  label: string;
  icon: string;
}

const TOOLS: NxToolDef[] = [
  { tool: 'highlight', label: 'Highlight', icon: 'nx-edit' },
  { tool: 'rectangle', label: 'Rectangle', icon: 'nx-grid' },
  { tool: 'draw', label: 'Draw', icon: 'nx-edit' },
  { tool: 'text', label: 'Text', icon: 'nx-message' },
];

const COLORS = ['#f1c40f', '#e74c3c', '#2ecc71', '#3498db', '#9b59b6', '#1e1e1e'];

let idCounter = 0;
function nextAnnotationId(): string {
  idCounter += 1;
  return `nx-annot-${Date.now().toString(36)}-${idCounter}`;
}

function clamp01(value: number): number {
  return Math.max(0, Math.min(1, value));
}

/**
 * A markup OVERLAY on top of the browser's native PDF rendering - the same honest approach
 * `NxPdfViewer` uses (an iframe pointed at the PDF URL/data URL; no PDF parsing engine is bundled
 * here, so there is no PDF-writing capability either). Annotations are a completely separate
 * layer, positioned with normalized 0-1 coordinates relative to the viewport so they stay put
 * across container resizes, NOT embedded into the PDF's actual byte content in any way.
 *
 * Export has two forms, both honest about this split:
 * - `exportAnnotations()` downloads the `annotations` array itself as a JSON file (position, tool,
 *   color, text) - a structured description a consuming app could replay or re-render elsewhere.
 * - `exportOverlayImage()` rasterizes ONLY the annotation marks onto a transparent-background
 *   canvas and downloads that as a PNG. It deliberately does NOT attempt to flatten the PDF page
 *   itself underneath: the page renders inside a same-origin-ish `<iframe>` (often a `blob:` URL),
 *   and reading pixels out of an iframe's rendered document back into a `<canvas>` is unreliable
 *   across browsers even for nominally same-origin content (no `drawWindow`-equivalent exists in
 *   standard web APIs). A consumer who wants a single flattened "page + marks" image needs to
 *   composite the exported overlay PNG onto their own screenshot/render of the page.
 */
@Component({
  selector: 'nx-pdf-annotator',
  standalone: true,
  imports: [NxIcon, NxProLocked],
  templateUrl: './ui-pdf-annotator.html',
  styleUrl: './ui-pdf-annotator.scss',
})
export class NxPdfAnnotator {
  protected readonly licensed = nxProLicenseGranted();

  @ViewChild('stageEl') private stageRef?: ElementRef<HTMLDivElement>;

  // Signal-backed get/set accessor (not a plain field) so `safeSrc` below - a `computed()` reading
  // `this.src` - actually re-runs when the parent rebinds a different document, instead of
  // permanently caching the first PDF it ever saw (see NxPdfViewer for the same pattern).
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

  private readonly annotationsSignal = signal<NxPdfAnnotation[]>([]);
  @Input()
  get annotations(): NxPdfAnnotation[] {
    return this.annotationsSignal();
  }
  set annotations(value: NxPdfAnnotation[]) {
    this.annotationsSignal.set(value ?? []);
  }

  @Output() annotationsChange = new EventEmitter<NxPdfAnnotation[]>();

  readonly tools = TOOLS;
  readonly colors = COLORS;

  readonly activeTool = signal<NxAnnotationTool | null>(null);
  readonly activeColor = signal(COLORS[0]);
  readonly draftPoints = signal<NxAnnotationPoint[] | null>(null);
  readonly textEditor = signal<{ x: number; y: number; value: string } | null>(null);

  private dragging = false;
  private dragStart: NxAnnotationPoint | null = null;

  readonly safeSrc = computed<SafeResourceUrl>(() => this.sanitizer.bypassSecurityTrustResourceUrl(this.src));

  constructor(private sanitizer: DomSanitizer) {}

  get overlayActive(): boolean {
    return this.activeTool() !== null;
  }

  selectTool(tool: NxAnnotationTool): void {
    this.textEditor.set(null);
    this.activeTool.update((current) => (current === tool ? null : tool));
  }

  selectColor(color: string): void {
    this.activeColor.set(color);
  }

  onPointerDown(event: PointerEvent): void {
    const tool = this.activeTool();
    if (!tool) {
      return;
    }
    const point = this.toNormalizedPoint(event);
    if (tool === 'text') {
      this.textEditor.set({ x: point.x, y: point.y, value: '' });
      return;
    }
    event.preventDefault();
    this.dragging = true;
    this.dragStart = point;
    this.draftPoints.set(tool === 'draw' ? [point] : [point, point]);
  }

  onPointerMove(event: PointerEvent): void {
    if (!this.dragging) {
      return;
    }
    const tool = this.activeTool();
    const point = this.toNormalizedPoint(event);
    if (tool === 'draw') {
      this.draftPoints.update((points) => [...(points ?? []), point]);
    } else if (this.dragStart) {
      this.draftPoints.set([this.dragStart, point]);
    }
  }

  onPointerUp(): void {
    if (!this.dragging) {
      return;
    }
    this.dragging = false;
    const tool = this.activeTool();
    const points = this.draftPoints();
    this.draftPoints.set(null);
    this.dragStart = null;
    if (!tool || !points || points.length === 0) {
      return;
    }
    if (tool !== 'draw') {
      const [a, b] = points;
      if (Math.abs(a.x - b.x) < 0.01 && Math.abs(a.y - b.y) < 0.01) {
        return; // Degenerate click-not-drag - ignore rather than creating a zero-size mark.
      }
    }
    this.commit({ id: nextAnnotationId(), tool, page: 1, points, color: this.activeColor() });
  }

  onTextInput(event: Event, draft: { x: number; y: number; value: string }): void {
    const value = (event.target as HTMLInputElement).value;
    this.textEditor.set({ ...draft, value });
  }

  confirmText(): void {
    const draft = this.textEditor();
    this.textEditor.set(null);
    if (!draft || !draft.value.trim()) {
      return;
    }
    this.commit({
      id: nextAnnotationId(),
      tool: 'text',
      page: 1,
      points: [{ x: draft.x, y: draft.y }],
      text: draft.value.trim(),
      color: this.activeColor(),
    });
  }

  cancelText(): void {
    this.textEditor.set(null);
  }

  removeAnnotation(id: string): void {
    this.annotationsSignal.update((list) => list.filter((a) => a.id !== id));
    this.annotationsChange.emit(this.annotationsSignal());
  }

  clearAll(): void {
    this.annotationsSignal.set([]);
    this.annotationsChange.emit([]);
  }

  toSvgPoints(points: NxAnnotationPoint[]): string {
    return points.map((p) => `${clamp01(p.x) * 100},${clamp01(p.y) * 100}`).join(' ');
  }

  rectX(points: NxAnnotationPoint[]): number {
    return Math.min(points[0].x, points[1].x) * 100;
  }

  rectY(points: NxAnnotationPoint[]): number {
    return Math.min(points[0].y, points[1].y) * 100;
  }

  rectW(points: NxAnnotationPoint[]): number {
    return Math.abs(points[1].x - points[0].x) * 100;
  }

  rectH(points: NxAnnotationPoint[]): number {
    return Math.abs(points[1].y - points[0].y) * 100;
  }

  /** Downloads the current `annotations` array as a JSON file (Blob download, same technique as `NxSpreadsheet.exportCSV`). */
  exportAnnotations(): void {
    const json = JSON.stringify(this.annotationsSignal(), null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${this.safeFileBase()}-annotations.json`;
    link.click();
    URL.revokeObjectURL(url);
  }

  /** See the class doc comment: this rasterizes ONLY the annotation marks (transparent background), not the PDF page itself. */
  exportOverlayImage(): void {
    const rect = this.stageRef?.nativeElement.getBoundingClientRect();
    const w = Math.max(1, Math.round(rect?.width || 800));
    const h = Math.max(1, Math.round(rect?.height || 600));
    const canvas = document.createElement('canvas');
    canvas.width = w;
    canvas.height = h;
    const ctx = canvas.getContext('2d');
    if (!ctx) {
      return;
    }
    for (const annotation of this.annotationsSignal()) {
      this.drawAnnotationToCanvas(ctx, annotation, w, h);
    }
    canvas.toBlob((blob) => {
      if (!blob) {
        return;
      }
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${this.safeFileBase()}-overlay.png`;
      link.click();
      URL.revokeObjectURL(url);
    }, 'image/png');
  }

  private drawAnnotationToCanvas(ctx: CanvasRenderingContext2D, annotation: NxPdfAnnotation, w: number, h: number): void {
    const points = (annotation.points ?? []).map((p) => ({ x: p.x * w, y: p.y * h }));
    ctx.save();
    ctx.strokeStyle = annotation.color;
    ctx.fillStyle = annotation.color;
    if (annotation.tool === 'draw' && points.length > 0) {
      ctx.lineWidth = 3;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      ctx.beginPath();
      ctx.moveTo(points[0].x, points[0].y);
      for (let i = 1; i < points.length; i++) {
        ctx.lineTo(points[i].x, points[i].y);
      }
      ctx.stroke();
    } else if ((annotation.tool === 'highlight' || annotation.tool === 'rectangle') && points.length >= 2) {
      const x = Math.min(points[0].x, points[1].x);
      const y = Math.min(points[0].y, points[1].y);
      const rw = Math.abs(points[1].x - points[0].x);
      const rh = Math.abs(points[1].y - points[0].y);
      if (annotation.tool === 'highlight') {
        ctx.globalAlpha = 0.35;
        ctx.fillRect(x, y, rw, rh);
      } else {
        ctx.lineWidth = 2;
        ctx.strokeRect(x, y, rw, rh);
      }
    } else if (annotation.tool === 'text' && points.length > 0 && annotation.text) {
      ctx.font = '16px sans-serif';
      ctx.textBaseline = 'top';
      ctx.fillText(annotation.text, points[0].x, points[0].y);
    }
    ctx.restore();
  }

  private commit(annotation: NxPdfAnnotation): void {
    this.annotationsSignal.update((list) => [...list, annotation]);
    this.annotationsChange.emit(this.annotationsSignal());
  }

  private safeFileBase(): string {
    return (this.title || 'document').replace(/\.[^.]+$/, '').replace(/[^a-z0-9-_]+/gi, '-') || 'document';
  }

  private toNormalizedPoint(event: PointerEvent): NxAnnotationPoint {
    const rect = this.stageRef?.nativeElement.getBoundingClientRect();
    if (!rect || rect.width === 0 || rect.height === 0) {
      return { x: 0, y: 0 };
    }
    return {
      x: clamp01((event.clientX - rect.left) / rect.width),
      y: clamp01((event.clientY - rect.top) / rect.height),
    };
  }
}
