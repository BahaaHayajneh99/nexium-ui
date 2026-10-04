import { Component, inject } from '@angular/core';
import { CommonService } from '../services/common.service';
import { NxLoadingOverlay } from '../../../../../dist/components';
import { DemoSection } from '../shared/demo-section/demo-section';

@Component({
  selector: 'app-ui-loading-overlay-demo',
  imports: [NxLoadingOverlay, DemoSection],
  templateUrl: './ui-loading-overlay-demo.html',
  styleUrl: './ui-loading-overlay-demo.scss',
})
export class UiLoadingOverlayDemo {
  importCode = `import { NxLoadingOverlay } from 'nexium-ui';`;

  public commonService = inject(CommonService);

  loading = false;

  toggleLoading(): void {
    this.loading = true;
    setTimeout(() => (this.loading = false), 2000);
  }

  basicCode = `<button (click)="toggleLoading()">Reload data</button>

<nx-loading-overlay [loading]="loading">
    <p>This section's content sits underneath the overlay.</p>
    <p>Click the button above to simulate a 2-second request.</p>
</nx-loading-overlay>`;

  basicTs = `loading = false;

toggleLoading(): void {
  this.loading = true;
  setTimeout(() => (this.loading = false), 2000);
}`;

  messageLoading = true;

  messageCode = `<nx-loading-overlay [loading]="true" message="Loading your dashboard...">
    <div style="height: 160px;"></div>
</nx-loading-overlay>`;

  messageTs = `// loading is simply a boolean input - drive it from any async state.`;

  noBlurCode = `<nx-loading-overlay [loading]="true" [blur]="false" spinnerVariant="success">
    <div style="height: 160px;"></div>
</nx-loading-overlay>`;

  noBlurTs = `// blur defaults to true; spinnerVariant accepts the same variants as nx-spinner.`;
}
