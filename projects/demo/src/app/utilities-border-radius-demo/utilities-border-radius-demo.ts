import { Component } from '@angular/core';

@Component({
  selector: 'app-utilities-border-radius-demo',
  templateUrl: './utilities-border-radius-demo.html',
  styleUrl: './utilities-border-radius-demo.scss',
})
export class UtilitiesBorderRadiusDemo {
  radii = [
    { className: 'radius-xs', value: '2px' },
    { className: 'radius-sm', value: '4px' },
    { className: 'radius-md', value: '8px' },
    { className: 'radius-lg', value: '12px' },
    { className: 'radius-xl', value: '16px' },
    { className: 'radius-round', value: '999px' },
  ];
}
