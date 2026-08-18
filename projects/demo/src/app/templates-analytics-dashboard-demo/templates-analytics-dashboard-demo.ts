import { Component } from '@angular/core';
import {
  UiCard,
  UiCardContent,
  UiStatistic,
  UiLineChart,
  UiBarChart,
  UiPieChart,
  NxChartSeries,
  NxPieDatum,
} from 'components';
import { DemoSection } from '../shared/demo-section/demo-section';

@Component({
  selector: 'app-templates-analytics-dashboard-demo',
  imports: [UiCard, UiCardContent, UiStatistic, UiLineChart, UiBarChart, UiPieChart, DemoSection],
  templateUrl: './templates-analytics-dashboard-demo.html',
})
export class TemplatesAnalyticsDashboardDemo {
  stats = [
    { label: 'Sessions', value: '84,203', delta: '+9.4%' },
    { label: 'Avg. Session Duration', value: '3m 42s', delta: '+0.6%' },
    { label: 'Bounce Rate', value: '38.2%', delta: '-2.1%' },
  ];

  months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];

  sessionsSeries: NxChartSeries[] = [{ name: 'Sessions', data: [52000, 58000, 61000, 67000, 74000, 84200] }];

  channelSeries: NxChartSeries[] = [
    { name: 'Organic', data: [12000, 13500, 14200, 15800, 17200, 19000] },
    { name: 'Paid', data: [8000, 8600, 9100, 9800, 10500, 11200] },
  ];

  trafficSources: NxPieDatum[] = [
    { label: 'Organic Search', value: 42 },
    { label: 'Direct', value: 24 },
    { label: 'Referral', value: 18 },
    { label: 'Social', value: 11 },
    { label: 'Paid', value: 5 },
  ];

  sessionsCode = `<nx-line-chart [categories]="months" [series]="sessionsSeries"></nx-line-chart>`;

  channelCode = `<nx-bar-chart [categories]="months" [series]="channelSeries"></nx-bar-chart>`;

  sourcesCode = `<nx-pie-chart [data]="trafficSources" [innerRadius]="0.6"></nx-pie-chart>`;
}
