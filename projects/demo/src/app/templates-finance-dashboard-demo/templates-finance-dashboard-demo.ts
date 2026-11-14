import { Component } from '@angular/core';
import { NxCard, NxCardContent, NxStatistic, NxTable, NxTableColumn } from 'components';
import { DemoSection } from '../shared/demo-section/demo-section';

interface AccountStat {
  label: string;
  value: string;
  delta: string;
  upIsGood: boolean;
}

@Component({
  selector: 'app-templates-finance-dashboard-demo',
  imports: [NxCard, NxCardContent, NxStatistic, NxTable, DemoSection],
  templateUrl: './templates-finance-dashboard-demo.html',
})
export class TemplatesFinanceDashboardDemo {
  accounts: AccountStat[] = [
    { label: 'Total Balance', value: '$48,290.00', delta: '+4.2%', upIsGood: true },
    { label: 'Monthly Income', value: '$8,450.00', delta: '+2.1%', upIsGood: true },
    { label: 'Monthly Expenses', value: '$3,120.00', delta: '-1.4%', upIsGood: false },
    { label: 'Savings', value: '$12,800.00', delta: '+6.7%', upIsGood: true },
  ];

  columns: NxTableColumn[] = [
    { field: 'date', header: 'Date' },
    { field: 'description', header: 'Description' },
    { field: 'category', header: 'Category' },
    { field: 'amount', header: 'Amount' },
    { field: 'status', header: 'Status' },
  ];

  transactions: Record<string, unknown>[] = [
    { date: 'Oct 28, 2026', description: 'Payroll Deposit', category: 'Income', amount: '+$4,200.00', status: 'Completed' },
    { date: 'Oct 27, 2026', description: 'Whole Foods Market', category: 'Groceries', amount: '-$86.42', status: 'Completed' },
    { date: 'Oct 26, 2026', description: 'Electric Company', category: 'Utilities', amount: '-$112.30', status: 'Completed' },
    { date: 'Oct 25, 2026', description: 'Client Invoice #2291', category: 'Income', amount: '+$1,850.00', status: 'Pending' },
    { date: 'Oct 24, 2026', description: 'Spotify Subscription', category: 'Entertainment', amount: '-$10.99', status: 'Completed' },
    { date: 'Oct 23, 2026', description: 'Gym Membership', category: 'Health', amount: '-$45.00', status: 'Completed' },
    { date: 'Oct 22, 2026', description: 'Freelance Project', category: 'Income', amount: '+$650.00', status: 'Failed' },
  ];

  accountsCode = `<nx-card variant="outlined">
    <nx-card-content>
        <nx-statistic
            label="Total Balance"
            value="$48,290.00"
            delta="+4.2%">
        </nx-statistic>
    </nx-card-content>
</nx-card>`;

  transactionsCode = `<nx-table [columns]="columns" [data]="transactions" striped hoverable></nx-table>`;
}
