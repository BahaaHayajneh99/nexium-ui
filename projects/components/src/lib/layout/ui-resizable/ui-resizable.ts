import { Component, EventEmitter, HostListener, Input, Output, booleanAttribute, numberAttribute } from '@angular/core';

export type NxResizeHandle = 'right' | 'bottom' | 'corner';

export interface NxResizeEvent {
  width: number;
  height: number;
}

@Component({
  selector: 'nx-resizable',
  standalone: true,
  imports: [],
  templateUrl: './ui-resizable.html',
  styleUrl: './ui-resizable.scss',
})
export class NxResizable {
  @Input({ transform: numberAttribute }) width = 320;
  @Input({ transform: numberAttribute }) height = 200;
  @Input({ transform: numberAttribute }) minWidth = 120;
  @Input({ transform: numberAttribute }) minHeight = 80;
  @Input({ transform: numberAttribute }) maxWidth = Infinity;
  @Input({ transform: numberAttribute }) maxHeight = Infinity;
  @Input() handles: NxResizeHandle[] = ['right', 'bottom', 'corner'];
  @Input({ transform: booleanAttribute }) disabled = false;

  @Output() widthChange = new EventEmitter<number>();
  @Output() heightChange = new EventEmitter<number>();
  @Output() resized = new EventEmitter<NxResizeEvent>();
  @Output() resizeStart = new EventEmitter<NxResizeEvent>();
  @Output() resizeEnd = new EventEmitter<NxResizeEvent>();

  activeHandle: NxResizeHandle | null = null;

  private startX = 0;
  private startY = 0;
  private startWidth = 0;
  private startHeight = 0;

  hasHandle(handle: NxResizeHandle): boolean {
    return this.handles.includes(handle);
  }

  onHandlePointerDown(handle: NxResizeHandle, event: PointerEvent): void {
    if (this.disabled) {
      return;
    }

    event.preventDefault();
    this.activeHandle = handle;
    this.startX = event.clientX;
    this.startY = event.clientY;
    this.startWidth = this.width;
    this.startHeight = this.height;
    (event.target as HTMLElement).setPointerCapture(event.pointerId);
    this.resizeStart.emit({ width: this.width, height: this.height });
  }

  @HostListener('document:pointermove', ['$event'])
  onPointerMove(event: PointerEvent): void {
    if (!this.activeHandle) {
      return;
    }

    const deltaX = event.clientX - this.startX;
    const deltaY = event.clientY - this.startY;

    if (this.activeHandle === 'right' || this.activeHandle === 'corner') {
      this.width = this.clamp(this.startWidth + deltaX, this.minWidth, this.maxWidth);
    }
    if (this.activeHandle === 'bottom' || this.activeHandle === 'corner') {
      this.height = this.clamp(this.startHeight + deltaY, this.minHeight, this.maxHeight);
    }

    this.widthChange.emit(this.width);
    this.heightChange.emit(this.height);
    this.resized.emit({ width: this.width, height: this.height });
  }

  @HostListener('document:pointerup')
  onPointerUp(): void {
    if (!this.activeHandle) {
      return;
    }

    this.activeHandle = null;
    this.resizeEnd.emit({ width: this.width, height: this.height });
  }

  private clamp(value: number, min: number, max: number): number {
    return Math.min(max, Math.max(min, value));
  }
}
