import { Component } from '@angular/core';
import { UiPieChart, NxPieDatum } from 'components';
import { DemoSection } from '../shared/demo-section/demo-section';

@Component({
  selector: 'app-charts-doughnut-demo',
  imports: [UiPieChart, DemoSection],
  templateUrl: './charts-doughnut-demo.html',
})
export class ChartsDoughnutDemo {
  planUsage: NxPieDatum[] = [
    { label: 'Storage', value: 42 },
    { label: 'Bandwidth', value: 28 },
    { label: 'API Calls', value: 18 },
    { label: 'Compute', value: 12 },
  ];

  wideCode = `<nx-pie-chart [data]="planUsage" [innerRadius]="0.75"></nx-pie-chart>`;

  narrowCode = `<nx-pie-chart [data]="planUsage" [innerRadius]="0.45"></nx-pie-chart>`;

  tsCode = `planUsage: NxPieDatum[] = [
  { label: 'Storage', value: 42 },
  { label: 'Bandwidth', value: 28 },
  { label: 'API Calls', value: 18 },
  { label: 'Compute', value: 12 },
];`;
}
