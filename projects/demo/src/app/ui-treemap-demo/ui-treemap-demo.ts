import { Component, inject } from '@angular/core';
import { CommonService } from '../services/common.service';
import { NxTreemap, NxTreemapDatum } from 'components';
import { DemoSection } from '../shared/demo-section/demo-section';

@Component({
  selector: 'app-ui-treemap-demo',
  imports: [NxTreemap, DemoSection],
  templateUrl: './ui-treemap-demo.html',
  styleUrl: './ui-treemap-demo.scss',
})
export class UiTreemapDemo {
  importCode = `import { NxTreemap } from 'nexium-ui';`;

  public commonService = inject(CommonService);

  diskUsage: NxTreemapDatum[] = [
    { label: 'node_modules', value: 820 },
    { label: 'dist', value: 210 },
    { label: 'src', value: 165 },
    { label: '.git', value: 140 },
    { label: 'assets', value: 95 },
    { label: 'docs', value: 40 },
    { label: 'scripts', value: 22 },
  ];

  revenueByCategory: NxTreemapDatum[] = [
    { label: 'Electronics', value: 48500, color: '#3498db' },
    { label: 'Home & Garden', value: 31200, color: '#27ae60' },
    { label: 'Apparel', value: 26800, color: '#9b59b6' },
    { label: 'Sporting Goods', value: 18400, color: '#e67e22' },
    { label: 'Toys', value: 12100, color: '#e74c3c' },
    { label: 'Books', value: 7600, color: '#1abc9c' },
  ];

  lastSelected = '';

  onSelected(item: { label: string; value: number }): void {
    this.lastSelected = `${item.label}: ${item.value.toLocaleString()}`;
  }

  basicCode = `<nx-treemap [data]="diskUsage" (selected)="onSelected($event)"></nx-treemap>`;

  basicTs = `diskUsage: NxTreemapDatum[] = [
  { label: 'node_modules', value: 820 },
  { label: 'dist', value: 210 },
  { label: 'src', value: 165 },
  { label: '.git', value: 140 },
  { label: 'assets', value: 95 },
  { label: 'docs', value: 40 },
  { label: 'scripts', value: 22 },
];

onSelected(item: { label: string; value: number }): void {
  console.log(item.label, item.value);
}`;

  revenueCode = `<nx-treemap [data]="revenueByCategory" (selected)="onSelected($event)"></nx-treemap>`;

  revenueTs = `revenueByCategory: NxTreemapDatum[] = [
  { label: 'Electronics', value: 48500, color: '#3498db' },
  { label: 'Home & Garden', value: 31200, color: '#27ae60' },
  { label: 'Apparel', value: 26800, color: '#9b59b6' },
  // ...
];`;
}
