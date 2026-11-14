import { Component, inject } from '@angular/core';
import { CommonService } from '../services/common.service';
import { NxBoxPlot, NxBoxPlotDataset } from 'components';
import { DemoSection } from '../shared/demo-section/demo-section';

@Component({
  selector: 'app-ui-box-plot-demo',
  imports: [NxBoxPlot, DemoSection],
  templateUrl: './ui-box-plot-demo.html',
  styleUrl: './ui-box-plot-demo.scss',
})
export class UiBoxPlotDemo {
  importCode = `import { NxBoxPlot, NxBoxPlotDataset } from 'nexium-ui';`;

  public commonService = inject(CommonService);

  // API response times (ms) across five endpoints - a realistic spread of fast, typical, and slow requests.
  responseTimes: NxBoxPlotDataset[] = [
    { label: '/login', min: 42, q1: 58, median: 71, q3: 89, max: 120, outliers: [210, 245] },
    { label: '/search', min: 65, q1: 95, median: 118, q3: 150, max: 205, outliers: [320] },
    { label: '/checkout', min: 110, q1: 160, median: 190, q3: 230, max: 310 },
    { label: '/profile', min: 30, q1: 40, median: 48, q3: 60, max: 85, outliers: [140] },
    { label: '/reports', min: 180, q1: 260, median: 320, q3: 410, max: 560, outliers: [780, 820] },
  ];

  basicCode = `<nx-box-plot [datasets]="responseTimes" [height]="320"></nx-box-plot>`;

  basicTs = `responseTimes: NxBoxPlotDataset[] = [
  { label: '/login', min: 42, q1: 58, median: 71, q3: 89, max: 120, outliers: [210, 245] },
  { label: '/search', min: 65, q1: 95, median: 118, q3: 150, max: 205, outliers: [320] },
  { label: '/checkout', min: 110, q1: 160, median: 190, q3: 230, max: 310 },
  { label: '/profile', min: 30, q1: 40, median: 48, q3: 60, max: 85, outliers: [140] },
  { label: '/reports', min: 180, q1: 260, median: 320, q3: 410, max: 560, outliers: [780, 820] },
];`;
}
