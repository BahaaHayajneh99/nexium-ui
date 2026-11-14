import { Component, signal } from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { RouterLink } from '@angular/router';
import { nxProLicenseGranted, NxInput, NxCheckbox, NxButton, NxDivider, NxIcon } from 'components';

/**
 * Sign-up page of the "E-Commerce Website" PRO template - mirrors the Login page's
 * two-column "marketing panel + auth form" layout with perks-focused copy instead of
 * a testimonial.
 */
@Component({
  selector: 'app-ecommerce-website-signup',
  imports: [NgTemplateOutlet, RouterLink, NxInput, NxCheckbox, NxButton, NxDivider, NxIcon],
  templateUrl: './ecommerce-website-signup.html',
  styleUrl: './ecommerce-website-signup.scss',
})
export class EcommerceWebsiteSignupDemo {
  protected readonly licensed = nxProLicenseGranted();

  protected readonly agreedToTerms = signal(false);

  protected readonly perks = [
    { icon: 'nx-shopping-cart', text: 'Free shipping on every order' },
    { icon: 'nx-star', text: 'Early access to new drops' },
    { icon: 'nx-tag', text: 'Members-only pricing' },
  ];
}
