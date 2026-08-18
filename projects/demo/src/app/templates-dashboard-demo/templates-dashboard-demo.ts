import { Component } from '@angular/core';
import {
  UiCard,
  UiCardContent,
  UiIcon,
  UiBadge,
  UiTable,
  NxTableColumn,
  UiProgressBarComponent,
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
  selector: 'app-templates-dashboard-demo',
  imports: [UiCard, UiCardContent, UiIcon, UiBadge, UiTable, UiProgressBarComponent, DemoSection],
  templateUrl: './templates-dashboard-demo.html',
})
export class TemplatesDashboardDemo {
  stats: Stat[] = [
    { label: 'Revenue', value: '$48,290', icon: 'nx-credit-card', trend: '+12.4%', trendVariant: 'success' },
    { label: 'Active Users', value: '2,431', icon: 'nx-users', trend: '+3.1%', trendVariant: 'success' },
    { label: 'Open Tickets', value: '18', icon: 'nx-message', trend: '-8.0%', trendVariant: 'success' },
    { label: 'Churn Rate', value: '2.6%', icon: 'nx-alert-triangle', trend: '+0.4%', trendVariant: 'danger' },
  ];

  columns: NxTableColumn[] = [
    { field: 'name', header: 'Customer' },
    { field: 'plan', header: 'Plan' },
    { field: 'amount', header: 'Amount' },
    { field: 'status', header: 'Status' },
  ];

  orders: Record<string, unknown>[] = [
    { name: 'Ada Lovelace', plan: 'Team', amount: '$99.00', status: 'Paid' },
    { name: 'Grace Hopper', plan: 'Pro', amount: '$49.00', status: 'Paid' },
    { name: 'Alan Turing', plan: 'Starter', amount: '$19.00', status: 'Pending' },
    { name: 'Margaret Hamilton', plan: 'Team', amount: '$99.00', status: 'Paid' },
  ];

  storageUsedPercent = 68;

  statsCode = `<nx-card variant="outlined">
    <nx-card-content>
        <div>
            <div>Revenue</div>
            <div>$48,290</div>
            <nx-badge variant="success" size="small">+12.4%</nx-badge>
        </div>
        <nx-icon icon="nx-credit-card" variant="svg" [size]="22"></nx-icon>
    </nx-card-content>
</nx-card>`;

  tableCode = `<nx-table [columns]="columns" [data]="orders" striped hoverable></nx-table>`;

  progressCode = `<nx-progress-bar
    [value]="storageUsedPercent"
    variant="info"
    [showLabel]="true"
    label="{{ storageUsedPercent }}% of 100 GB used">
</nx-progress-bar>`;
}
