import { Component, computed, signal } from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { RouterLink } from '@angular/router';
import {
  nxProLicenseGranted,
  NxBreadcrumb,
  NxBreadcrumbItem,
  NxInput,
  NxTextarea,
  NxIcon,
  NxButton,
  NxCard,
  NxCardHeader,
  NxCardTitle,
  NxCardContent,
  NxCardFooter,
  NxDivider,
} from 'components';
import { MENU_ITEMS } from '../restaurant-website-data';

type NxFulfillmentMode = 'pickup' | 'delivery';
type NxPaymentMethod = 'card' | 'paypal' | 'apple';

/**
 * Checkout page of the "Restaurant Website" PRO template - mirrors ecommerce-website-checkout's
 * structure (contact info, a fulfillment choice instead of a shipping address, a payment
 * section, and an order summary sidebar).
 */
@Component({
  selector: 'app-restaurant-website-checkout',
  imports: [
    NgTemplateOutlet,
    RouterLink,
    NxBreadcrumb,
    NxInput,
    NxTextarea,
    NxIcon,
    NxButton,
    NxCard,
    NxCardHeader,
    NxCardTitle,
    NxCardContent,
    NxCardFooter,
    NxDivider,
  ],
  templateUrl: './restaurant-website-checkout.html',
  styleUrl: './restaurant-website-checkout.scss',
})
export class RestaurantWebsiteCheckoutDemo {
  protected readonly licensed = nxProLicenseGranted();

  protected readonly breadcrumbItems: NxBreadcrumbItem[] = [
    { label: 'Home', link: '/restaurant-website/home' },
    { label: 'Cart', link: '/restaurant-website/cart' },
    { label: 'Checkout' },
  ];

  protected readonly fulfillmentMode = signal<NxFulfillmentMode>('pickup');
  protected readonly paymentMethod = signal<NxPaymentMethod>('card');

  protected readonly paymentMethods: { id: NxPaymentMethod; label: string; icon: string }[] = [
    { id: 'card', label: 'Credit Card', icon: 'nx-credit-card' },
    { id: 'paypal', label: 'PayPal', icon: 'nx-tag' },
    { id: 'apple', label: 'Apple Pay', icon: 'nx-smartphone' },
  ];

  protected readonly orderItems = [
    { item: MENU_ITEMS[4], qty: 1 },
    { item: MENU_ITEMS[0], qty: 2 },
    { item: MENU_ITEMS[12], qty: 1 },
  ];

  private readonly deliveryFee = 6;
  private readonly serviceFeeRate = 0.08;

  protected readonly subtotal = computed(() =>
    this.orderItems.reduce((sum, entry) => sum + entry.item.price * entry.qty, 0),
  );

  protected readonly serviceFee = computed(() => this.subtotal() * this.serviceFeeRate);

  protected readonly fulfillmentFee = computed(() => (this.fulfillmentMode() === 'delivery' ? this.deliveryFee : 0));

  protected readonly total = computed(() => this.subtotal() + this.serviceFee() + this.fulfillmentFee());

  protected readonly trustBadges = [
    { icon: 'nx-lock', label: 'Secure checkout' },
    { icon: 'nx-check-circle', label: 'Satisfaction guarantee' },
    { icon: 'nx-clock', label: 'Ready in ~25 min' },
  ];

  selectFulfillmentMode(mode: NxFulfillmentMode): void {
    this.fulfillmentMode.set(mode);
  }

  selectPaymentMethod(method: NxPaymentMethod): void {
    this.paymentMethod.set(method);
  }
}
