import { Component, signal } from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { RouterLink } from '@angular/router';
import { nxProLicenseGranted, NxInput, NxCheckbox, NxButton, NxDivider, NxIcon } from 'components';

/**
 * Sign-up page of the "Hotel / Travel Booking Website" PRO template - mirrors the Login
 * page's two-column "marketing panel + auth form" layout with perks-focused copy instead
 * of a testimonial.
 */
@Component({
  selector: 'app-hotel-website-signup',
  imports: [NgTemplateOutlet, RouterLink, NxInput, NxCheckbox, NxButton, NxDivider, NxIcon],
  templateUrl: './hotel-website-signup.html',
  styleUrl: './hotel-website-signup.scss',
})
export class HotelWebsiteSignupDemo {
  protected readonly licensed = nxProLicenseGranted();

  protected readonly agreedToTerms = signal(false);

  protected readonly perks = [
    { icon: 'nx-star', text: 'Member-only room rates' },
    { icon: 'nx-gift', text: 'Early access to seasonal offers' },
    { icon: 'nx-bell', text: 'Priority concierge booking' },
  ];
}
