import { Component } from '@angular/core';

@Component({
  selector: 'app-utilities-typography-demo',
  templateUrl: './utilities-typography-demo.html',
  styleUrl: './utilities-typography-demo.scss',
})
export class UtilitiesTypographyDemo {
  sizeUtilities = ['fs-xs', 'fs-sm', 'fs-md', 'fs-lg', 'fs-xl', 'fs-2xl', 'fs-3xl'];
  weightUtilities = ['fw-light', 'fw-normal', 'fw-medium', 'fw-semibold', 'fw-bold'];
}
