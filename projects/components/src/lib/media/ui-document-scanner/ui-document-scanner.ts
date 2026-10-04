import { AfterViewInit, Component, ElementRef, EventEmitter, OnDestroy, Output, ViewChild, computed, signal } from '@angular/core';
import { NxIcon } from '../../data-display/ui-icon';
import { NxProLocked } from '../../licensing/ui-pro-locked/ui-pro-locked';
import { nxProLicenseGranted } from '../../licensing/nx-license';

interface NxScanCorner {
  /** Fraction (0-1) of the displayed still image's width/height - independent of its on-screen display size. */
  x: number;
  y: number;
}

type NxScanStep = 'capture' | 'crop' | 'enhance' | 'result';

const MAX_DISPLAY_WIDTH = 420;
const DEFAULT_CORNERS: NxScanCorner[] = [
  { x: 0.06, y: 0.06 },
  { x: 0.94, y: 0.06 },
  { x: 0.94, y: 0.94 },
  { x: 0.06, y: 0.94 },
];

function clamp01(value: number): number {
  return Math.max(0, Math.min(1, value));
}

function clampByte(value: number): number {
  return Math.max(0, Math.min(255, value));
}

/**
 * A camera-based "scan a physical document" flow: capture a still (live camera or file-upload
 * fallback) -> adjust 4 corner handles to frame the document -> crop -> apply a grayscale/contrast
 * "scanned look" -> emit the final PNG via `(scanned)`.
 *
 * Perspective-crop honesty note: step 2 lets the user drag 4 independent corner handles over the
 * photo, which is the right interaction for a document that was photographed at an angle. However,
 * what `confirmCrop()` actually applies is the **axis-aligned bounding-box crop** of those 4 points
 * (min/max x and y), not a true quad-to-rectangle perspective warp/de-skew. A real homography
 * (per-output-pixel inverse mapping through a 3x3 projective matrix) would straighten a
 * trapezoidal photo into a rectangle; this component does not implement that math - it only trims
 * the photo down to the smallest axis-aligned rectangle containing the 4 adjusted corners. This is
 * still useful for cropping out background, but a document photographed at a strong angle will
 * still look skewed in the output. The UI makes this explicit by drawing both the draggable quad
 * and a dashed preview of the bounding box that will actually be used.
 */
@Component({
  selector: 'nx-document-scanner',
  standalone: true,
  imports: [NxIcon, NxProLocked],
  templateUrl: './ui-document-scanner.html',
  styleUrl: './ui-document-scanner.scss',
})
export class NxDocumentScanner implements AfterViewInit, OnDestroy {
  protected readonly licensed = nxProLicenseGranted();

  @ViewChild('videoEl') private videoRef?: ElementRef<HTMLVideoElement>;
  @ViewChild('stillImgEl') private stillImgRef?: ElementRef<HTMLImageElement>;

  @Output() scanned = new EventEmitter<string>();

  readonly step = signal<NxScanStep>('capture');
  readonly cameraActive = signal(false);
  readonly cameraError = signal<string | null>(null);

  private stream: MediaStream | null = null;

  readonly capturedImage = signal<string | null>(null);
  private readonly naturalSize = signal({ w: 0, h: 0 });
  private readonly baseScale = signal(1);
  readonly displaySize = computed(() => {
    const n = this.naturalSize();
    const scale = this.baseScale();
    return { w: Math.round(n.w * scale), h: Math.round(n.h * scale) };
  });

  readonly corners = signal<NxScanCorner[]>([...DEFAULT_CORNERS]);
  private draggingCorner: number | null = null;

  readonly quadPoints = computed(() => this.corners().map((c) => `${c.x * 100},${c.y * 100}`).join(' '));
  readonly bbox = computed(() => {
    const pts = this.corners();
    const minX = Math.min(...pts.map((p) => p.x));
    const maxX = Math.max(...pts.map((p) => p.x));
    const minY = Math.min(...pts.map((p) => p.y));
    const maxY = Math.max(...pts.map((p) => p.y));
    return { x: minX * 100, y: minY * 100, w: (maxX - minX) * 100, h: (maxY - minY) * 100 };
  });

  readonly croppedImage = signal<string | null>(null);
  readonly grayscale = signal(true);
  readonly contrastAmount = signal(40);
  readonly enhancedImage = signal<string | null>(null);
  readonly finalImage = signal<string | null>(null);

  ngAfterViewInit(): void {
    // Camera is started on explicit user action (startCamera()), not automatically, so the
    // permission prompt never fires just from rendering the component.
  }

  ngOnDestroy(): void {
    this.stopCamera();
  }

  async startCamera(): Promise<void> {
    this.cameraError.set(null);
    if (!navigator.mediaDevices?.getUserMedia) {
      this.cameraError.set('Camera access is not supported in this browser. Use the file upload option below instead.');
      return;
    }
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
      this.stream = stream;
      this.cameraActive.set(true);
      queueMicrotask(() => {
        const video = this.videoRef?.nativeElement;
        if (video) {
          video.srcObject = stream;
          video.play().catch(() => {
            // Autoplay can be blocked in some browsers until a user gesture - the Capture button
            // click itself counts as one, so this is a soft failure.
          });
        }
      });
    } catch {
      this.cameraError.set('Camera access was denied or no camera is available. Use the file upload option below instead.');
      this.cameraActive.set(false);
    }
  }

  stopCamera(): void {
    this.stream?.getTracks().forEach((track) => track.stop());
    this.stream = null;
    this.cameraActive.set(false);
  }

  capturePhoto(): void {
    const video = this.videoRef?.nativeElement;
    if (!video || !video.videoWidth) {
      return;
    }
    const canvas = document.createElement('canvas');
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext('2d');
    if (!ctx) {
      return;
    }
    ctx.drawImage(video, 0, 0);
    this.useStill(canvas.toDataURL('image/png'), video.videoWidth, video.videoHeight);
    this.stopCamera();
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    input.value = '';
    if (!file) {
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      const dataUrl = reader.result as string;
      const img = new Image();
      img.onload = () => this.useStill(dataUrl, img.naturalWidth, img.naturalHeight);
      img.src = dataUrl;
    };
    reader.readAsDataURL(file);
  }

  private useStill(dataUrl: string, w: number, h: number): void {
    this.capturedImage.set(dataUrl);
    this.naturalSize.set({ w, h });
    this.baseScale.set(w > 0 ? Math.min(1, MAX_DISPLAY_WIDTH / w) : 1);
    this.corners.set([...DEFAULT_CORNERS]);
    this.step.set('crop');
  }

  onCornerPointerDown(event: PointerEvent, index: number): void {
    event.preventDefault();
    event.stopPropagation();
    (event.target as Element).setPointerCapture?.(event.pointerId);
    this.draggingCorner = index;
  }

  onCropPointerMove(event: PointerEvent): void {
    if (this.draggingCorner === null) {
      return;
    }
    const wrap = this.stillImgRef?.nativeElement.parentElement;
    if (!wrap) {
      return;
    }
    const rect = wrap.getBoundingClientRect();
    if (rect.width === 0 || rect.height === 0) {
      return;
    }
    const x = clamp01((event.clientX - rect.left) / rect.width);
    const y = clamp01((event.clientY - rect.top) / rect.height);
    const index = this.draggingCorner;
    this.corners.update((list) => list.map((c, i) => (i === index ? { x, y } : c)));
  }

  onCropPointerUp(): void {
    this.draggingCorner = null;
  }

  resetCorners(): void {
    this.corners.set([...DEFAULT_CORNERS]);
  }

  confirmCrop(): void {
    const img = this.stillImgRef?.nativeElement;
    if (!img || !img.naturalWidth) {
      return;
    }
    const box = this.bbox();
    const nw = img.naturalWidth;
    const nh = img.naturalHeight;
    const sx = Math.round((box.x / 100) * nw);
    const sy = Math.round((box.y / 100) * nh);
    const sw = Math.max(1, Math.round((box.w / 100) * nw));
    const sh = Math.max(1, Math.round((box.h / 100) * nh));

    const canvas = document.createElement('canvas');
    canvas.width = sw;
    canvas.height = sh;
    const ctx = canvas.getContext('2d');
    if (!ctx) {
      return;
    }
    ctx.drawImage(img, sx, sy, sw, sh, 0, 0, sw, sh);
    this.croppedImage.set(canvas.toDataURL('image/png'));
    this.step.set('enhance');
    this.applyEnhancement();
  }

  backToCapture(): void {
    this.capturedImage.set(null);
    this.croppedImage.set(null);
    this.step.set('capture');
  }

  backToCrop(): void {
    this.step.set('crop');
  }

  setGrayscale(value: boolean): void {
    this.grayscale.set(value);
    this.applyEnhancement();
  }

  setContrast(value: number): void {
    this.contrastAmount.set(value);
    this.applyEnhancement();
  }

  /**
   * Applies the "scanned look" filter via direct `ImageData` pixel manipulation (not the CSS
   * `filter` shorthand): an optional grayscale conversion (luminance-weighted) followed by a
   * contrast boost around the mid-point (128), both precise/reproducible numeric transforms.
   */
  private applyEnhancement(): void {
    const src = this.croppedImage();
    if (!src) {
      return;
    }
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;
      const ctx = canvas.getContext('2d');
      if (!ctx) {
        return;
      }
      ctx.drawImage(img, 0, 0);
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imageData.data;
      const contrast = this.contrastAmount();
      const factor = (259 * (contrast + 255)) / (255 * (259 - contrast));
      const gray = this.grayscale();
      for (let i = 0; i < data.length; i += 4) {
        let r = data[i];
        let g = data[i + 1];
        let b = data[i + 2];
        if (gray) {
          const l = 0.299 * r + 0.587 * g + 0.114 * b;
          r = l;
          g = l;
          b = l;
        }
        data[i] = clampByte(factor * (r - 128) + 128);
        data[i + 1] = clampByte(factor * (g - 128) + 128);
        data[i + 2] = clampByte(factor * (b - 128) + 128);
      }
      ctx.putImageData(imageData, 0, 0);
      this.enhancedImage.set(canvas.toDataURL('image/png'));
    };
    img.src = src;
  }

  useThisScan(): void {
    const result = this.enhancedImage() ?? this.croppedImage();
    if (!result) {
      return;
    }
    this.finalImage.set(result);
    this.step.set('result');
    this.scanned.emit(result);
  }

  scanAnother(): void {
    this.stopCamera();
    this.capturedImage.set(null);
    this.croppedImage.set(null);
    this.enhancedImage.set(null);
    this.finalImage.set(null);
    this.cameraError.set(null);
    this.corners.set([...DEFAULT_CORNERS]);
    this.step.set('capture');
  }
}
