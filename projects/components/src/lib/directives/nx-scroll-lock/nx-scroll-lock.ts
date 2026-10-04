import { Directive, Input, OnChanges, OnDestroy, booleanAttribute } from '@angular/core';

/**
 * Locks the page's own scrolling for as long as nxScrollLock is true - handy
 * for modals/drawers that shouldn't let the body scroll behind them. The
 * original `overflow` value is captured once, the first time the lock
 * activates, and restored (rather than just cleared) once it deactivates, so
 * repeated toggling can't lose track of whatever the page had before.
 */
@Directive({
  selector: '[nxScrollLock]',
  standalone: true,
})
export class NxScrollLock implements OnChanges, OnDestroy {
  @Input({ transform: booleanAttribute }) nxScrollLock = false;

  private originalOverflow: string | null = null;
  private locked = false;

  ngOnChanges(): void {
    if (this.nxScrollLock && !this.locked) {
      this.lock();
    } else if (!this.nxScrollLock && this.locked) {
      this.unlock();
    }
  }

  ngOnDestroy(): void {
    if (this.locked) {
      this.unlock();
    }
  }

  private lock(): void {
    this.originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    this.locked = true;
  }

  private unlock(): void {
    document.body.style.overflow = this.originalOverflow ?? '';
    this.locked = false;
  }
}
