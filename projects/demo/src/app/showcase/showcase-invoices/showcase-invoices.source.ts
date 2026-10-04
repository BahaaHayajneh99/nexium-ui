export const INVOICES_TS_SOURCE = `import { Component, computed, signal } from '@angular/core';
import { NxPageHeader, NxButton, NxMetricGrid, NxMetricCard, NxBadge, NxDropzone } from 'nexium-ui';

interface Invoice {
  number: string;
  customer: string;
  amount: number;
  status: 'Paid' | 'Pending' | 'Overdue';
  issued: string;
  due: string;
  attachedReceipt?: string;
}

@Component({
  selector: 'app-invoices',
  standalone: true,
  imports: [NxPageHeader, NxButton, NxMetricGrid, NxMetricCard, NxBadge, NxDropzone],
  templateUrl: './invoices.html',
})
export class Invoices {
  invoices = signal<Invoice[]>([
    { number: 'INV-1042', customer: 'Orbit Labs', amount: 2400, status: 'Paid', issued: '2026-03-01', due: '2026-03-15' },
    // ...more invoices
  ]);

  totalBilled = computed(() => this.invoices().reduce((sum, i) => sum + i.amount, 0));
  outstanding = computed(() => this.invoices().filter((i) => i.status !== 'Paid').reduce((sum, i) => sum + i.amount, 0));

  // Which invoice's dropzone is currently expanded, if any.
  attachOpenFor = signal<string | null>(null);

  statusVariant(status: Invoice['status']): 'success' | 'warning' | 'danger' {
    if (status === 'Paid') return 'success';
    if (status === 'Pending') return 'warning';
    return 'danger';
  }

  toggleAttach(number: string): void {
    this.attachOpenFor.set(this.attachOpenFor() === number ? null : number);
  }

  onReceiptAttached(invoice: Invoice, files: File[]): void {
    this.invoices.update((list) =>
      list.map((i) => (i.number === invoice.number ? { ...i, attachedReceipt: files[0]?.name } : i)),
    );
    this.attachOpenFor.set(null);
  }
}
`;

export const INVOICES_HTML_SOURCE = `<div class="page">
    <nx-page-header title="Invoices" description="Billing history across every Nova customer.">
        <nx-button nxPageHeaderActions variant="secondary">Export CSV</nx-button>
    </nx-page-header>

    <nx-metric-grid [minColumnWidth]="200">
        <nx-metric-card label="Total billed" [value]="totalBilled()" prefix="$"></nx-metric-card>
        <nx-metric-card label="Outstanding" [value]="outstanding()" prefix="$"></nx-metric-card>
    </nx-metric-grid>

    <table class="table">
        <thead>
            <tr><th>Invoice</th><th>Customer</th><th>Amount</th><th>Status</th><th>Issued</th><th>Due</th><th>Receipt</th></tr>
        </thead>
        <tbody>
            @for (invoice of invoices(); track invoice.number) {
                <tr>
                    <td>{{ invoice.number }}</td>
                    <td>{{ invoice.customer }}</td>
                    <td>{{ invoice.amount }}</td>
                    <td><nx-badge [variant]="statusVariant(invoice.status)">{{ invoice.status }}</nx-badge></td>
                    <td>{{ invoice.issued }}</td>
                    <td>{{ invoice.due }}</td>
                    <td>
                        @if (invoice.status !== 'Paid' && !invoice.attachedReceipt) {
                            <button (click)="toggleAttach(invoice.number)">Attach receipt</button>
                        } @else if (invoice.attachedReceipt) {
                            Receipt attached: {{ invoice.attachedReceipt }}
                        }
                    </td>
                </tr>
                @if (attachOpenFor() === invoice.number) {
                    <tr>
                        <td colspan="7">
                            <nx-dropzone accept="image/*,.pdf" [multiple]="false" (filesChange)="onReceiptAttached(invoice, $event)"></nx-dropzone>
                        </td>
                    </tr>
                }
            }
        </tbody>
    </table>
</div>
`;
