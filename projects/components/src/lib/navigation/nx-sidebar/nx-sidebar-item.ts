import { booleanAttribute, Component, Input } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
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
  imports: [NgIf, NgFor, RouterLink, RouterLinkActive, NxIcon, NxSidebarItemComponent],
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

  trackByChildLabel(index: number, child: NxSidebarItem): string {
    return child.label;
  }
}
