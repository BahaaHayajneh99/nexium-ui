import { Directive, ElementRef, HostListener, Input, OnChanges, OnDestroy, booleanAttribute, inject } from '@angular/core';

const FOCUSABLE_SELECTOR =
  'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

/**
 * Traps Tab/Shift+Tab cycling within the host element's focusable descendants
 * while nxFocusTrap is true - Tab from the last focusable element (or
 * Shift+Tab from the first) wraps around instead of leaving the trapped
 * region. Remembers whatever was focused before trapping started and
 * restores focus to it once the trap deactivates.
 */
@Directive({
  selector: '[nxFocusTrap]',
  standalone: true,
})
export class NxFocusTrap implements OnChanges, OnDestroy {
  @Input({ transform: booleanAttribute }) nxFocusTrap = false;

  private elementRef: ElementRef<HTMLElement> = inject(ElementRef);
  private previouslyFocused: HTMLElement | null = null;

  ngOnChanges(): void {
    if (this.nxFocusTrap) {
      this.previouslyFocused = document.activeElement as HTMLElement | null;
      this.focusFirst();
    } else {
      this.restoreFocus();
    }
  }

  ngOnDestroy(): void {
    if (this.nxFocusTrap) {
      this.restoreFocus();
    }
  }

  // Angular types a key-filtered host listener's $event (e.g. 'keydown.tab') as plain `Event`,
  // not `KeyboardEvent`, since the filtering happens in Angular's event-plugin layer rather than
  // via the DOM event name itself - `Event` is all we need here anyway (just `preventDefault()`).
  @HostListener('keydown.tab', ['$event'])
  onTab(event: Event): void {
    this.handleTab(event, false);
  }

  @HostListener('keydown.shift.tab', ['$event'])
  onShiftTab(event: Event): void {
    this.handleTab(event, true);
  }

  private handleTab(event: Event, backwards: boolean): void {
    if (!this.nxFocusTrap) {
      return;
    }

    const focusable = this.getFocusable();
    if (focusable.length === 0) {
      return;
    }

    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    const active = document.activeElement;

    if (backwards && active === first) {
      event.preventDefault();
      last.focus();
    } else if (!backwards && active === last) {
      event.preventDefault();
      first.focus();
    }
  }

  private focusFirst(): void {
    this.getFocusable()[0]?.focus();
  }

  private restoreFocus(): void {
    this.previouslyFocused?.focus();
    this.previouslyFocused = null;
  }

  private getFocusable(): HTMLElement[] {
    return Array.from(this.elementRef.nativeElement.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR));
  }
}
