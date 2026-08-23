import { Component, Input, booleanAttribute } from '@angular/core';

export type NxContainerMaxWidth = 'sm' | 'md' | 'lg' | 'xl' | 'xxl' | 'full';

const MAX_WIDTHS: Record<NxContainerMaxWidth, string> = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  xxl: '1536px',
  full: 'none',
};

@Component({
  selector: 'nx-container',
  standalone: true,
  imports: [],
  template: `<div class="nx-container" [style.max-width]="resolvedMaxWidth" [class.padded]="padded"><ng-content></ng-content></div>`,
  styles: `
    :host {
      display: block;
      width: 100%;
    }
    .nx-container {
      width: 100%;
      margin-inline: auto;
      box-sizing: border-box;
    }
    .nx-container.padded {
      padding-inline: 16px;
    }
  `,
})
export class NxContainer {
  @Input() maxWidth: NxContainerMaxWidth = 'lg';
  @Input({ transform: booleanAttribute }) padded = true;

  get resolvedMaxWidth(): string {
    return MAX_WIDTHS[this.maxWidth];
  }
}
