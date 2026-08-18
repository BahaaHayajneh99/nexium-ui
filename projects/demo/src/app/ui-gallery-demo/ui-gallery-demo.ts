import { Component, inject } from '@angular/core';
import { CommonService } from '../services/common.service';
import { UiGallery, NxGalleryImage } from '../../../../../dist/components';
import { DemoSection } from '../shared/demo-section/demo-section';

@Component({
  selector: 'app-ui-gallery-demo',
  imports: [UiGallery, DemoSection],
  templateUrl: './ui-gallery-demo.html',
  styleUrl: './ui-gallery-demo.scss',
})
export class UiGalleryDemo {
  public commonService = inject(CommonService);
  images: NxGalleryImage[] = [
    { src: 'https://picsum.photos/seed/nexium-1/600/400', alt: 'Landscape 1' },
    { src: 'https://picsum.photos/seed/nexium-2/600/400', alt: 'Landscape 2' },
    { src: 'https://picsum.photos/seed/nexium-3/600/400', alt: 'Landscape 3' },
    { src: 'https://picsum.photos/seed/nexium-4/600/400', alt: 'Landscape 4' },
  ];

  basicCode = `<nx-gallery [images]="images">
</nx-gallery>`;

  basicTs = `images: NxGalleryImage[] = [
  { src: 'https://picsum.photos/seed/nexium-1/600/400', alt: 'Landscape 1' },
  { src: 'https://picsum.photos/seed/nexium-2/600/400', alt: 'Landscape 2' },
  { src: 'https://picsum.photos/seed/nexium-3/600/400', alt: 'Landscape 3' },
  { src: 'https://picsum.photos/seed/nexium-4/600/400', alt: 'Landscape 4' },
];`;
}
