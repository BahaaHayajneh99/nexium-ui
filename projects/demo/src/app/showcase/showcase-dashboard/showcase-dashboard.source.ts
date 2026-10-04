export const DASHBOARD_TS_SOURCE = `import { Component } from '@angular/core';
import {
  NxPageHeader,
  NxButton,
  NxMetricGrid,
  NxMetricCard,
  NxAreaChart,
  NxBarChart,
  NxPieChart,
  NxPieDatum,
  NxLineChart,
  NxChartSeries,
  NxActivityFeed,
  NxActivityFeedItem,
  NxLeaderboard,
  NxRankingItem,
  NxContributionGraph,
  NxContributionDay,
} from 'nexium-ui';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [NxPageHeader, NxButton, NxMetricGrid, NxMetricCard, NxAreaChart, NxBarChart, NxPieChart, NxLineChart, NxActivityFeed, NxLeaderboard, NxContributionGraph],
  templateUrl: './dashboard.html',
})
export class Dashboard {
  months = ['Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'];

  revenueSeries: NxChartSeries[] = [
    { name: 'Revenue', data: [42000, 45500, 51000, 49800, 58200, 63400] },
  ];

  ordersBySeries: NxChartSeries[] = [
    { name: 'New', data: [120, 145, 132, 160, 171, 190] },
    { name: 'Returning', data: [80, 95, 101, 98, 112, 124] },
  ];

  revenueByPlan: NxPieDatum[] = [
    { label: 'Pro Plan', value: 14980 },
    { label: 'Starter Plan', value: 18240 },
    // ...more slices
  ];

  activeUsersSeries: NxChartSeries[] = [
    { name: 'Active users', data: [1820, 1960, 2105, 2240, 2360, 2481] },
  ];

  activity: NxActivityFeedItem[] = [
    { id: 1, actorName: 'Amelia Stone', action: 'closed deal with', target: 'Bluewave Inc.', timestamp: new Date().toISOString() },
    // ...more items
  ];

  topProducts: NxRankingItem[] = [
    { id: 1, rank: 1, name: 'Nova Starter Plan', value: '$18,240' },
    // ...more items
  ];

  // One entry per day for the last year; the graph buckets counts into 5 intensity levels itself.
  activityHeatmapData: NxContributionDay[] = buildLastYearOfActivity();
}
`;

export const DASHBOARD_HTML_SOURCE = `<div class="page">
    <nx-page-header title="Dashboard" description="Welcome back, Amelia - here's how Nova is doing this month.">
        <nx-button nxPageHeaderActions variant="primary">+ New Order</nx-button>
    </nx-page-header>

    <nx-metric-grid [minColumnWidth]="220">
        <nx-metric-card label="Revenue" [value]="63400" prefix="$" delta="+12.4%"></nx-metric-card>
        <nx-metric-card label="Orders" [value]="314" delta="+8.1%"></nx-metric-card>
        <nx-metric-card label="Active Users" [value]="2481" delta="+3.6%"></nx-metric-card>
        <nx-metric-card label="Churn Rate" [value]="2.1" suffix="%" delta="-0.4%"></nx-metric-card>
    </nx-metric-grid>

    <div class="charts-row">
        <nx-area-chart [categories]="months" [series]="revenueSeries" [height]="260"></nx-area-chart>
        <nx-bar-chart [categories]="months" [series]="ordersBySeries" [height]="260"></nx-bar-chart>
    </div>

    <div class="charts-row">
        <nx-pie-chart [data]="revenueByPlan"></nx-pie-chart>
        <nx-line-chart [categories]="months" [series]="activeUsersSeries" [height]="260"></nx-line-chart>
    </div>

    <nx-contribution-graph [data]="activityHeatmapData"></nx-contribution-graph>

    <div class="lower-row">
        <nx-activity-feed [items]="activity"></nx-activity-feed>
        <nx-leaderboard [items]="topProducts"></nx-leaderboard>
    </div>
</div>
`;
