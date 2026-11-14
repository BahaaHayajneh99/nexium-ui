import { Component, signal } from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { RouterLink } from '@angular/router';
import { nxProLicenseGranted, NxInput, NxCheckbox, NxButton, NxDivider, NxIcon } from 'components';

/**
 * Sign-up page of the "SaaS Website" PRO template - mirrors the Login page's two-column
 * "marketing panel + auth form" layout, with trial-perks copy instead of a testimonial.
 */
@Component({
  selector: 'app-saas-website-signup',
  imports: [NgTemplateOutlet, RouterLink, NxInput, NxCheckbox, NxButton, NxDivider, NxIcon],
  templateUrl: './saas-website-signup.html',
  styleUrl: './saas-website-signup.scss',
})
export class SaasWebsiteSignupDemo {
  protected readonly licensed = nxProLicenseGranted();

  protected readonly agreedToTerms = signal(false);

  protected readonly perks = [
    { icon: 'nx-chart-bar', text: '14-day free trial, no credit card required' },
    { icon: 'nx-bell', text: 'Unlimited alerts on every plan' },
    { icon: 'nx-lock', text: 'SOC 2 Type II certified from day one' },
  ];
}
