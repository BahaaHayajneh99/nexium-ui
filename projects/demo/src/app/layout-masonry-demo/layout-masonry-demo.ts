import { Component } from '@angular/core';
import { UiMasonry } from 'components';
import { DemoSection } from '../shared/demo-section/demo-section';

@Component({
  selector: 'app-layout-masonry-demo',
  imports: [UiMasonry, DemoSection],
  templateUrl: './layout-masonry-demo.html',
})
export class LayoutMasonryDemo {
  items = [80, 140, 100, 180, 60, 120, 150, 90];

  basicCode = `<nx-masonry [cols]="4" [gap]="16">
    <div style="height: 80px;">1</div>
    <div style="height: 140px;">2</div>
    <div style="height: 100px;">3</div>
    <!-- ...variable-height items... -->
</nx-masonry>`;
}
