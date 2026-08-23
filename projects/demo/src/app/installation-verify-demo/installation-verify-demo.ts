import { Component } from '@angular/core';
import { NxButton, NxBadge } from '../../../../../dist/components';
import { DemoSection } from '../shared/demo-section/demo-section';

@Component({
  selector: 'app-installation-verify-demo',
  imports: [NxButton, NxBadge, DemoSection],
  templateUrl: './installation-verify-demo.html',
})
export class InstallationVerifyDemo {
  smokeTestCode = `import { Component } from '@angular/core';
import { NxButton, NxBadge } from 'nexium-ui';

@Component({
  selector: 'app-smoke-test',
  standalone: true,
  imports: [NxButton, NxBadge],
  template: \`
    <nx-button variant="primary">It works</nx-button>
    <nx-badge variant="success">Installed</nx-badge>
  \`,
})
export class SmokeTest {}`;

  checklist = [
    'ng serve (or your dev server) starts without a module-not-found error',
    'The button and badge below render styled, not as plain unstyled HTML',
    'Toggling dark mode (set data-theme="dark" on <html>) changes the page background',
    'No console errors mentioning NG0304 (unknown element) for any nx-* tag',
  ];
}
