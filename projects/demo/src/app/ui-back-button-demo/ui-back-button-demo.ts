import { Component, inject } from '@angular/core';
import { CommonService } from '../services/common.service';
import { NxBackButton } from 'components';
import { DemoSection } from '../shared/demo-section/demo-section';

@Component({
  selector: 'app-ui-back-button-demo',
  imports: [NxBackButton, DemoSection],
  templateUrl: './ui-back-button-demo.html',
  styleUrl: './ui-back-button-demo.scss',
})
export class UiBackButtonDemo {
  importCode = `import { NxBackButton } from 'nexium-ui';`;

  public commonService = inject(CommonService);

  basicCode = `<nx-back-button></nx-back-button>`;

  basicTs = `// Navigates via browser history (location.back()) by default.`;

  customCode = `<nx-back-button label="Back to results" [preventNavigation]="true" (backClick)="onBackClick()"></nx-back-button>
<p>Clicks: {{ clickCount }}</p>`;

  customTs = `// preventNavigation is set here purely so this live demo doesn't leave the
// page - by default backClick still fires and location.back() also runs.
clickCount = 0;

onBackClick(): void {
  this.clickCount++;
}`;

  clickCount = 0;

  onBackClick(): void {
    this.clickCount++;
  }

  preventCode = `<nx-back-button label="Cancel" [preventNavigation]="true" (backClick)="onCancel()"></nx-back-button>`;

  preventTs = `// preventNavigation stops the browser-history navigation - use this when
// you want backClick to fully own the behavior instead (e.g. closing a modal).
onCancel(): void {
  // close a modal, reset a wizard step, etc.
}`;

  onCancel(): void {
    // In a real app: close a modal, reset a wizard step, etc.
  }
}
