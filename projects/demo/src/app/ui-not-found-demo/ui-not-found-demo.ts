import { Component, inject } from '@angular/core';
import { CommonService } from '../services/common.service';
import { NxNotFound } from '../../../../../dist/components';
import { DemoSection } from '../shared/demo-section/demo-section';

@Component({
  selector: 'app-ui-not-found-demo',
  imports: [NxNotFound, DemoSection],
  templateUrl: './ui-not-found-demo.html',
  styleUrl: './ui-not-found-demo.scss',
})
export class UiNotFoundDemo {
  importCode = `import { NxNotFound } from 'nexium-ui';`;

  public commonService = inject(CommonService);

  goBack(): void {
    // navigate back
  }

  basicCode = `<nx-not-found (actionClick)="goBack()"></nx-not-found>`;
  basicTs = `// nx-not-found is a preset of nx-result with sensible 404 defaults -
// icon, title, description and actionLabel are all overridable.

goBack(): void {
  // navigate back
}`;

  customCode = `<nx-not-found
    title="We couldn't find that project"
    description="It may have been deleted, or you may not have access to it."
    actionLabel="Back to projects">
</nx-not-found>`;

  customTs = `// Override any of the defaults to fit your own copy.`;
}
