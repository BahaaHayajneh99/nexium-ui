import { Component, inject } from '@angular/core';
import { CommonService } from '../services/common.service';
import { DemoSection } from '../shared/demo-section/demo-section';

@Component({
  selector: 'app-guide-theming-demo',
  imports: [DemoSection],
  templateUrl: './guide-theming-demo.html',
})
export class GuideThemingDemo {
  public commonService = inject(CommonService);
  tokensCode = `/* Brand */
--primary-color, --primary-color-dark, --primary-color-light
--secondary-color, --secondary-color-dark, --secondary-color-light

/* Status */
--success-color, --success-color-dark
--danger-color, --danger-color-dark
--warning-color, --warning-color-dark
--info-color, --info-color-dark

/* Neutrals */
--white-color, --black-color
--gray-50 ... --gray-900

/* Text & borders */
--text-primary, --text-secondary, --text-disabled, --text-white
--border-color, --border-hover-color`;

  usageCode = `.my-panel {
  border: 1px solid var(--border-color);
  border-radius: 8px;
  padding: 16px;
  color: var(--text-primary);
}`;

  overrideCode = `/* your own global stylesheet, after the ${this.commonService.appName} stylesheet import */
:root {
  --primary-color: #7c3aed;
}`;
}
