import { Component } from '@angular/core';
import { UiScatterChart, NxScatterSeries } from 'components';
import { DemoSection } from '../shared/demo-section/demo-section';

@Component({
  selector: 'app-charts-scatter-demo',
  imports: [UiScatterChart, DemoSection],
  templateUrl: './charts-scatter-demo.html',
})
export class ChartsScatterDemo {
  loadTimes: NxScatterSeries[] = [
    {
      name: 'Sessions',
      data: [
        { x: 1.2, y: 320 }, { x: 2.4, y: 410 }, { x: 0.8, y: 210 }, { x: 3.1, y: 540 },
        { x: 1.8, y: 300 }, { x: 4.2, y: 610 }, { x: 2.9, y: 460 }, { x: 0.5, y: 150 },
      ],
    },
  ];

  cohorts: NxScatterSeries[] = [
    {
      name: 'Free',
      data: [{ x: 1.2, y: 320 }, { x: 2.4, y: 410 }, { x: 0.8, y: 210 }, { x: 1.8, y: 300 }],
    },
    {
      name: 'Pro',
      data: [{ x: 3.1, y: 540 }, { x: 4.2, y: 610 }, { x: 2.9, y: 460 }, { x: 3.6, y: 520 }],
    },
  ];

  basicCode = `<nx-scatter-chart [series]="loadTimes" xLabel="Page weight (MB)" yLabel="Load time (ms)"></nx-scatter-chart>`;

  cohortCode = `<nx-scatter-chart [series]="cohorts" xLabel="Page weight (MB)" yLabel="Load time (ms)"></nx-scatter-chart>`;

  tsCode = `loadTimes: NxScatterSeries[] = [
  {
    name: 'Sessions',
    data: [
      { x: 1.2, y: 320 }, { x: 2.4, y: 410 }, { x: 0.8, y: 210 }, { x: 3.1, y: 540 },
      { x: 1.8, y: 300 }, { x: 4.2, y: 610 }, { x: 2.9, y: 460 }, { x: 0.5, y: 150 },
    ],
  },
];`;
}
