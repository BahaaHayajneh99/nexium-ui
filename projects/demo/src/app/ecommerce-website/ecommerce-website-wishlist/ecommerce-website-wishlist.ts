import { Component, computed, signal } from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { RouterLink } from '@angular/router';
import {
  NxButton,
  NxIcon,
  NxBadge,
  NxRating,
  NxBreadcrumb,
  NxBreadcrumbItem,
  nxProLicenseGranted,
} from 'components';
import { ECOM_PRODUCTS, NxEcomProduct } from '../ecommerce-website-data';

@Component({
  selector: 'app-ecommerce-website-wishlist',
  standalone: true,
  imports: [NgTemplateOutlet, RouterLink, NxButton, NxIcon, NxBadge, NxRating, NxBreadcrumb],
  templateUrl: './ecommerce-website-wishlist.html',
  styleUrl: './ecommerce-website-wishlist.scss',
})
export class EcommerceWebsiteWishlistDemo {
  protected readonly licensed = nxProLicenseGranted();

  protected readonly breadcrumbItems: NxBreadcrumbItem[] = [
    { label: 'Home', link: '/ecommerce-website/home' },
    { label: 'Wishlist' },
  ];

  protected readonly wishlistIds = signal<number[]>([1, 3, 7, 10, 13]);

  protected readonly wishlistProducts = computed<NxEcomProduct[]>(() =>
    this.wishlistIds()
      .map((id) => ECOM_PRODUCTS.find((product) => product.id === id))
      .filter((product): product is NxEcomProduct => !!product),
  );

  protected readonly itemCount = computed(() => this.wishlistProducts().length);

  protected readonly addedIds = signal<number[]>([]);

  protected removeFromWishlist(productId: number): void {
    this.wishlistIds.update((ids) => ids.filter((id) => id !== productId));
  }

  protected addToCart(productId: number): void {
    if (!this.addedIds().includes(productId)) {
      this.addedIds.update((ids) => [...ids, productId]);
    }
  }

  protected isAdded(productId: number): boolean {
    return this.addedIds().includes(productId);
  }

  protected badgeVariant(badge?: string): 'danger' | 'info' | 'success' {
    return badge === 'Sale' ? 'danger' : badge === 'New' ? 'info' : 'success';
  }
}
