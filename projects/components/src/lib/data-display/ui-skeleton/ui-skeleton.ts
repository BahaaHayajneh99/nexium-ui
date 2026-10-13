import { Component, Input, booleanAttribute, numberAttribute } from '@angular/core';
import { NgClass } from '@angular/common';

@Component({
  selector: 'nx-skeleton',
  imports: [NgClass],
  templateUrl: './ui-skeleton.html',
  styleUrl: './ui-skeleton.scss',
})
export class NxSkeleton {
  @Input()
  variant: 'text' | 'circle' | 'rect' = 'text';

  @Input()
  width = '100%';

  @Input()
  height = '';

  @Input()
  radius = '';

  @Input({ transform: numberAttribute })
  count = 1;

  @Input({ transform: booleanAttribute })
  animated = true;

  get lines(): number[] {
    return Array.from({ length: this.count });
  }

  get resolvedHeight(): string {
    if (this.height) {
      return this.height;
    }

    if (this.variant === 'circle') {
      return this.width;
    }

    return this.variant === 'rect' ? '80px' : '1em';
  }

  get resolvedRadius(): string {
    if (this.radius) {
      return this.radius;
    }

    if (this.variant === 'circle') {
      return '50%';
    }

    return this.variant === 'rect' ? '8px' : '4px';
  }
}
