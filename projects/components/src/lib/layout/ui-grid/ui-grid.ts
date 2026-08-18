import { Component, Input, numberAttribute } from '@angular/core';

@Component({
  selector: 'nx-grid',
  standalone: true,
  imports: [],
  template: `<div class="nx-grid" [style.grid-template-columns]="'repeat(' + cols + ', minmax(0, 1fr))'" [style.gap.px]="gap"><ng-content></ng-content></div>`,
  styles: `
    :host {
      display: block;
      width: 100%;
    }
    .nx-grid {
      display: grid;
      width: 100%;
    }
  `,
})
export class UiGrid {
  @Input({ transform: numberAttribute }) cols = 12;
  @Input({ transform: numberAttribute }) gap = 16;
}
