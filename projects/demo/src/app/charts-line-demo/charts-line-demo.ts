import { Component } from '@angular/core';
import { UiLineChart, NxChartSeries } from 'components';
import { DemoSection } from '../shared/demo-section/demo-section';

@Component({
  selector: 'app-charts-line-demo',
  imports: [UiLineChart, DemoSection],
  templateUrl: './charts-line-demo.html',
})
export class ChartsLineDemo {
  months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];

  activeUsers: NxChartSeries[] = [
    { name: 'Active Users', data: [820, 932, 901, 1034, 1290, 1330] },
  ];

  usersByDevice: NxChartSeries[] = [
    { name: 'Desktop', data: [520, 610, 590, 640, 720, 760] },
    { name: 'Mobile', data: [300, 322, 311, 394, 570, 570] },
  ];

  basicCode = `<nx-line-chart [categories]="months" [series]="activeUsers"></nx-line-chart>`;

  multiCode = `<nx-line-chart [categories]="months" [series]="usersByDevice"></nx-line-chart>`;

  tsCode = `months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];

usersByDevice: NxChartSeries[] = [
  { name: 'Desktop', data: [520, 610, 590, 640, 720, 760] },
  { name: 'Mobile', data: [300, 322, 311, 394, 570, 570] },
];`;
}
