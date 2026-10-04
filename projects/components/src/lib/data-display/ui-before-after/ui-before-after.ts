import { Component, ElementRef, Input, OnChanges, OnDestroy, numberAttribute, signal } from '@angular/core';
import { NxProLocked } from '../../licensing/ui-pro-locked/ui-pro-locked';
import { nxProLicenseGranted } from '../../licensing/nx-license';

/** A draggable-divider before/after image comparison slider. */
@Component({
  selector: 'nx-before-after',
  standalone: true,
  imports: [NxProLocked],
  templateUrl: './ui-before-after.html',
  styleUrl: './ui-before-after.scss',
})
export class NxBeforeAfter implements OnChanges, OnDestroy {
  protected readonly licensed = nxProLicenseGranted();

  @Input() beforeSrc = '';
  @Input() afterSrc = '';
  @Input() beforeLabel = 'Before';
  @Input() afterLabel = 'After';
  @Input({ transform: numberAttribute }) initialPosition = 50;

  // A signal: dragging is driven by document-level mousemove/mouseup
  // listeners, outside any Angular-dispatched event.
  position = signal(50);

  private dragging = false;
  private readonly boundMove = (event: MouseEvent | TouchEvent) => this.onDragMove(event);
  private readonly boundEnd = () => this.stopDrag();

  constructor(private elementRef: ElementRef<HTMLElement>) {}

  ngOnDestroy(): void {
    this.stopDrag();
  }

  ngOnChanges(): void {
    this.position.set(this.initialPosition);
  }

  startDrag(event: MouseEvent | TouchEvent): void {
    event.preventDefault();
    this.dragging = true;
    window.addEventListener('mousemove', this.boundMove);
    window.addEventListener('mouseup', this.boundEnd);
    window.addEventListener('touchmove', this.boundMove);
    window.addEventListener('touchend', this.boundEnd);
    this.onDragMove(event);
  }

  private onDragMove(event: MouseEvent | TouchEvent): void {
    if (!this.dragging) {
      return;
    }
    const clientX = 'touches' in event ? event.touches[0]?.clientX : event.clientX;
    if (clientX === undefined) {
      return;
    }

    const rect = this.elementRef.nativeElement.getBoundingClientRect();
    const percent = ((clientX - rect.left) / rect.width) * 100;
    this.position.set(Math.min(100, Math.max(0, percent)));
  }

  private stopDrag(): void {
    this.dragging = false;
    window.removeEventListener('mousemove', this.boundMove);
    window.removeEventListener('mouseup', this.boundEnd);
    window.removeEventListener('touchmove', this.boundMove);
    window.removeEventListener('touchend', this.boundEnd);
  }
}
