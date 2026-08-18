import { Component, HostBinding, Input } from '@angular/core';

export type NxDividerOrientation = 'horizontal' | 'vertical';

@Component({
  selector: 'nx-divider',
  standalone: true,
  imports: [],
  templateUrl: './ui-divider.html',
  styleUrl: './ui-divider.scss',
})
export class UiDivider {
  @Input() orientation: NxDividerOrientation = 'horizontal';
  @Input() label = '';

  @HostBinding('style.display')
  get hostDisplay(): string {
    return this.orientation === 'vertical' ? 'inline-flex' : 'block';
  }
}
