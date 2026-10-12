import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnDestroy,
  Renderer2,
  ViewChild,
  booleanAttribute,
  numberAttribute,
  signal,
} from '@angular/core';
import { NxProLocked } from '../../licensing/ui-pro-locked/ui-pro-locked';
import { nxProLicenseGranted } from '../../licensing/nx-license';

export type NxMarqueeDirection = 'left' | 'right' | 'up' | 'down';

/**
 * A continuously, smoothly scrolling content strip - a stock ticker or logo wall.
 * Projects arbitrary content via `<ng-content>`, duplicates it once internally so the
 * CSS keyframe loop never shows a visible seam, and sizes the animation duration from
 * the content's measured width/height (via `ResizeObserver`) so `speed` stays a true
 * px/sec rate no matter how much content is projected.
 */
@Component({
  selector: 'nx-marquee',
  standalone: true,
  imports: [NxProLocked],
  templateUrl: './ui-marquee.html',
  styleUrl: './ui-marquee.scss',
})
export class NxMarquee implements AfterViewInit, OnDestroy {
  protected readonly licensed = nxProLicenseGranted();

  /** Scroll speed in pixels per second. */
  @Input({ transform: numberAttribute }) speed = 60;
  @Input() direction: NxMarqueeDirection = 'left';
  @Input({ transform: booleanAttribute }) pauseOnHover = true;
  /** Gap, in px, between the end of one content copy and the start of the next. */
  @Input({ transform: numberAttribute }) gap = 24;

  // Not `static: true` - both now sit behind an `@if (licensed())` block, so they aren't
  // guaranteed present on the very first change-detection pass.
  @ViewChild('track') private readonly trackRef?: ElementRef<HTMLDivElement>;
  @ViewChild('segment') private readonly segmentRef?: ElementRef<HTMLDivElement>;

  /** Computed animation duration, in seconds, so the loop advances at a steady `speed` px/sec. */
  protected readonly durationSeconds = signal(20);

  private resizeObserver?: { observe(target: Element): void; disconnect(): void };
  private segmentCloned = false;

  get isVertical(): boolean {
    return this.direction === 'up' || this.direction === 'down';
  }

  get isReversed(): boolean {
    return this.direction === 'right' || this.direction === 'down';
  }

  get gapPx(): string {
    return `${this.gap}px`;
  }

  constructor(private readonly renderer: Renderer2) {}

  ngAfterViewInit(): void {
    if (!this.licensed() || !this.segmentRef || !this.trackRef) {
      return;
    }

    this.cloneSegment();
    this.measure();

    if (typeof window === 'undefined') {
      return;
    }

    // Cast to `any`: this lib's tsconfig doesn't always carry `ResizeObserver` typings,
    // even though it's broadly supported at runtime (same pattern as ui-html-preview).
    const ResizeObserverCtor = (window as any).ResizeObserver;
    if (ResizeObserverCtor) {
      const observer = new ResizeObserverCtor(() => this.measure());
      observer.observe(this.segmentRef.nativeElement);
      this.resizeObserver = observer;
    }
  }

  ngOnDestroy(): void {
    this.resizeObserver?.disconnect();
  }

  /**
   * Clones the single projected content segment once, appending an `aria-hidden` twin
   * right after it. The track then animates a translate equal to exactly one segment's
   * size (+ gap) - when that copy slides into the original's old position, the loop
   * restarts invisibly because the two segments are pixel-identical.
   */
  private cloneSegment(): void {
    if (this.segmentCloned || !this.segmentRef || !this.trackRef) {
      return;
    }
    const original = this.segmentRef.nativeElement;
    const clone = original.cloneNode(true) as HTMLElement;
    clone.setAttribute('aria-hidden', 'true');
    clone.removeAttribute('id');
    this.renderer.appendChild(this.trackRef.nativeElement, clone);
    this.segmentCloned = true;
  }

  private measure(): void {
    if (!this.segmentRef || !this.trackRef) {
      return;
    }

    const segment = this.segmentRef.nativeElement;
    const size = this.isVertical ? segment.offsetHeight : segment.offsetWidth;
    const distance = size + this.gap;

    if (size <= 0 || this.speed <= 0) {
      return;
    }

    this.renderer.setStyle(this.trackRef.nativeElement, '--nx-marquee-distance', `${distance}px`);
    this.durationSeconds.set(distance / this.speed);
  }
}
