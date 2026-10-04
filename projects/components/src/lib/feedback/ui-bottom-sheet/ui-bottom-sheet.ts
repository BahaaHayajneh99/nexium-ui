import { Component, EventEmitter, Input, Output, booleanAttribute } from '@angular/core';

/**
 * A panel that slides up from the bottom of its container (the mobile-app "bottom sheet"
 * pattern), with a draggable grab-handle bar at its top that supports drag-to-dismiss.
 * Unlike `nx-drawer`'s `side="bottom"` configuration, this is purpose-built for the sheet
 * interaction - handle bar, pointer-driven drag, and a snap-back-or-close release gesture.
 */
@Component({
  selector: 'nx-bottom-sheet',
  standalone: true,
  imports: [],
  templateUrl: './ui-bottom-sheet.html',
  styleUrl: './ui-bottom-sheet.scss',
})
export class NxBottomSheet {
  @Input({ transform: booleanAttribute }) open = false;
  @Input() maxHeight = '70vh';
  @Input({ transform: booleanAttribute }) closeOnBackdrop = true;

  @Output() openChange = new EventEmitter<boolean>();
  @Output() closed = new EventEmitter<void>();

  /** Live translateY (in px) applied while the handle is being dragged. */
  dragOffset = 0;
  dragging = false;

  private startY = 0;
  private panelHeight = 0;
  private pointerId: number | null = null;

  onBackdropClick(): void {
    if (this.closeOnBackdrop) {
      this.close();
    }
  }

  onHandlePointerDown(event: PointerEvent): void {
    const handle = event.currentTarget as HTMLElement;
    const panel = handle.closest('.nx-bottom-sheet-panel') as HTMLElement | null;

    this.dragging = true;
    this.startY = event.clientY;
    this.panelHeight = panel?.offsetHeight ?? 0;
    this.pointerId = event.pointerId;
    handle.setPointerCapture(event.pointerId);
  }

  onHandlePointerMove(event: PointerEvent): void {
    if (!this.dragging) {
      return;
    }
    // Only drag downward - the sheet is already fully open, it can't go further up.
    this.dragOffset = Math.max(0, event.clientY - this.startY);
  }

  onHandlePointerUp(event: PointerEvent): void {
    if (!this.dragging) {
      return;
    }

    const threshold = this.panelHeight > 0 ? this.panelHeight * 0.3 : 100;
    const shouldClose = this.dragOffset > threshold;

    this.dragging = false;
    this.dragOffset = 0;

    if (this.pointerId !== null) {
      (event.currentTarget as HTMLElement).releasePointerCapture(this.pointerId);
      this.pointerId = null;
    }

    if (shouldClose) {
      this.close();
    }
    // Otherwise `dragging` is now false, so the panel's CSS transition takes over and
    // animates `transform` back from the dragged offset to `translateY(0)` on its own.
  }

  close(): void {
    this.open = false;
    this.dragOffset = 0;
    this.openChange.emit(false);
    this.closed.emit();
  }
}
