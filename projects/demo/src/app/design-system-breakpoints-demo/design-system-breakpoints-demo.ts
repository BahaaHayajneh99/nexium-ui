import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommonService } from '../services/common.service';
import { DemoSection } from '../shared/demo-section/demo-section';

@Component({
  selector: 'app-design-system-breakpoints-demo',
  standalone: true,
  imports: [CommonModule, DemoSection],
  templateUrl: './design-system-breakpoints-demo.html',
  styleUrl: './design-system-breakpoints-demo.scss',
})
export class DesignSystemBreakpointsDemo {
  public commonService = inject(CommonService);

  breakpoints = [
    { name: 'xs', value: '0px', maxWidth: '575px', device: 'Small phones' },
    { name: 'sm', value: '576px', maxWidth: '767px', device: 'Phones' },
    { name: 'md', value: '768px', maxWidth: '991px', device: 'Tablets' },
    { name: 'lg', value: '992px', maxWidth: '1199px', device: 'Small laptops' },
    { name: 'xl', value: '1200px', maxWidth: '1399px', device: 'Desktops' },
    { name: 'xxl', value: '1400px', maxWidth: 'unlimited', device: 'Large screens' },
  ];

  mobileFirstApproach = [
    'Start with mobile design (xs)',
    'Add enhancements at tablet breakpoint (md)',
    'Further optimize for desktop (lg, xl)',
    'Fine-tune for large screens (xxl)',
  ];
}
