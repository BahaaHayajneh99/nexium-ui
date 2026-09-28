import { Component, inject } from '@angular/core';
import { CommonService } from '../services/common.service';
import { NxSpotlight } from '../../../../../dist/components';
import { DemoSection } from '../shared/demo-section/demo-section';

@Component({
  selector: 'app-ui-spotlight-demo',
  imports: [NxSpotlight, DemoSection],
  templateUrl: './ui-spotlight-demo.html',
  styleUrl: './ui-spotlight-demo.scss',
})
export class UiSpotlightDemo {
  importCode = `import { NxSpotlight } from 'nexium-ui';`;

  public commonService = inject(CommonService);

  open = false;

  basicCode = `<button id="save-btn" (click)="open = true">Highlight the Save button</button>

<nx-spotlight
    target="#save-btn"
    title="Save your work"
    description="This button saves your changes at any time - try Ctrl+S too."
    [(open)]="open">
</nx-spotlight>`;

  basicTs = `open = false;

// \`target\` is a plain CSS selector, so it can point at any element already
// on the page - no ElementRef plumbing needed for the common case.`;
}
