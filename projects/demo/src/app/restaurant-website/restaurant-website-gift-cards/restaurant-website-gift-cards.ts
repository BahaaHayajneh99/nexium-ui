import { Component, signal } from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { RouterLink } from '@angular/router';
import { nxProLicenseGranted, NxInput, NxTextarea, NxButton, NxIcon, NxAlert, NxBreadcrumb, NxBreadcrumbItem } from 'components';
import { RESTAURANT_GIFT_CARD_AMOUNTS, NxRestaurantGiftCardAmount } from '../restaurant-website-data';

/**
 * Gift Cards page of the "Restaurant Website" PRO template - a selectable amount row, a
 * recipient form, and an "Add to cart" success state (no real cart wiring).
 */
@Component({
  selector: 'app-restaurant-website-gift-cards',
  imports: [NgTemplateOutlet, RouterLink, NxInput, NxTextarea, NxButton, NxIcon, NxAlert, NxBreadcrumb],
  templateUrl: './restaurant-website-gift-cards.html',
  styleUrl: './restaurant-website-gift-cards.scss',
})
export class RestaurantWebsiteGiftCardsDemo {
  protected readonly licensed = nxProLicenseGranted();

  protected readonly breadcrumbItems: NxBreadcrumbItem[] = [
    { label: 'Home', link: '/restaurant-website/home' },
    { label: 'Gift Cards' },
  ];

  protected readonly amounts: NxRestaurantGiftCardAmount[] = RESTAURANT_GIFT_CARD_AMOUNTS;

  protected readonly selectedAmount = signal(
    RESTAURANT_GIFT_CARD_AMOUNTS.find((amount) => amount.popular)?.value ?? RESTAURANT_GIFT_CARD_AMOUNTS[0].value,
  );

  protected readonly added = signal(false);

  protected selectAmount(value: number): void {
    this.selectedAmount.set(value);
  }

  protected addToCart(): void {
    this.added.set(true);
  }

  protected buyAnother(): void {
    this.added.set(false);
  }
}
