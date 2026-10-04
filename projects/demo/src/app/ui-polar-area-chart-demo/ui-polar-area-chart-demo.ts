import { Component, inject } from '@angular/core';
import { CommonService } from '../services/common.service';
import { NxPolarAreaChart, NxPolarAreaDatum } from 'components';
import { DemoSection } from '../shared/demo-section/demo-section';

@Component({
  selector: 'app-ui-polar-area-chart-demo',
  imports: [NxPolarAreaChart, DemoSection],
  templateUrl: './ui-polar-area-chart-demo.html',
  styleUrl: './ui-polar-area-chart-demo.scss',
})
export class UiPolarAreaChartDemo {
  importCode = `import { NxPolarAreaChart } from 'nexium-ui';`;

  public commonService = inject(CommonService);

  skillData: NxPolarAreaDatum[] = [
    { label: 'JavaScript', value: 92 },
    { label: 'TypeScript', value: 88 },
    { label: 'CSS', value: 75 },
    { label: 'Angular', value: 95 },
    { label: 'Testing', value: 60 },
    { label: 'DevOps', value: 45 },
    { label: 'Accessibility', value: 70 },
  ];

  rainfallData: NxPolarAreaDatum[] = [
    { label: 'Jan', value: 18 },
    { label: 'Feb', value: 22 },
    { label: 'Mar', value: 35 },
    { label: 'Apr', value: 58 },
    { label: 'May', value: 90 },
    { label: 'Jun', value: 140 },
    { label: 'Jul', value: 165 },
    { label: 'Aug', value: 150 },
  ];

  basicCode = `<nx-polar-area-chart [data]="skillData"></nx-polar-area-chart>`;

  basicTs = `skillData: NxPolarAreaDatum[] = [
  { label: 'JavaScript', value: 92 },
  { label: 'TypeScript', value: 88 },
  { label: 'CSS', value: 75 },
  { label: 'Angular', value: 95 },
  { label: 'Testing', value: 60 },
  { label: 'DevOps', value: 45 },
  { label: 'Accessibility', value: 70 },
];`;

  rainfallCode = `<nx-polar-area-chart [data]="rainfallData"></nx-polar-area-chart>`;

  rainfallTs = `rainfallData: NxPolarAreaDatum[] = [
  { label: 'Jan', value: 18 },
  { label: 'Feb', value: 22 },
  { label: 'Mar', value: 35 },
  { label: 'Apr', value: 58 },
  { label: 'May', value: 90 },
  { label: 'Jun', value: 140 },
  { label: 'Jul', value: 165 },
  { label: 'Aug', value: 150 },
];`;
}
