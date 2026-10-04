import { Component } from '@angular/core';
import { NxMetricCard } from 'components';
import { DemoSection } from '../shared/demo-section/demo-section';

@Component({
  selector: 'app-ui-metric-card-demo',
  imports: [NxMetricCard, DemoSection],
  templateUrl: './ui-metric-card-demo.html',
  styleUrl: './ui-metric-card-demo.scss',
})
export class UiMetricCardDemo {
  importCode = `import { NxMetricCard } from 'nexium-ui';`;

  basicCode = `<nx-metric-card label="Revenue" prefix="$" [value]="48290" delta="+12.4%"></nx-metric-card>`;

  basicTs = `// NxMetricCard wraps NxStatistic in a bordered, padded card - same inputs: label, value, prefix, suffix, delta, direction, upIsGood.`;

  rowCode = `<nx-metric-card label="Revenue" prefix="$" [value]="48290" delta="+12.4%"></nx-metric-card>
<nx-metric-card label="Active Users" [value]="2431" delta="+3.1%"></nx-metric-card>
<nx-metric-card label="Churn Rate" [value]="2.6" suffix="%" delta="+0.4%" [upIsGood]="false"></nx-metric-card>`;

  rowTs = `// upIsGood defaults to true - set it to false for metrics like churn where an increase should read as bad even though the delta is positive.`;

  directionCode = `<nx-metric-card label="Signups" [value]="812" delta="-4.2%" direction="down" [upIsGood]="false"></nx-metric-card>`;

  directionTs = `// direction ('up' | 'down' | 'neutral') overrides the automatic sign detection from delta when you need to force it explicitly.`;
}
