import { Component } from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { RouterLink } from '@angular/router';
import {
  nxProLicenseGranted,
  NxInput,
  NxButton,
  NxIcon,
  NxCard,
  NxAccordionComponent,
  NxAccordionItemComponent,
  NxAccordionHeaderComponent,
  NxAccordionContentComponent,
} from 'components';
import { ECOM_FAQS } from '../ecommerce-website-data';

/**
 * Contact page of the "E-Commerce Website" PRO template - a contact form, store info
 * card, and an FAQ accordion built from the shared ECOM_FAQS data.
 */
@Component({
  selector: 'app-ecommerce-website-contact',
  imports: [
    NgTemplateOutlet,
    RouterLink,
    NxInput,
    NxButton,
    NxIcon,
    NxCard,
    NxAccordionComponent,
    NxAccordionItemComponent,
    NxAccordionHeaderComponent,
    NxAccordionContentComponent,
  ],
  templateUrl: './ecommerce-website-contact.html',
  styleUrl: './ecommerce-website-contact.scss',
})
export class EcommerceWebsiteContactDemo {
  protected readonly licensed = nxProLicenseGranted();

  protected readonly faqs = ECOM_FAQS;

  protected readonly subjects = ['General inquiry', 'Order support', 'Billing question', 'Partnership', 'Other'];

  protected readonly infoRows = [
    { icon: 'nx-map-pin', text: '400 Market Street, San Francisco, CA 94103' },
    { icon: 'nx-phone', text: '+1 (415) 555-0142' },
    { icon: 'nx-mail', text: 'support@fernway.com' },
    { icon: 'nx-clock', text: 'Mon - Fri, 9am - 6pm PT' },
  ];
}
