import { Component } from '@angular/core';

@Component({
  selector: 'app-utilities-shadows-demo',
  templateUrl: './utilities-shadows-demo.html',
  styleUrl: './utilities-shadows-demo.scss',
})
export class UtilitiesShadowsDemo {
  shadows = [
    { className: 'shadow-xs', value: '0 1px 2px rgba(0, 0, 0, .05)' },
    { className: 'shadow-sm', value: '0 2px 4px rgba(0, 0, 0, .08)' },
    { className: 'shadow-md', value: '0 4px 8px rgba(0, 0, 0, .12)' },
    { className: 'shadow-lg', value: '0 10px 20px rgba(0, 0, 0, .15)' },
    { className: 'shadow-xl', value: '0 20px 40px rgba(0, 0, 0, .2)' },
  ];
}
