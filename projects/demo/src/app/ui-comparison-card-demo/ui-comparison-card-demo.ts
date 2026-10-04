import { Component } from '@angular/core';
import { NxComparisonCard } from 'components';
import { DemoSection } from '../shared/demo-section/demo-section';

@Component({
  selector: 'app-ui-comparison-card-demo',
  imports: [NxComparisonCard, DemoSection],
  templateUrl: './ui-comparison-card-demo.html',
  styleUrl: './ui-comparison-card-demo.scss',
})
export class UiComparisonCardDemo {
  importCode = `import { NxComparisonCard } from 'nexium-ui';`;

  basicCode = `<nx-comparison-card
    label="Revenue"
    prefix="$"
    [currentValue]="48290"
    [previousValue]="42950"
    currentLabel="This quarter"
    previousLabel="Last quarter">
</nx-comparison-card>`;

  basicTs = `// deltaPercent and the up/down/neutral direction are derived automatically from currentValue vs previousValue.`;

  gridCode = `<nx-comparison-card label="Revenue" prefix="$" [currentValue]="48290" [previousValue]="42950"></nx-comparison-card>
<nx-comparison-card label="Bounce Rate" suffix="%" [currentValue]="38" [previousValue]="31" [upIsGood]="false"></nx-comparison-card>`;

  gridTs = `// upIsGood defaults to true - set it to false for metrics like bounce rate where an increase should read as bad.`;
}
