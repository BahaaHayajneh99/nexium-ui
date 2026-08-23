import { Component } from '@angular/core';
import { DemoSection } from '../shared/demo-section/demo-section';

@Component({
  selector: 'app-installation-import-components-demo',
  imports: [DemoSection],
  templateUrl: './installation-import-components-demo.html',
})
export class InstallationImportComponentsDemo {
  usageCode = `import { Component } from '@angular/core';
import { NxInput, NxBadge, NxButton } from 'nexium-ui';

@Component({
  selector: 'app-example',
  standalone: true,
  imports: [NxInput, NxBadge, NxButton],
  template: \`
    <nx-input label="Email" [(value)]="email"></nx-input>
    <nx-badge variant="success">Verified</nx-badge>
    <nx-button variant="primary">Save</nx-button>
  \`,
})
export class Example {
  email = '';
}`;

  moduleCode = `import { NgModule } from '@angular/core';
import { NexiumUiModule } from 'nexium-ui';

@NgModule({
  imports: [NexiumUiModule],
})
export class SharedModule {}`;
}
