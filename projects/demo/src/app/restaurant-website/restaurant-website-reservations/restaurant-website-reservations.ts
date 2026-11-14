import { Component, signal } from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { RouterLink } from '@angular/router';
import { nxProLicenseGranted, NxInput, NxTextarea, NxButton, NxIcon, NxAlert, NxBreadcrumb, NxBreadcrumbItem } from 'components';
import { RESTAURANT_HOURS } from '../restaurant-website-data';

/**
 * Reservations page of the "Restaurant Website" PRO template - a "Book a table" form with
 * a party-size stepper (same pattern as the cart's quantity stepper) and a success
 * confirmation shown in place instead of navigating away, alongside the opening hours.
 */
@Component({
  selector: 'app-restaurant-website-reservations',
  imports: [NgTemplateOutlet, RouterLink, NxInput, NxTextarea, NxButton, NxIcon, NxAlert, NxBreadcrumb],
  templateUrl: './restaurant-website-reservations.html',
  styleUrl: './restaurant-website-reservations.scss',
})
export class RestaurantWebsiteReservationsDemo {
  protected readonly licensed = nxProLicenseGranted();

  protected readonly breadcrumbItems: NxBreadcrumbItem[] = [
    { label: 'Home', link: '/restaurant-website/home' },
    { label: 'Reservations' },
  ];

  protected readonly hours = RESTAURANT_HOURS;

  protected readonly partySize = signal(2);
  protected readonly submitted = signal(false);

  protected incrementParty(): void {
    this.partySize.update((size) => Math.min(20, size + 1));
  }

  protected decrementParty(): void {
    this.partySize.update((size) => Math.max(1, size - 1));
  }

  protected submitReservation(): void {
    this.submitted.set(true);
  }

  protected bookAnother(): void {
    this.submitted.set(false);
    this.partySize.set(2);
  }
}
