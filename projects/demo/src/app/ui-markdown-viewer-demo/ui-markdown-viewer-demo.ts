import { Component, inject } from '@angular/core';
import { CommonService } from '../services/common.service';
import { NxMarkdownViewer } from 'components';
import { DemoSection } from '../shared/demo-section/demo-section';

const SAMPLE = `# NexiumUI

A modern, comprehensive **Angular 21+** component library with *zero* external dependencies.

## Features

- 100+ production-ready components
- Fully standalone, signal-based
- Dark mode out of the box

## Quick start

\`\`\`
npm install nexium-ui
\`\`\`

> Every component is tree-shakeable - import only what you use.

Read the [full documentation](https://nexium-ui.example/docs) to get started.`;

@Component({
  selector: 'app-ui-markdown-viewer-demo',
  imports: [NxMarkdownViewer, DemoSection],
  templateUrl: './ui-markdown-viewer-demo.html',
  styleUrl: './ui-markdown-viewer-demo.scss',
})
export class UiMarkdownViewerDemo {
  importCode = `import { NxMarkdownViewer } from 'nexium-ui';`;

  public commonService = inject(CommonService);

  source = SAMPLE;

  basicCode = `<nx-markdown-viewer [source]="source"></nx-markdown-viewer>`;

  basicTs = `source = \`# NexiumUI

A modern, comprehensive **Angular 21+** component library.

- 100+ production-ready components
- Fully standalone, signal-based

> Every component is tree-shakeable.\`;`;
}
