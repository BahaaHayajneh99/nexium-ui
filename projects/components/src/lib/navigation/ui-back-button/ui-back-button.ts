import { Location } from '@angular/common';
import { Component, EventEmitter, Input, Output, booleanAttribute } from '@angular/core';
import { NxIcon } from '../../data-display/ui-icon';

/** A labeled back-arrow button; navigates via browser history unless `preventNavigation` is set. */
@Component({
  selector: 'nx-back-button',
  standalone: true,
  imports: [NxIcon],
  template: `
    <button type="button" class="nx-back-button" (click)="onClick()">
      <nx-icon icon="nx-arrow-left" variant="svg" [size]="16"></nx-icon>
      @if (label) {
        <span>{{ label }}</span>
      }
    </button>
  `,
  styles: `
    .nx-back-button {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      padding: 6px 10px;
      border: none;
      border-radius: var(--nx-radius-sm, 4px);
      background: transparent;
      color: var(--shell-text);
      font-size: 14px;
      font-weight: 500;
      cursor: pointer;
    }
    .nx-back-button:hover {
      background-color: var(--shell-surface-hover, rgba(0, 0, 0, .05));
    }
  `,
})
export class NxBackButton {
  @Input() label = 'Back';
  @Input({ transform: booleanAttribute }) preventNavigation = false;

  @Output() backClick = new EventEmitter<void>();

  constructor(private location: Location) {}

  onClick(): void {
    this.backClick.emit();
    if (!this.preventNavigation) {
      this.location.back();
    }
  }
}
