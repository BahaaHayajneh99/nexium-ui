import { Component } from '@angular/core';
import { NxMasonry } from 'components';
import { DemoSection } from '../shared/demo-section/demo-section';

@Component({
  selector: 'app-layout-masonry-demo',
  imports: [NxMasonry, DemoSection],
  templateUrl: './layout-masonry-demo.html',
})
export class LayoutMasonryDemo {
  importCode = `import { NxMasonry } from 'nexium-ui';`;

  items = [80, 140, 100, 180, 60, 120, 150, 90];

  basicCode = `<nx-masonry [cols]="4" [gap]="16">
    <div style="height: 80px;">1</div>
    <div style="height: 140px;">2</div>
    <div style="height: 100px;">3</div>
    <!-- ...variable-height items... -->
</nx-masonry>`;
}
