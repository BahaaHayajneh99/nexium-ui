import { Component } from '@angular/core';
import { UiAreaChart, NxChartSeries } from 'components';
import { DemoSection } from '../shared/demo-section/demo-section';

@Component({
  selector: 'app-charts-area-demo',
  imports: [UiAreaChart, DemoSection],
  templateUrl: './charts-area-demo.html',
})
export class ChartsAreaDemo {
  months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];

  signups: NxChartSeries[] = [
    { name: 'Signups', data: [180, 240, 220, 310, 360, 420] },
  ];

  signupsByPlan: NxChartSeries[] = [
    { name: 'Free', data: [120, 150, 140, 190, 210, 240] },
    { name: 'Pro', data: [60, 90, 80, 120, 150, 180] },
  ];

  basicCode = `<nx-area-chart [categories]="months" [series]="signups"></nx-area-chart>`;

  multiCode = `<nx-area-chart [categories]="months" [series]="signupsByPlan"></nx-area-chart>`;

  tsCode = `months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];

signupsByPlan: NxChartSeries[] = [
  { name: 'Free', data: [120, 150, 140, 190, 210, 240] },
  { name: 'Pro', data: [60, 90, 80, 120, 150, 180] },
];`;
}
