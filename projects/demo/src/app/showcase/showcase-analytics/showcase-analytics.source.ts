export const ANALYTICS_TS_SOURCE = `import { Component } from '@angular/core';
import {
  NxPageHeader,
  NxMetricGrid,
  NxMetricCard,
  NxAreaChart,
  NxBarChart,
  NxPieChart,
  NxPieDatum,
  NxLineChart,
  NxChartSeries,
  NxSunburstChart,
  NxSunburstNode,
} from 'nexium-ui';

@Component({
  selector: 'app-analytics',
  standalone: true,
  imports: [NxPageHeader, NxMetricGrid, NxMetricCard, NxAreaChart, NxBarChart, NxPieChart, NxLineChart, NxSunburstChart],
  templateUrl: './analytics.html',
})
export class Analytics {
  months = ['Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar'];
  recentMonths = ['Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar'];

  planMix: NxPieDatum[] = [
    { label: 'Starter', value: 38 },
    { label: 'Pro', value: 44 },
    { label: 'Enterprise', value: 18 },
  ];

  userGrowthSeries: NxChartSeries[] = [
    { name: 'Active users', data: [1210, 1340, 1480, 1620, 1790, 1960, 2040, 2150, 2260, 2310, 2400, 2481] },
  ];

  signupsByChannelSeries: NxChartSeries[] = [
    { name: 'Organic', data: [42, 48, 51, 55, 60, 64] },
    { name: 'Paid', data: [30, 34, 33, 38, 41, 45] },
    // ...more series
  ];

  mrrGrowthSeries: NxChartSeries[] = [
    { name: 'MRR', data: [38200, 41500, 44800, 48100, 52400, 56900, 59800, 62100, 65400, 67900, 71200, 74600] },
  ];

  // One root node; children (and their children) form the nested rings.
  revenueBreakdown: NxSunburstNode = {
    label: 'Revenue',
    children: [
      { label: 'Starter', children: [{ label: 'North America', value: 7300 }, { label: 'EMEA', value: 5500 }] },
      { label: 'Pro', children: [{ label: 'North America', value: 6200 }, { label: 'EMEA', value: 4300 }] },
      // ...more plans/regions
    ],
  };
}
`;

export const ANALYTICS_HTML_SOURCE = `<div class="page">
    <nx-page-header title="Analytics" description="A deeper look at how Nova is growing over the last 12 months."></nx-page-header>

    <nx-metric-grid [minColumnWidth]="220">
        <nx-metric-card label="Total Revenue" [value]="74600" prefix="$" delta="+9.2%"></nx-metric-card>
        <nx-metric-card label="MRR" [value]="74600" prefix="$" delta="+5.0%"></nx-metric-card>
        <nx-metric-card label="ARPU" [value]="30.1" prefix="$" delta="+1.8%"></nx-metric-card>
        <nx-metric-card label="LTV" [value]="890" prefix="$" delta="+4.4%"></nx-metric-card>
    </nx-metric-grid>

    <div class="charts-row">
        <nx-pie-chart [data]="planMix" [innerRadius]="0.6"></nx-pie-chart>
        <nx-line-chart [categories]="months" [series]="userGrowthSeries" [height]="260"></nx-line-chart>
    </div>

    <div class="charts-row">
        <nx-bar-chart [categories]="recentMonths" [series]="signupsByChannelSeries" [height]="260"></nx-bar-chart>
        <nx-area-chart [categories]="months" [series]="mrrGrowthSeries" [height]="260"></nx-area-chart>
    </div>

    <nx-sunburst-chart [data]="revenueBreakdown"></nx-sunburst-chart>
</div>
`;
