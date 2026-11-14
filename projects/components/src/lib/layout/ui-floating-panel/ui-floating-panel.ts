import {
  booleanAttribute,
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  numberAttribute,
  Output,
  signal,
} from '@angular/core';
import { NxIcon } from '../../data-display/ui-icon';
import { NxProLocked } from '../../licensing/ui-pro-locked/ui-pro-locked';
import { nxProLicenseGranted } from '../../licensing/nx-license';

/**
 * A draggable floating window/widget (a mini picture-in-picture panel): a header bar with a title,
 * a collapse toggle, and a close button, draggable anywhere in the viewport via pointer-capture on
 * the header, plus a projected content area that can be collapsed/expanded. Emit-only, same
 * philosophy as the rest of the library: `closed` and `collapsedChange` are emitted for the host to
 * act on (e.g. actually remove the panel from the DOM) rather than the panel removing itself.
 */
@Component({
  selector: 'nx-floating-panel',
  standalone: true,
  imports: [NxIcon, NxProLocked],
  templateUrl: './ui-floating-panel.html',
  styleUrl: './ui-floating-panel.scss',
})
export class NxFloatingPanel {
  protected readonly licensed = nxProLicenseGranted();

  @Input() title = '';
  @Input({ transform: numberAttribute }) initialX = 24;
  @Input({ transform: numberAttribute }) initialY = 24;
  @Input({ transform: booleanAttribute }) collapsed = false;

  @Output() closed = new EventEmitter<void>();
  @Output() collapsedChange = new EventEmitter<boolean>();

  protected readonly x = signal(this.initialX);
  protected readonly y = signal(this.initialY);
  protected readonly isCollapsed = signal(this.collapsed);
  protected dragging = false;

  private dragOffsetX = 0;
  private dragOffsetY = 0;

  constructor(private readonly elementRef: ElementRef<HTMLElement>) {}

  ngOnInit(): void {
    this.x.set(this.initialX);
    this.y.set(this.initialY);
    this.isCollapsed.set(this.collapsed);
  }

  onHeaderPointerDown(event: PointerEvent): void {
    // Ignore drags started from the header's own action buttons (collapse/close).
    if ((event.target as HTMLElement).closest('.nx-floating-panel-actions')) {
      return;
    }
    event.preventDefault();
    this.dragging = true;
    this.dragOffsetX = event.clientX - this.x();
    this.dragOffsetY = event.clientY - this.y();
    (event.target as HTMLElement).setPointerCapture(event.pointerId);
  }

  @HostListener('document:pointermove', ['$event'])
  onPointerMove(event: PointerEvent): void {
    if (!this.dragging) {
      return;
    }

    const panel = this.elementRef.nativeElement.querySelector('.nx-floating-panel') as HTMLElement | null;
    const width = panel?.offsetWidth ?? 280;
    const height = panel?.offsetHeight ?? 160;
    const maxX = Math.max(0, window.innerWidth - width);
    const maxY = Math.max(0, window.innerHeight - height);

    const rawX = event.clientX - this.dragOffsetX;
    const rawY = event.clientY - this.dragOffsetY;

    this.x.set(Math.min(maxX, Math.max(0, rawX)));
    this.y.set(Math.min(maxY, Math.max(0, rawY)));
  }

  @HostListener('document:pointerup')
  onPointerUp(): void {
    this.dragging = false;
  }

  toggleCollapsed(): void {
    const next = !this.isCollapsed();
    this.isCollapsed.set(next);
    this.collapsedChange.emit(next);
  }

  close(): void {
    this.closed.emit();
  }
}
