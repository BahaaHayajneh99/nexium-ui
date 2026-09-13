import { Component, HostListener, Input, booleanAttribute, numberAttribute } from '@angular/core';

export type NxBackToTopPosition = 'bottom-right' | 'bottom-left';

@Component({
  selector: 'nx-back-to-top',
  standalone: true,
  imports: [],
  templateUrl: './ui-back-to-top.html',
  styleUrl: './ui-back-to-top.scss',
})
export class NxBackToTop {
  /** How far the page must scroll (in px) before the button appears. */
  @Input({ transform: numberAttribute }) threshold = 300;
  @Input() label = 'Back to top';
  @Input({ transform: booleanAttribute }) smooth = true;
  @Input() position: NxBackToTopPosition = 'bottom-right';
  /** Only show the button while the user is scrolling up - hides it again while scrolling down, even past the threshold. */
  @Input({ transform: booleanAttribute }) showOnScrollUpOnly = false;

  visible = false;

  private lastScrollY = 0;

  @HostListener('window:scroll')
  onWindowScroll(): void {
    const scrollY = window.scrollY || document.documentElement.scrollTop;
    const scrollingUp = scrollY < this.lastScrollY;
    this.lastScrollY = scrollY;

    if (scrollY <= this.threshold) {
      this.visible = false;
      return;
    }

    this.visible = this.showOnScrollUpOnly ? scrollingUp : true;
  }

  scrollToTop(): void {
    window.scrollTo({ top: 0, behavior: this.smooth ? 'smooth' : 'auto' });
  }
}
