import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  OnChanges,
  OnDestroy,
  Output,
  SimpleChanges,
  booleanAttribute,
  numberAttribute,
} from '@angular/core';

export interface NxSpotlightRect {
  top: number;
  left: number;
  width: number;
  height: number;
}

/**
 * Dims the whole page except for a rectangle drawn around one target
 * element, with an optional caption callout next to it - the single-step
 * building block behind onboarding coachmarks. `nx-tour` composes several
 * of these into a guided, multi-step walkthrough.
 *
 * The target stays visually uncovered but isn't clickable while the
 * spotlight is open (the backdrop sits above it to catch outside clicks) -
 * close the spotlight to hand control back to the page.
 */
@Component({
  selector: 'nx-spotlight',
  standalone: true,
  imports: [],
  templateUrl: './ui-spotlight.html',
  styleUrl: './ui-spotlight.scss',
})
export class NxSpotlight implements OnChanges, OnDestroy {
  @Input({ transform: booleanAttribute }) open = false;
  /** The element to highlight - a CSS selector, an ElementRef, or a raw HTMLElement. */
  @Input() target: string | ElementRef<HTMLElement> | HTMLElement | null = null;
  @Input({ transform: numberAttribute }) padding = 8;
  @Input({ transform: numberAttribute }) radius = 8;
  @Input() title = '';
  @Input() description = '';
  @Input({ transform: booleanAttribute }) closeOnBackdropClick = true;

  @Output() openChange = new EventEmitter<boolean>();
  @Output() closed = new EventEmitter<void>();

  rect: NxSpotlightRect | null = null;

  /** Rough allowance for the callout's own height, since it hasn't rendered yet when this decides which side to sit on. */
  private static readonly ESTIMATED_CALLOUT_HEIGHT = 160;
  private static readonly CALLOUT_WIDTH = 280;

  private readonly boundUpdateRect = () => this.updateRect();

  constructor(private cdr: ChangeDetectorRef) {}

  /** Whether the callout sits below the target - flips above when there isn't room below the viewport. */
  get calloutBelow(): boolean {
    if (!this.rect) {
      return true;
    }
    return this.rect.top + this.rect.height + 12 + NxSpotlight.ESTIMATED_CALLOUT_HEIGHT <= window.innerHeight;
  }

  get calloutTop(): number | null {
    return this.rect && this.calloutBelow ? this.rect.top + this.rect.height + 12 : null;
  }

  get calloutBottom(): number | null {
    return this.rect && !this.calloutBelow ? window.innerHeight - this.rect.top + 12 : null;
  }

  get calloutLeft(): number {
    if (!this.rect) {
      return 0;
    }
    const maxLeft = window.innerWidth - NxSpotlight.CALLOUT_WIDTH - 16;
    return Math.min(Math.max(this.rect.left, 16), Math.max(maxLeft, 16));
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (!changes['open'] && !changes['target'] && !changes['padding']) {
      return;
    }

    if (this.open) {
      // Wait a frame so a freshly-rendered target has a real layout box.
      queueMicrotask(() => this.updateRect());
      window.addEventListener('resize', this.boundUpdateRect);
      window.addEventListener('scroll', this.boundUpdateRect, true);
    } else {
      this.teardown();
    }
  }

  ngOnDestroy(): void {
    this.teardown();
  }

  onBackdropClick(): void {
    if (this.closeOnBackdropClick) {
      this.close();
    }
  }

  close(): void {
    if (!this.open) {
      return;
    }
    this.open = false;
    this.openChange.emit(false);
    this.teardown();
    this.closed.emit();
  }

  @HostListener('document:keydown.escape')
  onEscape(): void {
    if (this.open) {
      this.close();
    }
  }

  updateRect(): void {
    const element = this.resolveTarget();
    const box = element?.getBoundingClientRect();
    this.rect = box
      ? {
          top: box.top - this.padding,
          left: box.left - this.padding,
          width: box.width + this.padding * 2,
          height: box.height + this.padding * 2,
        }
      : null;

    // Called from a microtask/resize/scroll listener - outside any
    // Angular-dispatched event, so in a zoneless app this is what actually
    // gets the new rect rendered.
    this.cdr.markForCheck();
  }

  private resolveTarget(): HTMLElement | null {
    if (!this.target) {
      return null;
    }
    if (typeof this.target === 'string') {
      return document.querySelector<HTMLElement>(this.target);
    }
    if (this.target instanceof ElementRef) {
      return this.target.nativeElement;
    }
    return this.target;
  }

  private teardown(): void {
    window.removeEventListener('resize', this.boundUpdateRect);
    window.removeEventListener('scroll', this.boundUpdateRect, true);
  }
}
