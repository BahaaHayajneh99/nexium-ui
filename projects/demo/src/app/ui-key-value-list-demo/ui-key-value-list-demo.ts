import { Component } from '@angular/core';
import { NxKeyValueList, NxKeyValueItem } from 'components';
import { DemoSection } from '../shared/demo-section/demo-section';

@Component({
  selector: 'app-ui-key-value-list-demo',
  imports: [NxKeyValueList, DemoSection],
  templateUrl: './ui-key-value-list-demo.html',
})
export class UiKeyValueListDemo {
  importCode = `import { NxKeyValueList, NxKeyValueItem } from 'nexium-ui';`;

  orderDetails: NxKeyValueItem[] = [
    { key: 'Order ID', value: '#38291' },
    { key: 'Status', value: 'Shipped' },
    { key: 'Total', value: '$128.50' },
    { key: 'Placed on', value: 'Aug 12, 2026' },
  ];

  basicCode = `<nx-key-value-list [items]="orderDetails"></nx-key-value-list>`;
  basicTs = `orderDetails: NxKeyValueItem[] = [
  { key: 'Order ID', value: '#38291' },
  { key: 'Status', value: 'Shipped' },
  { key: 'Total', value: '$128.50' },
  { key: 'Placed on', value: 'Aug 12, 2026' },
];`;

  stackedCode = `<nx-key-value-list [items]="orderDetails" layout="stacked"></nx-key-value-list>`;
}
