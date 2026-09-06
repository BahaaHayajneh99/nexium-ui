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
      [style.--nx-masonry-cols]="cols"
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
      column-count: var(--nx-masonry-cols, 3);
    }

    .nx-masonry > * {
      break-inside: avoid;
      -webkit-column-break-inside: avoid;
      margin-bottom: var(--nx-masonry-item-gap, 16px);
      display: inline-block;
      width: 100%;
    }

    /* Below each breakpoint, cap the column count regardless of the [cols]
       input, so a fixed [cols]="3" (or higher) never forces the layout
       narrower than its content can shrink to. */
    @media (max-width: 768px) {
      .nx-masonry {
        column-count: min(var(--nx-masonry-cols, 3), 2);
      }
    }

    @media (max-width: 480px) {
      .nx-masonry {
        column-count: 1;
      }
    }
  `,
})
export class NxMasonry {
  @Input({ transform: numberAttribute }) cols = 3;
  @Input({ transform: numberAttribute }) gap = 16;
}
