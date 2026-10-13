import { Component, Input } from '@angular/core';

export interface NxGalleryImage {
  src: string;
  alt?: string;
}

@Component({
  selector: 'nx-gallery',
  standalone: true,
  imports: [],
  templateUrl: './ui-gallery.html',
  styleUrl: './ui-gallery.scss',
})
export class NxGallery {
  @Input() images: NxGalleryImage[] = [];

  selectedIndex: number | null = null;

  open(index: number): void {
    this.selectedIndex = index;
  }

  close(): void {
    this.selectedIndex = null;
  }
}
