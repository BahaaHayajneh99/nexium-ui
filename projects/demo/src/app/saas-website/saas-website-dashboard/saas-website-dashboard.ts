import { Component } from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { RouterLink } from '@angular/router';
import {
  NxButton,
  NxIcon,
  NxBreadcrumb,
  NxBreadcrumbItem,
  NxStatistic,
  NxLineChart,
  NxChartSeries,
  NxActivityFeed,
  NxActivityFeedItem,
  NxTable,
  NxTableColumn,
  NxNumberTicker,
  nxProLicenseGranted,
} from 'components';
import { NX_SAAS_MONTHS, NX_SAAS_SIGNUPS, NX_SAAS_REVENUE } from '../saas-website-data';

interface NxSaasDashboardStat {
  label: string;
  value: number;
  prefix?: string;
  suffix?: string;
  delta: string;
  upIsGood?: boolean;
  animated?: boolean;
}

interface NxSaasTeamMemberRow extends Record<string, unknown> {
  name: string;
  role: string;
  status: string;
  lastActive: string;
}

/**
 * Dashboard page of the "SaaS Website" PRO template - a live-product-preview page showing
 * what a logged-in Nimbus customer sees: statistic tiles, a 6-month signups/revenue chart,
 * and a recent-activity feed.
 */
@Component({
  selector: 'app-saas-website-dashboard',
  imports: [
    NgTemplateOutlet,
    RouterLink,
    NxButton,
    NxIcon,
    NxBreadcrumb,
    NxStatistic,
    NxLineChart,
    NxActivityFeed,
    NxTable,
    NxNumberTicker,
  ],
  templateUrl: './saas-website-dashboard.html',
  styleUrl: './saas-website-dashboard.scss',
})
export class SaasWebsiteDashboardDemo {
  protected readonly licensed = nxProLicenseGranted();

  protected readonly breadcrumbItems: NxBreadcrumbItem[] = [
    { label: 'Home', link: '/saas-website/home' },
    { label: 'Dashboard' },
  ];

  protected readonly stats: NxSaasDashboardStat[] = [
    { label: 'Active Users', value: 8420, delta: '+6.2%', animated: true },
    { label: 'MRR', value: 41650, prefix: '$', delta: '+18.3%', animated: true },
    { label: 'Churn Rate', value: 2.1, suffix: '%', delta: '-0.4%', upIsGood: false },
    { label: 'Signups this month', value: 1042, delta: '+17.2%' },
  ];

  protected readonly months = NX_SAAS_MONTHS;

  protected readonly chartSeries: NxChartSeries[] = [
    { name: 'Signups', data: NX_SAAS_SIGNUPS },
    { name: 'Revenue', data: NX_SAAS_REVENUE },
  ];

  /** Fake recent activity for the live-product-preview dashboard, rendered with nx-activity-feed. */
  protected readonly activityItems: NxActivityFeedItem[] = [
    {
      id: 1,
      actorName: 'Priya Shah',
      actorAvatarUrl: 'https://i.pravatar.cc/150?img=47',
      action: 'invited a teammate to',
      target: 'Nimbus workspace',
      timestamp: new Date(Date.now() - 0.3 * 3600000).toISOString(),
      category: 'team',
    },
    {
      id: 2,
      actorName: 'Marcus Webb',
      actorAvatarUrl: 'https://i.pravatar.cc/150?img=22',
      action: 'upgraded the org to the',
      target: 'Growth plan',
      timestamp: new Date(Date.now() - 1.5 * 3600000).toISOString(),
      category: 'billing',
    },
    {
      id: 3,
      actorName: 'Lena Ortiz',
      actorAvatarUrl: 'https://i.pravatar.cc/150?img=32',
      action: 'created a new dashboard called',
      target: '"Q4 Pipeline"',
      timestamp: new Date(Date.now() - 3 * 3600000).toISOString(),
      category: 'analytics',
    },
    {
      id: 4,
      actorName: 'Sam Patel',
      actorAvatarUrl: 'https://i.pravatar.cc/150?img=12',
      action: 'exported a report for',
      target: 'Monthly Board Report',
      timestamp: new Date(Date.now() - 6 * 3600000).toISOString(),
      category: 'reports',
    },
    {
      id: 5,
      actorName: 'Dana Whitfield',
      actorAvatarUrl: 'https://i.pravatar.cc/150?img=60',
      action: 'connected the',
      target: 'Shopify integration',
      timestamp: new Date(Date.now() - 26 * 3600000).toISOString(),
      category: 'integrations',
    },
    {
      id: 6,
      actorName: 'Carlos Mendez',
      actorAvatarUrl: 'https://i.pravatar.cc/150?img=18',
      action: 'updated the SSO login policy for',
      target: 'Nimbus workspace',
      timestamp: new Date(Date.now() - 30 * 3600000).toISOString(),
      category: 'security',
    },
    {
      id: 7,
      actorName: 'Samuel Okoro',
      actorAvatarUrl: 'https://i.pravatar.cc/150?img=51',
      action: 'set a custom alert on',
      target: 'Weekly active users',
      timestamp: new Date(Date.now() - 50 * 3600000).toISOString(),
      category: 'analytics',
    },
    {
      id: 8,
      actorName: 'Lina Fischer',
      actorAvatarUrl: 'https://i.pravatar.cc/150?img=40',
      action: 'archived the dashboard',
      target: '"2023 Retro"',
      timestamp: new Date(Date.now() - 72 * 3600000).toISOString(),
      category: 'analytics',
    },
  ];

  protected readonly teamColumns: NxTableColumn[] = [
    { field: 'name', header: 'Name' },
    { field: 'role', header: 'Role' },
    { field: 'status', header: 'Status' },
    { field: 'lastActive', header: 'Last active' },
  ];

  protected readonly teamMembers: NxSaasTeamMemberRow[] = [
    { name: 'Dana Whitfield', role: 'Owner', status: 'Active', lastActive: '2 min ago' },
    { name: 'Samuel Okoro', role: 'Admin', status: 'Active', lastActive: '12 min ago' },
    { name: 'Lina Fischer', role: 'Editor', status: 'Active', lastActive: '1 hour ago' },
    { name: 'Carlos Mendez', role: 'Editor', status: 'Away', lastActive: 'Yesterday' },
    { name: 'Renee Castillo', role: 'Viewer', status: 'Away', lastActive: '2 days ago' },
  ];

  /** Mirrors nx-statistic's own delta-direction logic for the animated tiles, which render their own markup. */
  protected deltaDirection(stat: NxSaasDashboardStat): 'up' | 'down' | 'neutral' {
    if (stat.delta.startsWith('+')) {
      return 'up';
    }
    if (stat.delta.startsWith('-')) {
      return 'down';
    }
    return 'neutral';
  }

  protected deltaClass(stat: NxSaasDashboardStat): 'good' | 'bad' | 'neutral' {
    const direction = this.deltaDirection(stat);
    if (direction === 'neutral') {
      return 'neutral';
    }
    const isGoodDirection = direction === 'up' ? (stat.upIsGood ?? true) : !(stat.upIsGood ?? true);
    return isGoodDirection ? 'good' : 'bad';
  }
}
