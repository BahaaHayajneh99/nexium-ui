import { Component, inject } from '@angular/core';
import { CommonService } from '../services/common.service';
import { NxSunburstChart, NxSunburstNode } from 'components';
import { DemoSection } from '../shared/demo-section/demo-section';

@Component({
  selector: 'app-ui-sunburst-chart-demo',
  imports: [NxSunburstChart, DemoSection],
  templateUrl: './ui-sunburst-chart-demo.html',
  styleUrl: './ui-sunburst-chart-demo.scss',
})
export class UiSunburstChartDemo {
  importCode = `import { NxSunburstChart } from 'nexium-ui';`;

  public commonService = inject(CommonService);

  headcount: NxSunburstNode = {
    label: 'Nexium Inc.',
    children: [
      {
        label: 'Engineering',
        children: [
          { label: 'Platform', value: 18 },
          { label: 'Mobile', value: 11 },
          { label: 'QA', value: 7 },
        ],
      },
      {
        label: 'Sales',
        children: [
          { label: 'Enterprise', value: 14 },
          { label: 'SMB', value: 9 },
        ],
      },
      {
        label: 'Marketing',
        children: [
          { label: 'Brand', value: 5 },
          { label: 'Growth', value: 6 },
        ],
      },
      { label: 'People Ops', value: 4 },
    ],
  };

  diskUsage: NxSunburstNode = {
    label: 'Project',
    children: [
      {
        label: 'src',
        children: [
          { label: 'components', value: 420 },
          { label: 'assets', value: 180 },
          { label: 'styles', value: 60 },
        ],
      },
      {
        label: 'node_modules',
        children: [
          { label: '@angular', value: 310 },
          { label: 'rxjs', value: 40 },
          { label: 'other', value: 470 },
        ],
      },
      { label: 'dist', value: 210 },
    ],
  };

  basicCode = `<nx-sunburst-chart [data]="headcount"></nx-sunburst-chart>`;

  basicTs = `headcount: NxSunburstNode = {
  label: 'Nexium Inc.',
  children: [
    {
      label: 'Engineering',
      children: [
        { label: 'Platform', value: 18 },
        { label: 'Mobile', value: 11 },
        { label: 'QA', value: 7 },
      ],
    },
    {
      label: 'Sales',
      children: [
        { label: 'Enterprise', value: 14 },
        { label: 'SMB', value: 9 },
      ],
    },
    // ...
  ],
};`;

  diskCode = `<nx-sunburst-chart [data]="diskUsage"></nx-sunburst-chart>`;

  diskTs = `// A parent's effective value is the sum of its children's effective values, computed recursively -
// "node_modules" above shows as 820 (310 + 40 + 470) even though it has no value of its own.`;
}
