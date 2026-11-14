import { Component } from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { RouterLink } from '@angular/router';
import { nxProLicenseGranted, NxInput, NxTextarea, NxButton, NxIcon, NxCard, NxBreadcrumb, NxBreadcrumbItem } from 'components';
import { RESTAURANT_HOURS, RESTAURANT_ADDRESS, RESTAURANT_PHONE, RESTAURANT_EMAIL } from '../restaurant-website-data';

/**
 * Contact page of the "Restaurant Website" PRO template - a contact form, info cards
 * (location/phone/email), a styled map placeholder, and the opening hours table.
 */
@Component({
  selector: 'app-restaurant-website-contact',
  imports: [NgTemplateOutlet, RouterLink, NxInput, NxTextarea, NxButton, NxIcon, NxCard, NxBreadcrumb],
  templateUrl: './restaurant-website-contact.html',
  styleUrl: './restaurant-website-contact.scss',
})
export class RestaurantWebsiteContactDemo {
  protected readonly licensed = nxProLicenseGranted();

  protected readonly breadcrumbItems: NxBreadcrumbItem[] = [{ label: 'Home', link: '/restaurant-website/home' }, { label: 'Contact' }];

  protected readonly hours = RESTAURANT_HOURS;
  protected readonly address = RESTAURANT_ADDRESS;

  protected readonly infoRows = [
    { icon: 'nx-map-pin', text: RESTAURANT_ADDRESS },
    { icon: 'nx-phone', text: RESTAURANT_PHONE },
    { icon: 'nx-mail', text: RESTAURANT_EMAIL },
  ];
}
