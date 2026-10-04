import { Component, inject } from '@angular/core';
import { CommonService } from '../services/common.service';
import { NxLightbox, NxLightboxImage } from '../../../../../dist/components';
import { DemoSection } from '../shared/demo-section/demo-section';

@Component({
  selector: 'app-ui-lightbox-demo',
  imports: [NxLightbox, DemoSection],
  templateUrl: './ui-lightbox-demo.html',
  styleUrl: './ui-lightbox-demo.scss',
})
export class UiLightboxDemo {
  importCode = `import { NxLightbox } from 'nexium-ui';`;

  public commonService = inject(CommonService);

  images: NxLightboxImage[] = [
    { src: 'https://picsum.photos/seed/nexium-lightbox-1/800/500', alt: 'Mountain landscape', caption: 'Mountain landscape' },
    { src: 'https://picsum.photos/seed/nexium-lightbox-2/800/500', alt: 'City skyline', caption: 'City skyline' },
    { src: 'https://picsum.photos/seed/nexium-lightbox-3/800/500', alt: 'Forest trail', caption: 'Forest trail' },
  ];

  open = false;
  activeIndex = 0;

  show(index: number): void {
    this.activeIndex = index;
    this.open = true;
  }

  basicCode = `<div class="thumbnails">
    @for (image of images; track image.src; let i = $index) {
        <img [src]="image.src" [alt]="image.alt" (click)="show(i)" />
    }
</div>

<nx-lightbox
    [images]="images"
    [(open)]="open"
    [(activeIndex)]="activeIndex">
</nx-lightbox>`;

  basicTs = `images: NxLightboxImage[] = [
  { src: '...', alt: 'Mountain landscape', caption: 'Mountain landscape' },
  { src: '...', alt: 'City skyline', caption: 'City skyline' },
  { src: '...', alt: 'Forest trail', caption: 'Forest trail' },
];

open = false;
activeIndex = 0;

show(index: number): void {
  this.activeIndex = index;
  this.open = true;
}`;
}
