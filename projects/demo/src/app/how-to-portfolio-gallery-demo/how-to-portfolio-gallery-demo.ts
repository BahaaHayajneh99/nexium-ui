import { Component } from '@angular/core';
import { NxMasonry, NxCard, NxCardImage, NxCardContent, NxTag } from 'components';
import { DemoSection } from '../shared/demo-section/demo-section';

interface PortfolioItem {
  title: string;
  category: string;
  image: string;
  height: number;
}

@Component({
  selector: 'app-how-to-portfolio-gallery-demo',
  imports: [NxMasonry, NxCard, NxCardImage, NxCardContent, NxTag, DemoSection],
  templateUrl: './how-to-portfolio-gallery-demo.html',
})
export class HowToPortfolioGalleryDemo {
  items: PortfolioItem[] = [
    { title: 'Brand Identity', category: 'Branding', image: 'https://picsum.photos/seed/nexaui-portfolio-1/400/500', height: 500 },
    { title: 'Mobile Banking App', category: 'UI/UX', image: 'https://picsum.photos/seed/nexaui-portfolio-2/400/320', height: 320 },
    { title: 'Editorial Layout', category: 'Print', image: 'https://picsum.photos/seed/nexaui-portfolio-3/400/420', height: 420 },
    { title: 'Product Launch Site', category: 'Web', image: 'https://picsum.photos/seed/nexaui-portfolio-4/400/280', height: 280 },
    { title: 'Packaging Concept', category: 'Branding', image: 'https://picsum.photos/seed/nexaui-portfolio-5/400/460', height: 460 },
    { title: 'Dashboard Redesign', category: 'UI/UX', image: 'https://picsum.photos/seed/nexaui-portfolio-6/400/360', height: 360 },
  ];

  code = `<nx-masonry [cols]="3" [gap]="16">
    @for (item of items; track item.title) {
        <nx-card variant="outlined">
            <nx-card-image>
                <img [src]="item.image" [alt]="item.title" [style.height.px]="item.height" style="width: 100%; object-fit: cover;" />
            </nx-card-image>
            <nx-card-content>
                <div class="template-profile-name">{{ item.title }}</div>
                <nx-tag variant="outline">{{ item.category }}</nx-tag>
            </nx-card-content>
        </nx-card>
    }
</nx-masonry>`;

  tsCode = `items: PortfolioItem[] = [
  { title: 'Brand Identity', category: 'Branding', image: '...', height: 500 },
  { title: 'Mobile Banking App', category: 'UI/UX', image: '...', height: 320 },
  { title: 'Editorial Layout', category: 'Print', image: '...', height: 420 },
  { title: 'Product Launch Site', category: 'Web', image: '...', height: 280 },
  { title: 'Packaging Concept', category: 'Branding', image: '...', height: 460 },
  { title: 'Dashboard Redesign', category: 'UI/UX', image: '...', height: 360 },
];`;
}
