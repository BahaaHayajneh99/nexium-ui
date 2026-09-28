import { Directive, EventEmitter, HostListener, Input, Output, booleanAttribute, numberAttribute } from '@angular/core';

/** Attach to a scrollable container (fixed height + `overflow-y: auto`) to load more data near the bottom. */
@Directive({
  selector: '[nxInfiniteScroll]',
  standalone: true,
})
export class NxInfiniteScroll {
  @Input({ transform: numberAttribute }) threshold = 200;
  @Input({ transform: booleanAttribute }) disabled = false;

  @Output() nxInfiniteScroll = new EventEmitter<void>();

  @HostListener('scroll', ['$event'])
  onScroll(event: Event): void {
    if (this.disabled) {
      return;
    }
    const el = event.target as HTMLElement;
    if (el.scrollHeight - el.scrollTop - el.clientHeight <= this.threshold) {
      this.nxInfiniteScroll.emit();
    }
  }
}
