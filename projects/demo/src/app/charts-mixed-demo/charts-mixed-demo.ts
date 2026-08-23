import { Component } from '@angular/core';
import { NxMixedChart, NxMixedSeries } from 'components';
import { DemoSection } from '../shared/demo-section/demo-section';

@Component({
  selector: 'app-charts-mixed-demo',
  imports: [NxMixedChart, DemoSection],
  templateUrl: './charts-mixed-demo.html',
})
export class ChartsMixedDemo {
  importCode = `import { NxMixedChart, NxMixedSeries } from 'nexium-ui';`;

  months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];

  revenueAndGrowth: NxMixedSeries[] = [
    { name: 'Revenue', type: 'bar', data: [42, 53, 61, 54, 69, 77] },
    { name: 'Growth Rate', type: 'line', data: [20, 26, 24, 22, 28, 30] },
  ];

  code = `<nx-mixed-chart [categories]="months" [series]="revenueAndGrowth"></nx-mixed-chart>`;

  tsCode = `months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];

revenueAndGrowth: NxMixedSeries[] = [
  { name: 'Revenue', type: 'bar', data: [42, 53, 61, 54, 69, 77] },
  { name: 'Growth Rate', type: 'line', data: [20, 26, 24, 22, 28, 30] },
];`;
}
