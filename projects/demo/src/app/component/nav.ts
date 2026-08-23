import { Component, HostListener, inject } from '@angular/core';
import { CommonService } from '../services/common.service';
import { NgFor, NgIf } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { NxIcon } from '../../../../../dist/components';
import { ThemeService } from '../services/theme.service';
import { SearchPalette } from './search-palette';

@Component({
  selector: 'app-nav',
  imports: [NgIf,NgFor, RouterLink, RouterLinkActive, NxIcon, SearchPalette],
  templateUrl: './nav.html',
  styleUrl: './nav.scss',
})
export class Nav {
  public commonService = inject(CommonService);

  paletteOpen = false;
  currentYaer = new Date().getFullYear();

  constructor(readonly theme: ThemeService) {}

  @HostListener('document:keydown', ['$event'])
  onKeydown(event: KeyboardEvent): void {
    if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'k') {
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

  private expandedItem: string = '';
  private expandedSubItem: string = '';
}
