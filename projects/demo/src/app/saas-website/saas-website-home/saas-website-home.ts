import { Component } from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { RouterLink } from '@angular/router';
import { NxButton, NxIcon, NxMarquee, nxProLicenseGranted } from 'components';
import {
  NX_SAAS_FEATURES,
  NX_SAAS_TESTIMONIALS,
  NX_SAAS_CUSTOMER_LOGOS,
  NX_SAAS_PRICING_PLANS,
} from '../saas-website-data';

/**
 * Home page of the "SaaS Website" PRO template (brand: Nimbus) - a marketing landing page
 * with a photo-background hero, trusted-by row, features preview, a product-screenshot style
 * section, testimonials, a pricing teaser, and a final CTA banner.
 */
@Component({
  selector: 'app-saas-website-home',
  imports: [NgTemplateOutlet, RouterLink, NxButton, NxIcon, NxMarquee],
  templateUrl: './saas-website-home.html',
  styleUrl: './saas-website-home.scss',
})
export class SaasWebsiteHomeDemo {
  protected readonly licensed = nxProLicenseGranted();

  protected readonly featuredFeatures = NX_SAAS_FEATURES.slice(0, 6);
  protected readonly testimonials = NX_SAAS_TESTIMONIALS.slice(0, 3);
  protected readonly customerLogos = NX_SAAS_CUSTOMER_LOGOS;
  protected readonly pricingPlans = NX_SAAS_PRICING_PLANS;
}
