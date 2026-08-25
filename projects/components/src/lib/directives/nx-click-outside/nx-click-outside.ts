import { Directive, ElementRef, EventEmitter, HostListener, Output, inject } from '@angular/core';

/**
 * Emits when a click lands outside the host element - the same pattern
 * nx-popover/nx-dropdown-menu/nx-mega-menu/etc. each hand-roll internally,
 * pulled out for consumers building their own dismissible surfaces.
 */
@Directive({
  selector: '[nxClickOutside]',
  standalone: true,
})
export class NxClickOutside {
  @Output() nxClickOutside = new EventEmitter<MouseEvent>();

  private elementRef = inject(ElementRef<HTMLElement>);

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    if (!this.elementRef.nativeElement.contains(event.target as Node)) {
      this.nxClickOutside.emit(event);
    }
  }
}
