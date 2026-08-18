import { Component, Input, booleanAttribute } from '@angular/core';

export interface NxKeyValueItem {
  key: string;
  value: string;
}

export type NxKeyValueLayout = 'inline' | 'stacked';

@Component({
  selector: 'nx-key-value-list',
  standalone: true,
  imports: [],
  templateUrl: './ui-key-value-list.html',
  styleUrl: './ui-key-value-list.scss',
})
export class UiKeyValueList {
  @Input() items: NxKeyValueItem[] = [];
  @Input() layout: NxKeyValueLayout = 'inline';
  @Input({ transform: booleanAttribute }) bordered = true;
}
