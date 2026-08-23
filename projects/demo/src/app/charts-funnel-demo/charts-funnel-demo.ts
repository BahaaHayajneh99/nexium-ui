import { Component } from '@angular/core';
import { NxFunnelChart, NxFunnelStage } from 'components';
import { DemoSection } from '../shared/demo-section/demo-section';

@Component({
  selector: 'app-charts-funnel-demo',
  imports: [NxFunnelChart, DemoSection],
  templateUrl: './charts-funnel-demo.html',
})
export class ChartsFunnelDemo {
  importCode = `import { NxFunnelChart, NxFunnelStage } from 'nexium-ui';`;

  signupFunnel: NxFunnelStage[] = [
    { label: 'Visited pricing page', value: 12400 },
    { label: 'Started signup', value: 5200 },
    { label: 'Verified email', value: 3800 },
    { label: 'Completed onboarding', value: 2100 },
    { label: 'Became active user', value: 1350 },
  ];

  code = `<nx-funnel-chart [stages]="signupFunnel"></nx-funnel-chart>`;

  tsCode = `signupFunnel: NxFunnelStage[] = [
  { label: 'Visited pricing page', value: 12400 },
  { label: 'Started signup', value: 5200 },
  { label: 'Verified email', value: 3800 },
  { label: 'Completed onboarding', value: 2100 },
  { label: 'Became active user', value: 1350 },
];`;
}
