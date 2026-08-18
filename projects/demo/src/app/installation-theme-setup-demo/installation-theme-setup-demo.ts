import { Component, inject } from '@angular/core';
import { CommonService } from '../services/common.service';

@Component({
  selector: 'app-installation-theme-setup-demo',
  templateUrl: './installation-theme-setup-demo.html',
})
export class InstallationThemeSetupDemo {
  public commonService = inject(CommonService);
  overrideCode = `// styles.scss - override before anything reads the defaults
$primary-color: #7c3aed;
$radius-md: 6px;

@use '@nexium/components/variables' as *;`;

  darkModeCode = `// Toggle dark mode by stamping this attribute on <html> - every component
// that reads --shell-* custom properties (see Theming) responds immediately.
document.documentElement.setAttribute('data-theme', 'dark');`;
}
