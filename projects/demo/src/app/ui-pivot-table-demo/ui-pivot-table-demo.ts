import { Component, inject } from '@angular/core';
import { CommonService } from '../services/common.service';
import { NxPivotTable, NxPivotConfig } from 'components';
import { DemoSection } from '../shared/demo-section/demo-section';

interface NxSalesRow {
  [key: string]: unknown;
  region: string;
  rep: string;
  quarter: string;
  revenue: number;
}

interface NxTicketRow {
  [key: string]: unknown;
  team: string;
  status: string;
}

@Component({
  selector: 'app-ui-pivot-table-demo',
  imports: [NxPivotTable, DemoSection],
  templateUrl: './ui-pivot-table-demo.html',
  styleUrl: './ui-pivot-table-demo.scss',
})
export class UiPivotTableDemo {
  importCode = `import { NxPivotTable } from 'nexium-ui';`;

  public commonService = inject(CommonService);

  salesRows: NxSalesRow[] = [
    { region: 'West', rep: 'Priya Nair', quarter: 'Q1', revenue: 42000 },
    { region: 'West', rep: 'Priya Nair', quarter: 'Q2', revenue: 48500 },
    { region: 'West', rep: 'Priya Nair', quarter: 'Q3', revenue: 51200 },
    { region: 'West', rep: 'Owen Bishop', quarter: 'Q1', revenue: 31000 },
    { region: 'West', rep: 'Owen Bishop', quarter: 'Q2', revenue: 29800 },
    { region: 'West', rep: 'Owen Bishop', quarter: 'Q3', revenue: 35400 },
    { region: 'East', rep: 'Marcus Webb', quarter: 'Q1', revenue: 55600 },
    { region: 'East', rep: 'Marcus Webb', quarter: 'Q2', revenue: 58200 },
    { region: 'East', rep: 'Marcus Webb', quarter: 'Q3', revenue: 61000 },
    { region: 'East', rep: 'Ava Thompson', quarter: 'Q1', revenue: 24500 },
    { region: 'East', rep: 'Ava Thompson', quarter: 'Q2', revenue: 27100 },
    { region: 'East', rep: 'Ava Thompson', quarter: 'Q3', revenue: 26300 },
    { region: 'Central', rep: 'Daniel Cho', quarter: 'Q1', revenue: 38900 },
    { region: 'Central', rep: 'Daniel Cho', quarter: 'Q2', revenue: 41200 },
    { region: 'Central', rep: 'Daniel Cho', quarter: 'Q3', revenue: 39700 },
  ];

  salesConfig: NxPivotConfig = {
    rowFields: ['region', 'rep'],
    columnField: 'quarter',
    valueField: 'revenue',
    aggregation: 'sum',
  };

  basicCode = `<nx-pivot-table
    [data]="salesRows"
    [config]="salesConfig"
    exportFilename="sales-by-region">
</nx-pivot-table>`;

  basicTs = `interface SalesRow { region: string; rep: string; quarter: string; revenue: number; }

salesRows: SalesRow[] = [
  { region: 'West', rep: 'Priya Nair', quarter: 'Q1', revenue: 42000 },
  // ...more rows
];

salesConfig: NxPivotConfig = {
  rowFields: ['region', 'rep'],   // nested row groups
  columnField: 'quarter',         // pivoted into columns
  valueField: 'revenue',          // aggregated field
  aggregation: 'sum',
};`;

  ticketRows: NxTicketRow[] = [
    { team: 'Platform', status: 'Open' },
    { team: 'Platform', status: 'Open' },
    { team: 'Platform', status: 'Closed' },
    { team: 'Platform', status: 'Closed' },
    { team: 'Platform', status: 'Closed' },
    { team: 'Billing', status: 'Open' },
    { team: 'Billing', status: 'Pending' },
    { team: 'Billing', status: 'Closed' },
    { team: 'Support', status: 'Open' },
    { team: 'Support', status: 'Open' },
    { team: 'Support', status: 'Pending' },
  ];

  ticketConfig: NxPivotConfig = {
    rowFields: ['team'],
    valueField: 'status',
    aggregation: 'count',
  };

  countCode = `<nx-pivot-table
    [data]="ticketRows"
    [config]="ticketConfig"
    valueLabel="Tickets">
</nx-pivot-table>`;

  countTs = `ticketConfig: NxPivotConfig = {
  rowFields: ['team'],   // single-level grouping, no column pivot
  valueField: 'status',  // any field works for 'count'
  aggregation: 'count',
};`;
}
