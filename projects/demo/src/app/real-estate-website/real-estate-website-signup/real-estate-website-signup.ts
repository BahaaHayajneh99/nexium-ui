import { Component, signal } from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { RouterLink } from '@angular/router';
import { nxProLicenseGranted, NxInput, NxCheckbox, NxButton, NxDivider, NxIcon } from 'components';

/**
 * Sign-up page of the "Real Estate Website" PRO template - mirrors the Login page's
 * two-column "marketing panel + auth form" layout with perks-focused copy instead of
 * a testimonial.
 */
@Component({
  selector: 'app-real-estate-website-signup',
  standalone: true,
  imports: [NgTemplateOutlet, RouterLink, NxInput, NxCheckbox, NxButton, NxDivider, NxIcon],
  templateUrl: './real-estate-website-signup.html',
  styleUrl: './real-estate-website-signup.scss',
})
export class RealEstateWebsiteSignupDemo {
  protected readonly licensed = nxProLicenseGranted();

  protected readonly agreedToTerms = signal(false);

  protected readonly perks = [
    { icon: 'nx-home', text: 'Save and compare favorite listings' },
    { icon: 'nx-bell', text: 'Instant alerts on new matches' },
    { icon: 'nx-user', text: 'A dedicated agent for your search' },
  ];
}
