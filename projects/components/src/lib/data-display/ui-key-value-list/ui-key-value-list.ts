import { Component, Input, booleanAttribute } from '@angular/core';
import { NgFor } from '@angular/common';

export interface NxKeyValueItem {
  key: string;
  value: string;
}

export type NxKeyValueLayout = 'inline' | 'stacked';

@Component({
  selector: 'nx-key-value-list',
  standalone: true,
  imports: [NgFor],
  templateUrl: './ui-key-value-list.html',
  styleUrl: './ui-key-value-list.scss',
})
export class NxKeyValueList {
  @Input() items: NxKeyValueItem[] = [];
  @Input() layout: NxKeyValueLayout = 'inline';
  @Input({ transform: booleanAttribute }) bordered = true;

  trackByItemKey(_index: number, item: NxKeyValueItem): string {
    return item.key;
  }
}
