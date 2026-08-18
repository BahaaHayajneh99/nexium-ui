import { Component, inject } from '@angular/core';
import { CommonService } from '../services/common.service';

@Component({
  selector: 'app-utilities-breakpoints-demo',
  templateUrl: './utilities-breakpoints-demo.html',
  styleUrl: './utilities-breakpoints-demo.scss',
})
export class UtilitiesBreakpointsDemo {
  public commonService = inject(CommonService);
  breakpoints = [
    { name: 'sm', minWidth: '576px', target: 'large phones, landscape' },
    { name: 'md', minWidth: '768px', target: 'tablets' },
    { name: 'lg', minWidth: '992px', target: 'small laptops' },
    { name: 'xl', minWidth: '1200px', target: 'desktops' },
    { name: 'xxl', minWidth: '1400px', target: 'large desktops' },
  ];

  mediaQueryCode = `@media (min-width: 768px) {
  // md and up
}`;
}
