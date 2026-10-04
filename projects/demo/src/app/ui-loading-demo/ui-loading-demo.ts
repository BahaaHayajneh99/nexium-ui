import { Component, inject } from '@angular/core';
import { CommonService } from '../services/common.service';
import { NxLoadingState } from '../../../../../dist/components';
import { DemoSection } from '../shared/demo-section/demo-section';

@Component({
  selector: 'app-ui-loading-demo',
  imports: [NxLoadingState, DemoSection],
  templateUrl: './ui-loading-demo.html',
  styleUrl: './ui-loading-demo.scss',
})
export class UiLoadingDemo {
  importCode = `import { NxLoadingState } from 'nexium-ui';`;

  public commonService = inject(CommonService);

  basicCode = `<nx-loading-state title="Loading..."></nx-loading-state>`;
  basicTs = `// A full-section placeholder for an initial fetch - the loading sibling
// of nx-empty-state and nx-result. For blocking a section that's already
// showing content while it refreshes, use nx-loading-overlay instead.`;

  descriptionCode = `<nx-loading-state
    title="Fetching your dashboard"
    description="This usually takes a few seconds.">
</nx-loading-state>`;
  descriptionTs = `// title and description work exactly like nx-empty-state and nx-result.`;

  variantCode = `<nx-loading-state title="Loading..." spinnerVariant="success"></nx-loading-state>
<nx-loading-state title="Loading..." spinnerVariant="danger"></nx-loading-state>
<nx-loading-state title="Loading..." spinnerSize="small"></nx-loading-state>`;
  variantTs = `// spinnerVariant accepts the same variants as nx-spinner; spinnerSize
// accepts 'small' | 'medium' | 'large' (default 'large').`;
}
