import { Component, EventEmitter, HostListener, Input, Output, booleanAttribute } from '@angular/core';

export type NxDrawerSide = 'left' | 'right' | 'top' | 'bottom';

/**
 * A slide-in panel from any edge of the viewport. `side="bottom"` with a
 * height-based `size` is the common "sheet" pattern (mobile action sheets) -
 * there's no separate nx-sheet component, just this configuration of nx-drawer.
 */
@Component({
  selector: 'nx-drawer',
  standalone: true,
  imports: [],
  templateUrl: './ui-drawer.html',
  styleUrl: './ui-drawer.scss',
})
export class UiDrawer {
  @Input({ transform: booleanAttribute }) open = false;
  @Input() side: NxDrawerSide = 'right';
  @Input() size = '320px';
  @Input({ transform: booleanAttribute }) closeOnBackdrop = true;

  @Output() openChange = new EventEmitter<boolean>();
  @Output() closed = new EventEmitter<void>();

  get isHorizontal(): boolean {
    return this.side === 'left' || this.side === 'right';
  }

  @HostListener('document:keydown.escape')
  onEscape(): void {
    if (this.open) {
      this.close();
    }
  }

  onBackdropClick(): void {
    if (this.closeOnBackdrop) {
      this.close();
    }
  }

  close(): void {
    this.open = false;
    this.openChange.emit(false);
    this.closed.emit();
  }
}
