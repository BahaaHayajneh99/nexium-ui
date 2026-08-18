import { booleanAttribute, Component, EventEmitter, Input, Output } from '@angular/core';
import { UiIcon } from '../../data-display/ui-icon';
import { NxSidebarItem, NxSidebarItemComponent } from './nx-sidebar-item';

@Component({
  selector: 'nx-sidebar',
  standalone: true,
  imports: [UiIcon, NxSidebarItemComponent],
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
}
