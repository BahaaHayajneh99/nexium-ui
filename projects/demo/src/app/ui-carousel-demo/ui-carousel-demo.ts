import { Component, inject } from '@angular/core';
import { CommonService } from '../services/common.service';
import { NxCarousel, NxCarouselSlide, NxCarouselSlideDirective } from '../../../../../dist/components';
import { NxCard, NxCardHeader, NxCardTitle, NxCardContent } from '../../../../../dist/components';
import { DemoSection } from '../shared/demo-section/demo-section';

@Component({
  selector: 'app-ui-carousel-demo',
  imports: [NxCarousel, NxCarouselSlideDirective, NxCard, NxCardHeader, NxCardTitle, NxCardContent, DemoSection],
  templateUrl: './ui-carousel-demo.html',
  styleUrl: './ui-carousel-demo.scss',
})
export class UiCarouselDemo {
  importCode = `import {
  NxCarousel,
  NxCarouselSlide,
  NxCarouselSlideDirective,
  NxCard,
  NxCardHeader,
  NxCardTitle,
  NxCardContent,
} from 'nexium-ui';`;

  public commonService = inject(CommonService);
  slides: NxCarouselSlide[] = [
    { src: 'https://picsum.photos/seed/nexium-carousel-1/900/500', alt: 'Slide 1' },
    { src: 'https://picsum.photos/seed/nexium-carousel-2/900/500', alt: 'Slide 2' },
    { src: 'https://picsum.photos/seed/nexium-carousel-3/900/500', alt: 'Slide 3' },
  ];

  captionedSlides: NxCarouselSlide[] = [
    { src: 'https://picsum.photos/seed/nexium-carousel-4/900/500', alt: 'Mountains', caption: 'Sunrise over the mountains' },
    { src: 'https://picsum.photos/seed/nexium-carousel-5/900/500', alt: 'Forest', caption: 'A quiet path through the forest' },
    { src: 'https://picsum.photos/seed/nexium-carousel-6/900/500', alt: 'Coast', caption: 'Waves along the coastline' },
  ];

  basicCode = `<nx-carousel [slides]="slides"></nx-carousel>`;

  basicTs = `slides: NxCarouselSlide[] = [
  { src: 'https://picsum.photos/seed/nexium-carousel-1/900/500', alt: 'Slide 1' },
  { src: 'https://picsum.photos/seed/nexium-carousel-2/900/500', alt: 'Slide 2' },
  { src: 'https://picsum.photos/seed/nexium-carousel-3/900/500', alt: 'Slide 3' },
];`;

  captionCode = `<nx-carousel [slides]="captionedSlides"></nx-carousel>`;

  captionTs = `captionedSlides: NxCarouselSlide[] = [
  { src: '...', alt: 'Mountains', caption: 'Sunrise over the mountains' },
  { src: '...', alt: 'Forest', caption: 'A quiet path through the forest' },
  { src: '...', alt: 'Coast', caption: 'Waves along the coastline' },
];`;

  autoplayCode = `<nx-carousel [slides]="slides" autoplay [interval]="3000"></nx-carousel>`;

  noControlsCode = `<nx-carousel [slides]="slides" [showArrows]="false" [showIndicators]="false" autoplay></nx-carousel>`;

  contentCode = `<nx-carousel>
  <nx-card *nxCarouselSlide variant="elevated">
    <nx-card-header>
      <nx-card-title>Feature Highlight</nx-card-title>
    </nx-card-header>
    <nx-card-content>
      Any component can live inside a slide, not just images.
    </nx-card-content>
  </nx-card>
  <video *nxCarouselSlide controls muted>
    <source src="..." type="video/mp4" />
  </video>
</nx-carousel>`;
}
