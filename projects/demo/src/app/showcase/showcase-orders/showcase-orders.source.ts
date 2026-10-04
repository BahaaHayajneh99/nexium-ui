export const ORDERS_TS_SOURCE = `import { Component } from '@angular/core';
import { NxPageHeader, NxAdvancedDataGrid, NxDataGridColumn } from 'nexium-ui';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [NxPageHeader, NxAdvancedDataGrid],
  templateUrl: './orders.html',
})
export class Orders {
  columns: NxDataGridColumn[] = [
    { id: 'id', header: 'Order', field: 'id', width: 100, sortable: true, pinned: 'left' },
    { id: 'customer', header: 'Customer', field: 'customer', width: 200, sortable: true, filterable: true },
    { id: 'date', header: 'Date', field: 'date', width: 130, sortable: true },
    { id: 'amount', header: 'Amount', field: 'amount', width: 120, sortable: true },
    { id: 'status', header: 'Status', field: 'status', width: 120, sortable: true, filterable: true },
  ];

  rows = [
    { id: '#10001', customer: 'Bluewave Inc.', date: '2026-09-29', amount: '$247.00', status: 'Paid' },
    // ...more rows, e.g. loaded from your API
  ];
}
`;

export const ORDERS_HTML_SOURCE = `<div class="page">
    <nx-page-header title="Orders" description="Every order across Nova - filter, sort, and export as needed."></nx-page-header>

    <nx-advanced-data-grid
        [columns]="columns"
        [rows]="rows"
        [paginator]="true"
        [pageSize]="10"
        [rowsPerPageOptions]="[10, 25, 50]"
        [showExport]="true"
        exportFilename="nova-orders">
    </nx-advanced-data-grid>
</div>
`;
