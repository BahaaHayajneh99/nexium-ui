import { Component, inject } from '@angular/core';
import { CommonService } from '../services/common.service';
import { UiAlert } from '../../../../../dist/components';
import { DemoSection } from '../shared/demo-section/demo-section';

@Component({
  selector: 'app-ui-alert-demo',
  imports: [UiAlert, DemoSection],
  templateUrl: './ui-alert-demo.html',
  styleUrl: './ui-alert-demo.scss',
})
export class UiAlertDemo {
  public commonService = inject(CommonService);
  basicCode = `<nx-alert>
    A new version is available.
</nx-alert>`;

  variantsCode = `<nx-alert variant="success">Your changes have been saved.</nx-alert>
<nx-alert variant="danger">Something went wrong. Please try again.</nx-alert>
<nx-alert variant="warning">Your subscription is about to expire.</nx-alert>
<nx-alert variant="info">A new version is available.</nx-alert>`;

  titleCode = `<nx-alert variant="success" title="Payment successful">
    Your order #1029 has been confirmed.
</nx-alert>`;

  dismissibleCode = `<nx-alert variant="warning" dismissible (dismissed)="onDismissed()">
    This workspace will be archived in 7 days.
</nx-alert>`;

  noIconCode = `<nx-alert variant="info" [icon]="false">
    Plain alert without a leading icon.
</nx-alert>`;

  onDismissed(): void {
    console.log('Alert dismissed');
  }
}
