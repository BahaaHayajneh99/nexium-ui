import { Component, inject } from '@angular/core';
import { CommonService } from '../services/common.service';
import { DemoSection } from '../shared/demo-section/demo-section';

@Component({
  selector: 'app-getting-started-demo',
  imports: [DemoSection],
  templateUrl: './getting-started-demo.html',
  styleUrl: './getting-started-demo.scss',
})
export class GettingStartedDemo {
  public commonService = inject(CommonService);

  installCode = `npm install nexium-ui`;

  angularJsonStylesCode = `"architect": {
  "build": {
    "options": {
      "styles": [
        "node_modules/nexium-ui/styles.css",
        "src/styles.scss"
      ]
    }
  }
}`;

  globalImportStylesCode = `@import 'nexium-ui/styles.css';`;

  standaloneUsageCode = `import { Component } from '@angular/core';
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

  moduleUsageCode = `import { NgModule } from '@angular/core';
import { NexiumUiModule } from 'nexium-ui';

@NgModule({
  imports: [NexiumUiModule],
})
export class SharedModule {}`;

  designTokensCode = `.my-panel {
  background: var(--shell-surface);
  border: 1px solid var(--shell-border);
  border-radius: 8px;
  color: var(--shell-text);
  padding: 16px;
}`;
}
