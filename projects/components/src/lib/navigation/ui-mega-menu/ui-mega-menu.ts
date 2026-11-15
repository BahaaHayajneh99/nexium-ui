import { Component, ElementRef, Input } from '@angular/core';
import { NgIf } from '@angular/common';

@Component({
  selector: 'nx-mega-menu',
  standalone: true,
  imports: [NgIf],
  templateUrl: './ui-mega-menu.html',
  styleUrl: './ui-mega-menu.scss',
  host: {
    '(document:click)': 'onDocumentClick($event)',
  },
})
export class NxMegaMenu {
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
