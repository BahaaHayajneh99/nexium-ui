import { Component } from '@angular/core';
import {
  NxTable,
  NxTableColumn,
  NxBadge,
  NxBadgeVariant,
  NxCard,
  NxCardHeader,
  NxCardTitle,
  NxCardContent,
  NxCardFooter,
  NxButton,
} from 'components';
import { DemoSection } from '../shared/demo-section/demo-section';

@Component({
  selector: 'app-templates-invoice-billing-demo',
  imports: [NxTable, NxBadge, NxCard, NxCardHeader, NxCardTitle, NxCardContent, NxCardFooter, NxButton, DemoSection],
  templateUrl: './templates-invoice-billing-demo.html',
})
export class TemplatesInvoiceBillingDemo {
  columns: NxTableColumn[] = [
    { field: 'number', header: 'Invoice #' },
    { field: 'client', header: 'Client' },
    { field: 'amount', header: 'Amount' },
    { field: 'dueDate', header: 'Due Date' },
    { field: 'status', header: 'Status' },
  ];

  invoices: Record<string, unknown>[] = [
    { number: 'INV-1042', client: 'Acme Corp', amount: '$1,240.00', dueDate: 'Nov 10, 2026', status: 'Paid' },
    { number: 'INV-1041', client: 'Globex Inc.', amount: '$860.00', dueDate: 'Nov 14, 2026', status: 'Pending' },
    { number: 'INV-1040', client: 'Initech', amount: '$3,420.00', dueDate: 'Oct 28, 2026', status: 'Overdue' },
    { number: 'INV-1039', client: 'Umbrella Corp', amount: '$540.00', dueDate: 'Nov 20, 2026', status: 'Pending' },
    { number: 'INV-1038', client: 'Soylent LLC', amount: '$2,100.00', dueDate: 'Nov 1, 2026', status: 'Paid' },
    { number: 'INV-1037', client: 'Hooli', amount: '$975.00', dueDate: 'Oct 22, 2026', status: 'Overdue' },
  ];

  itemColumns: NxTableColumn[] = [
    { field: 'description', header: 'Description' },
    { field: 'quantity', header: 'Qty', align: 'right' },
    { field: 'unitPrice', header: 'Unit Price', align: 'right' },
    { field: 'total', header: 'Line Total', align: 'right' },
  ];

  lineItems: Record<string, unknown>[] = [
    { description: 'UI Component License (Team)', quantity: '1', unitPrice: '$499.00', total: '$499.00' },
    { description: 'Priority Support (Monthly)', quantity: '1', unitPrice: '$149.00', total: '$149.00' },
    { description: 'Extra Seats', quantity: '4', unitPrice: '$48.00', total: '$192.00' },
  ];

  detailInvoice = {
    number: 'INV-1042',
    status: 'Paid' as const,
    statusVariant: 'success' as NxBadgeVariant,
    subtotal: '$840.00',
    tax: '$84.00',
    total: '$924.00',
    from: { name: 'Nexium Studio', address: '221B Baker Street, London, UK', email: 'billing@nexium.dev' },
    billTo: { name: 'Acme Corp', address: 'Ada Lovelace, 4 Innovation Way', email: 'ada@acme.com' },
  };

  invoiceListCode = `<nx-table [columns]="columns" [data]="invoices" striped hoverable></nx-table>`;

  invoiceDetailCode = `<nx-card variant="outlined">
    <nx-card-header>
        <nx-card-title>Invoice INV-1042</nx-card-title>
    </nx-card-header>
    <nx-card-content>
        <div class="template-form-row">
            <div>
                <div class="template-setting-title">From</div>
                <div class="template-setting-desc">Nexium Studio</div>
            </div>
            <div>
                <div class="template-setting-title">Bill To</div>
                <div class="template-setting-desc">Acme Corp</div>
            </div>
        </div>

        <nx-table [columns]="itemColumns" [data]="lineItems" bordered></nx-table>

        <div style="text-align: right;">
            <div>Subtotal: $840.00</div>
            <div>Tax: $84.00</div>
            <div>Total: $924.00</div>
        </div>
    </nx-card-content>
    <nx-card-footer>
        <nx-badge variant="success">Paid</nx-badge>
        <nx-button variant="secondary">Download PDF</nx-button>
        <nx-button variant="primary">Send Reminder</nx-button>
    </nx-card-footer>
</nx-card>`;
}
