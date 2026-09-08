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
    { name: 'font-size-xs', cssVar: '--nx-font-size-xs', value: '12px' },
    { name: 'font-size-sm', cssVar: '--nx-font-size-sm', value: '14px' },
    { name: 'font-size-md', cssVar: '--nx-font-size-md', value: '16px' },
    { name: 'font-size-lg', cssVar: '--nx-font-size-lg', value: '18px' },
    { name: 'font-size-xl', cssVar: '--nx-font-size-xl', value: '20px' },
    { name: 'font-size-2xl', cssVar: '--nx-font-size-2xl', value: '24px' },
    { name: 'font-size-3xl', cssVar: '--nx-font-size-3xl', value: '32px' },
  ];

  headings = [
    { name: 'h1-font-size', cssVar: '--nx-h1-font-size', value: '2.5rem' },
    { name: 'h2-font-size', cssVar: '--nx-h2-font-size', value: '2rem' },
    { name: 'h3-font-size', cssVar: '--nx-h3-font-size', value: '1.75rem' },
    { name: 'h4-font-size', cssVar: '--nx-h4-font-size', value: '1.5rem' },
    { name: 'h5-font-size', cssVar: '--nx-h5-font-size', value: '1.25rem' },
    { name: 'h6-font-size', cssVar: '--nx-h6-font-size', value: '1rem' },
  ];

  weights = [
    { name: 'font-weight-light', cssVar: '--nx-font-weight-light', value: 300 },
    { name: 'font-weight-normal', cssVar: '--nx-font-weight-normal', value: 400 },
    { name: 'font-weight-medium', cssVar: '--nx-font-weight-medium', value: 500 },
    { name: 'font-weight-semibold', cssVar: '--nx-font-weight-semibold', value: 600 },
    { name: 'font-weight-bold', cssVar: '--nx-font-weight-bold', value: 700 },
  ];
}
