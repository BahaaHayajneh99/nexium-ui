import { Component, signal } from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { RouterLink } from '@angular/router';
import { nxProLicenseGranted, NxInput, NxCheckbox, NxButton, NxDivider, NxIcon } from 'components';
import { ECOM_TESTIMONIALS } from '../ecommerce-website-data';

/**
 * Login page of the "E-Commerce Website" PRO template - a full-height two-column
 * "marketing panel + auth form" layout, the common pattern for storefront account pages.
 */
@Component({
  selector: 'app-ecommerce-website-login',
  imports: [NgTemplateOutlet, RouterLink, NxInput, NxCheckbox, NxButton, NxDivider, NxIcon],
  templateUrl: './ecommerce-website-login.html',
  styleUrl: './ecommerce-website-login.scss',
})
export class EcommerceWebsiteLoginDemo {
  protected readonly licensed = nxProLicenseGranted();

  protected readonly rememberMe = signal(true);

  protected readonly testimonial = ECOM_TESTIMONIALS[0];
}
