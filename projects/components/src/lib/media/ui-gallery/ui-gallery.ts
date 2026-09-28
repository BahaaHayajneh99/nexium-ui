import { Component, Input } from '@angular/core';
import { NxProLocked } from '../../licensing/ui-pro-locked/ui-pro-locked';
import { nxProLicenseGranted } from '../../licensing/nx-license';

export interface NxGalleryImage {
  src: string;
  alt?: string;
}

@Component({
  selector: 'nx-gallery',
  standalone: true,
  imports: [NxProLocked],
  templateUrl: './ui-gallery.html',
  styleUrl: './ui-gallery.scss',
})
export class NxGallery {
  protected readonly licensed = nxProLicenseGranted();
  @Input() images: NxGalleryImage[] = [];

  selectedIndex: number | null = null;

  open(index: number): void {
    this.selectedIndex = index;
  }

  close(): void {
    this.selectedIndex = null;
  }
}
