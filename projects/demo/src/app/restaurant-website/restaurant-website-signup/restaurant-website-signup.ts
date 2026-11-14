import { Component, signal } from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { RouterLink } from '@angular/router';
import { nxProLicenseGranted, NxInput, NxCheckbox, NxButton, NxDivider, NxIcon } from 'components';

/**
 * Sign-up page of the "Restaurant Website" PRO template - mirrors the Login page's
 * two-column "marketing panel + auth form" layout with perks-focused copy instead of
 * a testimonial.
 */
@Component({
  selector: 'app-restaurant-website-signup',
  imports: [NgTemplateOutlet, RouterLink, NxInput, NxCheckbox, NxButton, NxDivider, NxIcon],
  templateUrl: './restaurant-website-signup.html',
  styleUrl: './restaurant-website-signup.scss',
})
export class RestaurantWebsiteSignupDemo {
  protected readonly licensed = nxProLicenseGranted();

  protected readonly agreedToTerms = signal(false);

  protected readonly perks = [
    { icon: 'nx-star', text: 'Priority reservation windows' },
    { icon: 'nx-gift', text: 'A free dessert on your birthday' },
    { icon: 'nx-fire', text: 'Early access to seasonal tasting menus' },
  ];
}
