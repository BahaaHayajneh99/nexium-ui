import { Component, signal } from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { RouterLink } from '@angular/router';
import { nxProLicenseGranted, NxInput, NxCheckbox, NxButton, NxDivider, NxIcon } from 'components';
import { RESTAURANT_TESTIMONIALS } from '../restaurant-website-data';

/**
 * Login page of the "Restaurant Website" PRO template - a full-height two-column
 * "marketing panel + auth form" layout, mirroring ecommerce-website-login's structure.
 */
@Component({
  selector: 'app-restaurant-website-login',
  imports: [NgTemplateOutlet, RouterLink, NxInput, NxCheckbox, NxButton, NxDivider, NxIcon],
  templateUrl: './restaurant-website-login.html',
  styleUrl: './restaurant-website-login.scss',
})
export class RestaurantWebsiteLoginDemo {
  protected readonly licensed = nxProLicenseGranted();

  protected readonly rememberMe = signal(true);

  protected readonly testimonial = RESTAURANT_TESTIMONIALS[0];
}
