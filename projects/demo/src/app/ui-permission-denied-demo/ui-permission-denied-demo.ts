import { Component, inject } from '@angular/core';
import { CommonService } from '../services/common.service';
import { NxPermissionDenied } from '../../../../../dist/components';
import { DemoSection } from '../shared/demo-section/demo-section';

@Component({
  selector: 'app-ui-permission-denied-demo',
  imports: [NxPermissionDenied, DemoSection],
  templateUrl: './ui-permission-denied-demo.html',
  styleUrl: './ui-permission-denied-demo.scss',
})
export class UiPermissionDeniedDemo {
  importCode = `import { NxPermissionDenied } from 'nexium-ui';`;

  public commonService = inject(CommonService);

  goBack(): void {
    // navigate back
  }

  basicCode = `<nx-permission-denied (actionClick)="goBack()"></nx-permission-denied>`;
  basicTs = `// nx-permission-denied is a preset of nx-result with sensible 403 defaults.

goBack(): void {
  // navigate back
}`;

  customCode = `<nx-permission-denied
    title="Admins only"
    description="Ask a workspace admin to grant you access to this section.">
</nx-permission-denied>`;

  customTs = `// Override any of the defaults to fit your own copy.`;
}
