import { Component } from '@angular/core';
import { UiAspectRatio } from 'components';
import { DemoSection } from '../shared/demo-section/demo-section';

@Component({
  selector: 'app-layout-aspect-ratio-demo',
  imports: [UiAspectRatio, DemoSection],
  templateUrl: './layout-aspect-ratio-demo.html',
})
export class LayoutAspectRatioDemo {
  wideCode = `<nx-aspect-ratio ratio="16 / 9">
    <img src="video-thumb.jpg" style="width: 100%; height: 100%; object-fit: cover;" />
</nx-aspect-ratio>`;

  squareCode = `<nx-aspect-ratio ratio="1 / 1">
    <img src="avatar.jpg" style="width: 100%; height: 100%; object-fit: cover;" />
</nx-aspect-ratio>`;
}
