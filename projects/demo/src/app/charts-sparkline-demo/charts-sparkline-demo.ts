import { Component } from '@angular/core';
import { UiSparkline, UiCard, UiCardContent } from 'components';
import { DemoSection } from '../shared/demo-section/demo-section';

interface Metric {
  label: string;
  value: string;
  trend: number[];
}

@Component({
  selector: 'app-charts-sparkline-demo',
  imports: [UiSparkline, UiCard, UiCardContent, DemoSection],
  templateUrl: './charts-sparkline-demo.html',
})
export class ChartsSparklineDemo {
  revenueTrend = [12, 15, 14, 18, 22, 20, 26, 30, 28, 34];

  metrics: Metric[] = [
    { label: 'Revenue', value: '$34.2k', trend: [12, 15, 14, 18, 22, 20, 26, 30, 28, 34] },
    { label: 'Churn Rate', value: '2.7%', trend: [4.2, 4.0, 3.8, 3.9, 3.5, 3.6, 3.2, 3.0, 2.9, 2.7] },
    { label: 'Active Users', value: '9,430', trend: [6.1, 6.4, 6.3, 6.8, 7.2, 7.0, 7.9, 8.4, 9.0, 9.43] },
  ];

  basicCode = `<nx-sparkline [data]="revenueTrend"></nx-sparkline>`;

  areaCode = `<nx-sparkline [data]="revenueTrend" [showArea]="true"></nx-sparkline>`;

  rowCode = `<nx-card variant="outlined">
    <nx-card-content>
        <div>{{ metric.label }}</div>
        <strong>{{ metric.value }}</strong>
        <nx-sparkline [data]="metric.trend" [showArea]="true"></nx-sparkline>
    </nx-card-content>
</nx-card>`;

  tsCode = `revenueTrend = [12, 15, 14, 18, 22, 20, 26, 30, 28, 34];`;
}
