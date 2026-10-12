import {
  Directive,
  ElementRef,
  Input,
  OnDestroy,
  OnInit,
  Renderer2,
  booleanAttribute,
  inject,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { NxInView } from '../nx-in-view/nx-in-view';
import { nxProLicenseGranted } from '../../licensing/nx-license';

export type NxRevealAnimation = 'fade' | 'slide-up' | 'slide-down' | 'slide-left' | 'slide-right' | 'zoom';

/**
 * Applies a scroll-triggered reveal animation (fade-in + slight translate by default) to the
 * host element the first time it enters the viewport - or every time, if `nxRevealOnce` is
 * turned off. Viewport-visibility detection is delegated to `NxInView` (added as a host
 * directive) rather than reimplementing IntersectionObserver logic here; this directive only
 * owns the "hidden -> visible" CSS transition, applied as inline styles so it works on any
 * element regardless of its own stylesheet.
 */
@Directive({
  selector: '[nxReveal]',
  standalone: true,
  hostDirectives: [NxInView],
})
export class NxReveal implements OnInit, OnDestroy {
  /**
   * PRO feature. Directives have no template to show a "locked" placeholder in, so without a
   * license this directive is simply inert: the host renders normally, with no hidden/transition
   * state ever applied, rather than getting stuck invisible.
   */
  protected readonly licensed = nxProLicenseGranted();

  @Input() nxRevealAnimation: NxRevealAnimation = 'fade';
  /** Delay, in ms, before the reveal transition starts once the host enters the viewport. */
  @Input() nxRevealDelay = 0;
  /** Duration, in ms, of the reveal transition. */
  @Input() nxRevealDuration = 500;
  /** Only animate the first time the host enters the viewport, rather than every time. */
  @Input({ transform: booleanAttribute }) nxRevealOnce = true;

  private readonly elementRef = inject(ElementRef<HTMLElement>);
  private readonly renderer = inject(Renderer2);
  private readonly inView = inject(NxInView);
  private subscription?: Subscription;

  ngOnInit(): void {
    if (!this.licensed()) {
      return;
    }

    // NxInView defaults `nxInViewOnce` to false; nxReveal wants the opposite default (true), so
    // forward our own input into the host directive's instance before it starts observing.
    this.inView.nxInViewOnce = this.nxRevealOnce;

    const el = this.elementRef.nativeElement;
    this.renderer.setStyle(el, 'transition-property', 'opacity, transform');
    this.renderer.setStyle(el, 'transition-duration', `${this.nxRevealDuration}ms`);
    this.renderer.setStyle(el, 'transition-delay', `${this.nxRevealDelay}ms`);
    this.renderer.setStyle(el, 'transition-timing-function', 'cubic-bezier(0.2, 0.8, 0.2, 1)');
    this.applyHiddenState();

    this.subscription = this.inView.nxInViewChange.subscribe((visible) => {
      if (visible) {
        this.applyVisibleState();
      } else if (!this.nxRevealOnce) {
        this.applyHiddenState();
      }
    });
  }

  private applyHiddenState(): void {
    const el = this.elementRef.nativeElement;
    this.renderer.setStyle(el, 'opacity', '0');
    this.renderer.setStyle(el, 'transform', this.hiddenTransform());
  }

  private applyVisibleState(): void {
    const el = this.elementRef.nativeElement;
    this.renderer.setStyle(el, 'opacity', '1');
    this.renderer.setStyle(el, 'transform', 'none');
  }

  private hiddenTransform(): string {
    switch (this.nxRevealAnimation) {
      case 'slide-up':
        return 'translateY(24px)';
      case 'slide-down':
        return 'translateY(-24px)';
      case 'slide-left':
        return 'translateX(24px)';
      case 'slide-right':
        return 'translateX(-24px)';
      case 'zoom':
        return 'scale(0.92)';
      case 'fade':
      default:
        return 'none';
    }
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
