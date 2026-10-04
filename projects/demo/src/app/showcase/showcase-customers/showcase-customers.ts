import { Component, computed, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  NxPageHeader,
  NxButton,
  NxMetricGrid,
  NxMetricCard,
  NxSearch,
  NxAvatar,
  NxBadge,
  NxModal,
  NxInput,
  NxSelect,
  NxSelectOption,
  NxTagInput,
} from 'components';
import { ShowcaseSourceView } from '../shared/showcase-source-view/showcase-source-view';
import { CUSTOMERS_TS_SOURCE, CUSTOMERS_HTML_SOURCE } from './showcase-customers.source';

type NxCustomerPlan = 'Starter' | 'Pro' | 'Enterprise';
type NxCustomerStatus = 'Active' | 'Trial' | 'Churned';

interface NxShowcaseCustomer {
  name: string;
  company: string;
  plan: NxCustomerPlan;
  mrr: number;
  status: NxCustomerStatus;
  joined: string;
  tags: string[];
}

@Component({
  selector: 'app-showcase-customers',
  standalone: true,
  imports: [
    FormsModule,
    NxPageHeader,
    NxButton,
    NxMetricGrid,
    NxMetricCard,
    NxSearch,
    NxAvatar,
    NxBadge,
    NxModal,
    NxInput,
    NxSelect,
    NxTagInput,
    ShowcaseSourceView,
  ],
  templateUrl: './showcase-customers.html',
  styleUrl: './showcase-customers.scss',
})
export class ShowcaseCustomers {
  tsSource = CUSTOMERS_TS_SOURCE;
  htmlSource = CUSTOMERS_HTML_SOURCE;

  customers = signal<NxShowcaseCustomer[]>([
    { name: 'Marcus Webb', company: 'Orbit Labs', plan: 'Enterprise', mrr: 2400, status: 'Active', joined: '2025-02-14', tags: ['VIP', 'Champion'] },
    { name: 'Elena Ruiz', company: 'Harbor Systems', plan: 'Pro', mrr: 480, status: 'Active', joined: '2025-04-02', tags: ['Upsell opportunity'] },
    { name: 'Priya Nair', company: 'Bluewave Inc.', plan: 'Pro', mrr: 480, status: 'Active', joined: '2025-05-19', tags: [] },
    { name: 'Owen Bishop', company: 'Acme Corp', plan: 'Starter', mrr: 49, status: 'Trial', joined: '2026-01-08', tags: ['New'] },
    { name: 'Sofia Reyes', company: 'Nimbus Retail', plan: 'Pro', mrr: 480, status: 'Active', joined: '2025-08-27', tags: ['Champion', 'Upsell opportunity'] },
    { name: 'Daniel Cho', company: 'Fieldstone', plan: 'Starter', mrr: 49, status: 'Churned', joined: '2024-11-30', tags: ['At risk'] },
    { name: 'Ava Thompson', company: 'Lumen Health', plan: 'Enterprise', mrr: 2400, status: 'Active', joined: '2025-06-11', tags: ['VIP'] },
    { name: 'Noah Park', company: 'Cascade Freight', plan: 'Starter', mrr: 49, status: 'Trial', joined: '2026-02-20', tags: ['New'] },
  ]);

  tagSuggestions = ['VIP', 'At risk', 'Upsell opportunity', 'Champion', 'New'];

  search = signal('');

  filteredCustomers = computed(() => {
    const term = this.search().trim().toLowerCase();
    if (!term) return this.customers();
    return this.customers().filter(
      (c) => c.name.toLowerCase().includes(term) || c.company.toLowerCase().includes(term),
    );
  });

  totalMrr = computed(() => this.customers().reduce((sum, c) => sum + c.mrr, 0));
  activeCount = computed(() => this.customers().filter((c) => c.status === 'Active').length);
  trialCount = computed(() => this.customers().filter((c) => c.status === 'Trial').length);

  modalOpen = signal(false);
  planOptions: NxSelectOption[] = ['Starter', 'Pro', 'Enterprise'].map((plan) => ({ label: plan, value: plan }));

  newName = '';
  newCompany = '';
  newPlan: NxCustomerPlan = 'Starter';

  openModal(): void {
    this.newName = '';
    this.newCompany = '';
    this.newPlan = 'Starter';
    this.modalOpen.set(true);
  }

  addCustomer(): void {
    if (!this.newName.trim() || !this.newCompany.trim()) {
      return;
    }
    const mrr = this.newPlan === 'Enterprise' ? 2400 : this.newPlan === 'Pro' ? 480 : 49;
    this.customers.update((list) => [
      ...list,
      { name: this.newName.trim(), company: this.newCompany.trim(), plan: this.newPlan, mrr, status: 'Trial', joined: new Date().toISOString().slice(0, 10), tags: [] },
    ]);
    this.modalOpen.set(false);
  }

  statusVariant(status: NxCustomerStatus): 'success' | 'info' | 'danger' {
    if (status === 'Active') return 'success';
    if (status === 'Trial') return 'info';
    return 'danger';
  }

  planVariant(plan: NxCustomerPlan): 'secondary' | 'primary' | 'warning' {
    if (plan === 'Enterprise') return 'warning';
    if (plan === 'Pro') return 'primary';
    return 'secondary';
  }
}
