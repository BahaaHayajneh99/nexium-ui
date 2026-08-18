import { Component } from '@angular/core';
import { UiCard, UiCardContent, UiProgressBarComponent, UiStatistic, UiTable, NxTableColumn } from 'components';
import { DemoSection } from '../shared/demo-section/demo-section';

@Component({
  selector: 'app-blocks-dashboard-demo',
  imports: [UiCard, UiCardContent, UiProgressBarComponent, UiStatistic, UiTable, DemoSection],
  templateUrl: './blocks-dashboard-demo.html',
})
export class BlocksDashboardDemo {
  stats = [
    { label: 'Revenue', value: '$48,290', delta: '+12.4%' },
    { label: 'Active Users', value: '3,842', delta: '+4.1%' },
    { label: 'Churn Rate', value: '2.3%', delta: '-0.6%' },
    { label: 'Open Tickets', value: '18', delta: '+3', direction: 'up' as const, upIsGood: false },
  ];

  usage = [
    { label: 'Storage', value: 72, variant: 'primary' as const },
    { label: 'API Requests', value: 45, variant: 'success' as const },
    { label: 'Bandwidth', value: 88, variant: 'warning' as const },
  ];

  columns: NxTableColumn[] = [
    { field: 'project', header: 'Project' },
    { field: 'owner', header: 'Owner' },
    { field: 'status', header: 'Status' },
    { field: 'updated', header: 'Updated' },
  ];

  rows = [
    { project: 'Marketing Site Redesign', owner: 'Ada Lovelace', status: 'On Track', updated: '2h ago' },
    { project: 'Mobile App v2', owner: 'Grace Hopper', status: 'At Risk', updated: '1d ago' },
    { project: 'Billing Migration', owner: 'Alan Turing', status: 'On Track', updated: '5h ago' },
  ];

  statsCode = `<div class="stats-grid">
    @for (stat of stats; track stat.label) {
        <nx-card variant="outlined">
            <nx-card-content>
                <nx-statistic
                    [label]="stat.label"
                    [value]="stat.value"
                    [delta]="stat.delta"
                    [upIsGood]="stat.upIsGood ?? true">
                </nx-statistic>
            </nx-card-content>
        </nx-card>
    }
</div>`;

  usageCode = `<nx-card variant="outlined">
    <nx-card-content>
        @for (item of usage; track item.label) {
            <nx-progress-bar
                [value]="item.value"
                [variant]="item.variant"
                [label]="item.label"
                [showLabel]="true">
            </nx-progress-bar>
        }
    </nx-card-content>
</nx-card>`;

  tableCode = `<nx-table [columns]="columns" [data]="rows"></nx-table>`;

  tsCode = `stats = [
  { label: 'Revenue', value: '$48,290', delta: '+12.4%' },
  { label: 'Active Users', value: '3,842', delta: '+4.1%' },
  { label: 'Churn Rate', value: '2.3%', delta: '-0.6%' },
  { label: 'Open Tickets', value: '18', delta: '+3', direction: 'up', upIsGood: false },
];

usage = [
  { label: 'Storage', value: 72, variant: 'primary' },
  { label: 'API Requests', value: 45, variant: 'success' },
  { label: 'Bandwidth', value: 88, variant: 'warning' },
];`;
}
