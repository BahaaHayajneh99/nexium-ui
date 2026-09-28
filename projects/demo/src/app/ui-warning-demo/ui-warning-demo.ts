import { Component, inject } from '@angular/core';
import { CommonService } from '../services/common.service';
import { NxAlert, NxBanner } from '../../../../../dist/components';
import { DemoSection } from '../shared/demo-section/demo-section';

@Component({
  selector: 'app-ui-warning-demo',
  imports: [NxBanner, NxAlert, DemoSection],
  templateUrl: './ui-warning-demo.html',
  styleUrl: './ui-warning-demo.scss',
})
export class UiWarningDemo {
  importCode = `import { NxBanner } from 'nexium-ui';
// or, for an inline (rather than full-width) warning:
import { NxAlert } from 'nexium-ui';`;

  public commonService = inject(CommonService);

  bannerCode = `<nx-banner variant="warning" message="Scheduled maintenance this Sunday, 2-4 AM UTC.">
</nx-banner>`;

  bannerTs = `// nx-banner is a full-width, dismissible strip - for a page-level notice
// rather than one tied to a section, which is what nx-alert's inline card is for.`;

  actionCode = `<nx-banner
    variant="warning"
    message="Your trial ends in 3 days."
    actionLabel="Upgrade now"
    (actionClick)="upgrade()">
</nx-banner>`;

  actionTs = `upgrade(): void {
  // navigate to the billing page
}`;

  upgrade(): void {
    // demo only
  }

  inlineCode = `<nx-alert variant="warning" title="Heads up">
    This action can't be undone.
</nx-alert>`;

  inlineTs = `// For a warning scoped to one section or form rather than the whole page, use nx-alert instead.`;
}
