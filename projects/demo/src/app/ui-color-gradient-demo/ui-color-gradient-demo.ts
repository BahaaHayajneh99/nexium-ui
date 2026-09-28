import { Component, inject } from '@angular/core';
import { CommonService } from '../services/common.service';
import { NxColorGradient, NxGradientStop } from 'components';
import { DemoSection } from '../shared/demo-section/demo-section';

@Component({
  selector: 'app-ui-color-gradient-demo',
  imports: [NxColorGradient, DemoSection],
  templateUrl: './ui-color-gradient-demo.html',
  styleUrl: './ui-color-gradient-demo.scss',
})
export class UiColorGradientDemo {
  importCode = `import { NxColorGradient } from 'nexium-ui';`;

  public commonService = inject(CommonService);

  linearStops: NxGradientStop[] = [
    { color: '#3b82f6', offset: 0 },
    { color: '#8b5cf6', offset: 50 },
    { color: '#ec4899', offset: 100 },
  ];

  linearCode = `<nx-color-gradient
    type="linear"
    [angle]="90"
    [stops]="linearStops">
</nx-color-gradient>`;

  linearTs = `linearStops: NxGradientStop[] = [
  { color: '#3b82f6', offset: 0 },
  { color: '#8b5cf6', offset: 50 },
  { color: '#ec4899', offset: 100 },
];`;

  radialStops: NxGradientStop[] = [
    { color: '#f59e0b', offset: 0 },
    { color: '#ef4444', offset: 100 },
  ];

  radialCode = `<nx-color-gradient
    type="radial"
    [stops]="radialStops">
</nx-color-gradient>`;

  radialTs = `radialStops: NxGradientStop[] = [
  { color: '#f59e0b', offset: 0 },
  { color: '#ef4444', offset: 100 },
];`;

  angles = [0, 45, 90, 135, 180];

  anglesStops: NxGradientStop[] = [
    { color: '#22c55e', offset: 0 },
    { color: '#0ea5e9', offset: 100 },
  ];

  anglesCode = `<div class="angle-row" *ngFor="let angle of angles">
    <nx-color-gradient type="linear" [angle]="angle" [stops]="anglesStops"></nx-color-gradient>
</div>`;

  anglesTs = `angles = [0, 45, 90, 135, 180];
anglesStops: NxGradientStop[] = [
  { color: '#22c55e', offset: 0 },
  { color: '#0ea5e9', offset: 100 },
];`;
}
