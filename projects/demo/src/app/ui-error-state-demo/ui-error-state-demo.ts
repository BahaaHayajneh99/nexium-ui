import { Component, inject } from '@angular/core';
import { CommonService } from '../services/common.service';
import { NxResult } from '../../../../../dist/components';
import { DemoSection } from '../shared/demo-section/demo-section';

@Component({
  selector: 'app-ui-error-state-demo',
  imports: [NxResult, DemoSection],
  templateUrl: './ui-error-state-demo.html',
  styleUrl: './ui-error-state-demo.scss',
})
export class UiErrorStateDemo {
  importCode = `import { NxResult } from 'nexium-ui';`;

  public commonService = inject(CommonService);

  retry(): void {
    // simulate a retry - wire up to your actual data source
  }

  basicCode = `<nx-result
    status="error"
    title="Something went wrong"
    description="We couldn't load this page. Please try again."
    actionLabel="Retry"
    (actionClick)="retry()">
</nx-result>`;

  basicTs = `// An error state is nx-result used with status="error" - the same
// component also covers success/warning/info pages, so a single
// component handles your whole "status page" family.

retry(): void {
  // reload the data
}`;

  notFoundCode = `<nx-result
    status="error"
    icon="nx-search"
    title="404 - Page not found"
    description="The page you're looking for doesn't exist or has been moved."
    actionLabel="Go back">
</nx-result>`;

  notFoundTs = `// icon overrides the default status icon - here, a search icon fits a 404 better than an X.`;
}
