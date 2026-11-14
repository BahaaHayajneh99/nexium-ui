import { Component, computed, signal } from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { RouterLink } from '@angular/router';
import { NxButton, NxIcon, NxBadge, NxRating, NxChip, NxBreadcrumb, NxBreadcrumbItem, nxProLicenseGranted } from 'components';
import { ECOM_CATEGORIES, ECOM_PRODUCTS, NxEcomProduct } from '../ecommerce-website-data';

type NxEcomSort = 'featured' | 'price-asc' | 'price-desc' | 'rating';

interface NxEcomPriceBand {
  label: string;
  min: number;
  max: number;
}

@Component({
  selector: 'app-ecommerce-website-shop',
  standalone: true,
  imports: [NgTemplateOutlet, RouterLink, NxButton, NxIcon, NxBadge, NxRating, NxChip, NxBreadcrumb],
  templateUrl: './ecommerce-website-shop.html',
  styleUrl: './ecommerce-website-shop.scss',
})
export class EcommerceWebsiteShopDemo {
  protected readonly licensed = nxProLicenseGranted();

  protected readonly breadcrumbItems: NxBreadcrumbItem[] = [{ label: 'Home', link: '/ecommerce-website/home' }, { label: 'Shop' }];

  protected readonly categories = ECOM_CATEGORIES;

  protected readonly priceBands: NxEcomPriceBand[] = [
    { label: 'Under $50', min: 0, max: 50 },
    { label: '$50 - $100', min: 50, max: 100 },
    { label: '$100 - $200', min: 100, max: 200 },
    { label: 'Over $200', min: 200, max: Infinity },
  ];

  protected readonly sortOptions: { key: NxEcomSort; label: string }[] = [
    { key: 'featured', label: 'Featured' },
    { key: 'price-asc', label: 'Price: Low to High' },
    { key: 'price-desc', label: 'Price: High to Low' },
    { key: 'rating', label: 'Top Rated' },
  ];

  protected readonly shopCategory = signal<string>('All');
  protected readonly priceFilter = signal<string | null>(null);
  protected readonly sortBy = signal<NxEcomSort>('featured');

  protected readonly filteredProducts = computed<NxEcomProduct[]>(() => {
    let list = ECOM_PRODUCTS.slice();

    const category = this.shopCategory();
    if (category !== 'All') {
      list = list.filter((product) => product.category === category);
    }

    const priceLabel = this.priceFilter();
    if (priceLabel) {
      const band = this.priceBands.find((entry) => entry.label === priceLabel);
      if (band) {
        list = list.filter((product) => product.price >= band.min && product.price <= band.max);
      }
    }

    switch (this.sortBy()) {
      case 'price-asc':
        list = list.slice().sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        list = list.slice().sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        list = list.slice().sort((a, b) => b.rating - a.rating);
        break;
      default:
        break;
    }

    return list;
  });

  protected selectCategory(category: string): void {
    this.shopCategory.set(category);
  }

  protected togglePriceFilter(label: string): void {
    this.priceFilter.update((current) => (current === label ? null : label));
  }

  protected setSort(sort: NxEcomSort): void {
    this.sortBy.set(sort);
  }

  protected clearFilters(): void {
    this.shopCategory.set('All');
    this.priceFilter.set(null);
  }

  protected badgeVariant(badge?: string): 'danger' | 'info' | 'success' {
    return badge === 'Sale' ? 'danger' : badge === 'New' ? 'info' : 'success';
  }
}
