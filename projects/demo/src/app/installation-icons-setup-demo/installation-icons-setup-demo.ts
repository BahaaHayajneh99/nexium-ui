import { Component } from '@angular/core';
import { UiIcon } from 'components';

@Component({
  selector: 'app-installation-icons-setup-demo',
  imports: [UiIcon],
  templateUrl: './installation-icons-setup-demo.html',
})
export class InstallationIconsSetupDemo {
  usageCode = `<nx-icon icon="nx-check-circle" variant="svg" [size]="18"></nx-icon>`;

  noSetupCode = `// No icon font, no separate package, no build step - every icon is an
// inline SVG string in a single registry object, bundled with the library.`;
}
