import { Component, inject } from '@angular/core';
import { CommonService } from '../services/common.service';
import { NxRegexTester } from '../../../../../dist/components';
import { DemoSection } from '../shared/demo-section/demo-section';

@Component({
  selector: 'app-ui-regex-tester-demo',
  imports: [NxRegexTester, DemoSection],
  templateUrl: './ui-regex-tester-demo.html',
  styleUrl: './ui-regex-tester-demo.scss',
})
export class UiRegexTesterDemo {
  importCode = `import { NxRegexTester } from 'nexium-ui';`;

  public commonService = inject(CommonService);

  basicCode = `<nx-regex-tester></nx-regex-tester>`;

  basicTs = `// NxRegexTester keeps its own internal state - there are no @Input()s to
// pre-populate it with. It's a self-contained playground: drop it in, then
// type directly into its Pattern, Flags, and Test String fields.`;
}
