import { Component, inject } from '@angular/core';
import { CommonService } from '../services/common.service';

@Component({
  selector: 'app-design-system-shadows-demo',
  templateUrl: './design-system-shadows-demo.html',
  styleUrl: './design-system-shadows-demo.scss',
})
export class DesignSystemShadowsDemo {
  public commonService = inject(CommonService);

  shadows = [
    { 
      name: 'None', 
      value: 'none',
      description: 'No shadow - flat design'
    },
    { 
      name: 'xs', 
      value: '0 1px 2px rgba(0, 0, 0, 0.05)',
      description: 'Subtle, almost imperceptible shadow'
    },
    { 
      name: 'sm', 
      value: '0 1px 3px rgba(0, 0, 0, 0.1)',
      description: 'Light shadow for minor elevation'
    },
    { 
      name: 'md', 
      value: '0 4px 6px rgba(0, 0, 0, 0.1)',
      description: 'Medium shadow for cards and panels'
    },
    { 
      name: 'lg', 
      value: '0 10px 15px rgba(0, 0, 0, 0.1)',
      description: 'Strong shadow for modals and floating elements'
    },
    { 
      name: 'xl', 
      value: '0 20px 25px rgba(0, 0, 0, 0.1)',
      description: 'Very strong shadow for prominent overlays'
    },
  ];

  useCases = [
    { element: 'Button Hover', shadow: 'xs-sm', purpose: 'Subtle feedback on interaction' },
    { element: 'Card', shadow: 'md', purpose: 'Standard elevation for content containers' },
    { element: 'Modal', shadow: 'lg', purpose: 'Strong emphasis on dialog boxes' },
    { element: 'Dropdown Menu', shadow: 'md', purpose: 'Slight elevation from page' },
    { element: 'Tooltip', shadow: 'sm', purpose: 'Light elevation for assistive elements' },
    { element: 'Toast Notification', shadow: 'lg', purpose: 'Prominent notification display' },
  ];
}
