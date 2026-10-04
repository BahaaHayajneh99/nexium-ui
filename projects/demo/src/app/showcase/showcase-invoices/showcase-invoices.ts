import { Component, computed, signal } from '@angular/core';
import { NxPageHeader, NxButton, NxMetricGrid, NxMetricCard, NxBadge, NxDropzone } from 'components';
import { ShowcaseSourceView } from '../shared/showcase-source-view/showcase-source-view';
import { INVOICES_TS_SOURCE, INVOICES_HTML_SOURCE } from './showcase-invoices.source';

type NxInvoiceStatus = 'Paid' | 'Pending' | 'Overdue';

interface NxShowcaseInvoice {
  number: string;
  customer: string;
  amount: number;
  status: NxInvoiceStatus;
  issued: string;
  due: string;
  attachedReceipt?: string;
}

@Component({
  selector: 'app-showcase-invoices',
  standalone: true,
  imports: [NxPageHeader, NxButton, NxMetricGrid, NxMetricCard, NxBadge, NxDropzone, ShowcaseSourceView],
  templateUrl: './showcase-invoices.html',
  styleUrl: './showcase-invoices.scss',
})
export class ShowcaseInvoices {
  tsSource = INVOICES_TS_SOURCE;
  htmlSource = INVOICES_HTML_SOURCE;

  invoices = signal<NxShowcaseInvoice[]>([
    { number: 'INV-1042', customer: 'Orbit Labs', amount: 2400, status: 'Paid', issued: '2026-03-01', due: '2026-03-15' },
    { number: 'INV-1043', customer: 'Harbor Systems', amount: 480, status: 'Paid', issued: '2026-03-02', due: '2026-03-16' },
    { number: 'INV-1044', customer: 'Bluewave Inc.', amount: 480, status: 'Pending', issued: '2026-03-05', due: '2026-03-19' },
    { number: 'INV-1045', customer: 'Acme Corp', amount: 49, status: 'Overdue', issued: '2026-02-10', due: '2026-02-24' },
    { number: 'INV-1046', customer: 'Nimbus Retail', amount: 480, status: 'Paid', issued: '2026-03-08', due: '2026-03-22' },
    { number: 'INV-1047', customer: 'Fieldstone', amount: 49, status: 'Overdue', issued: '2026-02-14', due: '2026-02-28' },
    { number: 'INV-1048', customer: 'Lumen Health', amount: 2400, status: 'Pending', issued: '2026-03-10', due: '2026-03-24' },
    { number: 'INV-1049', customer: 'Cascade Freight', amount: 49, status: 'Paid', issued: '2026-03-12', due: '2026-03-26' },
  ]);

  totalBilled = computed(() => this.invoices().reduce((sum, i) => sum + i.amount, 0));
  outstanding = computed(() =>
    this.invoices()
      .filter((i) => i.status !== 'Paid')
      .reduce((sum, i) => sum + i.amount, 0),
  );
  overdueCount = computed(() => this.invoices().filter((i) => i.status === 'Overdue').length);

  // Which invoice's "attach receipt" dropzone is currently expanded, if any.
  attachOpenFor = signal<string | null>(null);

  statusVariant(status: NxInvoiceStatus): 'success' | 'warning' | 'danger' {
    if (status === 'Paid') return 'success';
    if (status === 'Pending') return 'warning';
    return 'danger';
  }

  toggleAttach(invoiceNumber: string): void {
    this.attachOpenFor.set(this.attachOpenFor() === invoiceNumber ? null : invoiceNumber);
  }

  onReceiptAttached(invoice: NxShowcaseInvoice, files: File[]): void {
    this.invoices.update((list) =>
      list.map((i) => (i.number === invoice.number ? { ...i, attachedReceipt: files[0]?.name } : i)),
    );
    if (files[0]) {
      this.attachOpenFor.set(null);
    }
  }
}
