import { Component, inject, signal } from '@angular/core';
import { CommonService } from '../services/common.service';
import { NxCascader, NxCascaderOption } from 'components';
import { DemoSection } from '../shared/demo-section/demo-section';

@Component({
  selector: 'app-ui-cascader-demo',
  imports: [NxCascader, DemoSection],
  templateUrl: './ui-cascader-demo.html',
  styleUrl: './ui-cascader-demo.scss',
})
export class UiCascaderDemo {
  importCode = `import { NxCascader, NxCascaderOption } from 'nexium-ui';`;

  public commonService = inject(CommonService);

  options: NxCascaderOption[] = [
    {
      label: 'Asia',
      value: 'asia',
      children: [
        {
          label: 'China',
          value: 'china',
          children: [
            { label: 'Beijing', value: 'beijing' },
            { label: 'Shanghai', value: 'shanghai' },
            { label: 'Shenzhen', value: 'shenzhen' },
          ],
        },
        {
          label: 'Japan',
          value: 'japan',
          children: [
            { label: 'Tokyo', value: 'tokyo' },
            { label: 'Osaka', value: 'osaka' },
          ],
        },
        {
          label: 'India',
          value: 'india',
          children: [
            { label: 'Mumbai', value: 'mumbai' },
            { label: 'Delhi', value: 'delhi' },
            { label: 'Bengaluru', value: 'bengaluru' },
          ],
        },
      ],
    },
    {
      label: 'Europe',
      value: 'europe',
      children: [
        {
          label: 'France',
          value: 'france',
          children: [
            { label: 'Paris', value: 'paris' },
            { label: 'Lyon', value: 'lyon' },
          ],
        },
        {
          label: 'Germany',
          value: 'germany',
          children: [
            { label: 'Berlin', value: 'berlin' },
            { label: 'Munich', value: 'munich' },
            { label: 'Hamburg', value: 'hamburg' },
          ],
        },
      ],
    },
  ];

  // Signal rather than a plain property: onValueChange below replaces it wholesale, and in this
  // zoneless demo app a plain property write wouldn't be picked up until some unrelated click
  // happened to trigger a re-render.
  selectedPath = signal<(string | number)[] | null>(['asia', 'china', 'shanghai']);

  onValueChange(path: (string | number)[]): void {
    this.selectedPath.set(path);
  }

  basicCode = `<nx-cascader
    [options]="options"
    [value]="selectedPath()"
    placeholder="Select a city"
    (valueChange)="onValueChange($event)">
</nx-cascader>`;

  basicTs = `options: NxCascaderOption[] = [
  { label: 'Asia', value: 'asia', children: [
    { label: 'China', value: 'china', children: [
      { label: 'Beijing', value: 'beijing' },
      { label: 'Shanghai', value: 'shanghai' },
      // ...more cities
    ]},
    // ...more countries
  ]},
  // ...more continents
];

selectedPath: (string | number)[] | null = ['asia', 'china', 'shanghai'];

onValueChange(path: (string | number)[]): void {
  this.selectedPath = path;
}`;
}
