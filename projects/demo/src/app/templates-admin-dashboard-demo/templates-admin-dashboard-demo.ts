import { Component } from '@angular/core';
import {
  UiCard,
  UiCardContent,
  UiIcon,
  UiBadge,
  UiTable,
  NxTableColumn,
  UiLineChart,
  NxChartSeries,
} from 'components';
import { DemoSection } from '../shared/demo-section/demo-section';

interface Stat {
  label: string;
  value: string;
  icon: string;
  trend: string;
  trendVariant: 'success' | 'danger';
}

@Component({
  selector: 'app-templates-admin-dashboard-demo',
  imports: [UiCard, UiCardContent, UiIcon, UiBadge, UiTable, UiLineChart, DemoSection],
  templateUrl: './templates-admin-dashboard-demo.html',
})
export class TemplatesAdminDashboardDemo {
  stats: Stat[] = [
    { label: 'Total Users', value: '48,204', icon: 'nx-users', trend: '+6.2%', trendVariant: 'success' },
    { label: 'Server Uptime', value: '99.98%', icon: 'nx-monitor', trend: '+0.02%', trendVariant: 'success' },
    { label: 'Support Tickets', value: '23', icon: 'nx-message', trend: '-12.0%', trendVariant: 'success' },
    { label: 'Failed Logins', value: '142', icon: 'nx-lock', trend: '+18.0%', trendVariant: 'danger' },
  ];

  months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];

  trafficSeries: NxChartSeries[] = [{ name: 'Active Users', data: [3200, 3600, 3450, 3900, 4200, 4600] }];

  columns: NxTableColumn[] = [
    { field: 'user', header: 'User' },
    { field: 'action', header: 'Action' },
    { field: 'role', header: 'Role' },
    { field: 'status', header: 'Status' },
  ];

  auditLog: Record<string, unknown>[] = [
    { user: 'Ada Lovelace', action: 'Updated billing settings', role: 'Admin', status: 'Success' },
    { user: 'Grace Hopper', action: 'Invited new member', role: 'Admin', status: 'Success' },
    { user: 'Alan Turing', action: 'Failed login attempt', role: 'Member', status: 'Failed' },
    { user: 'Margaret Hamilton', action: 'Exported user report', role: 'Admin', status: 'Success' },
  ];

  statsCode = `<nx-card variant="outlined">
    <nx-card-content>
        <div>
            <div>Total Users</div>
            <div>48,204</div>
            <nx-badge variant="success" size="small">+6.2%</nx-badge>
        </div>
        <nx-icon icon="nx-users" variant="svg" [size]="22"></nx-icon>
    </nx-card-content>
</nx-card>`;

  trafficCode = `<nx-line-chart [categories]="months" [series]="trafficSeries"></nx-line-chart>`;

  tableCode = `<nx-table [columns]="columns" [data]="auditLog" striped hoverable></nx-table>`;
}
