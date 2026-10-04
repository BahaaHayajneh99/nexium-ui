import { Component, HostListener, inject } from '@angular/core';
import { CommonService } from '../services/common.service';
import { NavigationEnd, Router, RouterLink, RouterLinkActive } from '@angular/router';
import { filter } from 'rxjs/operators';
import { NxIcon, NxChip } from '../../../../../dist/components';
import { ThemeService } from '../services/theme.service';
import { SearchPalette } from './search-palette';
import { NAV_ITEMS } from './nav-items';

@Component({
  selector: 'app-nav',
  imports: [RouterLink, RouterLinkActive, NxIcon, NxChip, SearchPalette],
  templateUrl: './nav.html',
  styleUrl: './nav.scss',
})
export class Nav {
  public commonService = inject(CommonService);

  readonly navItems = NAV_ITEMS;

  paletteOpen = false;
  currentYaer = new Date().getFullYear();

  constructor(
    readonly theme: ThemeService,
    private router: Router,
  ) {
    // Whichever sub-group contains the current route starts expanded, so landing on/refreshing a
    // page never hides the very link you're already on; every other group stays collapsed by
    // default - with ~20 sub-groups under "Components" alone, showing everything at once is the
    // "wall of links" problem this whole mechanism exists to fix.
    this.autoExpandActiveGroup();
    this.router.events.pipe(filter((e) => e instanceof NavigationEnd)).subscribe(() => this.autoExpandActiveGroup());
  }

  @HostListener('document:keydown', ['$event'])
  onKeydown(event: KeyboardEvent): void {
    // Ctrl+K or Cmd+K or Ctrl+/ for search
    if ((event.ctrlKey || event.metaKey) && (event.key.toLowerCase() === 'k' || event.key === '/')) {
      event.preventDefault();
      this.paletteOpen = true;
    }
  }

  openPalette(): void {
    this.paletteOpen = true;
  }

  closePalette(): void {
    this.paletteOpen = false;
  }

  toggleExpandItem(item: string): void {
    if (this.isExpandedSubNav(item)) {
      this.expandedItem = '';
    } else {
      this.expandedItem = item;
    }
  }


  isExpandedSubNav(item: string): boolean {
    return this.expandedItem === item;
  }

  isExpandedChildSubNav(item: string, subItem: string): boolean {
    return this.expandedItem === item && this.expandedSubItem === subItem;
  }

  subStringWithoutLastTwoDigits(str: string): string {
    const subStr = str.substring(0, str.length - 2);
    return subStr;
  }

  toggleGroup(itemKey: string, heading: string): void {
    const key = this.groupKey(itemKey, heading);
    if (this.expandedGroups.has(key)) {
      this.expandedGroups.delete(key);
    } else {
      this.expandedGroups.add(key);
    }
  }

  isGroupExpanded(itemKey: string, heading: string): boolean {
    return this.expandedGroups.has(this.groupKey(itemKey, heading));
  }

  private groupKey(itemKey: string, heading: string): string {
    return `${itemKey}::${heading}`;
  }

  /** Expands whichever sub-group (if any) contains a link matching the current URL. */
  private autoExpandActiveGroup(): void {
    const url = this.router.url.split('?')[0].split('#')[0];
    for (const item of NAV_ITEMS) {
      if (!item.groups) continue;
      for (const group of item.groups) {
        if (!group.heading) continue;
        const isActive = group.links.some((link) => url === link.path || url.startsWith(link.path + '/'));
        if (isActive) {
          this.expandedGroups.add(this.groupKey(item.key, group.heading));
        }
      }
    }
  }

  private expandedItem: string = '';
  private expandedSubItem: string = '';
  private expandedGroups = new Set<string>();
}
