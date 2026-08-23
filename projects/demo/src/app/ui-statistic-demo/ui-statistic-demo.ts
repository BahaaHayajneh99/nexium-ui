import { Component } from '@angular/core';
import { NxStatistic } from 'components';
import { DemoSection } from '../shared/demo-section/demo-section';

@Component({
  selector: 'app-ui-statistic-demo',
  imports: [NxStatistic, DemoSection],
  templateUrl: './ui-statistic-demo.html',
})
export class UiStatisticDemo {
  importCode = `import { NxStatistic } from 'nexium-ui';`;

  basicCode = `<nx-statistic label="Revenue" prefix="$" [value]="48290" delta="+12.4%"></nx-statistic>`;

  rowCode = `<nx-statistic label="Revenue" prefix="$" [value]="48290" delta="+12.4%"></nx-statistic>
<nx-statistic label="Active Users" [value]="2431" delta="+3.1%"></nx-statistic>
<nx-statistic label="Churn Rate" [value]="2.6" suffix="%" delta="+0.4%" [upIsGood]="false"></nx-statistic>`;
}
