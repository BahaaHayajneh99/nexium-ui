import { Component, inject } from '@angular/core';
import { CommonService } from '../services/common.service';
import { highlightTs } from '../shared/demo-section/ts-highlight';
import { DemoSection } from '../shared/demo-section/demo-section';

@Component({
  selector: 'app-getting-started-configuration-demo',
  templateUrl: './getting-started-configuration-demo.html',
  styleUrl: './getting-started-configuration-demo.scss', 
  imports: [DemoSection],
})
export class GettingStartedConfigurationDemo {
  public commonService = inject(CommonService);

  providerCode = `import { provideNxTranslate } from 'core';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouterWithPreloading(appRoutes, PreloadAllModules),
    provideAnimations(),
    provideNxTranslate(),
  ],
};`;

  customThemeCode = `// In your main.scss or inline styles
:root {
  --primary-color: #3498db;
  --secondary-color: #2ecc71;
  --success-color: #27ae60;
  --danger-color: #e74c3c;
  --warning-color: #f39c12;
  --info-color: #17a2b8;
  
  /* Gray palette */
  --gray-50: #f8f9fa;
  --gray-100: #f1f3f5;
  --gray-900: #212529;
  
  /* Text colors */
  --text-primary: #212529;
  --text-secondary: #6c757d;
  --text-disabled: #adb5bd;
}

/* Dark theme */
@media (prefers-color-scheme: dark) {
  :root {
    --text-primary: #f8f9fa;
    --text-secondary: #adb5bd;
    --background: #1a1a1a;
  }
}`;

  moduleImportsCode = `import { NxButtonComponent, NxInputComponent, NxSelectComponent } from 'nexium-ui';

@Component({
  selector: 'app-my-component',
  standalone: true,
  imports: [
    CommonModule,
    NxButtonComponent,
    NxInputComponent,
    NxSelectComponent,
  ],
  template: \`
    <button nx-button>Submit</button>
    <input nx-input placeholder="Enter text" />
  \`
})
export class MyComponent {}`;

  get highlightedProviderCode(): string {
    return highlightTs(this.providerCode);
  }

  get highlightedCustomThemeCode(): string {
    return highlightTs(this.customThemeCode);
  }

  get highlightedModuleImportsCode(): string {
    return highlightTs(this.moduleImportsCode);
  }
}
