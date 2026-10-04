import { Component, EventEmitter, Input, Output, booleanAttribute } from '@angular/core';
import { NxIcon } from '../../data-display/ui-icon';

export interface NxNavigationRailItem {
  id: string | number;
  label: string;
  icon: string;
  badge?: string | number;
}

/** A vertical icon rail nav, for app-shell-style layouts with a slim left-side nav column. */
@Component({
  selector: 'nx-navigation-rail',
  standalone: true,
  imports: [NxIcon],
  templateUrl: './ui-navigation-rail.html',
  styleUrl: './ui-navigation-rail.scss',
})
export class NxNavigationRail {
  @Input() items: NxNavigationRailItem[] = [];
  @Input() active: string | number = '';
  @Input({ transform: booleanAttribute }) showLabels = true;

  @Output() activeChange = new EventEmitter<string | number>();

  select(item: NxNavigationRailItem): void {
    this.active = item.id;
    this.activeChange.emit(item.id);
  }
}
