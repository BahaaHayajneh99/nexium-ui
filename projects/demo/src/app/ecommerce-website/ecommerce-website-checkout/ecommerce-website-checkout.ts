import { Component, signal } from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { RouterLink } from '@angular/router';
import {
  nxProLicenseGranted,
  NxBreadcrumb,
  NxInput,
  NxCheckbox,
  NxIcon,
  NxButton,
  NxCard,
  NxCardHeader,
  NxCardTitle,
  NxCardContent,
  NxCardFooter,
  NxDivider,
} from 'components';
import { ECOM_PRODUCTS } from '../ecommerce-website-data';

type NxEcomPaymentMethod = 'card' | 'paypal' | 'apple';

/**
 * Checkout page of the "E-Commerce Website" PRO template - a classic multi-section
 * checkout flow (contact info, shipping address, payment method, order summary).
 */
@Component({
  selector: 'app-ecommerce-website-checkout',
  imports: [
    NgTemplateOutlet,
    RouterLink,
    NxBreadcrumb,
    NxInput,
    NxCheckbox,
    NxIcon,
    NxButton,
    NxCard,
    NxCardHeader,
    NxCardTitle,
    NxCardContent,
    NxCardFooter,
    NxDivider,
  ],
  templateUrl: './ecommerce-website-checkout.html',
  styleUrl: './ecommerce-website-checkout.scss',
})
export class EcommerceWebsiteCheckoutDemo {
  protected readonly licensed = nxProLicenseGranted();

  protected readonly steps = ['1. Cart', '2. Shipping', '3. Payment', '4. Review'];
  protected readonly activeStepIndex = 1;

  protected readonly paymentMethod = signal<NxEcomPaymentMethod>('card');
  protected readonly billingSameAsShipping = signal(true);

  protected readonly paymentMethods: { id: NxEcomPaymentMethod; label: string; icon: string }[] = [
    { id: 'card', label: 'Credit Card', icon: 'nx-credit-card' },
    { id: 'paypal', label: 'PayPal', icon: 'nx-tag' },
    { id: 'apple', label: 'Apple Pay', icon: 'nx-smartphone' },
  ];

  protected readonly orderItems = [
    { product: ECOM_PRODUCTS[0], qty: 1 },
    { product: ECOM_PRODUCTS[3], qty: 1 },
    { product: ECOM_PRODUCTS[4], qty: 2 },
  ];

  protected readonly shippingCost = 8;
  protected readonly taxRate = 0.08;

  protected readonly states = ['California', 'New York', 'Texas', 'Washington', 'Illinois', 'Florida'];
  protected readonly countries = ['United States', 'Canada', 'United Kingdom', 'Australia'];

  protected readonly trustBadges = [
    { icon: 'nx-lock', label: 'Secure checkout' },
    { icon: 'nx-check-circle', label: 'Money-back guarantee' },
    { icon: 'nx-shopping-cart', label: 'Fast delivery' },
  ];

  get subtotal(): number {
    return this.orderItems.reduce((sum, item) => sum + item.product.price * item.qty, 0);
  }

  get tax(): number {
    return this.subtotal * this.taxRate;
  }

  get total(): number {
    return this.subtotal + this.shippingCost + this.tax;
  }

  selectPaymentMethod(method: NxEcomPaymentMethod): void {
    this.paymentMethod.set(method);
  }
}
