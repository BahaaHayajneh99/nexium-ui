import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommonService } from '../services/common.service';
import { DemoSection } from '../shared/demo-section/demo-section';

@Component({
  selector: 'app-developer-css-utilities-demo',
  standalone: true,
  imports: [CommonModule, DemoSection],
  templateUrl: './developer-css-utilities-demo.html',
  styleUrl: './developer-css-utilities-demo.scss',
})
export class DeveloperCssUtilitiesDemo {
  commonService = inject(CommonService);

  utilityClasses = [
    {
      category: 'Display & Visibility',
      utilities: [
        { class: '.nx-hidden', property: 'display: none' },
        { class: '.nx-block', property: 'display: block' },
        { class: '.nx-flex', property: 'display: flex' },
        { class: '.nx-grid', property: 'display: grid' },
        { class: '.nx-invisible', property: 'visibility: hidden' },
      ],
    },
    {
      category: 'Spacing (Padding & Margin)',
      utilities: [
        { class: '.nx-p-*', property: 'padding (xs, sm, md, lg, xl)' },
        { class: '.nx-m-*', property: 'margin (xs, sm, md, lg, xl)' },
        { class: '.nx-gap-*', property: 'gap (xs, sm, md, lg, xl)' },
      ],
    },
    {
      category: 'Typography',
      utilities: [
        { class: '.nx-text-primary', property: 'color: var(--shell-text)' },
        { class: '.nx-text-secondary', property: 'color: var(--shell-text-secondary)' },
        { class: '.nx-font-bold', property: 'font-weight: bold' },
        { class: '.nx-text-center', property: 'text-align: center' },
      ],
    },
    {
      category: 'Borders & Shadows',
      utilities: [
        { class: '.nx-border', property: 'border: 1px solid var(--shell-border)' },
        { class: '.nx-shadow-*', property: 'box-shadow (sm, md, lg, xl)' },
        { class: '.nx-rounded-*', property: 'border-radius (sm, md, lg)' },
      ],
    },
  ];

  flexUtilities = [
    { class: '.nx-flex-row', effect: 'Flex direction row (default)' },
    { class: '.nx-flex-col', effect: 'Flex direction column' },
    { class: '.nx-justify-center', effect: 'Justify content center' },
    { class: '.nx-items-center', effect: 'Align items center' },
    { class: '.nx-flex-1', effect: 'Flex grow 1' },
  ];

  gridUtilities = [
    { class: '.nx-grid-cols-*', effect: 'Grid columns (2, 3, 4, 6, 12)' },
    { class: '.nx-gap-*', effect: 'Grid gap spacing' },
    { class: '.nx-col-span-*', effect: 'Column span (1-12)' },
  ];

  responsiveUtilities = [
    { breakpoint: 'sm', width: '640px', usage: '@media (min-width: 640px)' },
    { breakpoint: 'md', width: '768px', usage: '@media (min-width: 768px)' },
    { breakpoint: 'lg', width: '1024px', usage: '@media (min-width: 1024px)' },
    { breakpoint: 'xl', width: '1280px', usage: '@media (min-width: 1280px)' },
    { breakpoint: '2xl', width: '1536px', usage: '@media (min-width: 1536px)' },
  ];
}
