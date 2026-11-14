import { Component, signal } from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { RouterLink } from '@angular/router';
import { nxProLicenseGranted, NxInput, NxTextarea, NxButton, NxIcon, NxAlert, NxBreadcrumb, NxBreadcrumbItem } from 'components';
import { RESTAURANT_EVENT_PACKAGES, NxRestaurantEventPackage } from '../restaurant-website-data';

/**
 * Events & Catering page of the "Restaurant Website" PRO template - a pricing-card-style
 * grid of event packages followed by an inquiry form with a success state, mirroring the
 * Reservations page's submit pattern.
 */
@Component({
  selector: 'app-restaurant-website-events',
  imports: [NgTemplateOutlet, RouterLink, NxInput, NxTextarea, NxButton, NxIcon, NxAlert, NxBreadcrumb],
  templateUrl: './restaurant-website-events.html',
  styleUrl: './restaurant-website-events.scss',
})
export class RestaurantWebsiteEventsDemo {
  protected readonly licensed = nxProLicenseGranted();

  protected readonly breadcrumbItems: NxBreadcrumbItem[] = [
    { label: 'Home', link: '/restaurant-website/home' },
    { label: 'Events & Catering' },
  ];

  protected readonly packages: NxRestaurantEventPackage[] = RESTAURANT_EVENT_PACKAGES;

  protected readonly submitted = signal(false);

  protected submitInquiry(): void {
    this.submitted.set(true);
  }

  protected newInquiry(): void {
    this.submitted.set(false);
  }
}
