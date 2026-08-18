import { Component } from '@angular/core';

@Component({
  selector: 'app-installation-import-components-demo',
  templateUrl: './installation-import-components-demo.html',
})
export class InstallationImportComponentsDemo {
  usageCode = `import { Component } from '@angular/core';
import { UiInput, UiBadge, UiButton } from 'components';

@Component({
  selector: 'app-example',
  standalone: true,
  imports: [UiInput, UiBadge, UiButton],
  template: \`
    <nx-input label="Email" [(value)]="email"></nx-input>
    <nx-badge variant="success">Verified</nx-badge>
    <nx-button variant="primary">Save</nx-button>
  \`,
})
export class Example {
  email = '';
}`;

  noModuleCode = `// There is no NxModule to import - every component is standalone.
// Add only the components your own component's template actually uses
// to its "imports" array, same as any other standalone Angular component.`;
}
