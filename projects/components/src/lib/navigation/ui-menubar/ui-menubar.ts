import { Component, ElementRef, EventEmitter, Input, Output } from '@angular/core';
import { UiMenu, NxMenuItem } from '../ui-menu';

export interface NxMenubarItem {
  label: string;
  items: NxMenuItem[];
}

@Component({
  selector: 'nx-menubar',
  standalone: true,
  imports: [UiMenu],
  templateUrl: './ui-menubar.html',
  styleUrl: './ui-menubar.scss',
  host: {
    '(document:click)': 'onDocumentClick($event)',
  },
})
export class UiMenubar {
  @Input() menus: NxMenubarItem[] = [];

  @Output() itemSelect = new EventEmitter<NxMenuItem>();

  openIndex: number | null = null;

  constructor(private elementRef: ElementRef<HTMLElement>) {}

  toggle(index: number): void {
    this.openIndex = this.openIndex === index ? null : index;
  }

  onSelect(item: NxMenuItem): void {
    this.itemSelect.emit(item);
    this.openIndex = null;
  }

  onDocumentClick(event: MouseEvent): void {
    if (!this.elementRef.nativeElement.contains(event.target as Node)) {
      this.openIndex = null;
    }
  }
}
