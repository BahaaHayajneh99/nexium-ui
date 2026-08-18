import { Component, inject } from '@angular/core';
import { CommonService } from '../services/common.service';
import { UiRadarChart, NxChartSeries } from 'components';
import { DemoSection } from '../shared/demo-section/demo-section';

@Component({
  selector: 'app-charts-radar-demo',
  imports: [UiRadarChart, DemoSection],
  templateUrl: './charts-radar-demo.html',
})
export class ChartsRadarDemo {
  public commonService = inject(CommonService);
  skills = ['Speed', 'Reliability', 'Accessibility', 'Docs', 'DX', 'Bundle Size'];

  singlePlan: NxChartSeries[] = [
    { name: this.commonService.appName, data: [82, 90, 88, 75, 85, 78] },
  ];

  comparisonPlans: NxChartSeries[] = [
    { name: this.commonService.appName, data: [82, 90, 88, 75, 85, 78] },
    { name: 'Competitor', data: [70, 65, 60, 90, 72, 55] },
  ];

  basicCode = `<nx-radar-chart [categories]="skills" [series]="singlePlan"></nx-radar-chart>`;

  comparisonCode = `<nx-radar-chart [categories]="skills" [series]="comparisonPlans"></nx-radar-chart>`;

  tsCode = `skills = ['Speed', 'Reliability', 'Accessibility', 'Docs', 'DX', 'Bundle Size'];

comparisonPlans: NxChartSeries[] = [
  { name: '${this.commonService.appName}', data: [82, 90, 88, 75, 85, 78] },
  { name: 'Competitor', data: [70, 65, 60, 90, 72, 55] },
];`;
}
