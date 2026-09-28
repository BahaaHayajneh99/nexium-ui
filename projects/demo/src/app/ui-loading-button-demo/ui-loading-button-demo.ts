import { Component, inject, signal } from '@angular/core';
import { CommonService } from '../services/common.service';
import { NxButton } from '../../../../../dist/components';
import { DemoSection } from '../shared/demo-section/demo-section';

@Component({
  selector: 'app-ui-loading-button-demo',
  imports: [NxButton, DemoSection],
  templateUrl: './ui-loading-button-demo.html',
  styleUrl: './ui-loading-button-demo.scss',
})
export class UiLoadingButtonDemo {
  importCode = `import { NxButton } from 'nexium-ui';`;

  public commonService = inject(CommonService);

  // Signals rather than plain properties: the revert happens inside a
  // setTimeout, outside any Angular-dispatched event, so in this zoneless
  // app a plain property write wouldn't get picked up until some unrelated
  // click happened to trigger a re-render.
  saving = signal(false);

  save(): void {
    this.saving.set(true);
    setTimeout(() => this.saving.set(false), 1800);
  }

  basicCode = `<nx-button variant="primary" [loading]="saving" (click)="save()">
    Save changes
</nx-button>`;

  basicTs = `saving = false;

save(): void {
  this.saving = true;
  setTimeout(() => (this.saving = false), 1800);
}`;

  submitting = signal(false);

  submit(): void {
    this.submitting.set(true);
    setTimeout(() => this.submitting.set(false), 1800);
  }

  loadingTextCode = `<nx-button variant="danger" [loading]="submitting" loadingText="Submitting..." (click)="submit()">
    Delete account
</nx-button>`;

  loadingTextTs = `// loadingText replaces the button's normal content while loading is true -
// leave it unset to keep the original label visible next to the spinner.`;

  variantCode = `<nx-button variant="primary" [loading]="true">Primary</nx-button>
<nx-button variant="outline" [loading]="true">Outline</nx-button>
<nx-button variant="ghost" [loading]="true">Ghost</nx-button>`;

  variantTs = `// The spinner always inherits the button's own text color (currentColor),
// so it matches every variant automatically - no extra configuration.`;
}
