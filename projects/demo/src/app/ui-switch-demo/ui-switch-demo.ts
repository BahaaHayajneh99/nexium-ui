import { Component, inject } from '@angular/core';
import { CommonService } from '../services/common.service';
import { UiSwitch } from '../../../../../dist/components';
import { DemoSection } from '../shared/demo-section/demo-section';

@Component({
  selector: 'app-ui-switch-demo',
  imports: [UiSwitch, DemoSection],
  templateUrl: './ui-switch-demo.html',
  styleUrl: './ui-switch-demo.scss',
})
export class UiSwitchDemo {
  public commonService = inject(CommonService);
  notifications = true;

  basicCode = `<nx-switch label="Enable notifications" [(checked)]="notifications">
</nx-switch>`;

  basicTs = `notifications = true;`;

  disabledCode = `<nx-switch label="Disabled switch" [disabled]="true">
</nx-switch>`;
}
