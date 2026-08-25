import { Directive, EventEmitter, HostListener, Input, Output } from '@angular/core';

/** Ignores repeat clicks within nxDebounceTime ms of the last one - a quick guard against double-submit. */
@Directive({
  selector: '[nxDebounceClick]',
  standalone: true,
})
export class NxDebounceClick {
  @Input() nxDebounceTime = 300;
  @Output() nxDebounceClick = new EventEmitter<MouseEvent>();

  private lastClickAt = 0;

  @HostListener('click', ['$event'])
  onClick(event: MouseEvent): void {
    const now = Date.now();
    if (now - this.lastClickAt < this.nxDebounceTime) {
      return;
    }

    this.lastClickAt = now;
    this.nxDebounceClick.emit(event);
  }
}
