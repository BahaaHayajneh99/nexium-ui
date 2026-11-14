import { Component } from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { RouterLink } from '@angular/router';
import {
  NxButton,
  NxIcon,
  NxBreadcrumb,
  NxBreadcrumbItem,
  NxAccordionComponent,
  NxAccordionItemComponent,
  NxAccordionHeaderComponent,
  NxAccordionContentComponent,
  nxProLicenseGranted,
} from 'components';
import { NX_SAAS_PRICING_PLANS, NX_SAAS_FAQS } from '../saas-website-data';

/**
 * Pricing page of the "SaaS Website" PRO template - three plan cards (Starter/Growth/
 * Enterprise) each with a feature checklist and a signup CTA, followed by an FAQ accordion.
 */
@Component({
  selector: 'app-saas-website-pricing',
  imports: [
    NgTemplateOutlet,
    RouterLink,
    NxButton,
    NxIcon,
    NxBreadcrumb,
    NxAccordionComponent,
    NxAccordionItemComponent,
    NxAccordionHeaderComponent,
    NxAccordionContentComponent,
  ],
  templateUrl: './saas-website-pricing.html',
  styleUrl: './saas-website-pricing.scss',
})
export class SaasWebsitePricingDemo {
  protected readonly licensed = nxProLicenseGranted();

  protected readonly breadcrumbItems: NxBreadcrumbItem[] = [
    { label: 'Home', link: '/saas-website/home' },
    { label: 'Pricing' },
  ];

  protected readonly plans = NX_SAAS_PRICING_PLANS;
  protected readonly faqs = NX_SAAS_FAQS;
}
