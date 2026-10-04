import { Directive, EventEmitter, HostBinding, HostListener, Input, Output } from '@angular/core';

const NX_DRAG_MIME = 'application/x-nexium-drag';

/** Marks an element as a drag source, serializing `nxDraggable` as the drop payload. */
@Directive({
  selector: '[nxDraggable]',
  standalone: true,
})
export class NxDraggable {
  @Input('nxDraggable') data: unknown;

  @Output() dragStarted = new EventEmitter<unknown>();
  @Output() dragEnded = new EventEmitter<void>();

  @HostBinding('attr.draggable') readonly draggableAttr = true;
  @HostBinding('class.nx-draggable') readonly hostClass = true;

  @HostListener('dragstart', ['$event'])
  onDragStart(event: DragEvent): void {
    event.dataTransfer?.setData(NX_DRAG_MIME, JSON.stringify(this.data ?? null));
    if (event.dataTransfer) {
      event.dataTransfer.effectAllowed = 'move';
    }
    this.dragStarted.emit(this.data);
  }

  @HostListener('dragend')
  onDragEnd(): void {
    this.dragEnded.emit();
  }
}

/** Accepts drops from any `nxDraggable` source elsewhere in the app, emitting the deserialized payload. */
@Directive({
  selector: '[nxDropZone]',
  standalone: true,
})
export class NxDropZone {
  @Output() nxDropZoneDrop = new EventEmitter<unknown>();

  @HostBinding('class.nx-drop-zone-active') active = false;

  @HostListener('dragover', ['$event'])
  onDragOver(event: DragEvent): void {
    event.preventDefault();
    this.active = true;
  }

  @HostListener('dragleave')
  onDragLeave(): void {
    this.active = false;
  }

  @HostListener('drop', ['$event'])
  onDrop(event: DragEvent): void {
    event.preventDefault();
    this.active = false;
    const raw = event.dataTransfer?.getData(NX_DRAG_MIME);
    if (!raw) {
      return;
    }
    try {
      this.nxDropZoneDrop.emit(JSON.parse(raw));
    } catch {
      // Not a payload produced by nxDraggable - ignore.
    }
  }
}
