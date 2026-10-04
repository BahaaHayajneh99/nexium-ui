import { Component } from '@angular/core';
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
} from 'components';
import { ShowcaseSourceView } from '../shared/showcase-source-view/showcase-source-view';
import { ANALYTICS_TS_SOURCE, ANALYTICS_HTML_SOURCE } from './showcase-analytics.source';

@Component({
  selector: 'app-showcase-analytics',
  standalone: true,
  imports: [NxPageHeader, NxMetricGrid, NxMetricCard, NxAreaChart, NxBarChart, NxPieChart, NxLineChart, NxSunburstChart, ShowcaseSourceView],
  templateUrl: './showcase-analytics.html',
  styleUrl: './showcase-analytics.scss',
})
export class ShowcaseAnalytics {
  tsSource = ANALYTICS_TS_SOURCE;
  htmlSource = ANALYTICS_HTML_SOURCE;

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
    { name: 'Referral', data: [18, 20, 22, 21, 25, 28] },
  ];

  mrrGrowthSeries: NxChartSeries[] = [
    { name: 'MRR', data: [38200, 41500, 44800, 48100, 52400, 56900, 59800, 62100, 65400, 67900, 71200, 74600] },
  ];

  // Same plan split as the pie chart above, broken down one level further by region.
  revenueBreakdown: NxSunburstNode = {
    label: 'Revenue',
    children: [
      {
        label: 'Starter',
        children: [
          { label: 'North America', value: 7300 },
          { label: 'EMEA', value: 5500 },
          { label: 'APAC', value: 3800 },
          { label: 'LatAm', value: 1640 },
        ],
      },
      {
        label: 'Pro',
        children: [
          { label: 'North America', value: 6200 },
          { label: 'EMEA', value: 4300 },
          { label: 'APAC', value: 2980 },
          { label: 'LatAm', value: 1500 },
        ],
      },
      {
        label: 'Enterprise',
        children: [
          { label: 'North America', value: 9800 },
          { label: 'EMEA', value: 6200 },
          { label: 'APAC', value: 4100 },
          { label: 'LatAm', value: 1500 },
        ],
      },
    ],
  };
}
