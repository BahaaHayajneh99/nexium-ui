import { booleanAttribute, Component, EventEmitter, Input, Output } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { NxIcon } from '../../data-display/ui-icon';
import { NxSidebarItem, NxSidebarItemComponent } from './nx-sidebar-item';

@Component({
  selector: 'nx-sidebar',
  standalone: true,
  imports: [NgIf, NgFor, NxIcon, NxSidebarItemComponent],
  templateUrl: './nx-sidebar.html',
  styleUrl: './nx-sidebar.scss',
})
export class NxSidebar {
  @Input() items: NxSidebarItem[] = [];
  @Input({ transform: booleanAttribute }) collapsed = false;
  @Output() collapsedChange = new EventEmitter<boolean>();

  toggleCollapsed(): void {
    this.collapsed = !this.collapsed;
    this.collapsedChange.emit(this.collapsed);
  }

  trackByItemLabel(index: number, item: NxSidebarItem): string {
    return item.label;
  }
}
