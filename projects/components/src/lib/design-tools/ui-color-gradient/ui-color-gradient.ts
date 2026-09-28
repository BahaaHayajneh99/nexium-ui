import { Component, Input } from '@angular/core';
import { NxProLocked } from '../../licensing/ui-pro-locked/ui-pro-locked';
import { nxProLicenseGranted } from '../../licensing/nx-license';

export type NxGradientType = 'linear' | 'radial';

export interface NxGradientStop {
  color: string;
  offset: number;
}

/** A read-only gradient swatch built from stops - pair with `NxColorGradientEditor` for an editable version. */
@Component({
  selector: 'nx-color-gradient',
  standalone: true,
  imports: [NxProLocked],
  template: `
    @if (licensed()) {
      <div class="nx-color-gradient" [style.background]="cssValue"></div>
    } @else {
      <nx-pro-locked componentName="Color Gradient"></nx-pro-locked>
    }
  `,
  styles: `
    :host {
      display: block;
    }
    .nx-color-gradient {
      width: 100%;
      height: 48px;
      border-radius: var(--nx-radius-md, 8px);
      border: 1px solid var(--shell-border);
    }
  `,
})
export class NxColorGradient {
  protected readonly licensed = nxProLicenseGranted();

  @Input() type: NxGradientType = 'linear';
  @Input() angle = 90;
  @Input() stops: NxGradientStop[] = [
    { color: '#3b82f6', offset: 0 },
    { color: '#8b5cf6', offset: 100 },
  ];

  get cssValue(): string {
    const stopsCss = [...this.stops]
      .sort((a, b) => a.offset - b.offset)
      .map((stop) => `${stop.color} ${stop.offset}%`)
      .join(', ');
    return this.type === 'radial' ? `radial-gradient(circle, ${stopsCss})` : `linear-gradient(${this.angle}deg, ${stopsCss})`;
  }
}
