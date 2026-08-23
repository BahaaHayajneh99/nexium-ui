import { Component, inject } from '@angular/core';
import { CommonService } from '../services/common.service';
import { DemoSection } from '../shared/demo-section/demo-section';

@Component({
  selector: 'app-guide-installation-demo',
  imports: [DemoSection],
  templateUrl: './guide-installation-demo.html',
})
export class GuideInstallationDemo {
  public commonService = inject(CommonService);
  installCode = `npm install nexium-ui`;

  usageCode = `import { Component } from '@angular/core';
import { NxButton, NxBadge } from 'nexium-ui';

@Component({
  selector: 'app-example',
  standalone: true,
  imports: [NxButton, NxBadge],
  template: \`
    <nx-button variant="primary">Save</nx-button>
    <nx-badge variant="success">New</nx-badge>
  \`,
})
export class Example {}`;
}
