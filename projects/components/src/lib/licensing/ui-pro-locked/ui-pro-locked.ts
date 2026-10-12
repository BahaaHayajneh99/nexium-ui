import { Component, Input } from '@angular/core';
import { NxChip } from '../../data-display/ui-chip';

/** Rendered by PRO components in place of their real content when no valid license token is configured. */
@Component({
  selector: 'nx-pro-locked',
  standalone: true,
  imports: [NxChip],
  templateUrl: './ui-pro-locked.html',
  styleUrl: './ui-pro-locked.scss',
})
export class NxProLocked {
  @Input() componentName = 'This component';
  @Input() upgradeUrl = '/pro-upgrade';
}
