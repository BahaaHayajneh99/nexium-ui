import { Component, inject } from '@angular/core';
import { CommonService } from '../services/common.service';
import { NxTableOfContents, NxTocHeading } from '../../../../../dist/components';
import { DemoSection } from '../shared/demo-section/demo-section';

@Component({
  selector: 'app-ui-table-of-contents-demo',
  imports: [NxTableOfContents, DemoSection],
  templateUrl: './ui-table-of-contents-demo.html',
  styleUrl: './ui-table-of-contents-demo.scss',
})
export class UiTableOfContentsDemo {
  importCode = `import { NxTableOfContents } from 'nexium-ui';`;

  public commonService = inject(CommonService);

  headings: NxTocHeading[] = [
    { id: 'toc-introduction', label: 'Introduction', level: 1 },
    { id: 'toc-getting-started', label: 'Getting started', level: 1 },
    { id: 'toc-installation', label: 'Installation', level: 2 },
    { id: 'toc-configuration', label: 'Configuration', level: 2 },
    { id: 'toc-core-concepts', label: 'Core concepts', level: 1 },
    { id: 'toc-components', label: 'Components', level: 2 },
    { id: 'toc-theming', label: 'Theming', level: 2 },
    { id: 'toc-advanced', label: 'Advanced usage', level: 1 },
    { id: 'toc-faq', label: 'FAQ', level: 1 },
  ];

  basicCode = `<nx-table-of-contents [headings]="headings"></nx-table-of-contents>`;

  basicTs = `headings: NxTocHeading[] = [
  { id: 'introduction', label: 'Introduction', level: 1 },
  { id: 'getting-started', label: 'Getting started', level: 1 },
  { id: 'installation', label: 'Installation', level: 2 },
  { id: 'configuration', label: 'Configuration', level: 2 },
  { id: 'core-concepts', label: 'Core concepts', level: 1 },
  // ...
];`;
}
