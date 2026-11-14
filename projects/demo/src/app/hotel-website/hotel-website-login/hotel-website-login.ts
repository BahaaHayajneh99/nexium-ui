import { Component, signal } from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { RouterLink } from '@angular/router';
import { nxProLicenseGranted, NxInput, NxCheckbox, NxButton, NxDivider, NxIcon } from 'components';
import { HOTEL_TESTIMONIALS } from '../hotel-website-data';

/**
 * Login page of the "Hotel / Travel Booking Website" PRO template - a full-height
 * two-column "marketing panel + auth form" layout, mirroring the e-commerce template's
 * account pages.
 */
@Component({
  selector: 'app-hotel-website-login',
  imports: [NgTemplateOutlet, RouterLink, NxInput, NxCheckbox, NxButton, NxDivider, NxIcon],
  templateUrl: './hotel-website-login.html',
  styleUrl: './hotel-website-login.scss',
})
export class HotelWebsiteLoginDemo {
  protected readonly licensed = nxProLicenseGranted();

  protected readonly rememberMe = signal(true);

  protected readonly testimonial = HOTEL_TESTIMONIALS[0];
}
