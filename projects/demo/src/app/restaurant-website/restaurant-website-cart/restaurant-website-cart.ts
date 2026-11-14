import { Component, computed, signal } from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { RouterLink } from '@angular/router';
import { NxButton, NxIcon, NxInput, NxBreadcrumb, NxBreadcrumbItem, NxAlert, nxProLicenseGranted } from 'components';
import { MENU_ITEMS, NxMenuItem } from '../restaurant-website-data';

interface NxRestaurantCartLine {
  item: NxMenuItem;
  qty: number;
}

/**
 * Cart page of the "Restaurant Website" PRO template - mirrors ecommerce-website-cart's
 * structure (seeded cart lines, quantity steppers, promo code, order summary totals) with
 * a service fee in place of shipping.
 */
@Component({
  selector: 'app-restaurant-website-cart',
  imports: [NgTemplateOutlet, RouterLink, NxButton, NxIcon, NxInput, NxBreadcrumb, NxAlert],
  templateUrl: './restaurant-website-cart.html',
  styleUrl: './restaurant-website-cart.scss',
})
export class RestaurantWebsiteCartDemo {
  protected readonly licensed = nxProLicenseGranted();

  protected readonly breadcrumbItems: NxBreadcrumbItem[] = [{ label: 'Home', link: '/restaurant-website/home' }, { label: 'Cart' }];

  private readonly discountRate = 0.1;
  private readonly serviceFeeRate = 0.08;

  protected readonly cartLines = signal<NxRestaurantCartLine[]>([
    { item: MENU_ITEMS[4], qty: 1 },
    { item: MENU_ITEMS[0], qty: 2 },
    { item: MENU_ITEMS[12], qty: 1 },
  ]);

  protected readonly promoApplied = signal(false);

  protected readonly subtotal = computed(() =>
    this.cartLines().reduce((sum, line) => sum + line.qty * line.item.price, 0),
  );

  protected readonly discount = computed(() => (this.promoApplied() ? this.subtotal() * this.discountRate : 0));

  protected readonly serviceFee = computed(() => (this.cartLines().length === 0 ? 0 : this.subtotal() * this.serviceFeeRate));

  protected readonly total = computed(() => this.subtotal() - this.discount() + this.serviceFee());

  protected increment(itemId: number): void {
    this.cartLines.update((lines) => lines.map((line) => (line.item.id === itemId ? { ...line, qty: line.qty + 1 } : line)));
  }

  protected decrement(itemId: number): void {
    this.cartLines.update((lines) =>
      lines.map((line) => (line.item.id === itemId ? { ...line, qty: Math.max(1, line.qty - 1) } : line)),
    );
  }

  protected removeLine(itemId: number): void {
    this.cartLines.update((lines) => lines.filter((line) => line.item.id !== itemId));
  }

  protected applyPromo(): void {
    if (!this.promoApplied()) {
      this.promoApplied.set(true);
    }
  }
}
