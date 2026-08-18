import { Component, EventEmitter, Input, Output, booleanAttribute } from '@angular/core';
import { NgClass } from '@angular/common';

export interface NxListItem {
  label: string;
  icon?: string;
  disabled?: boolean;
}

@Component({
  selector: 'nx-list',
  standalone: true,
  imports: [NgClass],
  template: `
    <ul class="nx-list" [ngClass]="{ bordered: bordered }">
      @for (item of items; track item.label) {
        <li
          class="nx-list-item"
          [ngClass]="{ hoverable: hoverable, disabled: item.disabled }"
          (click)="onItemClick(item)">
          @if (item.icon) {
            <i class="nx-list-item-icon" [ngClass]="item.icon"></i>
          }
          <span>{{ item.label }}</span>
        </li>
      } @empty {
        <li class="nx-list-empty">No items</li>
      }
    </ul>
  `,
  styles: `
    .nx-list {
      list-style: none;
      display: flex;
      flex-direction: column;
    }

    .nx-list.bordered {
      border: 1px solid var(--shell-border);
      border-radius: 8px;
      overflow: hidden;
    }

    .nx-list-item {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 12px 16px;
      border-bottom: 1px solid var(--shell-border);
    }

    .nx-list-item:last-child {
      border-bottom: none;
    }

    .nx-list-item.hoverable:not(.disabled) {
      cursor: pointer;
    }

    .nx-list-item.hoverable:not(.disabled):hover {
      background-color: var(--shell-surface-hover);
    }

    .nx-list-item.disabled {
      opacity: .6;
      pointer-events: none;
    }

    .nx-list-empty {
      padding: 12px 16px;
      color: var(--shell-text-secondary);
    }
  `,
})
export class UiList {
  @Input() items: NxListItem[] = [];
  @Input({ transform: booleanAttribute }) bordered = false;
  @Input({ transform: booleanAttribute }) hoverable = false;

  @Output() itemClick = new EventEmitter<NxListItem>();

  onItemClick(item: NxListItem): void {
    if (!item.disabled) {
      this.itemClick.emit(item);
    }
  }
}
