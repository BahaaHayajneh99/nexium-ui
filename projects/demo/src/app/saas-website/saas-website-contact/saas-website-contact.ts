import { Component } from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { RouterLink } from '@angular/router';
import {
  nxProLicenseGranted,
  NxInput,
  NxTextarea,
  NxButton,
  NxIcon,
  NxCard,
  NxBreadcrumb,
  NxBreadcrumbItem,
  NxAccordionComponent,
  NxAccordionItemComponent,
  NxAccordionHeaderComponent,
  NxAccordionContentComponent,
} from 'components';
import { NX_SAAS_FAQS } from '../saas-website-data';

/**
 * Contact page of the "SaaS Website" PRO template - a contact form, office/contact info
 * card, and a short FAQ accordion reusing a few entries from NX_SAAS_FAQS.
 */
@Component({
  selector: 'app-saas-website-contact',
  imports: [
    NgTemplateOutlet,
    RouterLink,
    NxInput,
    NxTextarea,
    NxButton,
    NxIcon,
    NxCard,
    NxBreadcrumb,
    NxAccordionComponent,
    NxAccordionItemComponent,
    NxAccordionHeaderComponent,
    NxAccordionContentComponent,
  ],
  templateUrl: './saas-website-contact.html',
  styleUrl: './saas-website-contact.scss',
})
export class SaasWebsiteContactDemo {
  protected readonly licensed = nxProLicenseGranted();

  protected readonly breadcrumbItems: NxBreadcrumbItem[] = [
    { label: 'Home', link: '/saas-website/home' },
    { label: 'Contact' },
  ];

  protected readonly infoRows = [
    { icon: 'nx-mail', text: 'hello@nimbus.io' },
    { icon: 'nx-phone', text: '+1 (628) 555-0199' },
    { icon: 'nx-map-pin', text: '855 Folsom Street, San Francisco, CA 94107' },
    { icon: 'nx-clock', text: 'Mon - Fri, 8am - 6pm PT' },
  ];

  protected readonly faqs = NX_SAAS_FAQS.slice(0, 3);
}
