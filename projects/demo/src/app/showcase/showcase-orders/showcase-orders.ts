import { Component } from '@angular/core';
import { NxPageHeader, NxAdvancedDataGrid, NxDataGridColumn } from 'components';
import { ShowcaseSourceView } from '../shared/showcase-source-view/showcase-source-view';
import { ORDERS_TS_SOURCE, ORDERS_HTML_SOURCE } from './showcase-orders.source';

const CUSTOMERS = ['Bluewave Inc.', 'Orbit Labs', 'Acme Corp', 'Nimbus Co.', 'Vertex Studio', 'Harbor Systems'];
const STATUSES = ['Paid', 'Pending', 'Refunded', 'Failed'];

@Component({
  selector: 'app-showcase-orders',
  standalone: true,
  imports: [NxPageHeader, NxAdvancedDataGrid, ShowcaseSourceView],
  templateUrl: './showcase-orders.html',
  styleUrl: './showcase-orders.scss',
})
export class ShowcaseOrders {
  tsSource = ORDERS_TS_SOURCE;
  htmlSource = ORDERS_HTML_SOURCE;

  columns: NxDataGridColumn[] = [
    { id: 'id', header: 'Order', field: 'id', width: 100, sortable: true, pinned: 'left' },
    { id: 'customer', header: 'Customer', field: 'customer', width: 200, sortable: true, filterable: true },
    { id: 'date', header: 'Date', field: 'date', width: 130, sortable: true },
    { id: 'amount', header: 'Amount', field: 'amount', width: 120, sortable: true },
    { id: 'status', header: 'Status', field: 'status', width: 120, sortable: true, filterable: true },
  ];

  rows = Array.from({ length: 68 }, (_, i) => ({
    id: `#${10001 + i}`,
    customer: CUSTOMERS[i % CUSTOMERS.length],
    date: new Date(Date.now() - i * 86400000).toISOString().slice(0, 10),
    amount: `$${(120 + ((i * 47) % 900)).toFixed(2)}`,
    status: STATUSES[i % STATUSES.length],
  }));
}
