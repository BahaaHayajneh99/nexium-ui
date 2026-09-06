import { Component, inject } from '@angular/core';
import { CommonService } from '../services/common.service';

@Component({
  selector: 'app-design-system-border-radius-demo',
  templateUrl: './design-system-border-radius-demo.html',
  styleUrl: './design-system-border-radius-demo.scss',
})
export class DesignSystemBorderRadiusDemo {
  public commonService = inject(CommonService);

  radiusValues = [
    { name: '0px (sharp)', value: '0px' },
    { name: '2px (minimal)', value: '2px' },
    { name: '4px (small)', value: '4px' },
    { name: '8px (medium)', value: '8px' },
    { name: '12px (large)', value: '12px' },
    { name: '16px (xlarge)', value: '16px' },
    { name: '50% (pill)', value: '50%' },
  ];

  usageCases = [
    { component: 'Buttons', radius: '4px', purpose: 'Subtle, modern look' },
    { component: 'Cards', radius: '8px', purpose: 'Standard container shape' },
    { component: 'Modals', radius: '8px - 12px', purpose: 'Prominent dialog boxes' },
    { component: 'Badges', radius: '50%', purpose: 'Circular or pill-shaped' },
    { component: 'Inputs', radius: '4px', purpose: 'Form control consistency' },
    { component: 'Images', radius: '0px - 8px', purpose: 'Varied visual styles' },
  ];
}
