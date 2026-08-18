import { Component } from '@angular/core';

interface ColorUtility {
  className: string;
  swatchClass: string;
}

@Component({
  selector: 'app-utilities-colors-demo',
  templateUrl: './utilities-colors-demo.html',
  styleUrl: './utilities-colors-demo.scss',
})
export class UtilitiesColorsDemo {
  textUtilities: ColorUtility[] = [
    { className: '.text-primary', swatchClass: 'text-primary' },
    { className: '.text-secondary', swatchClass: 'text-secondary' },
    { className: '.text-success', swatchClass: 'text-success' },
    { className: '.text-danger', swatchClass: 'text-danger' },
    { className: '.text-warning', swatchClass: 'text-warning' },
    { className: '.text-info', swatchClass: 'text-info' },
    { className: '.text-muted', swatchClass: 'text-muted' },
  ];

  bgUtilities: ColorUtility[] = [
    { className: '.bg-primary', swatchClass: 'bg-primary' },
    { className: '.bg-secondary', swatchClass: 'bg-secondary' },
    { className: '.bg-success', swatchClass: 'bg-success' },
    { className: '.bg-danger', swatchClass: 'bg-danger' },
    { className: '.bg-warning', swatchClass: 'bg-warning' },
    { className: '.bg-info', swatchClass: 'bg-info' },
  ];
}
