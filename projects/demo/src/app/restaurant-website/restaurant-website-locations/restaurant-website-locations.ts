import { Component } from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { RouterLink } from '@angular/router';
import { nxProLicenseGranted, NxButton, NxIcon, NxBreadcrumb, NxBreadcrumbItem } from 'components';
import { RESTAURANT_LOCATIONS, NxRestaurantLocation } from '../restaurant-website-data';

/**
 * Locations page of the "Restaurant Website" PRO template - a card per location with a
 * photo, address, phone, and opening hours, built from RESTAURANT_LOCATIONS.
 */
@Component({
  selector: 'app-restaurant-website-locations',
  imports: [NgTemplateOutlet, RouterLink, NxButton, NxIcon, NxBreadcrumb],
  templateUrl: './restaurant-website-locations.html',
  styleUrl: './restaurant-website-locations.scss',
})
export class RestaurantWebsiteLocationsDemo {
  protected readonly licensed = nxProLicenseGranted();

  protected readonly breadcrumbItems: NxBreadcrumbItem[] = [
    { label: 'Home', link: '/restaurant-website/home' },
    { label: 'Locations' },
  ];

  protected readonly locations: NxRestaurantLocation[] = RESTAURANT_LOCATIONS;

  protected directionsUrl(location: NxRestaurantLocation): string {
    return `https://maps.google.com/?q=${encodeURIComponent(location.address)}`;
  }
}
