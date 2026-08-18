import { Component } from '@angular/core';
import { UiBarChart, NxChartSeries } from 'components';
import { DemoSection } from '../shared/demo-section/demo-section';

@Component({
  selector: 'app-charts-stacked-bar-demo',
  imports: [UiBarChart, DemoSection],
  templateUrl: './charts-stacked-bar-demo.html',
})
export class ChartsStackedBarDemo {
  months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];

  revenueByPlan: NxChartSeries[] = [
    { name: 'Starter', data: [12, 14, 15, 17, 18, 20] },
    { name: 'Pro', data: [20, 24, 26, 28, 31, 34] },
    { name: 'Team', data: [10, 15, 18, 22, 26, 30] },
  ];

  code = `<nx-bar-chart [categories]="months" [series]="revenueByPlan" [stacked]="true"></nx-bar-chart>`;

  tsCode = `months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];

revenueByPlan: NxChartSeries[] = [
  { name: 'Starter', data: [12, 14, 15, 17, 18, 20] },
  { name: 'Pro', data: [20, 24, 26, 28, 31, 34] },
  { name: 'Team', data: [10, 15, 18, 22, 26, 30] },
];`;
}
