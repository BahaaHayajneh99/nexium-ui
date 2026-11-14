import { Component, signal } from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { RouterLink } from '@angular/router';
import {
  NxButton,
  NxIcon,
  NxBadge,
  NxRating,
  NxTag,
  NxBreadcrumb,
  NxBreadcrumbItem,
  NxTabsComponent,
  NxTabComponent,
  nxProLicenseGranted,
} from 'components';
import { ECOM_PRODUCTS, ECOM_REVIEWS, NxEcomProduct, ecomProductGallery } from '../ecommerce-website-data';

interface NxEcomSpec {
  label: string;
  value: string;
}

@Component({
  selector: 'app-ecommerce-website-product',
  standalone: true,
  imports: [
    NgTemplateOutlet,
    RouterLink,
    NxButton,
    NxIcon,
    NxBadge,
    NxRating,
    NxTag,
    NxBreadcrumb,
    NxTabsComponent,
    NxTabComponent,
  ],
  templateUrl: './ecommerce-website-product.html',
  styleUrl: './ecommerce-website-product.scss',
})
export class EcommerceWebsiteProductDemo {
  protected readonly licensed = nxProLicenseGranted();

  protected readonly product: NxEcomProduct = ECOM_PRODUCTS[0];
  protected readonly reviews = ECOM_REVIEWS;

  protected readonly breadcrumbItems: NxBreadcrumbItem[] = [
    { label: 'Home', link: '/ecommerce-website/home' },
    { label: 'Shop', link: '/ecommerce-website/shop' },
    { label: this.product.name },
  ];

  protected readonly thumbnails = [0, 1, 2, 3];
  protected readonly galleryImages: string[] = ecomProductGallery(this.product);

  protected readonly specs: NxEcomSpec[] = [
    { label: 'Material', value: 'Aluminum frame, protein-leather ear cushions' },
    { label: 'Weight', value: '268 g' },
    { label: 'Dimensions', value: '7.4 x 6.3 x 3.1 in (folded)' },
    { label: 'Warranty', value: '2-year limited warranty' },
  ];

  protected readonly relatedProducts: NxEcomProduct[] = ECOM_PRODUCTS.filter((item) => item.id !== this.product.id).slice(
    0,
    4,
  );

  protected readonly activeThumbnail = signal(0);
  protected readonly selectedColor = signal<string>(this.product.colors?.[0] ?? '');
  protected readonly selectedSize = signal<string>(this.product.sizes?.[0] ?? '');
  protected readonly qty = signal(1);

  protected get saveAmount(): number {
    return this.product.compareAtPrice ? this.product.compareAtPrice - this.product.price : 0;
  }

  protected setThumbnail(index: number): void {
    this.activeThumbnail.set(index);
  }

  protected selectColor(color: string): void {
    this.selectedColor.set(color);
  }

  protected selectSize(size: string): void {
    this.selectedSize.set(size);
  }

  protected incrementQty(): void {
    this.qty.update((value) => value + 1);
  }

  protected decrementQty(): void {
    this.qty.update((value) => Math.max(1, value - 1));
  }

  protected badgeVariant(badge?: string): 'danger' | 'info' | 'success' {
    return badge === 'Sale' ? 'danger' : badge === 'New' ? 'info' : 'success';
  }
}
