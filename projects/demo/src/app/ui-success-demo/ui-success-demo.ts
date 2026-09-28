import { Component, inject } from '@angular/core';
import { CommonService } from '../services/common.service';
import { NxAlert, NxBanner, NxResult } from '../../../../../dist/components';
import { DemoSection } from '../shared/demo-section/demo-section';

@Component({
  selector: 'app-ui-success-demo',
  imports: [NxBanner, NxAlert, NxResult, DemoSection],
  templateUrl: './ui-success-demo.html',
  styleUrl: './ui-success-demo.scss',
})
export class UiSuccessDemo {
  importCode = `import { NxBanner } from 'nexium-ui';
// or, depending on the shape of the message:
import { NxAlert, NxResult } from 'nexium-ui';`;

  public commonService = inject(CommonService);

  bannerCode = `<nx-banner variant="success" message="Your changes have been saved.">
</nx-banner>`;

  bannerTs = `// A full-width, dismissible strip for a page-level success message.`;

  inlineCode = `<nx-alert variant="success" title="Success">
    Your profile has been updated.
</nx-alert>`;

  inlineTs = `// For a success message scoped to one section or form, use nx-alert instead.`;

  resultCode = `<nx-result
    status="success"
    title="Payment complete"
    description="A receipt has been emailed to you."
    actionLabel="Back to dashboard">
</nx-result>`;

  resultTs = `// For a full success PAGE (after a checkout, a signup flow, ...), use nx-result instead.`;
}
