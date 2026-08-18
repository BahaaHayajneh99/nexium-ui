import { Component, ElementRef, EventEmitter, Input, Output } from '@angular/core';
import { UiMenu, NxMenuItem } from '../ui-menu';

export type NxDropdownPosition = 'left' | 'right';

@Component({
  selector: 'nx-dropdown-menu',
  standalone: true,
  imports: [UiMenu],
  templateUrl: './ui-dropdown-menu.html',
  styleUrl: './ui-dropdown-menu.scss',
  host: {
    '(document:click)': 'onDocumentClick($event)',
  },
})
export class UiDropdownMenu {
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

  onSelect(item: NxMenuItem): void {
    this.itemSelect.emit(item);
    this.open = false;
  }

  onDocumentClick(event: MouseEvent): void {
    if (!this.elementRef.nativeElement.contains(event.target as Node)) {
      this.open = false;
    }
  }
}
