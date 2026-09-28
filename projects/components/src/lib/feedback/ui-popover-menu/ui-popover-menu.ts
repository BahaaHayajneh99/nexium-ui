import { ChangeDetectorRef, Component, ElementRef, EventEmitter, HostListener, Input, Output } from '@angular/core';
import { NxMenu, NxMenuItem } from '../../navigation/ui-menu';

export type NxPopoverMenuPlacement =
  | 'top'
  | 'top-start'
  | 'top-end'
  | 'bottom'
  | 'bottom-start'
  | 'bottom-end'
  | 'left'
  | 'right';

/**
 * A click-triggered floating panel that can show a structured `items` menu,
 * arbitrary projected content, or both - `nx-popover` covers free-form
 * content with two positions; `nx-dropdown-menu` covers menu items with two
 * positions. This adds the full 8-way placement (with auto-flip when the
 * panel would overflow the viewport), a pointer arrow, and Escape-to-close.
 */
@Component({
  selector: 'nx-popover-menu',
  standalone: true,
  imports: [NxMenu],
  templateUrl: './ui-popover-menu.html',
  styleUrl: './ui-popover-menu.scss',
})
export class NxPopoverMenu {
  @Input() items: NxMenuItem[] = [];
  @Input() placement: NxPopoverMenuPlacement = 'bottom-start';
  @Input() disabled = false;

  @Output() itemSelect = new EventEmitter<NxMenuItem>();
  @Output() openedChange = new EventEmitter<boolean>();

  open = false;
  /** The placement actually rendered - `placement` flipped vertically if it would overflow the viewport. */
  resolvedPlacement: NxPopoverMenuPlacement = this.placement;

  constructor(private elementRef: ElementRef<HTMLElement>, private cdr: ChangeDetectorRef) {}

  toggle(): void {
    if (this.disabled) {
      return;
    }
    this.open ? this.close() : this.openPanel();
  }

  openPanel(): void {
    this.resolvedPlacement = this.placement;
    this.open = true;
    this.openedChange.emit(true);
    // Measure after the panel exists in the DOM.
    queueMicrotask(() => this.flipIfNeeded());
  }

  close(): void {
    if (!this.open) {
      return;
    }
    this.open = false;
    this.openedChange.emit(false);
  }

  onSelect(item: NxMenuItem): void {
    this.itemSelect.emit(item);
    this.close();
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    if (!this.elementRef.nativeElement.contains(event.target as Node)) {
      this.close();
    }
  }

  @HostListener('document:keydown.escape')
  onEscape(): void {
    this.close();
  }

  private flipIfNeeded(): void {
    const panel = this.elementRef.nativeElement.querySelector('.nx-popover-menu-panel');
    if (!panel) {
      return;
    }

    const rect = panel.getBoundingClientRect();
    const isTop = this.resolvedPlacement.startsWith('top');
    const isBottom = this.resolvedPlacement.startsWith('bottom');

    if (isTop && rect.top < 0) {
      this.resolvedPlacement = this.resolvedPlacement.replace('top', 'bottom') as NxPopoverMenuPlacement;
    } else if (isBottom && rect.bottom > window.innerHeight) {
      this.resolvedPlacement = this.resolvedPlacement.replace('bottom', 'top') as NxPopoverMenuPlacement;
    } else {
      return;
    }

    // Only reached if resolvedPlacement changed - this runs from a
    // microtask, outside any Angular-dispatched event, so in a zoneless
    // app this is what actually gets the flipped placement rendered.
    this.cdr.markForCheck();
  }
}
