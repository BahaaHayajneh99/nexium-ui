import { Component } from '@angular/core';
import { NxBubbleChart, NxBubbleSeries } from 'components';
import { DemoSection } from '../shared/demo-section/demo-section';

@Component({
  selector: 'app-charts-bubble-demo',
  imports: [NxBubbleChart, DemoSection],
  templateUrl: './charts-bubble-demo.html',
})
export class ChartsBubbleDemo {
  importCode = `import { NxBubbleChart, NxBubbleSeries } from 'nexium-ui';`;

  products: NxBubbleSeries[] = [
    {
      name: 'Products',
      data: [
        { x: 12, y: 4.2, size: 320, label: 'Starter Plan' },
        { x: 28, y: 4.6, size: 810, label: 'Pro Plan' },
        { x: 45, y: 3.9, size: 1240, label: 'Team Plan' },
        { x: 18, y: 4.8, size: 190, label: 'Add-on: Analytics' },
        { x: 34, y: 4.1, size: 560, label: 'Add-on: SSO' },
      ],
    },
  ];

  regions: NxBubbleSeries[] = [
    { name: 'Americas', data: [{ x: 12, y: 4.2, size: 320 }, { x: 28, y: 4.6, size: 810 }] },
    { name: 'EMEA', data: [{ x: 45, y: 3.9, size: 1240 }, { x: 18, y: 4.8, size: 190 }] },
  ];

  basicCode = `<nx-bubble-chart [series]="products" xLabel="Price ($)" yLabel="Rating" sizeLabel="Revenue"></nx-bubble-chart>`;

  regionCode = `<nx-bubble-chart [series]="regions" xLabel="Price ($)" yLabel="Rating" sizeLabel="Revenue"></nx-bubble-chart>`;

  tsCode = `products: NxBubbleSeries[] = [
  {
    name: 'Products',
    data: [
      { x: 12, y: 4.2, size: 320, label: 'Starter Plan' },
      { x: 28, y: 4.6, size: 810, label: 'Pro Plan' },
      { x: 45, y: 3.9, size: 1240, label: 'Team Plan' },
      { x: 18, y: 4.8, size: 190, label: 'Add-on: Analytics' },
      { x: 34, y: 4.1, size: 560, label: 'Add-on: SSO' },
    ],
  },
];`;
}
