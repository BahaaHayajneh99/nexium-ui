export const CUSTOMERS_TS_SOURCE = `import { Component, computed, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NxPageHeader, NxButton, NxMetricGrid, NxMetricCard, NxSearch, NxAvatar, NxBadge, NxModal, NxInput, NxSelect, NxTagInput } from 'nexium-ui';

interface Customer {
  name: string;
  company: string;
  plan: 'Starter' | 'Pro' | 'Enterprise';
  mrr: number;
  status: 'Active' | 'Trial' | 'Churned';
  joined: string;
  tags: string[];
}

@Component({
  selector: 'app-customers',
  standalone: true,
  imports: [FormsModule, NxPageHeader, NxButton, NxMetricGrid, NxMetricCard, NxSearch, NxAvatar, NxBadge, NxModal, NxInput, NxSelect, NxTagInput],
  templateUrl: './customers.html',
})
export class Customers {
  tagSuggestions = ['VIP', 'At risk', 'Upsell opportunity', 'Champion', 'New'];

  customers = signal<Customer[]>([
    { name: 'Marcus Webb', company: 'Orbit Labs', plan: 'Enterprise', mrr: 2400, status: 'Active', joined: '2025-02-14', tags: ['VIP', 'Champion'] },
    // ...more customers
  ]);

  search = signal('');

  filteredCustomers = computed(() => {
    const term = this.search().trim().toLowerCase();
    if (!term) return this.customers();
    return this.customers().filter((c) => c.name.toLowerCase().includes(term) || c.company.toLowerCase().includes(term));
  });

  totalMrr = computed(() => this.customers().reduce((sum, c) => sum + c.mrr, 0));

  addCustomer(): void {
    // push a new Customer onto the signal, default status 'Trial'
  }
}
`;

export const CUSTOMERS_HTML_SOURCE = `<div class="page">
    <nx-page-header title="Customers" description="Everyone paying for Nova, and everyone about to.">
        <nx-button nxPageHeaderActions variant="primary" (click)="openModal()">+ Add customer</nx-button>
    </nx-page-header>

    <nx-metric-grid [minColumnWidth]="200">
        <nx-metric-card label="Customers" [value]="customers().length"></nx-metric-card>
        <nx-metric-card label="Total MRR" [value]="totalMrr()" prefix="$"></nx-metric-card>
    </nx-metric-grid>

    <nx-search placeholder="Search customers or companies..." [ngModel]="search()" (ngModelChange)="search.set($event)"></nx-search>

    <table class="table">
        <thead>
            <tr><th>Customer</th><th>Plan</th><th>MRR</th><th>Status</th><th>Joined</th><th>Tags</th></tr>
        </thead>
        <tbody>
            @for (customer of filteredCustomers(); track customer.name) {
                <tr>
                    <td>
                        <nx-avatar [name]="customer.name" size="small"></nx-avatar>
                        {{ customer.name }} - {{ customer.company }}
                    </td>
                    <td><nx-badge [variant]="planVariant(customer.plan)">{{ customer.plan }}</nx-badge></td>
                    <td>{{ customer.mrr }}</td>
                    <td><nx-badge [variant]="statusVariant(customer.status)">{{ customer.status }}</nx-badge></td>
                    <td>{{ customer.joined }}</td>
                    <td>
                        <nx-tag-input [(value)]="customer.tags" [suggestions]="tagSuggestions"></nx-tag-input>
                    </td>
                </tr>
            }
        </tbody>
    </table>
</div>
`;
