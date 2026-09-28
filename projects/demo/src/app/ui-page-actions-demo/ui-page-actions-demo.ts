import { Component, inject } from '@angular/core';
import { CommonService } from '../services/common.service';
import { NxButton, NxPageActions } from 'components';
import { DemoSection } from '../shared/demo-section/demo-section';

@Component({
  selector: 'app-ui-page-actions-demo',
  imports: [NxPageActions, NxButton, DemoSection],
  templateUrl: './ui-page-actions-demo.html',
  styleUrl: './ui-page-actions-demo.scss',
})
export class UiPageActionsDemo {
  importCode = `import { NxPageActions, NxButton } from 'nexium-ui';`;

  public commonService = inject(CommonService);

  basicCode = `<nx-page-actions>
    <nx-button nxPageActionsSecondary variant="secondary">Cancel</nx-button>
    <nx-button nxPageActionsPrimary variant="primary">Save changes</nx-button>
</nx-page-actions>`;

  basicTs = `// nxPageActionsSecondary and nxPageActionsPrimary are separate slots, so
// primary CTAs always render last regardless of markup order.`;

  multiCode = `<nx-page-actions>
    <nx-button nxPageActionsSecondary variant="secondary">Discard</nx-button>
    <nx-button nxPageActionsSecondary variant="secondary">Preview</nx-button>
    <nx-button nxPageActionsPrimary variant="primary">Publish</nx-button>
</nx-page-actions>`;

  multiTs = `// Any number of secondary actions can be projected alongside a single
// primary CTA - useful in a page header's actions slot.`;
}
