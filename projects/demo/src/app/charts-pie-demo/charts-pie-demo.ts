import { Component } from '@angular/core';
import { UiPieChart, NxPieDatum } from 'components';
import { DemoSection } from '../shared/demo-section/demo-section';

@Component({
  selector: 'app-charts-pie-demo',
  imports: [UiPieChart, DemoSection],
  templateUrl: './charts-pie-demo.html',
})
export class ChartsPieDemo {
  browserShare: NxPieDatum[] = [
    { label: 'Chrome', value: 64 },
    { label: 'Safari', value: 19 },
    { label: 'Edge', value: 9 },
    { label: 'Firefox', value: 5 },
    { label: 'Other', value: 3 },
  ];

  pieCode = `<nx-pie-chart [data]="browserShare"></nx-pie-chart>`;

  donutCode = `<nx-pie-chart [data]="browserShare" [innerRadius]="0.65"></nx-pie-chart>`;

  tsCode = `browserShare: NxPieDatum[] = [
  { label: 'Chrome', value: 64 },
  { label: 'Safari', value: 19 },
  { label: 'Edge', value: 9 },
  { label: 'Firefox', value: 5 },
  { label: 'Other', value: 3 },
];`;
}
