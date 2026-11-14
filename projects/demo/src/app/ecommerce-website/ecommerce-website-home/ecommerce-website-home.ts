import { Component } from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { RouterLink } from '@angular/router';
import { NxButton, NxIcon, NxBadge, NxRating, nxProLicenseGranted } from 'components';
import { ECOM_CATEGORIES, ECOM_PRODUCTS, ECOM_TESTIMONIALS, NxEcomProduct } from '../ecommerce-website-data';

interface NxEcomCategoryTile {
  name: string;
  icon: string;
}

interface NxEcomTrustItem {
  icon: string;
  label: string;
}

@Component({
  selector: 'app-ecommerce-website-home',
  standalone: true,
  imports: [NgTemplateOutlet, RouterLink, NxButton, NxIcon, NxBadge, NxRating],
  templateUrl: './ecommerce-website-home.html',
  styleUrl: './ecommerce-website-home.scss',
})
export class EcommerceWebsiteHomeDemo {
  protected readonly licensed = nxProLicenseGranted();

  private readonly categoryIcons: Record<string, string> = {
    Electronics: 'nx-smartphone',
    Clothing: 'nx-tag',
    Home: 'nx-home',
    Beauty: 'nx-heart',
    Sports: 'nx-fire',
  };

  protected readonly categoryTiles: NxEcomCategoryTile[] = ECOM_CATEGORIES.filter((category) => category !== 'All').map(
    (name) => ({
      name,
      icon: this.categoryIcons[name] ?? 'nx-grid',
    }),
  );

  protected readonly featuredProducts: NxEcomProduct[] = ECOM_PRODUCTS.slice(0, 8);
  protected readonly newArrivals: NxEcomProduct[] = ECOM_PRODUCTS.filter((product) => product.badge === 'New');
  protected readonly testimonials = ECOM_TESTIMONIALS;

  protected readonly trustBadges: NxEcomTrustItem[] = [
    { icon: 'nx-shopping-cart', label: 'Free shipping over $50' },
    { icon: 'nx-check-circle', label: '30-day easy returns' },
    { icon: 'nx-lock', label: 'Secure checkout' },
    { icon: 'nx-phone', label: '24/7 support' },
  ];

  protected badgeVariant(badge?: string): 'danger' | 'info' | 'success' {
    return badge === 'Sale' ? 'danger' : badge === 'New' ? 'info' : 'success';
  }
}
