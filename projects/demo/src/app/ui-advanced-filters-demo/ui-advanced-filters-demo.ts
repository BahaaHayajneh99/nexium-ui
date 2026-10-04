import { Component, inject } from '@angular/core';
import { JsonPipe } from '@angular/common';
import { CommonService } from '../services/common.service';
import { NxAdvancedFilters, NxQuickFilterField } from 'components';
import { DemoSection } from '../shared/demo-section/demo-section';

@Component({
  selector: 'app-ui-advanced-filters-demo',
  imports: [NxAdvancedFilters, DemoSection, JsonPipe],
  templateUrl: './ui-advanced-filters-demo.html',
  styleUrl: './ui-advanced-filters-demo.scss',
})
export class UiAdvancedFiltersDemo {
  importCode = `import { NxAdvancedFilters } from 'nexium-ui';`;

  public commonService = inject(CommonService);

  orderFields: NxQuickFilterField[] = [
    { field: 'status', label: 'Status', type: 'select', options: ['Pending', 'Shipped', 'Delivered', 'Cancelled'] },
    { field: 'customer', label: 'Customer', type: 'text' },
    { field: 'placedOn', label: 'Placed On', type: 'dateRange' },
    { field: 'amount', label: 'Amount', type: 'numberRange' },
  ];

  lastValues: Record<string, unknown> | null = null;

  basicCode = `<nx-advanced-filters [fields]="orderFields" (valuesChange)="onValuesChange($event)"></nx-advanced-filters>`;

  basicTs = `orderFields: NxQuickFilterField[] = [
  { field: 'status', label: 'Status', type: 'select', options: ['Pending', 'Shipped', 'Delivered', 'Cancelled'] },
  { field: 'customer', label: 'Customer', type: 'text' },
  { field: 'placedOn', label: 'Placed On', type: 'dateRange' },
  { field: 'amount', label: 'Amount', type: 'numberRange' },
];

onValuesChange(values: Record<string, unknown>): void {
  // values = { status, customer, placedOn: {from,to}, amount: {from,to}, _advanced: NxFilterCondition[] }
  console.log(values);
}`;

  onValuesChange(values: Record<string, unknown>): void {
    this.lastValues = values;
  }
}
