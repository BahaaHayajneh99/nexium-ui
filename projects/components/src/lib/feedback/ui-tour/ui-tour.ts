import {
  ChangeDetectorRef,
  Component,
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

export interface NxTourStep {
  /** CSS selector for the element this step highlights. */
  target: string;
  title: string;
  description?: string;
}

interface NxTourRect {
  top: number;
  left: number;
  width: number;
  height: number;
}

/**
 * A guided, multi-step walkthrough: each `step` highlights one element on
 * the page (by CSS selector) with a callout and Back/Next/Skip controls,
 * advancing through `steps` in order. Same highlight mechanism as
 * `nx-spotlight` for a single element - this is the sequenced version for
 * onboarding a whole flow.
 */
@Component({
  selector: 'nx-tour',
  standalone: true,
  imports: [],
  templateUrl: './ui-tour.html',
  styleUrl: './ui-tour.scss',
})
export class NxTour implements OnChanges, OnDestroy {
  @Input({ transform: booleanAttribute }) open = false;
  @Input() steps: NxTourStep[] = [];
  @Input({ transform: numberAttribute }) padding = 8;
  @Input({ transform: numberAttribute }) radius = 8;

  @Output() openChange = new EventEmitter<boolean>();
  @Output() stepChange = new EventEmitter<number>();
  @Output() finished = new EventEmitter<void>();

  currentIndex = 0;
  rect: NxTourRect | null = null;

  /** Rough allowance for the callout's own height, since it hasn't rendered yet when this decides which side to sit on. */
  private static readonly ESTIMATED_CALLOUT_HEIGHT = 200;
  private static readonly CALLOUT_WIDTH = 300;

  private readonly boundUpdateRect = () => this.updateRect();

  constructor(private cdr: ChangeDetectorRef) {}

  /** Whether the callout sits below the target - flips above when there isn't room below the viewport. */
  get calloutBelow(): boolean {
    if (!this.rect) {
      return true;
    }
    return this.rect.top + this.rect.height + 12 + NxTour.ESTIMATED_CALLOUT_HEIGHT <= window.innerHeight;
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
    const maxLeft = window.innerWidth - NxTour.CALLOUT_WIDTH - 16;
    return Math.min(Math.max(this.rect.left, 16), Math.max(maxLeft, 16));
  }

  get currentStep(): NxTourStep | null {
    return this.steps[this.currentIndex] ?? null;
  }

  get isLastStep(): boolean {
    return this.currentIndex === this.steps.length - 1;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (!changes['open'] && !changes['steps']) {
      return;
    }

    if (this.open && this.steps.length > 0) {
      this.currentIndex = 0;
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

  next(): void {
    if (this.isLastStep) {
      this.finish();
      return;
    }
    this.goTo(this.currentIndex + 1);
  }

  back(): void {
    this.goTo(this.currentIndex - 1);
  }

  goTo(index: number): void {
    if (index < 0 || index >= this.steps.length) {
      return;
    }
    this.currentIndex = index;
    this.stepChange.emit(this.currentIndex);
    queueMicrotask(() => this.updateRect());
  }

  skip(): void {
    this.finish();
  }

  finish(): void {
    if (!this.open) {
      return;
    }
    this.open = false;
    this.openChange.emit(false);
    this.teardown();
    this.finished.emit();
  }

  @HostListener('document:keydown.escape')
  onEscape(): void {
    if (this.open) {
      this.skip();
    }
  }

  updateRect(): void {
    const step = this.currentStep;
    const element = step ? document.querySelector<HTMLElement>(step.target) : null;
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

    element?.scrollIntoView({ block: 'center', behavior: 'smooth' });
  }

  private teardown(): void {
    window.removeEventListener('resize', this.boundUpdateRect);
    window.removeEventListener('scroll', this.boundUpdateRect, true);
  }
}
