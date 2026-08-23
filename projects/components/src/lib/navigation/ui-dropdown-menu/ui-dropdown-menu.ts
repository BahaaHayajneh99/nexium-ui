import { Component, ElementRef, EventEmitter, Input, Output } from '@angular/core';
import { NxMenu, NxMenuItem } from '../ui-menu';

export type NxDropdownPosition = 'left' | 'right';

@Component({
  selector: 'nx-dropdown-menu',
  standalone: true,
  imports: [NxMenu],
  templateUrl: './ui-dropdown-menu.html',
  styleUrl: './ui-dropdown-menu.scss',
  host: {
    '(document:click)': 'onDocumentClick($event)',
  },
})
export class NxDropdownMenu {
  @Input() items: NxMenuItem[] = [];
  @Input() position: NxDropdownPosition = 'left';
  @Input() disabled = false;

  @Output() itemSelect = new EventEmitter<NxMenuItem>();

  open = false;

  constructor(private elementRef: ElementRef<HTMLElement>) {}

  toggle(): void {
    if (!this.disabled) {
      this.open = !this.open;
    }
  }

  close(): void {
    this.open = false;
  }

  onSelect(item: NxMenuItem): void {
    this.itemSelect.emit(item);
    this.close();
  }

  /** Closes the panel when a projected custom item (see the `[nx-dropdown-content]` slot) is clicked. */
  onContentClick(): void {
    this.close();
  }

  onDocumentClick(event: MouseEvent): void {
    if (!this.elementRef.nativeElement.contains(event.target as Node)) {
      this.open = false;
    }
  }
}
