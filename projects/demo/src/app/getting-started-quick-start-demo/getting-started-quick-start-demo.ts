import { Component, inject } from '@angular/core';
import { CommonService } from '../services/common.service';
import { highlightTs } from '../shared/demo-section/ts-highlight';
import { DemoSection } from '../shared/demo-section/demo-section';

@Component({
  selector: 'app-getting-started-quick-start-demo',
  templateUrl: './getting-started-quick-start-demo.html',
  styleUrl: './getting-started-quick-start-demo.scss',
  imports: [DemoSection],
})
export class GettingStartedQuickStartDemo {
  public commonService = inject(CommonService);

  installCode = `npm install nexium-ui`;

  appConfigCode = `import { provideNxTranslate } from 'core';

export const appConfig: ApplicationConfig = {
  providers: [
    // ... other providers
    provideNxTranslate(),
  ],
};`;

  importThemeCode = `// In your main.ts or styles.scss
import 'nexium-ui/styles.css';`;

  buttonUsageCode = `import { NxButtonComponent } from 'nexium-ui';

@Component({
  selector: 'app-example',
  standalone: true,
  imports: [NxButtonComponent],
  template: \`
    <button nx-button>Click Me</button>
    <button nx-button variant="outlined">Outlined</button>
  \`
})
export class ExampleComponent {}`;

  get highlightedInstallCode(): string {
    return highlightTs(this.installCode);
  }

  get highlightedAppConfigCode(): string {
    return highlightTs(this.appConfigCode);
  }

  get highlightedImportThemeCode(): string {
    return highlightTs(this.importThemeCode);
  }

  get highlightedButtonUsageCode(): string {
    return highlightTs(this.buttonUsageCode);
  }
}
