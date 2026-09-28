import { Component, inject } from '@angular/core';
import { CommonService } from '../services/common.service';
import { NxDiffViewer } from 'components';
import { DemoSection } from '../shared/demo-section/demo-section';

@Component({
  selector: 'app-ui-diff-viewer-demo',
  imports: [NxDiffViewer, DemoSection],
  templateUrl: './ui-diff-viewer-demo.html',
  styleUrl: './ui-diff-viewer-demo.scss',
})
export class UiDiffViewerDemo {
  importCode = `import { NxDiffViewer } from 'nexium-ui';`;

  public commonService = inject(CommonService);

  basicCode = `<nx-diff-viewer [oldText]="oldConfig" [newText]="newConfig"></nx-diff-viewer>`;

  basicTs = `oldConfig = \`{
  "name": "nexium-ui",
  "version": "1.2.0",
  "private": true
}\`;

newConfig = \`{
  "name": "nexium-ui",
  "version": "1.3.0",
  "private": true,
  "license": "MIT"
}\`;`;

  oldConfig = `{
  "name": "nexium-ui",
  "version": "1.2.0",
  "private": true
}`;

  newConfig = `{
  "name": "nexium-ui",
  "version": "1.3.0",
  "private": true,
  "license": "MIT"
}`;

  textCode = `<nx-diff-viewer [oldText]="oldReadme" [newText]="newReadme"></nx-diff-viewer>`;

  textTs = `// A unified line-by-line diff, computed with the classic LCS algorithm -
// fine for config/snippet-sized text, not optimized for huge files.
oldReadme = \`# Nexium UI
A component library for Angular.
Install with npm.\`;

newReadme = \`# Nexium UI
A modern component library for Angular.
Install with npm or yarn.
See the docs for more.\`;`;

  oldReadme = `# Nexium UI
A component library for Angular.
Install with npm.`;

  newReadme = `# Nexium UI
A modern component library for Angular.
Install with npm or yarn.
See the docs for more.`;
}
