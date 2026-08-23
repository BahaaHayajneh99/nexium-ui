import { booleanAttribute, Component, Input } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { NxIcon } from '../../data-display/ui-icon';

export interface NxSidebarItem {
  label: string;
  link?: string;
  icon?: string;
  exact?: boolean;
  children?: NxSidebarItem[];
}

@Component({
  selector: 'nx-sidebar-item',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, NxIcon, NxSidebarItemComponent],
  templateUrl: './nx-sidebar-item.html',
  styleUrl: './nx-sidebar.scss',
})
export class NxSidebarItemComponent {
  @Input({ required: true }) item!: NxSidebarItem;
  @Input({ transform: booleanAttribute }) collapsed = false;

  expanded = false;

  get hasChildren(): boolean {
    return !!this.item.children?.length;
  }

  toggle(): void {
    if (this.hasChildren) {
      this.expanded = !this.expanded;
    }
  }
}
