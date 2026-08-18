import { Component, Input, ViewEncapsulation, numberAttribute } from '@angular/core';

@Component({
  selector: 'nx-masonry',
  standalone: true,
  imports: [],
  // Unencapsulated (matches nx-accordion's precedent): CSS multi-column layout needs
  // `break-inside` and spacing rules on the *projected* children themselves, which
  // emulated view encapsulation can't reach since they carry the parent's content attribute.
  encapsulation: ViewEncapsulation.None,
  template: `
    <div
      class="nx-masonry"
      [style.column-count]="cols"
      [style.column-gap.px]="gap"
      [style.--nx-masonry-item-gap.px]="gap">
      <ng-content></ng-content>
    </div>
  `,
  styles: `
    nx-masonry {
      display: block;
      width: 100%;
    }

    .nx-masonry {
      width: 100%;
    }

    .nx-masonry > * {
      break-inside: avoid;
      -webkit-column-break-inside: avoid;
      margin-bottom: var(--nx-masonry-item-gap, 16px);
      display: inline-block;
      width: 100%;
    }
  `,
})
export class UiMasonry {
  @Input({ transform: numberAttribute }) cols = 3;
  @Input({ transform: numberAttribute }) gap = 16;
}
