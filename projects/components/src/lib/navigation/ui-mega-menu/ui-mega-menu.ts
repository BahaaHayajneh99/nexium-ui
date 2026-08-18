import { Component, ElementRef, Input } from '@angular/core';

@Component({
  selector: 'nx-mega-menu',
  standalone: true,
  imports: [],
  templateUrl: './ui-mega-menu.html',
  styleUrl: './ui-mega-menu.scss',
  host: {
    '(document:click)': 'onDocumentClick($event)',
  },
})
export class UiMegaMenu {
  @Input() label = '';

  open = false;

  constructor(private elementRef: ElementRef<HTMLElement>) {}

  toggle(): void {
    this.open = !this.open;
  }

  close(): void {
    this.open = false;
  }

  onDocumentClick(event: MouseEvent): void {
    if (!this.elementRef.nativeElement.contains(event.target as Node)) {
      this.open = false;
    }
  }
}
