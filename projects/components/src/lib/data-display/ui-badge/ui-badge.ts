import { booleanAttribute, Component, Input } from '@angular/core';
import { NgClass } from '@angular/common';

export type NxBadgeVariant =
  | 'primary'
  | 'secondary'
  | 'success'
  | 'danger'
  | 'warning'
  | 'info'
  | 'dark'
  | 'light';

export type NxBadgeSize = 'small' | 'medium' | 'large';

@Component({
  selector: 'nx-badge',
  standalone: true,
  imports: [NgClass],
  templateUrl: './ui-badge.html',
  styleUrl: './ui-badge.scss',
})
export class NxBadge {
  @Input()
  variant: NxBadgeVariant = 'primary';

  @Input()
  size: NxBadgeSize = 'medium';

  @Input({ transform: booleanAttribute })
  rounded = false;

  @Input({ transform: booleanAttribute })
  outlined = false;

  @Input({ transform: booleanAttribute })
  dot = false;

  get badgeClasses() {
    return {
      [this.variant]: true,
      [this.size]: true,
      rounded: this.rounded,
      outlined: this.outlined,
      dot: this.dot,
    };
  }
}
