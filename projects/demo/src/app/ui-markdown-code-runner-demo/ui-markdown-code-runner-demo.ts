import { Component, inject } from '@angular/core';
import { CommonService } from '../services/common.service';
import { NxMarkdownCodeRunner, NxCodeRunnerBlock } from '../../../../../dist/components';
import { DemoSection } from '../shared/demo-section/demo-section';

const BLOCKS: NxCodeRunnerBlock[] = [
  {
    language: 'javascript',
    code: `const nums = [4, 8, 15, 16, 23, 42];
const total = nums.reduce((sum, n) => sum + n, 0);
console.log('Numbers:', nums.join(', '));
console.log('Total:', total);`,
  },
  {
    language: 'js',
    code: `function divide(a, b) {
  if (b === 0) {
    throw new Error('Cannot divide by zero');
  }
  return a / b;
}

console.log(divide(10, 0));`,
  },
  {
    language: 'html',
    code: `<section class="card">
  <h2>Hello</h2>
  <p>Non-JS blocks like this one don't get a Run button.</p>
</section>`,
  },
];

const MINIMAL_BLOCK: NxCodeRunnerBlock[] = [
  {
    language: 'javascript',
    code: `console.log('Hello, NexiumUI!');`,
  },
];

@Component({
  selector: 'app-ui-markdown-code-runner-demo',
  imports: [NxMarkdownCodeRunner, DemoSection],
  templateUrl: './ui-markdown-code-runner-demo.html',
  styleUrl: './ui-markdown-code-runner-demo.scss',
})
export class UiMarkdownCodeRunnerDemo {
  importCode = `import { NxMarkdownCodeRunner } from 'nexium-ui';`;

  public commonService = inject(CommonService);

  blocks = BLOCKS;
  basicCode = `<nx-markdown-code-runner [blocks]="blocks"></nx-markdown-code-runner>`;
  basicTs = `blocks = [
  { language: 'javascript', code: '...sums an array and logs the numbers and total...' },
  { language: 'js', code: '...throws a divide-by-zero error to show the error path...' },
  { language: 'html', code: '<section class="card">...</section>' }, // no Run button
];`;

  minimalBlocks = MINIMAL_BLOCK;
  minimalCode = `<nx-markdown-code-runner [blocks]="blocks"></nx-markdown-code-runner>`;
  minimalTs = `blocks = [
  { language: 'javascript', code: "console.log('Hello, NexiumUI!');" },
];`;
}
