import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonService } from '../services/common.service';
import { DemoSection } from '../shared/demo-section/demo-section';
import { ForceUnlicensed } from '../shared/force-unlicensed/force-unlicensed';
import { NxRichTextEditor } from 'components';

@Component({
  selector: 'app-getting-started-using-pro-demo',
  templateUrl: './getting-started-using-pro-demo.html',
  styleUrl: './getting-started-using-pro-demo.scss',
  imports: [DemoSection, RouterLink, ForceUnlicensed, NxRichTextEditor],
})
export class GettingStartedUsingProDemo {
  public commonService = inject(CommonService);

  gatedTemplateCode = `<nx-kanban [columns]="columns"></nx-kanban>
<!-- Renders the real board once licensed, a locked placeholder otherwise -->`;

  providerCode = `import { provideNxLicense } from 'nexium-ui';

// app.config.ts
export const appConfig: ApplicationConfig = {
  providers: [
    provideNxLicense('paste-your-license-token-here'),
    // ...your other providers
  ],
};`;

  checkTokenCode = `import { NX_LICENSE_TOKEN, nxProLicenseGranted } from 'nexium-ui';

export class MyComponent {
  // A Signal<boolean> - starts false, flips true once the token is
  // confirmed against the live license pool.
  licensed = nxProLicenseGranted();
}`;

  liveDemoCode = `<nx-rich-text-editor></nx-rich-text-editor>`;
}
