import { Component, computed, signal } from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { RouterLink } from '@angular/router';
import { NxButton, NxIcon, NxRating, NxTag, NxChip, NxBreadcrumb, NxBreadcrumbItem, NxQrCode, nxProLicenseGranted } from 'components';
import { RESTAURANT_CATEGORIES, MENU_ITEMS, NxMenuItem, NxMenuCategory } from '../restaurant-website-data';

/**
 * Menu page of the "Restaurant Website" PRO template - category filter chips over a
 * responsive grid of dish cards, structurally identical to the E-Commerce Shop page's
 * category filter pattern.
 */
@Component({
  selector: 'app-restaurant-website-menu',
  imports: [NgTemplateOutlet, RouterLink, NxButton, NxIcon, NxRating, NxTag, NxChip, NxBreadcrumb, NxQrCode],
  templateUrl: './restaurant-website-menu.html',
  styleUrl: './restaurant-website-menu.scss',
})
export class RestaurantWebsiteMenuDemo {
  protected readonly licensed = nxProLicenseGranted();

  protected readonly breadcrumbItems: NxBreadcrumbItem[] = [{ label: 'Home', link: '/restaurant-website/home' }, { label: 'Menu' }];

  protected readonly categories = RESTAURANT_CATEGORIES;

  protected readonly menuQrValue = 'https://oliveoak.example/menu';

  protected readonly activeCategory = signal<NxMenuCategory | 'All'>('All');

  protected readonly filteredItems = computed<NxMenuItem[]>(() => {
    const category = this.activeCategory();
    return category === 'All' ? MENU_ITEMS.slice() : MENU_ITEMS.filter((item) => item.category === category);
  });

  protected readonly cartCount = signal(0);

  protected selectCategory(category: NxMenuCategory | 'All'): void {
    this.activeCategory.set(category);
  }

  protected addToCart(): void {
    this.cartCount.update((count) => count + 1);
  }
}
