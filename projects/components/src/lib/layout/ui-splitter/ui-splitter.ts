import { Component, ElementRef, HostListener, Input, numberAttribute } from '@angular/core';

export type NxSplitterOrientation = 'horizontal' | 'vertical';

@Component({
  selector: 'nx-splitter',
  standalone: true,
  imports: [],
  templateUrl: './ui-splitter.html',
  styleUrl: './ui-splitter.scss',
})
export class NxSplitter {
  @Input() orientation: NxSplitterOrientation = 'horizontal';
  @Input({ transform: numberAttribute }) initialRatio = 0.5;
  @Input({ transform: numberAttribute }) minRatio = 0.15;
  @Input({ transform: numberAttribute }) maxRatio = 0.85;

  ratio = this.initialRatio;
  dragging = false;

  constructor(private elementRef: ElementRef<HTMLElement>) {}

  onGutterPointerDown(event: PointerEvent): void {
    event.preventDefault();
    this.dragging = true;
    (event.target as HTMLElement).setPointerCapture(event.pointerId);
  }

  @HostListener('document:pointermove', ['$event'])
  onPointerMove(event: PointerEvent): void {
    if (!this.dragging) {
      return;
    }

    const rect = this.elementRef.nativeElement.getBoundingClientRect();
    const raw = this.orientation === 'horizontal'
      ? (event.clientX - rect.left) / rect.width
      : (event.clientY - rect.top) / rect.height;

    this.ratio = Math.min(this.maxRatio, Math.max(this.minRatio, raw));
  }

  @HostListener('document:pointerup')
  onPointerUp(): void {
    this.dragging = false;
  }
}
