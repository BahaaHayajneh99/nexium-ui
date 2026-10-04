import { Component } from '@angular/core';
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
} from 'components';
import { ShowcaseSourceView } from '../shared/showcase-source-view/showcase-source-view';
import { DASHBOARD_TS_SOURCE, DASHBOARD_HTML_SOURCE } from './showcase-dashboard.source';

/** Deterministic pseudo-random in [0, 1), so the heatmap looks the same on every render. */
function pseudoRandom(seed: number): number {
  const x = Math.sin(seed * 12.9898) * 43758.5453;
  return x - Math.floor(x);
}

/** ~365 days of synthetic daily-active-user activity: busier weekdays, quieter weekends, a
 * gentle upward trend over the year, and a couple of realistic lulls (e.g. holiday weeks). */
function generateActivityHeatmap(): NxContributionDay[] {
  const days: NxContributionDay[] = [];
  const today = new Date();
  const start = new Date(today);
  start.setDate(start.getDate() - 364);

  for (let i = 0; i < 365; i++) {
    const date = new Date(start);
    date.setDate(date.getDate() + i);
    const dayOfWeek = date.getDay();
    const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;

    const growthTrend = 1 + (i / 365) * 0.6; // gradual ramp as the platform grows
    const base = isWeekend ? 35 : 150;
    const noise = pseudoRandom(i + 1) * (isWeekend ? 40 : 90);

    // A couple of quiet weeks each year (e.g. end-of-year holidays, a summer lull).
    const dayOfYear = i;
    const inHolidayLull = dayOfYear > 350 || (dayOfYear > 170 && dayOfYear < 178);
    const lullFactor = inHolidayLull ? 0.25 : 1;

    const count = Math.round((base + noise) * growthTrend * lullFactor);

    days.push({ date: date.toISOString().slice(0, 10), count: Math.max(0, count) });
  }

  return days;
}

@Component({
  selector: 'app-showcase-dashboard',
  standalone: true,
  imports: [
    NxPageHeader,
    NxButton,
    NxMetricGrid,
    NxMetricCard,
    NxAreaChart,
    NxBarChart,
    NxPieChart,
    NxLineChart,
    NxActivityFeed,
    NxLeaderboard,
    NxContributionGraph,
    ShowcaseSourceView,
  ],
  templateUrl: './showcase-dashboard.html',
  styleUrl: './showcase-dashboard.scss',
})
export class ShowcaseDashboard {
  tsSource = DASHBOARD_TS_SOURCE;
  htmlSource = DASHBOARD_HTML_SOURCE;

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
    { label: 'Enterprise', value: 21600 },
    { label: 'Add-ons', value: 9580 },
  ];

  activeUsersSeries: NxChartSeries[] = [
    { name: 'Active users', data: [1820, 1960, 2105, 2240, 2360, 2481] },
  ];

  activity: NxActivityFeedItem[] = [
    { id: 1, actorName: 'Amelia Stone', action: 'closed deal with', target: 'Bluewave Inc.', timestamp: new Date(Date.now() - 20 * 60000).toISOString() },
    { id: 2, actorName: 'Noah Park', action: 'shipped order', target: '#10482', timestamp: new Date(Date.now() - 90 * 60000).toISOString() },
    { id: 3, actorName: 'Layla Kim', action: 'onboarded customer', target: 'Orbit Labs', timestamp: new Date(Date.now() - 4 * 3600000).toISOString() },
    { id: 4, actorName: 'Ethan Cole', action: 'updated plan for', target: 'Acme Corp', timestamp: new Date(Date.now() - 26 * 3600000).toISOString() },
  ];

  topProducts: NxRankingItem[] = [
    { id: 1, rank: 1, name: 'Nova Starter Plan', value: '$18,240' },
    { id: 2, rank: 2, name: 'Nova Pro Plan', value: '$14,980' },
    { id: 3, rank: 3, name: 'Add-on: Analytics', value: '$6,120' },
    { id: 4, rank: 4, name: 'Add-on: SSO', value: '$3,450' },
  ];

  activityHeatmapData: NxContributionDay[] = generateActivityHeatmap();
}
