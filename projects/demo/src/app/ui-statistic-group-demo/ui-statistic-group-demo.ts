import { Component } from '@angular/core';
import { NxStatisticGroup, NxStatisticGroupItem } from 'components';
import { DemoSection } from '../shared/demo-section/demo-section';

@Component({
  selector: 'app-ui-statistic-group-demo',
  imports: [NxStatisticGroup, DemoSection],
  templateUrl: './ui-statistic-group-demo.html',
  styleUrl: './ui-statistic-group-demo.scss',
})
export class UiStatisticGroupDemo {
  importCode = `import { NxStatisticGroup } from 'nexium-ui';`;

  items: NxStatisticGroupItem[] = [
    { label: 'Revenue', value: 48290, prefix: '$', delta: '+12.4%' },
    { label: 'Active Users', value: 2431, delta: '+3.1%' },
    { label: 'Churn Rate', value: 2.6, suffix: '%', delta: '+0.4%', upIsGood: false },
  ];

  basicCode = `<nx-statistic-group [items]="items"></nx-statistic-group>`;

  basicTs = `items: NxStatisticGroupItem[] = [
  { label: 'Revenue', value: 48290, prefix: '$', delta: '+12.4%' },
  { label: 'Active Users', value: 2431, delta: '+3.1%' },
  { label: 'Churn Rate', value: 2.6, suffix: '%', delta: '+0.4%', upIsGood: false },
];`;

  unborderedCode = `<nx-statistic-group [items]="items" [bordered]="false"></nx-statistic-group>`;

  unborderedTs = `// bordered defaults to true, adding vertical dividers between stats - set it to false for a plain row without dividers.`;
}
