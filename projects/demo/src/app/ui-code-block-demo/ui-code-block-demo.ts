import { Component, inject } from '@angular/core';
import { CommonService } from '../services/common.service';
import { NxCodeBlock } from 'components';
import { DemoSection } from '../shared/demo-section/demo-section';

@Component({
  selector: 'app-ui-code-block-demo',
  imports: [NxCodeBlock, DemoSection],
  templateUrl: './ui-code-block-demo.html',
  styleUrl: './ui-code-block-demo.scss',
})
export class UiCodeBlockDemo {
  importCode = `import { NxCodeBlock } from 'nexium-ui';`;

  public commonService = inject(CommonService);

  basicCode = `<nx-code-block
    language="ts"
    code="export function greet(name: string): string {
  return \`Hello, \${name}!\`;
}">
</nx-code-block>`;

  basicTs = `snippet = \`export function greet(name: string): string {
  return \\\`Hello, \\\${name}!\\\`;
}\`;`;

  snippet = `export function greet(name: string): string {
  return \`Hello, \${name}!\`;
}`;

  lineNumbersCode = `<nx-code-block
    language="bash"
    [showLineNumbers]="true"
    [code]="installSteps">
</nx-code-block>`;

  lineNumbersTs = `installSteps = \`npm install nexium-ui
npm install --save-dev @angular/cdk
ng add nexium-ui\`;`;

  installSteps = `npm install nexium-ui
npm install --save-dev @angular/cdk
ng add nexium-ui`;
}
