import { Component, Input } from '@angular/core';

@Component({
  selector: 'nx-aspect-ratio',
  standalone: true,
  imports: [],
  template: `<div class="nx-aspect-ratio" [style.aspect-ratio]="ratio"><ng-content></ng-content></div>`,
  styles: `
    :host {
      display: block;
      width: 100%;
    }
    .nx-aspect-ratio {
      position: relative;
      width: 100%;
      overflow: hidden;
      border-radius: 8px;
      background-color: var(--shell-surface-hover);
    }
  `,
})
export class UiAspectRatio {
  /** Any valid CSS aspect-ratio value, e.g. '16 / 9', '1 / 1', '4 / 3'. */
  @Input() ratio = '16 / 9';
}
