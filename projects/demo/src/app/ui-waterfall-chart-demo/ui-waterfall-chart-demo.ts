import { Component, inject } from '@angular/core';
import { CommonService } from '../services/common.service';
import { NxWaterfallChart, NxWaterfallPoint } from 'components';
import { DemoSection } from '../shared/demo-section/demo-section';

@Component({
  selector: 'app-ui-waterfall-chart-demo',
  imports: [NxWaterfallChart, DemoSection],
  templateUrl: './ui-waterfall-chart-demo.html',
  styleUrl: './ui-waterfall-chart-demo.scss',
})
export class UiWaterfallChartDemo {
  importCode = `import { NxWaterfallChart } from 'nexium-ui';`;

  public commonService = inject(CommonService);

  // Figures in $K. Starting Revenue (500) + 120 + 35 - 45 - 20 = 590, which matches
  // the Ending Revenue total bar exactly - the running total is internally consistent.
  revenueBridge: NxWaterfallPoint[] = [
    { label: 'Starting Revenue', value: 500, isTotal: true },
    { label: 'New Sales', value: 120 },
    { label: 'Upsells', value: 35 },
    { label: 'Churn', value: -45 },
    { label: 'Downgrades', value: -20 },
    { label: 'Ending Revenue', value: 590, isTotal: true },
  ];

  // A headcount bridge that dips below zero net change isn't needed here, but this
  // series shows a mid-sequence total resetting the baseline (a quarterly checkpoint).
  cashFlowBridge: NxWaterfallPoint[] = [
    { label: 'Q1 Opening Cash', value: 200, isTotal: true },
    { label: 'Operating Inflow', value: 80 },
    { label: 'Capex', value: -60 },
    { label: 'Q1 Closing Cash', value: 220, isTotal: true },
    { label: 'Financing Inflow', value: 50 },
    { label: 'Debt Repayment', value: -30 },
    { label: 'Q2 Closing Cash', value: 240, isTotal: true },
  ];

  basicCode = `<nx-waterfall-chart [data]="revenueBridge"></nx-waterfall-chart>`;

  basicTs = `revenueBridge: NxWaterfallPoint[] = [
  { label: 'Starting Revenue', value: 500, isTotal: true },
  { label: 'New Sales', value: 120 },
  { label: 'Upsells', value: 35 },
  { label: 'Churn', value: -45 },
  { label: 'Downgrades', value: -20 },
  { label: 'Ending Revenue', value: 590, isTotal: true },
];`;

  bridgeCode = `<nx-waterfall-chart [data]="cashFlowBridge" [height]="340"></nx-waterfall-chart>`;

  bridgeTs = `// A "total" point resets the running total mid-sequence - useful for a
// quarterly checkpoint that then becomes the baseline for the next quarter.
cashFlowBridge: NxWaterfallPoint[] = [
  { label: 'Q1 Opening Cash', value: 200, isTotal: true },
  { label: 'Operating Inflow', value: 80 },
  { label: 'Capex', value: -60 },
  { label: 'Q1 Closing Cash', value: 220, isTotal: true },
  { label: 'Financing Inflow', value: 50 },
  { label: 'Debt Repayment', value: -30 },
  { label: 'Q2 Closing Cash', value: 240, isTotal: true },
];`;
}
