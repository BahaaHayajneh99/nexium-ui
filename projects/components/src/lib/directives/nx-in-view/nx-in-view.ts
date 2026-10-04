import {
  AfterViewInit,
  Directive,
  ElementRef,
  EventEmitter,
  Input,
  NgZone,
  OnDestroy,
  Output,
  booleanAttribute,
  inject,
} from '@angular/core';

/**
 * Emits true/false as the host enters/exits the viewport (or a scrollable
 * ancestor), via a native IntersectionObserver - the basis for scroll-reveal
 * animations, lazy-rendering triggers, or "mark as read on scroll" patterns.
 */
@Directive({
  selector: '[nxInView]',
  standalone: true,
})
export class NxInView implements AfterViewInit, OnDestroy {
  /** Forwarded as the IntersectionObserver's `threshold` - the fraction of the host that must be visible before it counts as "in view". */
  @Input() nxInViewThreshold = 0.1;
  /** Stop observing after the first time the host becomes visible - handy for one-shot scroll-reveal animations. */
  @Input({ transform: booleanAttribute }) nxInViewOnce = false;
  @Output() nxInViewChange = new EventEmitter<boolean>();

  private elementRef = inject(ElementRef<HTMLElement>);
  private ngZone = inject(NgZone);
  private observer: IntersectionObserver | null = null;

  ngAfterViewInit(): void {
    this.observer = new IntersectionObserver(
      (entries) => {
        // IntersectionObserver callbacks aren't patched by zone.js, so re-enter the
        // Angular zone explicitly - otherwise emitting here wouldn't trigger change
        // detection in consumers that just flip a plain boolean field.
        this.ngZone.run(() => {
          for (const entry of entries) {
            this.nxInViewChange.emit(entry.isIntersecting);

            if (entry.isIntersecting && this.nxInViewOnce) {
              this.observer?.disconnect();
            }
          }
        });
      },
      { threshold: this.nxInViewThreshold },
    );

    this.observer.observe(this.elementRef.nativeElement);
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }
}
