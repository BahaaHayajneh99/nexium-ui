import { Component, EventEmitter, HostListener, Input, Output, booleanAttribute, numberAttribute } from '@angular/core';
import { NxProLocked } from '../../licensing/ui-pro-locked/ui-pro-locked';
import { nxProLicenseGranted } from '../../licensing/nx-license';

export interface NxLightboxImage {
  src: string;
  alt?: string;
  caption?: string;
}

/**
 * A full-viewport image viewer overlay: pass `images` and set `open` (e.g.
 * from clicking a thumbnail elsewhere on the page) to show one at
 * `activeIndex`, with prev/next navigation (click, arrow keys, or the
 * thumbnail strip) and a caption.
 */
@Component({
  selector: 'nx-lightbox',
  standalone: true,
  imports: [NxProLocked],
  templateUrl: './ui-lightbox.html',
  styleUrl: './ui-lightbox.scss',
})
export class NxLightbox {
  protected readonly licensed = nxProLicenseGranted();

  @Input({ transform: booleanAttribute }) open = false;
  @Input() images: NxLightboxImage[] = [];
  @Input({ transform: numberAttribute }) activeIndex = 0;
  @Input({ transform: booleanAttribute }) showThumbnails = true;

  @Output() openChange = new EventEmitter<boolean>();
  @Output() activeIndexChange = new EventEmitter<number>();
  @Output() closed = new EventEmitter<void>();

  get activeImage(): NxLightboxImage | null {
    return this.images[this.activeIndex] ?? null;
  }

  get hasMultiple(): boolean {
    return this.images.length > 1;
  }

  close(): void {
    if (!this.open) {
      return;
    }
    this.open = false;
    this.openChange.emit(false);
    this.closed.emit();
  }

  next(): void {
    if (this.images.length === 0) {
      return;
    }
    this.setIndex((this.activeIndex + 1) % this.images.length);
  }

  prev(): void {
    if (this.images.length === 0) {
      return;
    }
    this.setIndex((this.activeIndex - 1 + this.images.length) % this.images.length);
  }

  setIndex(index: number): void {
    this.activeIndex = index;
    this.activeIndexChange.emit(index);
  }

  @HostListener('document:keydown', ['$event'])
  onKeydown(event: KeyboardEvent): void {
    if (!this.open) {
      return;
    }
    if (event.key === 'Escape') {
      this.close();
    } else if (event.key === 'ArrowRight') {
      this.next();
    } else if (event.key === 'ArrowLeft') {
      this.prev();
    }
  }
}
