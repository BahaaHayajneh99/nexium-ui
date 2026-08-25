import { AfterViewInit, Directive, ElementRef, Input, booleanAttribute, inject } from '@angular/core';

/** Focuses the host element once it renders - handy for a modal's first field or a search input. */
@Directive({
  selector: '[nxAutofocus]',
  standalone: true,
})
export class NxAutofocus implements AfterViewInit {
  @Input({ transform: booleanAttribute }) nxAutofocus = true;
  /** Delay in ms before focusing - useful when the host is still animating in. */
  @Input() nxAutofocusDelay = 0;

  private elementRef = inject(ElementRef<HTMLElement>);

  ngAfterViewInit(): void {
    if (!this.nxAutofocus) {
      return;
    }

    if (this.nxAutofocusDelay > 0) {
      setTimeout(() => this.elementRef.nativeElement.focus(), this.nxAutofocusDelay);
    } else {
      queueMicrotask(() => this.elementRef.nativeElement.focus());
    }
  }
}
