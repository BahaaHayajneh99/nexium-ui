import { Component, HostBinding, Input } from '@angular/core';
import { NgIf } from '@angular/common';

export type NxDividerOrientation = 'horizontal' | 'vertical';

@Component({
  selector: 'nx-divider',
  standalone: true,
  imports: [NgIf],
  templateUrl: './ui-divider.html',
  styleUrl: './ui-divider.scss',
})
export class NxDivider {
  @Input() orientation: NxDividerOrientation = 'horizontal';
  @Input() label = '';

  @HostBinding('style.display')
  get hostDisplay(): string {
    return this.orientation === 'vertical' ? 'inline-flex' : 'block';
  }
}
