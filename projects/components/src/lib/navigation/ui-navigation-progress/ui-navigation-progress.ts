import { Component, OnDestroy, signal } from '@angular/core';

/**
 * A slim top-of-page loading bar, driven imperatively - call `start()` when a
 * route change begins, `complete()` when it finishes. Progress trickles
 * toward 90% while running so it never looks stuck, without predicting when
 * the underlying navigation will actually resolve.
 */
@Component({
  selector: 'nx-navigation-progress',
  standalone: true,
  imports: [],
  template: `
    @if (visible()) {
      <div class="nx-navigation-progress" [style.width.%]="progress()"></div>
    }
  `,
  styles: `
    .nx-navigation-progress {
      position: fixed;
      top: 0;
      left: 0;
      z-index: 9999;
      height: 3px;
      background-color: var(--shell-primary, #3b82f6);
      transition: width .2s ease;
    }
  `,
})
export class NxNavigationProgress implements OnDestroy {
  visible = signal(false);
  progress = signal(0);

  private trickleTimer?: ReturnType<typeof setTimeout>;
  private hideTimer?: ReturnType<typeof setTimeout>;

  ngOnDestroy(): void {
    this.clearTimers();
  }

  start(): void {
    this.clearTimers();
    this.visible.set(true);
    this.progress.set(0);
    this.trickle();
  }

  set(percent: number): void {
    this.progress.set(Math.min(100, Math.max(0, percent)));
  }

  complete(): void {
    this.clearTimers();
    this.progress.set(100);
    this.hideTimer = setTimeout(() => {
      this.visible.set(false);
      this.progress.set(0);
    }, 250);
  }

  private trickle(): void {
    this.trickleTimer = setTimeout(() => {
      this.progress.update((value) => value + (90 - value) * 0.15);
      this.trickle();
    }, 250);
  }

  private clearTimers(): void {
    clearTimeout(this.trickleTimer);
    clearTimeout(this.hideTimer);
  }
}
