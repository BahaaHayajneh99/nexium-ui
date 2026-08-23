import { Component } from '@angular/core';
import { NxHeatmapChart } from 'components';
import { DemoSection } from '../shared/demo-section/demo-section';

@Component({
  selector: 'app-charts-heatmap-demo',
  imports: [NxHeatmapChart, DemoSection],
  templateUrl: './charts-heatmap-demo.html',
})
export class ChartsHeatmapDemo {
  importCode = `import { NxHeatmapChart } from 'nexium-ui';`;

  days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  slots = ['Morning', 'Afternoon', 'Evening', 'Night'];

  activity: number[][] = [
    [12, 45, 68, 20],
    [15, 50, 72, 18],
    [10, 48, 75, 22],
    [14, 52, 80, 25],
    [18, 60, 90, 40],
    [30, 70, 95, 65],
    [25, 55, 60, 35],
  ];

  code = `<nx-heatmap-chart [rows]="days" [columns]="slots" [data]="activity"></nx-heatmap-chart>`;

  tsCode = `days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
slots = ['Morning', 'Afternoon', 'Evening', 'Night'];

activity: number[][] = [
  [12, 45, 68, 20],
  [15, 50, 72, 18],
  [10, 48, 75, 22],
  [14, 52, 80, 25],
  [18, 60, 90, 40],
  [30, 70, 95, 65],
  [25, 55, 60, 35],
];`;
}
