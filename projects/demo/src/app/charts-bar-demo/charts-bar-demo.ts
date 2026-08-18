import { Component } from '@angular/core';
import { UiBarChart, NxChartSeries } from 'components';
import { DemoSection } from '../shared/demo-section/demo-section';

@Component({
  selector: 'app-charts-bar-demo',
  imports: [UiBarChart, DemoSection],
  templateUrl: './charts-bar-demo.html',
})
export class ChartsBarDemo {
  months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];

  revenue: NxChartSeries[] = [
    { name: 'Revenue', data: [42, 53, 61, 54, 69, 77] },
  ];

  revenueVsExpenses: NxChartSeries[] = [
    { name: 'Revenue', data: [42, 53, 61, 54, 69, 77] },
    { name: 'Expenses', data: [30, 34, 36, 40, 42, 45] },
  ];

  basicCode = `<nx-bar-chart [categories]="months" [series]="revenue"></nx-bar-chart>`;

  groupedCode = `<nx-bar-chart [categories]="months" [series]="revenueVsExpenses"></nx-bar-chart>`;

  tsCode = `months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];

revenueVsExpenses: NxChartSeries[] = [
  { name: 'Revenue', data: [42, 53, 61, 54, 69, 77] },
  { name: 'Expenses', data: [30, 34, 36, 40, 42, 45] },
];`;
}
