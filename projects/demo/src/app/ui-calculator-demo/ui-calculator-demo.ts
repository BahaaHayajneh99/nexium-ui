import { Component, inject } from '@angular/core';
import { CommonService } from '../services/common.service';
import { NxCalculator } from '../../../../../dist/components';
import { DemoSection } from '../shared/demo-section/demo-section';

@Component({
  selector: 'app-ui-calculator-demo',
  imports: [NxCalculator, DemoSection],
  templateUrl: './ui-calculator-demo.html',
  styleUrl: './ui-calculator-demo.scss',
})
export class UiCalculatorDemo {
  importCode = `import { NxCalculator } from 'nexium-ui';`;

  public commonService = inject(CommonService);

  basicCode = `<nx-calculator></nx-calculator>`;

  basicTs = `// NxCalculator is fully self-contained - no @Input()s to wire up. Type an expression
// directly (buttons or keyboard both work), including parentheses and operator precedence,
// e.g. "3+4*2" correctly evaluates to 11, not 14.`;
}
