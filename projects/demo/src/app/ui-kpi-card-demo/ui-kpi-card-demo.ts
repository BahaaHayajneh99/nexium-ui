import { Component } from '@angular/core';
import { NxKpiCard } from 'components';
import { DemoSection } from '../shared/demo-section/demo-section';

@Component({
  selector: 'app-ui-kpi-card-demo',
  imports: [NxKpiCard, DemoSection],
  templateUrl: './ui-kpi-card-demo.html',
  styleUrl: './ui-kpi-card-demo.scss',
})
export class UiKpiCardDemo {
  importCode = `import { NxKpiCard } from 'nexium-ui';`;

  basicCode = `<nx-kpi-card label="Sales Goal" [value]="42000" [target]="60000"></nx-kpi-card>`;

  basicTs = `// percent is derived from value / target, clamped between 0 and 100, and drives the progress bar fill and the percent label.`;

  gridCode = `<nx-kpi-card label="Storage Used" [value]="68" [target]="100" unit=" GB"></nx-kpi-card>
<nx-kpi-card label="Tasks Completed" [value]="34" [target]="40" unit=" tasks"></nx-kpi-card>
<nx-kpi-card label="Uptime" [value]="99.95" [target]="100" unit="%"></nx-kpi-card>`;

  gridTs = `// unit is appended after both the value and the target, e.g. "68 GB of 100 GB".`;
}
