import { Component } from '@angular/core';
import { UiButton, UiBadge } from 'components';

@Component({
  selector: 'app-installation-verify-demo',
  imports: [UiButton, UiBadge],
  templateUrl: './installation-verify-demo.html',
})
export class InstallationVerifyDemo {
  smokeTestCode = `import { Component } from '@angular/core';
import { UiButton, UiBadge } from 'components';

@Component({
  selector: 'app-smoke-test',
  standalone: true,
  imports: [UiButton, UiBadge],
  template: \`
    <nx-button variant="primary">It works</nx-button>
    <nx-badge variant="success">Installed</nx-badge>
  \`,
})
export class SmokeTest {}`;

  checklist = [
    'ng serve (or your dev server) starts without a "paths" or module-not-found error',
    'The button and badge below render styled, not as plain unstyled HTML',
    'Toggling dark mode (set data-theme="dark" on <html>) changes the page background',
    'No console errors mentioning NG0304 (unknown element) for any nx-* tag',
  ];
}
