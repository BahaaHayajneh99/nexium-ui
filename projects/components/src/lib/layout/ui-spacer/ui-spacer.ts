import { Component, HostBinding, Input, numberAttribute } from '@angular/core';

@Component({
  selector: 'nx-spacer',
  standalone: true,
  imports: [],
  template: '',
  styles: `
    :host {
      display: block;
      align-self: stretch;
    }
  `,
})
export class NxSpacer {
  /** 0 (default) grows to fill the remaining space in a flex container; a positive value renders a fixed-size gap instead. */
  @Input({ transform: numberAttribute }) size = 0;

  @HostBinding('style.flex')
  get flex(): string {
    return this.size > 0 ? 'none' : '1 1 auto';
  }

  @HostBinding('style.width.px')
  get widthPx(): number | null {
    return this.size > 0 ? this.size : null;
  }

  @HostBinding('style.height.px')
  get heightPx(): number | null {
    return this.size > 0 ? this.size : null;
  }
}
