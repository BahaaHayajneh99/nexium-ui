import { Component, inject } from '@angular/core';
import { JsonPipe } from '@angular/common';
import { NxFilterBuilder, NxFilterCondition, NxFilterField } from 'components';
import { CommonService } from '../services/common.service';
import { DemoSection } from '../shared/demo-section/demo-section';

@Component({
  selector: 'app-ui-filter-builder-demo',
  imports: [NxFilterBuilder, JsonPipe, DemoSection],
  templateUrl: './ui-filter-builder-demo.html',
  styleUrl: './ui-filter-builder-demo.scss',
})
export class UiFilterBuilderDemo {
  importCode = `import { NxFilterBuilder, NxFilterField, NxFilterCondition, NX_FILTER_OPERATORS } from 'nexium-ui';`;

  public commonService = inject(CommonService);

  fields: NxFilterField[] = [
    { id: 'name', label: 'Name' },
    { id: 'status', label: 'Status' },
    { id: 'amount', label: 'Amount' },
    { id: 'owner', label: 'Owner' },
  ];

  conditions: NxFilterCondition[] = [
    { id: 'c1', field: 'status', operator: 'equals', value: 'Open' },
    { id: 'c2', field: 'amount', operator: 'greaterThan', value: '1000' },
  ];

  basicCode = `<nx-filter-builder [fields]="fields" [(conditions)]="conditions"></nx-filter-builder>`;

  basicTs = `fields: NxFilterField[] = [
  { id: 'name', label: 'Name' },
  { id: 'status', label: 'Status' },
  { id: 'amount', label: 'Amount' },
  { id: 'owner', label: 'Owner' },
];

// A flat list of field/operator/value rows, AND-ed together - the simple
// counterpart to NxQueryBuilder's nested AND/OR tree.
conditions: NxFilterCondition[] = [
  { id: 'c1', field: 'status', operator: 'equals', value: 'Open' },
  { id: 'c2', field: 'amount', operator: 'greaterThan', value: '1000' },
];`;
}
