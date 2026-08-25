import { Directive, EventEmitter, HostListener, Input, Output } from '@angular/core';

/** Emits after the pointer is held down on the host for nxLongPressDuration ms - cancelled by release or leave. */
@Directive({
  selector: '[nxLongPress]',
  standalone: true,
})
export class NxLongPress {
  @Input() nxLongPressDuration = 600;
  @Output() nxLongPress = new EventEmitter<void>();

  private timer: ReturnType<typeof setTimeout> | null = null;

  @HostListener('pointerdown')
  onPointerDown(): void {
    this.timer = setTimeout(() => this.nxLongPress.emit(), this.nxLongPressDuration);
  }

  @HostListener('pointerup')
  @HostListener('pointerleave')
  @HostListener('pointercancel')
  onPointerEnd(): void {
    if (this.timer) {
      clearTimeout(this.timer);
      this.timer = null;
    }
  }
}
