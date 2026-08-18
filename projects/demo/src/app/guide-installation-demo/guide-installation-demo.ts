import { Component, inject } from '@angular/core';
import { CommonService } from '../services/common.service';

@Component({
  selector: 'app-guide-installation-demo',
  templateUrl: './guide-installation-demo.html',
})
export class GuideInstallationDemo {
  public commonService = inject(CommonService);
  installCode = `npm install @nexiumui/components @nexiumui/core`;

  usageCode = `import { Component } from '@angular/core';
import { UiButton, UiBadge } from '@nexiumui/components';

@Component({
  selector: 'app-example',
  standalone: true,
  imports: [UiButton, UiBadge],
  template: \`
    <nx-button variant="primary">Save</nx-button>
    <nx-badge variant="success">New</nx-badge>
  \`,
})
export class Example {}`;
}
