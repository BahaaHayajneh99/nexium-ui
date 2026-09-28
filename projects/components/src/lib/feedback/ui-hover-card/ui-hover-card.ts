import { Component, Input, numberAttribute, signal } from '@angular/core';

export type NxHoverCardPlacement = 'top' | 'bottom' | 'left' | 'right';

/**
 * Shows rich content in a floating card when the trigger is hovered (or
 * focused, for keyboard users) - like a tooltip, but for content richer
 * than a line of text (a user preview, a link summary, ...). Moving the
 * pointer from the trigger into the card itself keeps it open.
 */
@Component({
  selector: 'nx-hover-card',
  standalone: true,
  imports: [],
  templateUrl: './ui-hover-card.html',
  styleUrl: './ui-hover-card.scss',
})
export class NxHoverCard {
  @Input() placement: NxHoverCardPlacement = 'bottom';
  @Input({ transform: numberAttribute }) openDelay = 400;
  @Input({ transform: numberAttribute }) closeDelay = 200;

  // A signal (rather than a plain property) because the open/close toggle
  // happens inside a setTimeout - outside any Angular-dispatched event, so
  // in a zoneless app nothing else would tell the view to re-render.
  open = signal(false);

  private closeTimer: ReturnType<typeof setTimeout> | null = null;
  private openTimer: ReturnType<typeof setTimeout> | null = null;

  scheduleOpen(): void {
    this.clearTimers();
    this.openTimer = setTimeout(() => this.open.set(true), this.openDelay);
  }

  scheduleClose(): void {
    this.clearTimers();
    this.closeTimer = setTimeout(() => this.open.set(false), this.closeDelay);
  }

  private clearTimers(): void {
    if (this.openTimer) {
      clearTimeout(this.openTimer);
      this.openTimer = null;
    }
    if (this.closeTimer) {
      clearTimeout(this.closeTimer);
      this.closeTimer = null;
    }
  }
}
