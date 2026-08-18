import { Component } from '@angular/core';

interface SpacingGroup {
  prefix: string;
  property: string;
}

@Component({
  selector: 'app-utilities-spacing-demo',
  templateUrl: './utilities-spacing-demo.html',
  styleUrl: './utilities-spacing-demo.scss',
})
export class UtilitiesSpacingDemo {
  steps = [
    { step: 1, value: '$spacing-xs (4px)' },
    { step: 2, value: '$spacing-sm (8px)' },
    { step: 3, value: '$spacing-md (16px)' },
    { step: 4, value: '$spacing-lg (24px)' },
    { step: 5, value: '$spacing-xl (32px)' },
  ];

  groups: SpacingGroup[] = [
    { prefix: 'm', property: 'margin' },
    { prefix: 'mt', property: 'margin-top' },
    { prefix: 'mb', property: 'margin-bottom' },
    { prefix: 'ml', property: 'margin-left' },
    { prefix: 'mr', property: 'margin-right' },
    { prefix: 'mx', property: 'margin-left + margin-right' },
    { prefix: 'my', property: 'margin-top + margin-bottom' },
    { prefix: 'p', property: 'padding' },
    { prefix: 'pt', property: 'padding-top' },
    { prefix: 'pb', property: 'padding-bottom' },
    { prefix: 'pl', property: 'padding-left' },
    { prefix: 'pr', property: 'padding-right' },
    { prefix: 'px', property: 'padding-left + padding-right' },
    { prefix: 'py', property: 'padding-top + padding-bottom' },
    { prefix: 'gap', property: 'gap' },
    { prefix: 'row-gap / gy', property: 'row-gap' },
    { prefix: 'column-gap / gx', property: 'column-gap' },
  ];
}
