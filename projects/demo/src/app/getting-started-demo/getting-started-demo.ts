import { Component, inject } from '@angular/core';
import { CommonService } from '../services/common.service';

@Component({
  selector: 'app-getting-started-demo',
  templateUrl: './getting-started-demo.html',
  styleUrl: './getting-started-demo.scss',
})
export class GettingStartedDemo {
  public commonService = inject(CommonService);
  cloneCode = `git clone <this-repo>
cd ${this.commonService.appName}
npm install`;

  buildLibsCode = `ng build components
ng build core`;

  serveCode = `ng serve`;

  publishedInstallCode = `npm install @nexiumui/components`;

  tsconfigPathsCode = `{
  "compilerOptions": {
    "paths": {
      "components": ["./dist/components"],
      "core": ["./dist/core"]
    }
  }
}`;

  standaloneUsageCode = `import { Component } from '@angular/core';
import { UiButton, UiBadge } from '@nexiumui/components';

@Component({
  selector: 'app-example',
  standalone: true,
  imports: [UiButton, UiBadge],
  template: \`
    <nx-button variant="primary">Save</nx-button>
    <nx-badge variant="success">New</nx-badge>
  \`,
})
export class Example {}`;

  scssTokensCode = `@use '../../../../../demo/src/app/variables.scss' as *;

.my-panel {
  border: 1px solid $border-color;
  border-radius: $radius-md;
  padding: $spacing-md;
}`;
}
