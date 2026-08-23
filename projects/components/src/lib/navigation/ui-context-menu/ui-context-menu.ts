import { Component, EventEmitter, HostListener, Input, Output } from '@angular/core';
import { NxMenu, NxMenuItem } from '../ui-menu';

@Component({
  selector: 'nx-context-menu',
  standalone: true,
  imports: [NxMenu],
  templateUrl: './ui-context-menu.html',
  styleUrl: './ui-context-menu.scss',
})
export class NxContextMenu {
  @Input() items: NxMenuItem[] = [];
  @Input() disabled = false;

  @Output() itemSelect = new EventEmitter<NxMenuItem>();

  open = false;
  x = 0;
  y = 0;

  @HostListener('contextmenu', ['$event'])
  onContextMenu(event: MouseEvent): void {
    if (this.disabled) {
      return;
    }

    event.preventDefault();
    this.x = event.clientX;
    this.y = event.clientY;
    this.open = true;
  }

  @HostListener('document:click')
  onDocumentClick(): void {
    this.open = false;
  }

  @HostListener('document:keydown.escape')
  onEscape(): void {
    this.open = false;
  }

  onSelect(item: NxMenuItem): void {
    this.itemSelect.emit(item);
    this.open = false;
  }
}
