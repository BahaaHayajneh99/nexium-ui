import { Component, inject } from '@angular/core';
import { CommonService } from '../services/common.service';

@Component({
  selector: 'app-guide-typography-demo',
  templateUrl: './guide-typography-demo.html',
  styleUrl: './guide-typography-demo.scss',
})
export class GuideTypographyDemo {
  public commonService = inject(CommonService);
  sizes = [
    { name: 'font-size-xs', value: '12px' },
    { name: 'font-size-sm', value: '14px' },
    { name: 'font-size-md', value: '16px' },
    { name: 'font-size-lg', value: '18px' },
    { name: 'font-size-xl', value: '20px' },
    { name: 'font-size-2xl', value: '24px' },
    { name: 'font-size-3xl', value: '32px' },
  ];

  headings = [
    { name: 'h1-font-size', value: '2.5rem' },
    { name: 'h2-font-size', value: '2rem' },
    { name: 'h3-font-size', value: '1.75rem' },
    { name: 'h4-font-size', value: '1.5rem' },
    { name: 'h5-font-size', value: '1.25rem' },
    { name: 'h6-font-size', value: '1rem' },
  ];

  weights = [
    { name: 'font-weight-light', value: 300 },
    { name: 'font-weight-normal', value: 400 },
    { name: 'font-weight-medium', value: 500 },
    { name: 'font-weight-semibold', value: 600 },
    { name: 'font-weight-bold', value: 700 },
  ];
}
