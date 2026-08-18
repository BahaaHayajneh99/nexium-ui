import { Component, EventEmitter, Input, Output, booleanAttribute } from '@angular/core';
import { NgClass } from '@angular/common';
import { UiIcon } from '../../data-display/ui-icon';

@Component({
  selector: 'nx-collapse',
  standalone: true,
  imports: [NgClass, UiIcon],
  template: `
    <div class="nx-collapse" [ngClass]="{ disabled: disabled }">
      <div class="nx-collapse-header" (click)="toggle()">
        <span>{{ header }}</span>
        <nx-icon class="nx-collapse-icon" [class.open]="expanded" icon="nx-chevron-down" variant="svg" [size]="16"></nx-icon>
      </div>
      @if (expanded) {
        <div class="nx-collapse-body">
          <ng-content></ng-content>
        </div>
      }
    </div>
  `,
  styles: `
    .nx-collapse {
      border: 1px solid var(--shell-border);
      border-radius: 8px;
      overflow: hidden;
    }
    .nx-collapse-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 12px 16px;
      cursor: pointer;
      font-weight: 600;
      background-color: var(--shell-surface-hover);
    }
    .nx-collapse.disabled .nx-collapse-header {
      cursor: not-allowed;
      opacity: .6;
    }
    .nx-collapse-icon {
      transition: transform .2s ease;
    }
    .nx-collapse-icon.open {
      transform: rotate(180deg);
    }
    .nx-collapse-body {
      padding: 16px;
      border-top: 1px solid var(--shell-border);
    }
  `,
})
export class UiCollapse {
  @Input() header = '';
  @Input({ transform: booleanAttribute }) expanded = false;
  @Input({ transform: booleanAttribute }) disabled = false;
  @Output() expandedChange = new EventEmitter<boolean>();

  toggle(): void {
    if (this.disabled) return;
    this.expanded = !this.expanded;
    this.expandedChange.emit(this.expanded);
  }
}
