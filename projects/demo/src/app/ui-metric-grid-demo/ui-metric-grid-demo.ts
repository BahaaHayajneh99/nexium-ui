import { Component } from '@angular/core';
import { NxMetricGrid, NxMetricCard } from 'components';
import { DemoSection } from '../shared/demo-section/demo-section';

@Component({
  selector: 'app-ui-metric-grid-demo',
  imports: [NxMetricGrid, NxMetricCard, DemoSection],
  templateUrl: './ui-metric-grid-demo.html',
  styleUrl: './ui-metric-grid-demo.scss',
})
export class UiMetricGridDemo {
  importCode = `import { NxMetricGrid, NxMetricCard } from 'nexium-ui';`;

  basicCode = `<nx-metric-grid>
    <nx-metric-card label="Revenue" prefix="$" [value]="48290" delta="+12.4%"></nx-metric-card>
    <nx-metric-card label="Active Users" [value]="2431" delta="+3.1%"></nx-metric-card>
    <nx-metric-card label="Churn Rate" [value]="2.6" suffix="%" delta="+0.4%" [upIsGood]="false"></nx-metric-card>
    <nx-metric-card label="Avg. Session" [value]="4.8" suffix="m" delta="+0.6%"></nx-metric-card>
</nx-metric-grid>`;

  basicTs = `// nx-metric-grid lays projected content out with CSS grid: repeat(auto-fit, minmax(minColumnWidth, 1fr)) - project several nx-metric-card/nx-kpi-card/nx-sparkline-card tiles inside it.`;

  wideCode = `<nx-metric-grid [minColumnWidth]="260">
    <nx-metric-card label="Revenue" prefix="$" [value]="48290" delta="+12.4%"></nx-metric-card>
    <nx-metric-card label="Active Users" [value]="2431" delta="+3.1%"></nx-metric-card>
</nx-metric-grid>`;

  wideTs = `// minColumnWidth (default 200) controls the min track size passed to minmax() - raise it for wider tiles per row.`;
}
