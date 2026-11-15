import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgFor } from '@angular/common';
import { NxIcon } from '../../data-display/ui-icon';

export interface NxBottomNavItem {
  id: string | number;
  label: string;
  icon: string;
}

@Component({
  selector: 'nx-bottom-navigation',
  standalone: true,
  imports: [NgFor, NxIcon],
  templateUrl: './ui-bottom-navigation.html',
  styleUrl: './ui-bottom-navigation.scss',
})
export class NxBottomNavigation {
  @Input() items: NxBottomNavItem[] = [];
  @Input() active: string | number = '';

  @Output() activeChange = new EventEmitter<string | number>();

  select(item: NxBottomNavItem): void {
    this.active = item.id;
    this.activeChange.emit(item.id);
  }

  trackByItemId(index: number, item: NxBottomNavItem): string | number {
    return item.id;
  }
}
