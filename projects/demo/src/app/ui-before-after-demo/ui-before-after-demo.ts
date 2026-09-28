import { Component, inject } from '@angular/core';
import { CommonService } from '../services/common.service';
import { NxBeforeAfter } from 'components';
import { DemoSection } from '../shared/demo-section/demo-section';

@Component({
  selector: 'app-ui-before-after-demo',
  imports: [NxBeforeAfter, DemoSection],
  templateUrl: './ui-before-after-demo.html',
  styleUrl: './ui-before-after-demo.scss',
})
export class UiBeforeAfterDemo {
  importCode = `import { NxBeforeAfter } from 'nexium-ui';`;

  public commonService = inject(CommonService);

  basicCode = `<nx-before-after
    beforeSrc="https://picsum.photos/id/1015/600/400"
    afterSrc="https://picsum.photos/id/1016/600/400">
</nx-before-after>`;

  basicTs = `// Drag the divider (mouse or touch) to compare the two images.`;

  labelCode = `<nx-before-after
    beforeSrc="https://picsum.photos/id/1015/600/400"
    afterSrc="https://picsum.photos/id/1016/600/400"
    beforeLabel="Original"
    afterLabel="Edited"
    [initialPosition]="30">
</nx-before-after>`;

  labelTs = `// beforeLabel / afterLabel customize the overlay captions,
// initialPosition (0-100) sets the starting divider position.`;
}
