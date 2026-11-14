import { Component, computed, signal } from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { RouterLink } from '@angular/router';
import { NxButton, NxIcon, NxInput, NxBreadcrumb, NxBreadcrumbItem, NxAlert, nxProLicenseGranted } from 'components';
import { ECOM_PRODUCTS, NxEcomProduct } from '../ecommerce-website-data';

interface NxEcomCartLine {
  product: NxEcomProduct;
  qty: number;
  variant: string;
}

@Component({
  selector: 'app-ecommerce-website-cart',
  standalone: true,
  imports: [NgTemplateOutlet, RouterLink, NxButton, NxIcon, NxInput, NxBreadcrumb, NxAlert],
  templateUrl: './ecommerce-website-cart.html',
  styleUrl: './ecommerce-website-cart.scss',
})
export class EcommerceWebsiteCartDemo {
  protected readonly licensed = nxProLicenseGranted();

  protected readonly breadcrumbItems: NxBreadcrumbItem[] = [{ label: 'Home', link: '/ecommerce-website/home' }, { label: 'Cart' }];

  private readonly discountRate = 0.1;

  protected readonly cartLines = signal<NxEcomCartLine[]>([
    { product: ECOM_PRODUCTS[0], qty: 1, variant: 'Black · One Size' },
    { product: ECOM_PRODUCTS[2], qty: 2, variant: 'Black' },
    { product: ECOM_PRODUCTS[6], qty: 1, variant: 'Linen Shade' },
  ]);

  protected readonly promoApplied = signal(false);

  protected readonly subtotal = computed(() =>
    this.cartLines().reduce((sum, line) => sum + line.qty * line.product.price, 0),
  );

  protected readonly discount = computed(() => (this.promoApplied() ? this.subtotal() * this.discountRate : 0));

  protected readonly shipping = computed(() => (this.subtotal() >= 50 || this.cartLines().length === 0 ? 0 : 8));

  protected readonly total = computed(() => this.subtotal() - this.discount() + this.shipping());

  protected increment(productId: number): void {
    this.cartLines.update((lines) =>
      lines.map((line) => (line.product.id === productId ? { ...line, qty: line.qty + 1 } : line)),
    );
  }

  protected decrement(productId: number): void {
    this.cartLines.update((lines) =>
      lines.map((line) => (line.product.id === productId ? { ...line, qty: Math.max(1, line.qty - 1) } : line)),
    );
  }

  protected removeLine(productId: number): void {
    this.cartLines.update((lines) => lines.filter((line) => line.product.id !== productId));
  }

  protected applyPromo(): void {
    if (!this.promoApplied()) {
      this.promoApplied.set(true);
    }
  }
}
