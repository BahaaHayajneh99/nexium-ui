import { Component, inject } from '@angular/core';
import { CommonService } from '../services/common.service';
import { DemoSection } from '../shared/demo-section/demo-section';

@Component({
  selector: 'app-installation-theme-setup-demo',
  imports: [DemoSection],
  templateUrl: './installation-theme-setup-demo.html',
})
export class InstallationThemeSetupDemo {
  public commonService = inject(CommonService);

  overrideCode = `/* your own global stylesheet, after the nexium-ui stylesheet import */
:root {
  --shell-primary: #7c3aed;
  --shell-border: #e2e2e2;
}`;

  darkModeCode = `// Toggle dark mode by stamping this attribute on <html> - every component
// that reads the --shell-* custom properties responds immediately, no
// theme provider or rebuild required.
document.documentElement.setAttribute('data-theme', 'dark');`;
}
