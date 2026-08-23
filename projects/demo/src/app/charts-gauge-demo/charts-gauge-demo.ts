import { Component } from '@angular/core';
import { NxGaugeChart, NxGaugeBand } from 'components';
import { DemoSection } from '../shared/demo-section/demo-section';

@Component({
  selector: 'app-charts-gauge-demo',
  imports: [NxGaugeChart, DemoSection],
  templateUrl: './charts-gauge-demo.html',
})
export class ChartsGaugeDemo {
  importCode = `import { NxGaugeChart, NxGaugeBand } from 'nexium-ui';`;

  cpuBands: NxGaugeBand[] = [
    { to: 60, variant: 'success', label: 'Normal' },
    { to: 85, variant: 'warning', label: 'Elevated' },
    { to: 100, variant: 'danger', label: 'Critical' },
  ];

  basicCode = `<nx-gauge-chart [value]="42" [min]="0" [max]="100" label="CPU Usage" valueSuffix="%"></nx-gauge-chart>`;

  bandsCode = `<nx-gauge-chart
  [value]="78"
  [min]="0"
  [max]="100"
  [bands]="cpuBands"
  label="CPU Usage"
  valueSuffix="%">
</nx-gauge-chart>`;

  tsCode = `cpuBands: NxGaugeBand[] = [
  { to: 60, variant: 'success', label: 'Normal' },
  { to: 85, variant: 'warning', label: 'Elevated' },
  { to: 100, variant: 'danger', label: 'Critical' },
];`;
}
