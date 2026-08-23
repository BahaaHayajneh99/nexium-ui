import { Component, Input, numberAttribute } from '@angular/core';

@Component({
  selector: 'nx-grid-item',
  standalone: true,
  imports: [],
  template: `<div class="nx-grid-item" [style.grid-column]="'span ' + colSpan" [style.grid-row]="rowSpan > 1 ? ('span ' + rowSpan) : null"><ng-content></ng-content></div>`,
  styles: `
    .nx-grid-item {
      min-width: 0;
    }
  `,
})
export class NxGridItem {
  @Input({ transform: numberAttribute }) colSpan = 1;
  @Input({ transform: numberAttribute }) rowSpan = 1;
}
