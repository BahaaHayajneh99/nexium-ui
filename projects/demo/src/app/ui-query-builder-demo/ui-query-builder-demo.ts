import { Component, inject } from '@angular/core';
import { JsonPipe } from '@angular/common';
import { NxFilterField, NxQueryBuilder, NxQueryGroup } from 'components';
import { CommonService } from '../services/common.service';
import { DemoSection } from '../shared/demo-section/demo-section';

@Component({
  selector: 'app-ui-query-builder-demo',
  imports: [NxQueryBuilder, JsonPipe, DemoSection],
  templateUrl: './ui-query-builder-demo.html',
  styleUrl: './ui-query-builder-demo.scss',
})
export class UiQueryBuilderDemo {
  importCode = `import { NxQueryBuilder, NxQueryGroup, NxQueryRule, nxIsQueryGroup } from 'nexium-ui';`;

  public commonService = inject(CommonService);

  fields: NxFilterField[] = [
    { id: 'name', label: 'Name' },
    { id: 'status', label: 'Status' },
    { id: 'amount', label: 'Amount' },
    { id: 'region', label: 'Region' },
  ];

  value: NxQueryGroup = {
    id: 'root',
    combinator: 'and',
    rules: [
      { id: 'r1', field: 'status', operator: 'equals', value: 'Open' },
      {
        id: 'g1',
        combinator: 'or',
        rules: [
          { id: 'r2', field: 'region', operator: 'equals', value: 'EU' },
          { id: 'r3', field: 'region', operator: 'equals', value: 'US' },
        ],
      },
      { id: 'r4', field: 'amount', operator: 'greaterThan', value: '500' },
    ],
  };

  basicCode = `<nx-query-builder [(value)]="value" [fields]="fields"></nx-query-builder>`;

  basicTs = `fields: NxFilterField[] = [
  { id: 'name', label: 'Name' },
  { id: 'status', label: 'Status' },
  { id: 'amount', label: 'Amount' },
  { id: 'region', label: 'Region' },
];

// A nested AND/OR tree - groups can contain both rules and other groups,
// recursing to any depth.
value: NxQueryGroup = {
  id: 'root',
  combinator: 'and',
  rules: [
    { id: 'r1', field: 'status', operator: 'equals', value: 'Open' },
    {
      id: 'g1',
      combinator: 'or',
      rules: [
        { id: 'r2', field: 'region', operator: 'equals', value: 'EU' },
        { id: 'r3', field: 'region', operator: 'equals', value: 'US' },
      ],
    },
    { id: 'r4', field: 'amount', operator: 'greaterThan', value: '500' },
  ],
};`;
}
