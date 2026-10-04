import { Component, ElementRef, EventEmitter, Input, Output, numberAttribute, signal } from '@angular/core';
import { NxColorGradient, NxGradientStop, NxGradientType } from '../ui-color-gradient';
import { NxProLocked } from '../../licensing/ui-pro-locked/ui-pro-locked';
import { nxProLicenseGranted } from '../../licensing/nx-license';

/** A draggable-stop gradient builder: drag handles to reposition, double-click the track to add a stop. */
@Component({
  selector: 'nx-color-gradient-editor',
  standalone: true,
  imports: [NxColorGradient, NxProLocked],
  templateUrl: './ui-color-gradient-editor.html',
  styleUrl: './ui-color-gradient-editor.scss',
})
export class NxColorGradientEditor {
  protected readonly licensed = nxProLicenseGranted();

  @Input() type: NxGradientType = 'linear';
  @Input({ transform: numberAttribute }) angle = 90;
  @Input() stops: NxGradientStop[] = [
    { color: '#3b82f6', offset: 0 },
    { color: '#8b5cf6', offset: 100 },
  ];

  @Output() stopsChange = new EventEmitter<NxGradientStop[]>();
  @Output() typeChange = new EventEmitter<NxGradientType>();
  @Output() angleChange = new EventEmitter<number>();

  selectedIndex = signal(0);

  private draggingIndex: number | null = null;

  constructor(private elementRef: ElementRef<HTMLElement>) {}

  get selectedStop(): NxGradientStop | undefined {
    return this.stops[this.selectedIndex()];
  }

  select(index: number): void {
    this.selectedIndex.set(index);
  }

  setType(type: NxGradientType): void {
    this.type = type;
    this.typeChange.emit(type);
  }

  setAngle(angle: number): void {
    this.angle = angle;
    this.angleChange.emit(angle);
  }

  setSelectedColor(color: string): void {
    this.updateStop(this.selectedIndex(), { color });
  }

  removeSelected(): void {
    if (this.stops.length <= 2) {
      return;
    }
    const index = this.selectedIndex();
    const next = this.stops.filter((_, i) => i !== index);
    this.selectedIndex.set(Math.max(0, index - 1));
    this.emit(next);
  }

  onTrackDoubleClick(event: MouseEvent): void {
    const offset = this.offsetFromEvent(event.clientX);
    const next = [...this.stops, { color: '#ffffff', offset }].sort((a, b) => a.offset - b.offset);
    this.selectedIndex.set(next.findIndex((s) => s.offset === offset));
    this.emit(next);
  }

  onHandlePointerDown(index: number, event: PointerEvent): void {
    event.stopPropagation();
    this.draggingIndex = index;
    this.selectedIndex.set(index);
    (event.target as HTMLElement).setPointerCapture(event.pointerId);
  }

  onHandlePointerMove(event: PointerEvent): void {
    if (this.draggingIndex === null) {
      return;
    }
    const offset = this.offsetFromEvent(event.clientX);
    this.updateStop(this.draggingIndex, { offset });
  }

  onHandlePointerUp(): void {
    this.draggingIndex = null;
  }

  private offsetFromEvent(clientX: number): number {
    const rect = this.elementRef.nativeElement.querySelector('.nx-color-gradient-editor-track')?.getBoundingClientRect();
    if (!rect) {
      return 0;
    }
    return Math.min(100, Math.max(0, Math.round(((clientX - rect.left) / rect.width) * 100)));
  }

  private updateStop(index: number, patch: Partial<NxGradientStop>): void {
    const next = this.stops.map((stop, i) => (i === index ? { ...stop, ...patch } : stop));
    this.emit(next);
  }

  private emit(next: NxGradientStop[]): void {
    this.stops = next;
    this.stopsChange.emit(next);
  }
}
